package api

import (
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

const (
	rateLimitWindow      = time.Minute
	rateLimitStaleWindow = 10 * rateLimitWindow
)

type clientWindow struct {
	mu        sync.Mutex
	startedAt time.Time
	count     int
}

type rateLimiter struct {
	mu            sync.Mutex
	requestsLimit int
	windows       map[string]*clientWindow
	lastCleanupAt time.Time
}

func RateLimitMiddleware(requestsPerMinute int) gin.HandlerFunc {
	limiter := &rateLimiter{
		requestsLimit: requestsPerMinute,
		windows:       make(map[string]*clientWindow),
		lastCleanupAt: time.Now(),
	}

	return func(c *gin.Context) {
		if c.Request.Method != http.MethodGet || !strings.HasPrefix(c.Request.URL.Path, "/api/") {
			c.Next()
			return
		}

		now := time.Now()
		key := clientKey(c)
		window := limiter.windowFor(key, now)
		count := window.increment(now)

		if count > limiter.requestsLimit {
			c.Header("Retry-After", strconv.FormatInt(window.retryAfterSeconds(now), 10))
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"error": "Muitas requisicoes. Tente novamente em instantes.",
			})
			return
		}

		limiter.cleanup(now)
		c.Next()
	}
}

func (l *rateLimiter) windowFor(key string, now time.Time) *clientWindow {
	l.mu.Lock()
	defer l.mu.Unlock()

	window, ok := l.windows[key]
	if !ok {
		window = &clientWindow{startedAt: now}
		l.windows[key] = window
	}

	return window
}

func (l *rateLimiter) cleanup(now time.Time) {
	l.mu.Lock()
	defer l.mu.Unlock()

	if now.Sub(l.lastCleanupAt) < rateLimitWindow {
		return
	}

	l.lastCleanupAt = now
	for key, window := range l.windows {
		if window.isStale(now) {
			delete(l.windows, key)
		}
	}
}

func (w *clientWindow) increment(now time.Time) int {
	w.mu.Lock()
	defer w.mu.Unlock()

	if now.Sub(w.startedAt) >= rateLimitWindow {
		w.startedAt = now
		w.count = 0
	}

	w.count++
	return w.count
}

func (w *clientWindow) retryAfterSeconds(now time.Time) int64 {
	w.mu.Lock()
	defer w.mu.Unlock()

	remaining := w.startedAt.Add(rateLimitWindow).Sub(now)
	if remaining <= 0 {
		return 1
	}

	return int64((remaining + time.Second - 1) / time.Second)
}

func (w *clientWindow) isStale(now time.Time) bool {
	w.mu.Lock()
	defer w.mu.Unlock()

	return now.Sub(w.startedAt) >= rateLimitStaleWindow
}

func clientKey(c *gin.Context) string {
	forwardedFor := c.GetHeader("X-Forwarded-For")
	if forwardedFor != "" {
		parts := strings.Split(forwardedFor, ",")
		if client := strings.TrimSpace(parts[0]); client != "" {
			return client
		}
	}

	if c.ClientIP() != "" {
		return c.ClientIP()
	}

	return "unknown"
}
