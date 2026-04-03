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
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl mb-2">Document Vault</h1>
            <p className="text-muted-foreground">Centralized storage for all your application documents</p>
          </div>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold mb-1">{mockDocuments.length}</div>
            <div className="text-sm text-muted-foreground">Total Documents</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold mb-1">
              {mockDocuments.filter(d => d.type === "CV").length}
            </div>
            <div className="text-sm text-muted-foreground">CVs</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold mb-1">
              {mockDocuments.filter(d => d.type === "Personal Statement").length}
            </div>
            <div className="text-sm text-muted-foreground">Personal Statements</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="text-3xl font-bold mb-1">
              {mockDocuments.filter(d => d.type === "Recommendation Letters").length}
            </div>
            <div className="text-sm text-muted-foreground">Recommendation Letters</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
            >
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No documents found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium mb-1 truncate">{doc.name}</div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="px-2 py-0.5 bg-secondary rounded text-xs font-medium">
                        {doc.type}
                      </span>
                      <span>{doc.size}</span>
                      <span>
                        Uploaded {new Date(doc.uploadDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-background rounded-lg transition-colors">
                      <Download className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-background rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-accent/30 rounded-2xl p-6 border border-accent">
          <h3 className="font-semibold mb-2">💡 Document Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
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
