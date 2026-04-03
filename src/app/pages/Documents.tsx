import { useState } from "react";
import { Upload, FileText, Download, Trash2, Search } from "lucide-react";
import { mockDocuments } from "../data/mockData";

export function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const documentTypes = [
    "All",
    "CV",
    "Personal Statement",
    "Transcripts",
    "Recommendation Letters",
    "English Test Results",
    "Passport Copy",
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-0">
          <div>
            <h1 className="text-2xl md:text-4xl mb-2">Document Vault</h1>
            <p className="text-sm md:text-base text-muted-foreground">Centralized storage for all your application documents</p>
          </div>
          <button className="w-full md:w-auto px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-primary text-primary-foreground rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
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
                    <button className="p-1.5 md:p-2 hover:bg-background rounded-lg transition-colors">
                      <Download className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 md:p-2 hover:bg-background rounded-lg transition-colors">
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
    </div>
  );
}
