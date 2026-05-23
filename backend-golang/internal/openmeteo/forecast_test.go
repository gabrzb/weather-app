package openmeteo

import "testing"

func TestNormalizeDailyUsesZeroForMissingValues(t *testing.T) {
	code := 61
	max := 25.0
	min := 17.0
	precipitation := 3.2
	showers := 1.1
	probability := 80.0
	wind := 12.0

	forecast := NormalizeDaily(DailyWeather{
		Time:                        []string{"2026-04-28", "2026-04-29"},
		WeatherCode:                 []*int{&code},
		Temperature2MMax:            []*float64{&max, nil},
		Temperature2MMin:            []*float64{&min},
		PrecipitationSum:            []*float64{&precipitation},
		RainSum:                     []*float64{},
		ShowersSum:                  []*float64{&showers},
		PrecipitationProbabilityMax: []*float64{&probability},
		WindSpeed10MMax:             []*float64{&wind},
	})

	if len(forecast) != 2 {
		t.Fatalf("expected 2 days, got %d", len(forecast))
	}
	if forecast[0].Code != 61 {
		t.Fatalf("expected first weather code 61, got %d", forecast[0].Code)
	}
	if forecast[1].Code != 0 || forecast[1].Max != 0 || forecast[1].Rain != 0 {
		t.Fatalf("expected missing values to normalize to zero, got %+v", forecast[1])
	}
}

func TestNormalizeHourlySplitsDateAndHour(t *testing.T) {
	precipitation := 2.5
	rain := 1.5
	probability := 60.0

	forecast := NormalizeHourly(HourlyWeather{
		Time:                     []string{"2026-04-28T14:30", "invalid"},
		Precipitation:            []*float64{&precipitation},
		Rain:                     []*float64{&rain},
		Showers:                  []*float64{nil},
		PrecipitationProbability: []*float64{&probability},
	})

	if forecast[0].Date != "2026-04-28" || forecast[0].Hour != "14:30" {
		t.Fatalf("expected split date/hour, got %+v", forecast[0])
	}
	if forecast[1].Date != "invalid" || forecast[1].Hour != "invalid" {
		t.Fatalf("expected invalid timestamp to remain unchanged, got %+v", forecast[1])
	}
	if forecast[1].Precipitation != 0 {
		t.Fatalf("expected missing precipitation to normalize to zero, got %f", forecast[1].Precipitation)
	}
}
