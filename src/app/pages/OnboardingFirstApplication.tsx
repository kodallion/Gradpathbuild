import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function OnboardingFirstApplication() {
  const navigate = useNavigate();
  const [universityName, setUniversityName] = useState("");
  const [programName, setProgramName] = useState("");
  const [country, setCountry] = useState("");
  const [deadline, setDeadline] = useState("");
  const [portalLink, setPortalLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store the first application
    const firstApplication = {
      universityName,
      programName,
      country,
      deadline,
      portalLink,
    };
    localStorage.setItem("gradpath_first_application", JSON.stringify(firstApplication));
    
    // Mark onboarding as complete
    localStorage.setItem("gradpath_onboarding_complete", "true");
    
    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleSkip = () => {
    // Mark onboarding as complete
    localStorage.setItem("gradpath_onboarding_complete", "true");
    
    // Navigate to dashboard
    navigate("/dashboard");
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
              <div className="w-8 h-8 rounded-full bg-primary/30 text-primary flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm text-muted-foreground">Countries</span>
            </div>
            <div className="w-12 h-0.5 bg-primary/30" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-primary">Application</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          <h2 className="text-3xl mb-2 text-center">Add your first application</h2>
          <p className="text-muted-foreground text-center mb-8">
            Let's get started by adding the details of one program you're applying to
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="universityName">University Name</Label>
              <Input
                id="universityName"
                type="text"
                placeholder="e.g., University of Oxford"
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                required
                className="h-12 rounded-xl border-border bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="programName">Program Name</Label>
              <Input
                id="programName"
                type="text"
                placeholder="e.g., MSc Computer Science"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                required
                className="h-12 rounded-xl border-border bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                placeholder="e.g., United Kingdom"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="h-12 rounded-xl border-border bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="h-12 rounded-xl border-border bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portalLink">Application Portal Link (Optional)</Label>
              <Input
                id="portalLink"
                type="url"
                placeholder="https://..."
                value={portalLink}
                onChange={(e) => setPortalLink(e.target.value)}
                className="h-12 rounded-xl border-border bg-input-background"
              />
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Add Application
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                className="w-full h-12 bg-transparent text-muted-foreground rounded-xl font-medium hover:bg-muted/50 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}