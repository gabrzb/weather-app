use actix_web::{HttpResponse, Responder, web};

use crate::error::AppError;
use crate::models::{CityQuery, HealthResponse, WeatherQuery};
use crate::open_meteo::OpenMeteoClient;

pub fn configure(config: &mut web::ServiceConfig) {
    config
        .route("/api/health", web::get().to(health))
        .route("/api/locations", web::get().to(location))
        .route("/api/weather", web::get().to(weather));
}

async fn health() -> impl Responder {
    HttpResponse::Ok().json(HealthResponse {
        status: "ok",
        service: "clima_api",
    })
}

async fn location(
    client: web::Data<OpenMeteoClient>,
    query: web::Query<CityQuery>,
) -> Result<impl Responder, AppError> {
    let location = client.search_location(&query.city).await?;
    Ok(HttpResponse::Ok().json(location))
}

async fn weather(
    client: web::Data<OpenMeteoClient>,
    query: web::Query<WeatherQuery>,
) -> Result<impl Responder, AppError> {
    if let Some(city) = &query.city {
        let location = client.search_location(city).await?;
        let weather = client.weather_by_location(location).await?;
        return Ok(HttpResponse::Ok().json(weather));
    }

    match (query.latitude, query.longitude) {
        (Some(latitude), Some(longitude)) => {
            let weather = client
                .weather_by_coordinates(latitude, longitude, query.name.clone())
                .await?;
            Ok(HttpResponse::Ok().json(weather))
        }
        _ => Err(AppError::BadRequest(
            "Informe city ou latitude/longitude.".to_string(),
        )),
    }
}
