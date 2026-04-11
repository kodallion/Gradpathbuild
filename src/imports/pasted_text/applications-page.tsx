import { useState } from "react";
import { Plus, Search, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplications } from "@/hooks/useApplications";
import type { NewApplication, ApplicationStatus } from "@/lib/supabase";

const STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "submitted", label: "Submitted" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "waitlisted", label: "Waitlisted" },
];

const EMPTY: NewApplication = { school_name: "", program: "", country: "", deadline: "", status: "not_started" };

export default function ApplicationsPage() {
  const { applications, loading, error, addApplication } = useApplications();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewApplication>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = applications.filter(a =>
    [a.school_name, a.program, a.country].some(f => f.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = async () => {
    setSaving(true); setSaveError(null);
    const { error: err } = await addApplication(form);
    setSaving(false);
    if (err) { setSaveError(err); return; }
    setForm(EMPTY); setOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Applications</h1>
        <Button onClick={() => setOpen(true)} className="gap-2"><Plus className="h-4 w-4" />Add Application</Button>
      </div>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {loading && <div className="flex items-center gap-2 justify-center py-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" />Loading...</div>}
      {!loading && error && <div className="flex items-center gap-2 justify-center py-12 text-destructive"><AlertCircle className="h-5 w-5" />{error}</div>}
      {!loading && !error && (
        filtered.length === 0
          ? <p className="text-center py-16 text-muted-foreground">{applications.length === 0 ? 'No applications yet. Click "Add Application" to get started.' : 'No results.'}</p>
          : <div className="rounded-lg border"><Table><TableHeader><TableRow><TableHead>School</TableHead><TableHead>Program</TableHead><TableHead>Country</TableHead><TableHead>Deadline</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{filtered.map(app => (<TableRow key={app.id}><TableCell className="font-medium">{app.school_name}</TableCell><TableCell>{app.program}</TableCell><TableCell>{app.country}</TableCell><TableCell>{app.deadline}</TableCell><TableCell>{app.status}</TableCell></TableRow>))}</TableBody></Table></div>
      )}
      <Dialog open={open} onOpenChange={o => { if (!o) { setForm(EMPTY); setSaveError(null); } setOpen(o); }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader><DialogTitle>Add Application</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5"><Label>School Name *</Label><Input value={form.school_name} onChange={e => setForm(f => ({ ...f, school_name: e.target.value }))} placeholder="e.g. University of Toronto" disabled={saving} /></div>
            <div className="grid gap-1.5"><Label>Program *</Label><Input value={form.program} onChange={e => setForm(f => ({ ...f, program: e.target.value }))} placeholder="e.g. MSc Computer Science" disabled={saving} /></div>
            <div className="grid gap-1.5"><Label>Country *</Label><Input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="e.g. Canada" disabled={saving} /></div>
            <div className="grid gap-1.5"><Label>Deadline *</Label><Input type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} disabled={saving} /></div>
            <div className="grid gap-1.5"><Label>Status</Label><Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as ApplicationStatus }))} disabled={saving}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{STATUS_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent></Select></div>
            {saveError && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{saveError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!form.school_name || !form.program || !form.country || !form.deadline || saving}>{saving ? "Saving…" : "Add Application"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}