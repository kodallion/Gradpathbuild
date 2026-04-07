import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try Again",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4 md:mb-6">
        <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-destructive" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-4 h-4" />
          {retryLabel}
        </button>
      )}
    </div>
  );
}
