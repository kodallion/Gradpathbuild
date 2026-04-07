import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GraduationCap, AlertCircle } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    // Simulate login process
    setTimeout(() => {
      // Simulate authentication
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);

      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem("gradpath_onboarding_complete");

      if (hasCompletedOnboarding === "true") {
        navigate("/dashboard");
      } else {
        navigate("/onboarding/goals");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">GradPath</h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back! Sign in to continue</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-card rounded-xl md:rounded-2xl p-6 md:p-8 border border-border shadow-sm">
          <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 md:p-4 bg-destructive/10 border border-destructive/20 rounded-lg md:rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 md:h-12 text-sm md:text-base rounded-lg md:rounded-xl border-border bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 md:h-12 text-sm md:text-base rounded-lg md:rounded-xl border-border bg-input-background"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 md:h-12 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-5 md:mt-6 text-center">
            <Link
              to="/create-account"
              className="text-sm md:text-base text-primary hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}