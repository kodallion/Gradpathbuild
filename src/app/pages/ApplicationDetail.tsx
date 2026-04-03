import { useState } from "react";
import { useParams, Link } from "react-router";
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  Circle,
  FileText,
  Edit,
  Trash2
} from "lucide-react";
import { mockApplications } from "../data/mockData";

export function ApplicationDetail() {
  const { id } = useParams();
  const application = mockApplications.find(app => app.id === id);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "tasks" | "notes">("overview");

  if (!application) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-muted-foreground">Application not found</p>
          <Link to="/applications" className="text-primary hover:underline">
            ← Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  const completedTasks = application.tasks.filter(t => t.completed).length;
  const totalTasks = application.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Link 
          to="/applications" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>

        {/* Header Card */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl mb-3">{application.university}</h1>
              <p className="text-xl text-muted-foreground mb-4">{application.program}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{application.country}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Deadline: {new Date(application.deadline).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <StatusBadge status={application.status} />
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </div>
          </div>

          {/* Portal Link */}
          {application.portalLink && (
            <a
              href={application.portalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Application Portal
            </a>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="border-b border-border">
            <div className="flex">
              {(["overview", "documents", "tasks", "notes"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary bg-secondary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === "overview" && <OverviewTab application={application} />}
            {activeTab === "documents" && <DocumentsTab application={application} />}
            {activeTab === "tasks" && <TasksTab application={application} />}
            {activeTab === "notes" && <NotesTab application={application} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ application }: { application: typeof mockApplications[0] }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg mb-4">Application Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">University</div>
            <div className="font-medium">{application.university}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Program</div>
            <div className="font-medium">{application.program}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Country</div>
            <div className="font-medium">{application.country}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Deadline</div>
            <div className="font-medium">
              {new Date(application.deadline).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Status</div>
            <StatusBadge status={application.status} />
          </div>
        </div>
      </div>

      {application.notes && (
        <div>
          <h3 className="text-lg mb-4">Quick Notes</h3>
          <div className="p-4 bg-accent/30 rounded-xl">
            <p className="text-sm">{application.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DocumentsTab({ application }: { application: typeof mockApplications[0] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg">Required Documents</h3>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
          Upload Document
        </button>
      </div>

      {application.documents.length === 0 ? (
        <p className="text-muted-foreground text-sm">No documents uploaded yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {application.documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{doc}</div>
                <div className="text-xs text-muted-foreground">Uploaded from vault</div>
              </div>
              <button className="p-2 hover:bg-background rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TasksTab({ application }: { application: typeof mockApplications[0] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg">Task Checklist</h3>
        <button className="px-4 py-2 border border-border rounded-xl hover:bg-muted transition-colors">
          Add Task
        </button>
      </div>

      {application.tasks.length === 0 ? (
        <p className="text-muted-foreground text-sm">No tasks added yet</p>
      ) : (
        <div className="space-y-3">
          {application.tasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                task.completed ? "bg-muted/30" : "bg-accent/20"
              }`}
            >
              <button className="mt-0.5">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              <div className="flex-1">
                <div className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </div>
                {task.dueDate && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                )}
              </div>
              <button className="p-2 hover:bg-background rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NotesTab({ application }: { application: typeof mockApplications[0] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg mb-4">Application Notes</h3>
      
      <textarea
        defaultValue={application.notes}
        rows={10}
        placeholder="Add notes about this application..."
        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
      
      <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
        Save Notes
      </button>
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
    <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${colorMap[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
