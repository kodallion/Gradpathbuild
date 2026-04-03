import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Applications } from "./pages/Applications";
import { ApplicationDetail } from "./pages/ApplicationDetail";
import { Tasks } from "./pages/Tasks";
import { Documents } from "./pages/Documents";
import { AIAssistant } from "./pages/AIAssistant";
import { Settings } from "./pages/Settings";
import { SignIn } from "./pages/SignIn";
import { CreateAccount } from "./pages/CreateAccount";
import { OnboardingGoals } from "./pages/OnboardingGoals";
import { OnboardingCountries } from "./pages/OnboardingCountries";
import { OnboardingFirstApplication } from "./pages/OnboardingFirstApplication";
import { RootRedirect } from "./pages/RootRedirect";

export const router = createBrowserRouter([
  // Auth routes (no layout)
  {
    path: "/sign-in",
    Component: SignIn,
  },
  {
    path: "/create-account",
    Component: CreateAccount,
  },
  // Onboarding routes (no layout)
  {
    path: "/onboarding/goals",
    Component: OnboardingGoals,
  },
  {
    path: "/onboarding/countries",
    Component: OnboardingCountries,
  },
  {
    path: "/onboarding/first-application",
    Component: OnboardingFirstApplication,
  },
  // Main app routes (with layout)
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: RootRedirect },
      { path: "dashboard", Component: Dashboard },
      { path: "applications", Component: Applications },
      { path: "applications/:id", Component: ApplicationDetail },
      { path: "tasks", Component: Tasks },
      { path: "documents", Component: Documents },
      { path: "ai-assistant", Component: AIAssistant },
      { path: "settings", Component: Settings },
    ],
  },
]);