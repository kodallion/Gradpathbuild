import { useState } from "react";
import { RotateCcw, X } from "lucide-react";

/**
 * Development helper component for testing
 * Shows a small floating button to reset onboarding state
 */
export function DevHelper() {
  const [isVisible, setIsVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  if (!isVisible) return null;

  const handleResetOnboarding = () => {
    if (confirm("Reset onboarding and return to sign-in page?")) {
      localStorage.removeItem("gradpath_onboarding_complete");
      localStorage.removeItem("gradpath_program_type");
      localStorage.removeItem("gradpath_target_countries");
      localStorage.removeItem("gradpath_first_application");
      window.location.href = "/sign-in";
    }
  };

  const handleClearAll = () => {
    if (confirm("Clear all localStorage data and reload?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showOptions && (
        <div className="mb-2 bg-white border border-border rounded-xl shadow-lg p-4 space-y-2 min-w-[200px]">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Dev Tools</p>
          <button
            onClick={handleResetOnboarding}
            className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
          >
            Reset Onboarding
          </button>
          <button
            onClick={handleClearAll}
            className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors text-destructive"
          >
            Clear All Data
          </button>
          <button
            onClick={() => setShowOptions(false)}
            className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
          >
            Close
          </button>
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:opacity-90 transition-all flex items-center justify-center"
          title="Dev Tools"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="w-12 h-12 bg-muted text-muted-foreground rounded-full shadow-lg hover:bg-border transition-all flex items-center justify-center"
          title="Hide Dev Tools"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
