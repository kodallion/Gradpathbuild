import { useState, useEffect } from "react";
import { Upload, FileText, Download, Trash2, Search } from "lucide-react";
import { mockDocuments } from "../data/mockData";
import { EmptyState } from "../components/EmptyState";

export function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState(mockDocuments);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleDownload = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      alert(`Downloading: ${doc.name}`);
    }
  };

  const handleDelete = (docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(prevDocs => prevDocs.filter(d => d.id !== docId));
    }
  };

  const documentTypes = [
    "All",
    "CV",
    "Personal Statement",
    "Transcripts",
    "Recommendation Letters",
    "English Test Results",
    "Passport Copy",
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Empty state when no documents
  if (documents.length === 0 && !isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl md:text-4xl mb-2">Document Vault</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Centralized storage for all your application documents
              </p>
            </div>
            <button className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2" onClick={handleUpload}>
              <Upload className="w-4 h-4 md:w-5 md:h-5" />
              Upload Document
            </button>
          </div>

          <div className="bg-card rounded-xl md:rounded-2xl border border-border shadow-sm">
            <EmptyState
              icon={FileText}
              title="No documents uploaded"
              description="Upload your application documents to your vault. Store CVs, transcripts, recommendation letters, and more in one secure place to easily attach them to applications."
              actionLabel="Upload Your First Document"
              onAction={handleUpload}
            />
          </div>

          {/* Info Banner - Always show */}
          <div className="mt-6 bg-accent/30 rounded-xl md:rounded-2xl p-4 md:p-6 border border-accent">
            <h3 className="font-semibold text-sm md:text-base mb-2">💡 Document Tips</h3>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
              <li>• Upload documents once and reuse them across multiple applications</li>
              <li>• Supported formats: PDF, DOC, DOCX (max 10MB per file)</li>
              <li>• Keep your documents organized by type for easy access</li>
              <li>• Update documents as needed - changes will reflect in all applications</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-0">
          <div>
            <h1 className="text-2xl md:text-4xl mb-2">Document Vault</h1>
            <p className="text-sm md:text-base text-muted-foreground">Centralized storage for all your application documents</p>
          </div>
          <button className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2" onClick={handleUpload}>
            <Upload className="w-4 h-4 md:w-5 md:h-5" />
            Upload Document
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold mb-1">{mockDocuments.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Documents</div>
          </div>
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold mb-1">
              {mockDocuments.filter(d => d.type === "CV").length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">CVs</div>
          </div>
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold mb-1">
              {mockDocuments.filter(d => d.type === "Personal Statement").length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground leading-tight">Personal Statements</div>
          </div>
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold mb-1">
              {mockDocuments.filter(d => d.type === "Recommendation Letters").length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground leading-tight">Recommendation Letters</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
            >
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 border border-border shadow-sm">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
              <p className="text-muted-foreground text-sm md:text-base">No documents found</p>
            </div>
          ) : (
            <div className="space-y-2 md:space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-lg md:rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm md:text-base mb-1 truncate">{doc.name}</div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                      <span className="px-2 py-0.5 bg-secondary rounded text-xs font-medium">
                        {doc.type}
                      </span>
                      <span className="hidden sm:inline">{doc.size}</span>
                      <span>
                        {new Date(doc.uploadDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleDownload(doc.id)}
                      className="p-1.5 md:p-2 hover:bg-background rounded-lg transition-colors"
                      aria-label="Download document"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 md:p-2 hover:bg-background rounded-lg transition-colors"
                      aria-label="Delete document"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-accent/30 rounded-xl md:rounded-2xl p-4 md:p-6 border border-accent">
          <h3 className="font-semibold text-sm md:text-base mb-2">💡 Document Tips</h3>
          <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
            <li>• Upload documents once and reuse them across multiple applications</li>
            <li>• Supported formats: PDF, DOC, DOCX (max 10MB per file)</li>
            <li>• Keep your documents organized by type for easy access</li>
            <li>• Update documents as needed - changes will reflect in all applications</li>
          </ul>
        </div>
      </div>

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-card rounded-xl md:rounded-2xl p-5 md:p-8 max-w-lg w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Upload Document</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs md:text-sm mb-2">Document Type</label>
            <select className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring">
              <option>CV</option>
              <option>Personal Statement</option>
              <option>Transcripts</option>
              <option>Recommendation Letters</option>
              <option>English Test Results</option>
              <option>Passport Copy</option>
            </select>
          </div>

          <div>
            <label className="block text-xs md:text-sm mb-2">Choose File</label>
            <input
              type="file"
              className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-4">
            <button
              onClick={() => {
                alert('Document upload would be implemented here');
                onClose();
              }}
              className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Upload
            </button>
            <button
              onClick={onClose}
              className="px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border border-border rounded-lg md:rounded-xl font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
