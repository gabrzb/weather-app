mod config;
mod error;
mod forecast;
mod models;
mod open_meteo;
mod routes;
mod validation;

use actix_cors::Cors;
use actix_web::{App, HttpServer, middleware::Logger, web};
use config::AppConfig;
use open_meteo::OpenMeteoClient;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    config::load_env();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let AppConfig {
        bind_address,
        open_meteo,
    } = match AppConfig::from_env() {
        Ok(config) => config,
        Err(error) => {
            eprintln!("{error}");
            return Err(std::io::Error::new(
                std::io::ErrorKind::InvalidInput,
                error.to_string(),
            ));
        }
    };
    let open_meteo = web::Data::new(OpenMeteoClient::new(open_meteo));

    log::info!("starting clima_api at http://{bind_address}");

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(Cors::permissive())
            .app_data(open_meteo.clone())
            .configure(routes::configure)
    })
    .bind(bind_address)?
    .run()
    .await
}
