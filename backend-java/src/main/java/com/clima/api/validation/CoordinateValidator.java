package com.clima.api.validation;

import com.clima.api.error.AppException;

public final class CoordinateValidator {

    private CoordinateValidator() {
    }

    public static void validate(double latitude, double longitude) {
        if (!Double.isFinite(latitude)
                || !Double.isFinite(longitude)
                || latitude < -90.0
                || latitude > 90.0
                || longitude < -180.0
                || longitude > 180.0) {
            throw AppException.badRequest("Informe latitude e longitude validas.");
        }
    }
}
