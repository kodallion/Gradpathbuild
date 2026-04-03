import { useState } from "react";
import { Sparkles, Send, FileText, MessageSquare, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";

export function AIAssistant() {
  const [activeMode, setActiveMode] = useState<"statement" | "chat">("statement");

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl mb-2">AI Assistant</h1>
          <p className="text-muted-foreground">Get AI-powered help with your graduate applications</p>
        </div>

        {/* Mode Selector */}
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveMode("statement")}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
                activeMode === "statement"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <FileText className="w-5 h-5" />
              Personal Statement Analyzer
            </button>
            <button
              onClick={() => setActiveMode("chat")}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
                activeMode === "chat"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Application Guidance
            </button>
          </div>
        </div>

        {/* Content */}
        {activeMode === "statement" ? <StatementAnalyzer /> : <GuidanceChat />}
      </div>
    </div>
  );
}

function StatementAnalyzer() {
  const [statement, setStatement] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!statement.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        strengths: [
          "Clear articulation of research interests in machine learning and data science",
          "Strong connection between undergraduate experience and graduate goals",
          "Specific mention of faculty members and their research areas",
          "Well-structured narrative with logical flow"
        ],
        improvements: [
          "Consider adding more specific examples of technical projects and outcomes",
          "Expand on how your background uniquely positions you for this program",
          "Include more details about long-term career aspirations",
          "Strengthen the conclusion with a clearer vision statement"
        ],
        clarity: [
          "Some sentences in the second paragraph are overly complex - consider breaking them up",
          "The transition between paragraphs 3 and 4 could be smoother",
          "Define technical jargon or acronyms on first use"
        ],
        overallScore: 82,
        wordCount: statement.split(/\s+/).length
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-accent/30 rounded-2xl p-6 border border-accent">
        <div className="flex gap-3">
          <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">How it works</h3>
            <p className="text-sm text-muted-foreground">
              Paste your personal statement below and our AI will analyze it for grammar, clarity, tone, 
              structure, and alignment with graduate application standards. You'll receive actionable 
              feedback to improve your statement.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <label className="block text-lg font-semibold mb-4">Your Personal Statement</label>
        <textarea
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="Paste your personal statement here..."
          rows={12}
          className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            {statement.split(/\s+/).filter(w => w.length > 0).length} words
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!statement.trim() || isAnalyzing}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="text-2xl">Analysis Results</h2>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
              <div className="text-3xl font-bold text-primary">{analysis.overallScore}/100</div>
            </div>
          </div>

          {/* Strengths */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-semibold">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {analysis.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Improvements */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-xl font-semibold">Suggested Improvements</h3>
            </div>
            <ul className="space-y-2">
              {analysis.improvements.map((improvement: string, index: number) => (
                <li key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clarity Enhancements */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold">Clarity Enhancements</h3>
            </div>
            <ul className="space-y-2">
              {analysis.clarity.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function GuidanceChat() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hello! I'm your AI application assistant. I can help answer questions about graduate applications, requirements, documents, and the application process. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");

  const exampleQuestions = [
    "What documents do UK universities require?",
    "How many references are needed for graduate programs?",
    "What should a personal statement include?",
    "What's the typical timeline for graduate applications?",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "documents": "Most UK universities require the following documents for graduate applications:\n\n1. Academic transcripts and degree certificates\n2. Personal statement (typically 500-1000 words)\n3. 2-3 academic references\n4. CV/Resume\n5. English language test results (IELTS/TOEFL for international students)\n6. Research proposal (for research-based programs)\n7. Portfolio (for creative programs)\n\nRequirements may vary by university and program, so always check the specific requirements on the university's website.",
        
        "references": "Most graduate programs require 2-3 references:\n\n• US universities: Typically 3 recommendation letters\n• UK universities: Usually 2 academic references\n• European universities: Generally 2-3 references\n\nThese should ideally be from:\n- Academic supervisors or professors who know your work well\n- Research advisors if you have research experience\n- Professional references (for professional programs like MBA)\n\nMake sure to give your referees at least 3-4 weeks notice before the deadline.",
        
        "personal statement": "A strong personal statement should include:\n\n1. Introduction: Hook the reader and state your intentions\n2. Academic background: Relevant coursework and achievements\n3. Research/Professional experience: Key projects and learnings\n4. Why this program: Specific reasons and faculty interests\n5. Career goals: How the program fits your aspirations\n6. Conclusion: Summarize your fit and enthusiasm\n\nKey tips:\n- Be specific and use concrete examples\n- Show, don't just tell\n- Tailor it to each program\n- Keep it 500-1000 words\n- Get feedback from mentors",
        
        "timeline": "Here's a typical timeline for graduate applications:\n\n6-12 months before:\n- Research programs and universities\n- Prepare for standardized tests (GRE/GMAT)\n- Contact potential referees\n\n3-6 months before:\n- Take English tests if needed\n- Draft personal statement\n- Request transcripts\n- Finalize reference letters\n\n1-3 months before:\n- Complete applications\n- Submit documents\n- Pay application fees\n\nAfter submission:\n- Track application status\n- Prepare for interviews (if applicable)\n- Wait for decisions (usually 2-3 months)"
      };

      let response = responses["documents"]; // default
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("document") || lowerInput.includes("uk") || lowerInput.includes("require")) {
        response = responses["documents"];
      } else if (lowerInput.includes("reference") || lowerInput.includes("recommendation")) {
        response = responses["references"];
      } else if (lowerInput.includes("personal statement") || lowerInput.includes("essay")) {
        response = responses["personal statement"];
      } else if (lowerInput.includes("timeline") || lowerInput.includes("when")) {
        response = responses["timeline"];
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Example Questions */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="font-semibold mb-4">Example Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              className="text-left p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question about graduate applications..."
              className="flex-1 px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
