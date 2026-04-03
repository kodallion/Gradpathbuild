import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Check } from "lucide-react";

const PROGRAM_OPTIONS = [
  { id: "masters", label: "Master's Degree" },
  { id: "phd", label: "PhD" },
  { id: "diploma", label: "Postgraduate Diploma" },
  { id: "multiple", label: "Multiple Programs" },
];

export function OnboardingGoals() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState<string>("");

  const handleContinue = () => {
    if (selectedProgram) {
      localStorage.setItem("gradpath_program_type", selectedProgram);
      navigate("/onboarding/countries");
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
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm font-medium text-primary">Goals</span>
            </div>
            <div className="w-12 h-0.5 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm text-muted-foreground">Countries</span>
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
          <h2 className="text-3xl mb-2 text-center">What are you applying for?</h2>
          <p className="text-muted-foreground text-center mb-8">
            Select the type of program you're interested in pursuing
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {PROGRAM_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedProgram(option.id)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  selectedProgram === option.id
                    ? "border-primary bg-secondary/30"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{option.label}</span>
                  {selectedProgram === option.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedProgram}
            className={`w-full h-12 rounded-xl font-medium transition-opacity ${
              selectedProgram
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