import { RouterProvider } from "react-router";
import { router } from "./routes";
import { DevHelper } from "./components/DevHelper";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <DevHelper />
    </ThemeProvider>
  );
}