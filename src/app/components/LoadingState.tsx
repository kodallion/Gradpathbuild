export function LoadingState({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-muted rounded-lg h-full w-full" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div>
          <div className="h-8 md:h-10 bg-muted rounded-lg w-48 mb-2" />
          <div className="h-4 md:h-5 bg-muted rounded-lg w-96 max-w-full" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
              <div className="h-10 md:h-12 w-10 md:w-12 bg-muted rounded-lg md:rounded-xl mb-3 md:mb-4" />
              <div className="h-7 md:h-8 bg-muted rounded-lg w-16 mb-2" />
              <div className="h-4 bg-muted rounded-lg w-24" />
            </div>
          ))}
        </div>

        {/* Application Progress Skeleton */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-7 md:h-8 bg-muted rounded-lg w-48 mb-2" />
              <div className="h-4 bg-muted rounded-lg w-64" />
            </div>
            <div className="h-10 bg-muted rounded-lg w-24" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-muted rounded-xl" />
            ))}
          </div>
        </div>

        {/* Two Column Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
              <div className="h-6 bg-muted rounded-lg w-40 mb-6" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-16 bg-muted rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ApplicationListSkeleton() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-9 bg-muted rounded-lg w-40 mb-2" />
            <div className="h-4 bg-muted rounded-lg w-64" />
          </div>
          <div className="h-11 bg-muted rounded-xl w-40" />
        </div>

        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="h-12 bg-muted rounded-xl" />
            <div className="h-12 bg-muted rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
              <div className="h-24 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TaskListSkeleton() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 animate-pulse">
        <div>
          <div className="h-9 bg-muted rounded-lg w-32 mb-2" />
          <div className="h-4 bg-muted rounded-lg w-80 max-w-full" />
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
              <div className="h-8 bg-muted rounded-lg w-12 mb-2" />
              <div className="h-4 bg-muted rounded-lg w-20" />
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
