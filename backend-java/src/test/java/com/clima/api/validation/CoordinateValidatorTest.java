package com.clima.api.validation;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

import com.clima.api.error.AppException;

class CoordinateValidatorTest {

    @Test
    void acceptsValidCoordinates() {
        assertDoesNotThrow(() -> CoordinateValidator.validate(-23.55, -46.63));
        assertDoesNotThrow(() -> CoordinateValidator.validate(90.0, 180.0));
    }

    @Test
    void rejectsOutOfRangeCoordinates() {
        AppException latitudeException = assertThrows(AppException.class, () -> CoordinateValidator.validate(-91.0, -46.63));
        AppException longitudeException = assertThrows(AppException.class, () -> CoordinateValidator.validate(-23.55, 181.0));

        assertEquals(AppException.Type.BAD_REQUEST, latitudeException.getType());
        assertEquals(AppException.Type.BAD_REQUEST, longitudeException.getType());
    }
}
