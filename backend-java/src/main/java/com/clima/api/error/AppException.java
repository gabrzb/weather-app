package com.clima.api.error;

public class AppException extends RuntimeException {

    public enum Type {
        BAD_REQUEST,
        CITY_NOT_FOUND,
        UPSTREAM,
        TOO_MANY_REQUESTS
    }

    private final Type type;

    private AppException(Type type, String message) {
        super(message);
        this.type = type;
    }

    public static AppException badRequest(String message) {
        return new AppException(Type.BAD_REQUEST, message);
    }

    public static AppException cityNotFound() {
        return new AppException(Type.CITY_NOT_FOUND, "Cidade nao encontrada. Tente outro nome.");
    }

    public static AppException upstream() {
        return new AppException(Type.UPSTREAM, "Nao foi possivel buscar os dados meteorologicos agora.");
    }

    public static AppException tooManyRequests() {
        return new AppException(Type.TOO_MANY_REQUESTS, "Muitas requisicoes. Tente novamente em instantes.");
    }

    public Type getType() {
        return type;
    }
}
