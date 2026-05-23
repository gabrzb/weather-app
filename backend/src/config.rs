use std::path::{Path, PathBuf};

const REQUIRED_CONFIG_KEYS: &[&str] = &[
    "BIND_ADDRESS",
    "OPEN_METEO_GEOCODING_URL",
    "OPEN_METEO_FORECAST_URL",
    "OPEN_METEO_AIR_QUALITY_URL",
];

pub struct AppConfig {
    pub bind_address: String,
    pub open_meteo: OpenMeteoConfig,
}

#[derive(Clone, Debug)]
pub struct OpenMeteoConfig {
    pub geocoding_url: String,
    pub forecast_url: String,
    pub air_quality_url: String,
}

impl AppConfig {
    pub fn from_env() -> Result<Self, ConfigError> {
        validate_required_config()?;

        Ok(Self {
            bind_address: env_required("BIND_ADDRESS")?,
            open_meteo: OpenMeteoConfig::from_env()?,
        })
    }
}

impl OpenMeteoConfig {
    fn from_env() -> Result<Self, ConfigError> {
        Ok(Self {
            geocoding_url: env_required("OPEN_METEO_GEOCODING_URL")?,
            forecast_url: env_required("OPEN_METEO_FORECAST_URL")?,
            air_quality_url: env_required("OPEN_METEO_AIR_QUALITY_URL")?,
        })
    }
}

#[derive(Debug)]
pub struct ConfigError {
    missing_keys: Vec<&'static str>,
}

impl std::fmt::Display for ConfigError {
    fn fmt(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let missing_api_keys = self
            .missing_keys
            .iter()
            .copied()
            .filter(|key| key.starts_with("OPEN_METEO_"))
            .collect::<Vec<_>>();
        let missing_config_keys = self
            .missing_keys
            .iter()
            .copied()
            .filter(|key| !key.starts_with("OPEN_METEO_"))
            .collect::<Vec<_>>();

        if !missing_api_keys.is_empty() {
            write!(
                formatter,
                "Falta API obrigatoria: {}",
                missing_api_keys.join(", ")
            )?;

            if !missing_config_keys.is_empty() {
                write!(
                    formatter,
                    ". Falta configuracao obrigatoria: {}",
                    missing_config_keys.join(", ")
                )?;
            }

            return Ok(());
        }

        write!(
            formatter,
            "Falta configuracao obrigatoria: {}",
            self.missing_keys.join(", ")
        )
    }
}

impl std::error::Error for ConfigError {}

pub fn load_env() {
    let env_files = [
        PathBuf::from("backend/.env"),
        PathBuf::from(".env"),
        Path::new(env!("CARGO_MANIFEST_DIR")).join(".env"),
    ];

    for env_file in env_files {
        if env_file.exists() {
            let _ = dotenvy::from_path(env_file);
        }
    }
}

fn validate_required_config() -> Result<(), ConfigError> {
    let missing_keys = REQUIRED_CONFIG_KEYS
        .iter()
        .copied()
        .filter(|key| match std::env::var(key) {
            Ok(value) => value.trim().is_empty(),
            Err(_) => true,
        })
        .collect::<Vec<_>>();

    if missing_keys.is_empty() {
        Ok(())
    } else {
        Err(ConfigError { missing_keys })
    }
}

fn env_required(key: &'static str) -> Result<String, ConfigError> {
    match std::env::var(key) {
        Ok(value) if !value.trim().is_empty() => Ok(value.trim().to_string()),
        _ => Err(ConfigError {
            missing_keys: vec![key],
        }),
    }
}
