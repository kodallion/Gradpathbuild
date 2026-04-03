import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GraduationCap } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // Check if user has completed onboarding (you can store this in localStorage)
      const hasCompletedOnboarding = localStorage.getItem("gradpath_onboarding_complete");
      
      if (hasCompletedOnboarding === "true") {
        navigate("/dashboard");
      } else {
        navigate("/onboarding/goals");
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary">GradPath</h1>
          </div>
          <p className="text-muted-foreground">Welcome back! Sign in to continue</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          <h2 className="text-2xl mb-6">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-border bg-input-background"
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
                className="h-12 rounded-xl border-border bg-input-background"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/create-account" 
              className="text-sm text-primary hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}