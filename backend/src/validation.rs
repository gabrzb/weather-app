use crate::error::AppError;

pub(crate) fn validate_coordinates(latitude: f64, longitude: f64) -> Result<(), AppError> {
    if !latitude.is_finite()
        || !longitude.is_finite()
        || !(-90.0..=90.0).contains(&latitude)
        || !(-180.0..=180.0).contains(&longitude)
    {
        return Err(AppError::BadRequest(
            "Informe latitude e longitude validas.".to_string(),
        ));
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_valid_coordinates() {
        assert!(validate_coordinates(-23.55, -46.63).is_ok());
        assert!(validate_coordinates(90.0, 180.0).is_ok());
    }

    #[test]
    fn rejects_out_of_range_coordinates() {
        assert!(matches!(
            validate_coordinates(-91.0, -46.63),
            Err(AppError::BadRequest(_))
        ));
        assert!(matches!(
            validate_coordinates(-23.55, 181.0),
            Err(AppError::BadRequest(_))
        ));
    }
}
