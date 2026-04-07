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
  const [application, setApplication] = useState(() => mockApplications.find(app => app.id === id));
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "tasks" | "notes">("overview");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleTaskToggle = (taskId: string) => {
    if (!application) return;
    setApplication({
      ...application,
      tasks: application.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    });
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

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
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Back Button */}
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>

        {/* Header Card */}
        <div className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 border border-border shadow-sm">
          <div className="flex flex-col md:flex-row items-start justify-between mb-4 md:mb-6 gap-3">
            <div className="flex-1 min-w-0 w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl mb-2 md:mb-3 truncate">{application.university}</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-3 md:mb-4">{application.program}</p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs md:text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{application.country}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
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

            <div className="flex items-center gap-3 w-full md:w-auto">
              <StatusBadge status={application.status} />
              <button
                onClick={handleEditClick}
                className="p-2 hover:bg-muted rounded-lg transition-colors ml-auto md:ml-0"
                aria-label="Edit application"
              >
                <Edit className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-muted/50 rounded-lg md:rounded-xl p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm font-medium">Overall Progress</span>
              <span className="text-xs md:text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 md:h-3 bg-muted rounded-full overflow-hidden">
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
              className="inline-flex items-center gap-2 mt-3 md:mt-4 px-3 md:px-4 py-2 text-sm md:text-base bg-secondary text-secondary-foreground rounded-lg md:rounded-xl hover:bg-secondary/80 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Open Application Portal
            </a>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="border-b border-border overflow-x-auto">
            <div className="flex min-w-max">
              {(["overview", "documents", "tasks", "notes"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-medium capitalize transition-colors whitespace-nowrap ${
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

          <div className="p-4 md:p-8">
            {activeTab === "overview" && <OverviewTab application={application} />}
            {activeTab === "documents" && <DocumentsTab application={application} onDocumentsChange={(docs) => setApplication({ ...application, documents: docs })} />}
            {activeTab === "tasks" && <TasksTab application={application} onTaskToggle={handleTaskToggle} onTasksChange={(tasks) => setApplication({ ...application, tasks })} />}
            {activeTab === "notes" && <NotesTab application={application} onNotesChange={(notes) => setApplication({ ...application, notes })} />}
          </div>
        </div>

        {showEditModal && (
          <EditModal application={application} onClose={() => setShowEditModal(false)} />
        )}
      </div>
    </div>
  );
}

function OverviewTab({ application }: { application: typeof mockApplications[0] }) {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h3 className="text-base md:text-lg mb-3 md:mb-4">Application Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div>
            <div className="text-xs md:text-sm text-muted-foreground mb-1">University</div>
            <div className="font-medium text-sm md:text-base">{application.university}</div>
          </div>
          <div>
            <div className="text-xs md:text-sm text-muted-foreground mb-1">Program</div>
            <div className="font-medium text-sm md:text-base">{application.program}</div>
          </div>
          <div>
            <div className="text-xs md:text-sm text-muted-foreground mb-1">Country</div>
            <div className="font-medium text-sm md:text-base">{application.country}</div>
          </div>
          <div>
            <div className="text-xs md:text-sm text-muted-foreground mb-1">Deadline</div>
            <div className="font-medium text-sm md:text-base">
              {new Date(application.deadline).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
          <div>
            <div className="text-xs md:text-sm text-muted-foreground mb-1">Status</div>
            <StatusBadge status={application.status} />
          </div>
        </div>
      </div>

      {application.notes && (
        <div>
          <h3 className="text-base md:text-lg mb-3 md:mb-4">Quick Notes</h3>
          <div className="p-3 md:p-4 bg-accent/30 rounded-lg md:rounded-xl">
            <p className="text-xs md:text-sm">{application.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DocumentsTab({ application, onDocumentsChange }: { application: typeof mockApplications[0], onDocumentsChange: (docs: string[]) => void }) {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleDelete = (docIndex: number) => {
    if (confirm('Are you sure you want to remove this document from this application?')) {
      const newDocs = application.documents.filter((_, index) => index !== docIndex);
      onDocumentsChange(newDocs);
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-3">
        <h3 className="text-base md:text-lg">Required Documents</h3>
        <button
          onClick={() => setShowUploadModal(true)}
          className="w-full sm:w-auto px-3 md:px-4 py-2 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl hover:opacity-90 transition-opacity"
        >
          Upload Document
        </button>
      </div>

      {application.documents.length === 0 ? (
        <p className="text-muted-foreground text-xs md:text-sm">No documents uploaded yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {application.documents.map((doc, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-muted/50 rounded-lg md:rounded-xl">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs md:text-sm truncate">{doc}</div>
                <div className="text-xs text-muted-foreground">Uploaded from vault</div>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="p-1.5 md:p-2 hover:bg-background rounded-lg transition-colors flex-shrink-0"
                aria-label="Remove document"
              >
                <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <UploadDocModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}

function TasksTab({ application, onTaskToggle, onTasksChange }: { application: typeof mockApplications[0], onTaskToggle: (taskId: string) => void, onTasksChange: (tasks: typeof application.tasks) => void }) {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const newTasks = application.tasks.filter(t => t.id !== taskId);
      onTasksChange(newTasks);
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-3">
        <h3 className="text-base md:text-lg">Task Checklist</h3>
        <button
          onClick={() => setShowAddTaskModal(true)}
          className="w-full sm:w-auto px-3 md:px-4 py-2 text-sm md:text-base border border-border rounded-lg md:rounded-xl hover:bg-muted transition-colors"
        >
          Add Task
        </button>
      </div>

      {application.tasks.length === 0 ? (
        <p className="text-muted-foreground text-xs md:text-sm">No tasks added yet</p>
      ) : (
        <div className="space-y-2 md:space-y-3">
          {application.tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg md:rounded-xl transition-colors ${
                task.completed ? "bg-muted/30" : "bg-accent/20"
              }`}
            >
              <button
                onClick={() => onTaskToggle(task.id)}
                className="mt-0.5 flex-shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
                aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                ) : (
                  <Circle className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm md:text-base ${task.completed ? "line-through text-muted-foreground" : ""}`}>
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
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-1.5 md:p-2 hover:bg-background rounded-lg transition-colors flex-shrink-0"
                aria-label="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddTaskModal && (
        <AddTaskModal onClose={() => setShowAddTaskModal(false)} />
      )}
    </div>
  );
}

function NotesTab({ application, onNotesChange }: { application: typeof mockApplications[0], onNotesChange: (notes: string) => void }) {
  const [notes, setNotes] = useState(application.notes || "");

  const handleSave = () => {
    onNotesChange(notes);
    alert("Notes saved successfully!");
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="text-base md:text-lg mb-3 md:mb-4">Application Notes</h3>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Add notes about this application..."
        className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />

      <button
        onClick={handleSave}
        className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl hover:opacity-90 transition-opacity"
      >
        Save Notes
      </button>
    </div>
  );
}

function UploadDocModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-card rounded-xl p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">Select Document from Vault</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose a document from your Document Vault to attach to this application.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              alert('Document selection from vault would be implemented here');
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            Choose from Vault
          </button>
          <button onClick={onClose} className="px-4 py-2 border border-border rounded-lg hover:bg-muted">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function AddTaskModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-card rounded-xl p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">Add Task</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-2">Task Title</label>
            <input
              type="text"
              placeholder="e.g., Submit recommendation letter request"
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Due Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                alert('Task creation would be implemented here');
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
            >
              Add Task
            </button>
            <button onClick={onClose} className="px-4 py-2 border border-border rounded-lg hover:bg-muted">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditModal({ application, onClose }: { application: typeof mockApplications[0], onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl md:text-2xl mb-6">Edit Application</h2>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Application updates would be saved here'); onClose(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">University Name</label>
              <input
                type="text"
                defaultValue={application.university}
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Program</label>
              <input
                type="text"
                defaultValue={application.program}
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Country</label>
              <input
                type="text"
                defaultValue={application.country}
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Application Deadline</label>
              <input
                type="date"
                defaultValue={application.deadline.split('T')[0]}
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Status</label>
              <select
                defaultValue={application.status}
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>Submitted</option>
                <option>Interview</option>
                <option>Offer Received</option>
                <option>Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Application Portal Link</label>
              <input
                type="url"
                defaultValue={application.portalLink}
                className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-border rounded-xl font-medium hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </form>
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
    <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${colorMap[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
