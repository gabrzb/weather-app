package com.clima.api.model;

import java.util.List;

public record GeocodingResponse(List<LocationResult> results) {
}
