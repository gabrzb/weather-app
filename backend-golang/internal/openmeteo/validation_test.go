package openmeteo

import "testing"

func TestValidateCoordinatesAcceptsValidCoordinates(t *testing.T) {
	if err := ValidateCoordinates(-23.55, -46.63); err != nil {
		t.Fatalf("expected valid coordinates, got %v", err)
	}
	if err := ValidateCoordinates(90, 180); err != nil {
		t.Fatalf("expected boundary coordinates to be valid, got %v", err)
	}
}

func TestValidateCoordinatesRejectsOutOfRangeCoordinates(t *testing.T) {
	if err := ValidateCoordinates(-91, -46.63); err == nil {
		t.Fatal("expected latitude below range to be rejected")
	}
	if err := ValidateCoordinates(-23.55, 181); err == nil {
		t.Fatal("expected longitude above range to be rejected")
	}
}
