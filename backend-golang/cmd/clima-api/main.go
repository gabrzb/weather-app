package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"clima-api-golang/internal/api"
	"clima-api-golang/internal/config"
	"clima-api-golang/internal/openmeteo"
)

func main() {
	config.LoadEnv()

	cfg, err := config.FromEnv()
	if err != nil {
		log.Fatal(err)
	}

	client := openmeteo.NewClient(cfg.OpenMeteo, cfg.HTTP)
	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery(), cors.Default())

	if cfg.RateLimit.Enabled && cfg.RateLimit.RequestsPerMinute > 0 {
		router.Use(api.RateLimitMiddleware(cfg.RateLimit.RequestsPerMinute))
	}

	api.RegisterRoutes(router, client)

	log.Printf("starting clima_api at http://%s", cfg.BindAddress)
	if err := router.Run(cfg.BindAddress); err != nil {
		log.Fatal(err)
	}
}
