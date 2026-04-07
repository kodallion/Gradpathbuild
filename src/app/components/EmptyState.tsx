import { LucideIcon } from "lucide-react";
import { Link } from "react-router";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 md:mb-6">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md">
        {description}
      </p>
      {actionLabel && (actionTo || onAction) && (
        actionTo ? (
          <Link
            to={actionTo}
            className="px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
