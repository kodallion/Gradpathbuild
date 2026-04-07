import { useState, useEffect } from "react";
import { Link } from "react-router";
import { CheckCircle2, Circle, Calendar, GraduationCap, CheckSquare } from "lucide-react";
import { mockApplications } from "../data/mockData";
import { EmptyState } from "../components/EmptyState";
import { TaskListSkeleton } from "../components/LoadingState";

export function Tasks() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState(mockApplications);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleTaskToggle = (taskId: string) => {
    setApplications(prevApps =>
      prevApps.map(app => ({
        ...app,
        tasks: app.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }))
    );
  };

  if (isLoading) {
    return <TaskListSkeleton />;
  }

  const allTasks = applications.flatMap(app =>
    app.tasks.map(task => ({
      ...task,
      university: app.university,
      program: app.program,
    }))
  );

  const filteredTasks = allTasks.filter(task => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const pendingCount = allTasks.filter(t => !t.completed).length;
  const completedCount = allTasks.filter(t => t.completed).length;

  // Empty state when no tasks
  if (allTasks.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-4xl mb-2">Tasks</h1>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Manage all your application tasks in one place
            </p>
          </div>

          <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-sm">
            <EmptyState
              icon={CheckSquare}
              title="No tasks yet"
              description="Tasks will appear here once you add applications. Each application can have multiple tasks to help you stay organized."
              actionLabel="Go to Applications"
              actionTo="/applications"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-4xl mb-2">Tasks</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage all your application tasks in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold mb-1">{allTasks.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold mb-1 text-orange-600">{pendingCount}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold mb-1 text-green-600">{completedCount}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl md:rounded-2xl p-3 md:p-4 border border-border shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-lg md:rounded-xl font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-lg md:rounded-xl font-medium transition-colors ${
                filter === "pending"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base rounded-lg md:rounded-xl font-medium transition-colors ${
                filter === "completed"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <p className="text-muted-foreground text-sm md:text-base">No tasks found</p>
            </div>
          ) : (
            <div className="space-y-2 md:space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex flex-col sm:flex-row items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-all ${
                    task.completed
                      ? "bg-muted/30"
                      : "bg-accent/20 hover:bg-accent/30"
                  }`}
                >
                  <button
                    onClick={() => handleTaskToggle(task.id)}
                    className="mt-0.5 flex-shrink-0 cursor-pointer"
                    aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    ) : (
                      <Circle className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm md:text-base font-medium mb-1.5 md:mb-2 ${
                        task.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span className="truncate max-w-[200px]">{task.university}</span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          <span>
                            Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/applications/${task.applicationId}`}
                    className="w-full sm:w-auto px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-center border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    View Application
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
