package api

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"clima-api-golang/internal/apperror"
	"clima-api-golang/internal/openmeteo"
)

type weatherService interface {
	SearchLocation(city string) (openmeteo.LocationResult, error)
	WeatherByCity(city string) (openmeteo.WeatherData, error)
	WeatherByCoordinates(latitude float64, longitude float64, name string) (openmeteo.WeatherData, error)
}

func RegisterRoutes(router *gin.Engine, service weatherService) {
	group := router.Group("/api")
	group.GET("/health", health)
	group.GET("/locations", locations(service))
	group.GET("/weather", weather(service))
}

func health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"service": "clima_api",
	})
}

func locations(service weatherService) gin.HandlerFunc {
	return func(c *gin.Context) {
		location, err := service.SearchLocation(c.Query("city"))
		respond(c, location, err)
	}
}

func weather(service weatherService) gin.HandlerFunc {
	return func(c *gin.Context) {
		if city, ok := c.GetQuery("city"); ok {
			data, err := service.WeatherByCity(city)
			respond(c, data, err)
			return
		}

		latitudeValue, hasLatitude := c.GetQuery("latitude")
		longitudeValue, hasLongitude := c.GetQuery("longitude")
		if hasLatitude && hasLongitude {
			latitude, latitudeErr := strconv.ParseFloat(latitudeValue, 64)
			longitude, longitudeErr := strconv.ParseFloat(longitudeValue, 64)
			if latitudeErr != nil || longitudeErr != nil {
				respond(c, nil, apperror.BadRequest("Informe latitude e longitude validas."))
				return
			}

			data, err := service.WeatherByCoordinates(latitude, longitude, c.Query("name"))
			respond(c, data, err)
			return
		}

		respond(c, nil, apperror.BadRequest("Informe city ou latitude/longitude."))
	}
}

func respond(c *gin.Context, payload any, err error) {
	if err != nil {
		var appErr apperror.AppError
		if errors.As(err, &appErr) {
			c.JSON(appErr.Status, gin.H{"error": appErr.Message})
			return
		}

		c.JSON(http.StatusBadGateway, gin.H{"error": apperror.Upstream().Message})
		return
	}

	c.JSON(http.StatusOK, payload)
}
