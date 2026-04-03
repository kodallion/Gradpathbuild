import { Link } from "react-router";
import { 
  GraduationCap, 
  Send, 
  Award, 
  Calendar, 
  TrendingUp,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { mockApplications } from "../data/mockData";

export function Dashboard() {
  const totalApplications = mockApplications.length;
  const submitted = mockApplications.filter(app => app.status === "Submitted").length;
  const offers = mockApplications.filter(app => app.status === "Offer Received").length;
  
  // Get upcoming deadlines (next 30 days)
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const upcomingDeadlines = mockApplications
    .filter(app => {
      const deadline = new Date(app.deadline);
      return deadline >= today && deadline <= thirtyDaysFromNow;
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  // Get pending tasks
  const allTasks = mockApplications.flatMap(app => 
    app.tasks.map(task => ({ ...task, university: app.university }))
  );
  const pendingTasks = allTasks.filter(task => !task.completed).slice(0, 5);
  
  // Calculate completion rate
  const completionRate = allTasks.length > 0 
    ? Math.round((allTasks.filter(t => t.completed).length / allTasks.length) * 100)
    : 0;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: GraduationCap,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Submitted",
      value: submitted,
      icon: Send,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Offers Received",
      value: offers,
      icon: Award,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Deadlines This Month",
      value: upcomingDeadlines.length,
      icon: Calendar,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-4xl mb-2">Welcome back!</h1>
          <p className="text-sm md:text-base text-muted-foreground">Here's an overview of your graduate application journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground leading-tight">{stat.title}</div>
              </div>
            );
          })}
        </div>

        {/* Application Progress */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
          <div className="flex items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
            <div>
              <h2 className="text-xl md:text-2xl mb-1">Application Progress</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Track your applications by status</p>
            </div>
            <Link
              to="/applications"
              className="px-3 md:px-4 py-2 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl hover:opacity-90 transition-opacity flex-shrink-0"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3 md:space-y-4">
            {mockApplications.slice(0, 4).map((app) => (
              <Link
                key={app.id}
                to={`/applications/${app.id}`}
                className="flex flex-col md:flex-row md:items-center justify-between p-3 md:p-4 bg-secondary/30 rounded-lg md:rounded-xl hover:bg-secondary/50 transition-colors gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm md:text-base mb-1 truncate">{app.university}</div>
                  <div className="text-xs md:text-sm text-muted-foreground truncate">{app.program}</div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4">
                  <div className="text-left md:text-right">
                    <div className="text-xs text-muted-foreground mb-1">Deadline</div>
                    <div className="text-xs md:text-sm font-medium">
                      {new Date(app.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Upcoming Deadlines */}
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
              <h2 className="text-lg md:text-xl">Upcoming Deadlines</h2>
            </div>

            {upcomingDeadlines.length === 0 ? (
              <p className="text-muted-foreground text-xs md:text-sm">No upcoming deadlines in the next 30 days</p>
            ) : (
              <div className="space-y-2 md:space-y-3">
                {upcomingDeadlines.map((app) => {
                  const daysUntil = Math.ceil(
                    (new Date(app.deadline).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="font-medium text-xs md:text-sm truncate">{app.university}</div>
                        <div className="text-xs text-muted-foreground truncate">{app.program}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-medium text-orange-600">{daysUntil} days</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(app.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pending Tasks */}
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <h2 className="text-lg md:text-xl">Pending Tasks</h2>
            </div>

            {pendingTasks.length === 0 ? (
              <p className="text-muted-foreground text-xs md:text-sm">No pending tasks. Great job!</p>
            ) : (
              <div className="space-y-2 md:space-y-3">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-2 md:gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded border-2 border-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs md:text-sm">{task.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{task.university}</div>
                    </div>
                    {task.dueDate && (
                      <div className="text-xs text-muted-foreground flex-shrink-0">
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Link
              to="/tasks"
              className="block mt-3 md:mt-4 text-xs md:text-sm text-primary hover:underline"
            >
              View all tasks →
            </Link>
          </div>
        </div>

        {/* AI Assistant Banner */}
        <div className="bg-gradient-to-r from-[#162660] to-[#2563eb] rounded-xl md:rounded-2xl p-5 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl mb-2">Need help with your applications?</h2>
              <p className="text-white/90 text-sm md:text-base mb-4">
                Get AI-powered feedback on your personal statement or ask questions about the application process.
              </p>
              <Link
                to="/ai-assistant"
                className="inline-block px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-white text-[#162660] rounded-lg md:rounded-xl font-medium hover:bg-white/90 transition-colors"
              >
                Try AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    "Planning": "bg-gray-100 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Submitted": "bg-green-100 text-green-700",
    "Interview": "bg-purple-100 text-purple-700",
    "Offer Received": "bg-emerald-100 text-emerald-700",
    "Rejected": "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${colorMap[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}