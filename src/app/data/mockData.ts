export type ApplicationStatus = 
  | "Planning" 
  | "In Progress" 
  | "Submitted" 
  | "Interview" 
  | "Offer Received" 
  | "Rejected";

export interface Application {
  id: string;
  university: string;
  program: string;
  country: string;
  deadline: string;
  status: ApplicationStatus;
  portalLink: string;
  notes: string;
  tasks: Task[];
  documents: string[];
}

export interface Task {
  id: string;
  applicationId: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export const mockApplications: Application[] = [
  {
    id: "1",
    university: "Stanford University",
    program: "MS in Computer Science",
    country: "United States",
    deadline: "2026-12-15",
    status: "In Progress",
    portalLink: "https://apply.stanford.edu",
    notes: "Focus on AI/ML research experience in personal statement",
    tasks: [
      { id: "t1", applicationId: "1", title: "Write personal statement", completed: true },
      { id: "t2", applicationId: "1", title: "Request recommendation letters", completed: true },
      { id: "t3", applicationId: "1", title: "Upload transcripts", completed: false, dueDate: "2026-12-01" },
      { id: "t4", applicationId: "1", title: "Complete online application", completed: false, dueDate: "2026-12-10" },
    ],
    documents: ["CV", "Personal Statement", "Transcripts"],
  },
  {
    id: "2",
    university: "University of Cambridge",
    program: "MPhil in Machine Learning",
    country: "United Kingdom",
    deadline: "2026-12-01",
    status: "Planning",
    portalLink: "https://apply.cam.ac.uk",
    notes: "Research Prof. Sarah Chen's work on neural networks",
    tasks: [
      { id: "t5", applicationId: "2", title: "Research faculty", completed: true },
      { id: "t6", applicationId: "2", title: "Draft research proposal", completed: false, dueDate: "2026-11-15" },
      { id: "t7", applicationId: "2", title: "Prepare writing sample", completed: false },
    ],
    documents: ["CV"],
  },
  {
    id: "3",
    university: "ETH Zurich",
    program: "MSc in Data Science",
    country: "Switzerland",
    deadline: "2026-12-15",
    status: "Submitted",
    portalLink: "https://apply.ethz.ch",
    notes: "Application submitted on November 28th",
    tasks: [
      { id: "t8", applicationId: "3", title: "Write personal statement", completed: true },
      { id: "t9", applicationId: "3", title: "Upload all documents", completed: true },
      { id: "t10", applicationId: "3", title: "Submit application", completed: true },
      { id: "t11", applicationId: "3", title: "Track application status", completed: false },
    ],
    documents: ["CV", "Personal Statement", "Transcripts", "English Test Results"],
  },
  {
    id: "4",
    university: "MIT",
    program: "MEng in Electrical Engineering",
    country: "United States",
    deadline: "2026-12-20",
    status: "In Progress",
    portalLink: "https://apply.mit.edu",
    notes: "Highlight undergraduate research project",
    tasks: [
      { id: "t12", applicationId: "4", title: "Complete application form", completed: false, dueDate: "2026-12-15" },
      { id: "t13", applicationId: "4", title: "Upload recommendation letters", completed: false },
    ],
    documents: [],
  },
  {
    id: "5",
    university: "National University of Singapore",
    program: "MSc in Computing",
    country: "Singapore",
    deadline: "2027-01-15",
    status: "Offer Received",
    portalLink: "https://apply.nus.edu.sg",
    notes: "Received conditional offer! Need to meet English requirements",
    tasks: [
      { id: "t14", applicationId: "5", title: "Review offer letter", completed: true },
      { id: "t15", applicationId: "5", title: "Accept offer", completed: false, dueDate: "2027-02-01" },
    ],
    documents: ["CV", "Personal Statement", "Transcripts", "Offer Letter"],
  },
];

export const mockDocuments: Document[] = [
  {
    id: "d1",
    name: "Resume_2026.pdf",
    type: "CV",
    uploadDate: "2026-10-15",
    size: "245 KB",
  },
  {
    id: "d2",
    name: "Personal_Statement_Draft.pdf",
    type: "Personal Statement",
    uploadDate: "2026-11-02",
    size: "180 KB",
  },
  {
    id: "d3",
    name: "Academic_Transcript.pdf",
    type: "Transcripts",
    uploadDate: "2026-10-20",
    size: "890 KB",
  },
  {
    id: "d4",
    name: "IELTS_Results.pdf",
    type: "English Test Results",
    uploadDate: "2026-09-10",
    size: "125 KB",
  },
  {
    id: "d5",
    name: "Passport_Copy.pdf",
    type: "Passport Copy",
    uploadDate: "2026-10-05",
    size: "350 KB",
  },
  {
    id: "d6",
    name: "Recommendation_Letter_Prof_Smith.pdf",
    type: "Recommendation Letters",
    uploadDate: "2026-11-10",
    size: "95 KB",
  },
];
