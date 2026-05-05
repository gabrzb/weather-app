package com.clima.api.web;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.clima.api.config.RateLimitProperties;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private static final long WINDOW_MS = 60_000L;
    private static final long STALE_WINDOW_MS = WINDOW_MS * 10;
    private static final String TOO_MANY_REQUESTS_PAYLOAD =
            "{\"error\":\"Muitas requisicoes. Tente novamente em instantes.\"}";

    private final RateLimitProperties properties;
    private final Map<String, ClientWindow> windows = new ConcurrentHashMap<>();
    private final AtomicLong lastCleanupAt = new AtomicLong(System.currentTimeMillis());

    public RateLimitFilter(RateLimitProperties properties) {
        this.properties = properties;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !"GET".equalsIgnoreCase(request.getMethod()) || !request.getRequestURI().startsWith("/api/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (!properties.isEnabled() || properties.getRequestsPerMinute() <= 0) {
            filterChain.doFilter(request, response);
            return;
        }

        long now = System.currentTimeMillis();
        String clientKey = resolveClientKey(request);
        ClientWindow window = windows.computeIfAbsent(clientKey, key -> new ClientWindow(now));

        int requestCount = window.increment(now);
        if (requestCount > properties.getRequestsPerMinute()) {
            long retryAfter = window.retryAfterSeconds(now);
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setHeader("Retry-After", Long.toString(retryAfter));
            response.setContentType("application/json");
            response.setCharacterEncoding(StandardCharsets.UTF_8.name());
            response.getWriter().write(TOO_MANY_REQUESTS_PAYLOAD);
            return;
        }

        cleanupStaleWindows(now);
        filterChain.doFilter(request, response);
    }

    private String resolveClientKey(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            String[] values = forwardedFor.split(",");
            if (values.length > 0) {
                String client = values[0].trim();
                if (!client.isEmpty()) {
                    return client;
                }
            }
        }

        String remoteAddress = request.getRemoteAddr();
        return remoteAddress == null || remoteAddress.isBlank() ? "unknown" : remoteAddress;
    }

    private void cleanupStaleWindows(long now) {
        long last = lastCleanupAt.get();
        if (now - last < WINDOW_MS || !lastCleanupAt.compareAndSet(last, now)) {
            return;
        }

        windows.entrySet().removeIf(entry -> entry.getValue().isStale(now));
    }

    private static final class ClientWindow {
        private long windowStartedAt;
        private int count;

        private ClientWindow(long now) {
            this.windowStartedAt = now;
            this.count = 0;
        }

        private synchronized int increment(long now) {
            if (now - windowStartedAt >= WINDOW_MS) {
                windowStartedAt = now;
                count = 0;
            }

            count += 1;
            return count;
        }

        private synchronized long retryAfterSeconds(long now) {
            long remainingMs = (windowStartedAt + WINDOW_MS) - now;
            if (remainingMs <= 0) {
                return 1L;
            }

            return (remainingMs + 999L) / 1000L;
        }

        private synchronized boolean isStale(long now) {
            return now - windowStartedAt >= STALE_WINDOW_MS;
        }
    }
}
