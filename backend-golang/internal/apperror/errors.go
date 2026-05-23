package apperror

import "net/http"

type AppError struct {
	Status  int
	Message string
}

func (e AppError) Error() string {
	return e.Message
}

func BadRequest(message string) AppError {
	return AppError{Status: http.StatusBadRequest, Message: message}
}

func CityNotFound() AppError {
	return AppError{Status: http.StatusNotFound, Message: "Cidade nao encontrada. Tente outro nome."}
}

func Upstream() AppError {
	return AppError{Status: http.StatusBadGateway, Message: "Nao foi possivel buscar os dados meteorologicos agora."}
}
