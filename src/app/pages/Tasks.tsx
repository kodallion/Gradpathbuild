import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, Circle, Calendar, GraduationCap } from "lucide-react";
import { mockApplications } from "../data/mockData";

export function Tasks() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const allTasks = mockApplications.flatMap(app => 
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

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl mb-2">Tasks</h1>
          <p className="text-muted-foreground">Manage all your application tasks in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold mb-1">{allTasks.length}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold mb-1 text-orange-600">{pendingCount}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold mb-1 text-green-600">{completedCount}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                filter === "pending"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-6 py-2 rounded-xl font-medium transition-colors ${
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
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tasks found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                    task.completed
                      ? "bg-muted/30"
                      : "bg-accent/20 hover:bg-accent/30"
                  }`}
                >
                  <button className="mt-0.5">
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div
                      className={`text-base font-medium mb-2 ${
                        task.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{task.university}</span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
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
                    className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
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
