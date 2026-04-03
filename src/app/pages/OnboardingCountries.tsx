import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, X, ArrowLeft } from "lucide-react";

const COUNTRY_OPTIONS = [
  { id: "uk", label: "United Kingdom" },
  { id: "us", label: "United States" },
  { id: "canada", label: "Canada" },
  { id: "europe", label: "Europe" },
  { id: "australia", label: "Australia" },
  { id: "other", label: "Other" },
];

export function OnboardingCountries() {
  const navigate = useNavigate();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const toggleCountry = (countryId: string) => {
    if (selectedCountries.includes(countryId)) {
      setSelectedCountries(selectedCountries.filter((id) => id !== countryId));
    } else {
      setSelectedCountries([...selectedCountries, countryId]);
    }
  };

  const handleContinue = () => {
    if (selectedCountries.length > 0) {
      localStorage.setItem("gradpath_target_countries", JSON.stringify(selectedCountries));
      navigate("/onboarding/first-application");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary">GradPath</h1>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/30 text-primary flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm text-muted-foreground">Goals</span>
            </div>
            <div className="w-12 h-0.5 bg-primary/30" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-primary">Countries</span>
            </div>
            <div className="w-12 h-0.5 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-muted-foreground">Application</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          <h2 className="text-3xl mb-2 text-center">Where are you planning to study?</h2>
          <p className="text-muted-foreground text-center mb-8">
            Select all countries you're considering (you can choose multiple)
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {COUNTRY_OPTIONS.map((country) => {
              const isSelected = selectedCountries.includes(country.id);
              return (
                <button
                  key={country.id}
                  onClick={() => toggleCountry(country.id)}
                  className={`px-5 py-3 rounded-xl border-2 transition-all font-medium ${
                    isSelected
                      ? "border-primary bg-secondary text-primary"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{country.label}</span>
                    {isSelected && <X className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedCountries.length > 0 && (
            <div className="mb-6 p-4 bg-secondary/30 rounded-xl">
              <p className="text-sm text-muted-foreground">
                {selectedCountries.length} {selectedCountries.length === 1 ? 'country' : 'countries'} selected
              </p>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={selectedCountries.length === 0}
            className={`w-full h-12 rounded-xl font-medium transition-opacity ${
              selectedCountries.length > 0
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}