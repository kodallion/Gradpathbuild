import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Root redirect component that handles initial routing
 * 
 * For testing/development:
 * - To reset onboarding: localStorage.removeItem("gradpath_onboarding_complete")
 * - To clear all data: localStorage.clear()
 */
export function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("gradpath_onboarding_complete");
    
    if (hasCompletedOnboarding === "true") {
      // User has completed onboarding, go to dashboard
      navigate("/dashboard", { replace: true });
    } else {
      // User hasn't completed onboarding, show sign in
      navigate("/sign-in", { replace: true });
    }
  }, [navigate]);

  // Show loading or blank while redirecting
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
}