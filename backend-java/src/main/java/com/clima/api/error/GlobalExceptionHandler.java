package com.clima.api.error;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleAppException(AppException exception) {
        HttpStatus status = switch (exception.getType()) {
            case BAD_REQUEST -> HttpStatus.BAD_REQUEST;
            case CITY_NOT_FOUND -> HttpStatus.NOT_FOUND;
            case UPSTREAM -> HttpStatus.BAD_GATEWAY;
            case TOO_MANY_REQUESTS -> HttpStatus.TOO_MANY_REQUESTS;
        };

        return ResponseEntity.status(status).body(new ErrorResponse(exception.getMessage()));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException exception) {
        String parameter = exception.getName();
        if ("latitude".equals(parameter) || "longitude".equals(parameter)) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Informe latitude e longitude validas."));
        }

        return ResponseEntity.badRequest().body(new ErrorResponse("Parametro invalido."));
    }
}
