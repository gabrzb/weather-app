package openmeteo

import (
	"math"

	"clima-api-golang/internal/apperror"
)

func ValidateCoordinates(latitude float64, longitude float64) error {
	if math.IsInf(latitude, 0) || math.IsNaN(latitude) ||
		math.IsInf(longitude, 0) || math.IsNaN(longitude) ||
		latitude < -90 || latitude > 90 ||
		longitude < -180 || longitude > 180 {
		return apperror.BadRequest("Informe latitude e longitude validas.")
	}

	return nil
}
