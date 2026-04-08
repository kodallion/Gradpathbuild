import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Plus, Search, Filter, ExternalLink, Calendar, MapPin, GraduationCap } from "lucide-react";
import { mockApplications, type ApplicationStatus } from "../data/mockData";
import { EmptyState } from "../components/EmptyState";
import { ApplicationListSkeleton } from "../components/LoadingState";

export function Applications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "All">("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setApplications(data);
    }

    setIsLoading(false);
  };

  fetchApplications();
}, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusOptions: (ApplicationStatus | "All")[] = [
    "All",
    "Planning",
    "In Progress",
    "Submitted",
    "Interview",
    "Offer Received",
    "Rejected",
  ];

  // Empty state when no applications exist
  if (applications.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl md:text-4xl mb-2">Applications</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Manage all your graduate school applications
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              Add Application
            </button>
          </div>

          <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-sm">
            <EmptyState
              icon={GraduationCap}
              title="No applications yet"
              description="Start tracking your graduate school applications. Add your first application to manage deadlines, tasks, and documents all in one place."
              actionLabel="Add Your First Application"
              onAction={() => setShowAddModal(true)}
            />
          </div>

          {showAddModal && <AddApplicationModal onClose={() => setShowAddModal(false)} />}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-0">
          <div>
            <h1 className="text-2xl md:text-4xl mb-2">Applications</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage all your graduate school applications</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            Add Application
          </button>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search universities, programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "All")}
                className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {filteredApplications.map((app) => {
            const completedTasks = app.tasks.filter(t => t.completed).length;
            const totalTasks = app.tasks.length;
            const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

            return (
              <div
                key={app.id}
                className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex-1 min-w-0 pr-3">
                    <Link to={`/applications/${app.id}`}>
                      <h3 className="text-lg md:text-xl font-semibold mb-1.5 md:mb-2 hover:text-primary transition-colors truncate">{app.university}</h3>
                    </Link>
                    <p className="text-sm md:text-base text-muted-foreground truncate">{app.program}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>{app.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>
                      {new Date(app.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3 md:mb-4">
                  <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{completedTasks}/{totalTasks} tasks</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <Link
                    to={`/applications/${app.id}`}
                    className="inline-flex items-center gap-1 text-xs md:text-sm text-primary hover:underline"
                  >
                    View Details
                  </Link>
                  {app.portalLink && (
                    <a
                      href={app.portalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs md:text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Application Portal
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No applications found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <AddApplicationModal onClose={() => setShowAddModal(false)} />
      )}
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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log("🚀 SUBMIT CLICKED");

  if (!university || !program || !country || !deadline) {
    alert("Please fill in all required fields");
    return;
  }

  console.log("📦 Sending data:", {
    university,
    program,
    country,
    deadline,
    status,
    portalLink,
    notes,
  });

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        university,
        program,
        country,
        deadline,
        status,
        portalLink,
        notes,
      },
    ])
    .select();

  console.log("✅ RESPONSE DATA:", data);
  console.log("❌ ERROR:", error);

  if (error) {
    alert("Error saving application");
  } else {
    alert("Application saved!");
    window.location.reload();
  }

  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Add New Application</h2>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs md:text-sm mb-2">University Name *</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="e.g., Stanford University"
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-2">Program *</label>
              <input
                type="text"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                placeholder="e.g., MS in Computer Science"
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-2">Country *</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g., United States"
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-2">Application Deadline *</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
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
              <label className="block text-xs md:text-sm mb-2">Application Portal Link</label>
              <input
                type="url"
                value={portalLink}
                onChange={(e) => setPortalLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs md:text-sm mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add any notes about this application..."
              className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <button
              type="submit"
              className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Add Application
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border border-border rounded-lg md:rounded-xl font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
