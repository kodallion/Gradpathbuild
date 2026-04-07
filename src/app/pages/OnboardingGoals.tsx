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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">GradPath</h1>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8 overflow-x-auto">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs md:text-sm font-medium">
                1
              </div>
              <span className="text-xs md:text-sm font-medium text-primary">Goals</span>
            </div>
            <div className="w-8 md:w-12 h-0.5 bg-border flex-shrink-0" />
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs md:text-sm font-medium">
                2
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">Countries</span>
            </div>
            <div className="w-8 md:w-12 h-0.5 bg-border flex-shrink-0" />
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs md:text-sm font-medium">
                3
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">Application</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-xl md:rounded-2xl p-6 md:p-8 border border-border shadow-sm">
          <h2 className="text-2xl md:text-3xl mb-2 text-center">What are you applying for?</h2>
          <p className="text-sm md:text-base text-muted-foreground text-center mb-6 md:mb-8">
            Select the type of program you're interested in pursuing
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
            {PROGRAM_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedProgram(option.id)}
                className={`relative p-5 md:p-6 rounded-lg md:rounded-xl border-2 transition-all text-left ${
                  selectedProgram === option.id
                    ? "border-primary bg-secondary/30"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-medium">{option.label}</span>
                  {selectedProgram === option.id && (
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedProgram}
            className={`w-full h-11 md:h-12 text-sm md:text-base rounded-lg md:rounded-xl font-medium transition-opacity ${
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