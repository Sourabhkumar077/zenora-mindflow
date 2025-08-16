import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Save, Calendar, Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockJournalEntries = [
  {
    id: 1,
    title: "A Beautiful Morning",
    date: "2024-01-15",
    preview: "Today started with such a peaceful feeling. The sunrise was absolutely gorgeous and I felt grateful for...",
    wordCount: 234
  },
  {
    id: 2,
    title: "Challenging Day at Work",
    date: "2024-01-14",
    preview: "Work was quite stressful today, but I managed to handle the situation well. I'm learning to...",
    wordCount: 189
  },
  {
    id: 3,
    title: "Weekend Reflections",
    date: "2024-01-13",
    preview: "This weekend gave me time to reflect on my personal growth. I've been making progress with...",
    wordCount: 312
  },
  {
    id: 4,
    title: "Therapy Session Notes",
    date: "2024-01-12",
    preview: "Had a really insightful therapy session today. We discussed coping strategies and I learned...",
    wordCount: 156
  },
  {
    id: 5,
    title: "Gratitude Practice",
    date: "2024-01-11",
    preview: "Three things I'm grateful for today: my supportive family, good health, and the opportunity to...",
    wordCount: 198
  }
];

export default function Journal() {
  const [currentEntry, setCurrentEntry] = useState("");
  const [entryTitle, setEntryTitle] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<typeof mockJournalEntries[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const filteredEntries = mockJournalEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async () => {
    setIsSaving(true);
    // API call placeholder
    setTimeout(() => {
      setIsSaving(false);
      console.log("Journal entry saved:", { title: entryTitle, content: currentEntry });
    }, 1000);
  };

  const handleEntrySelect = (entry: typeof mockJournalEntries[0]) => {
    setSelectedEntry(entry);
    setEntryTitle(entry.title);
    setCurrentEntry(entry.preview + "... (full content would be loaded here)");
    setIsCreatingNew(false);
  };

  const handleNewEntry = () => {
    setSelectedEntry(null);
    setEntryTitle("");
    setCurrentEntry("");
    setIsCreatingNew(true);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        {/* Sidebar - Previous Entries */}
        <Card className="lg:col-span-1 border-0 shadow-soft">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-primary" />
                Journal Entries
              </CardTitle>
              <Button
                onClick={handleNewEntry}
                size="sm"
                className="bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/30 border-0"
              />
            </div>

            {/* Entry List */}
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {filteredEntries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleEntrySelect(entry)}
                  className={`
                    w-full text-left p-3 rounded-lg border transition-all duration-200 hover:shadow-soft
                    ${selectedEntry?.id === entry.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="font-medium text-sm mb-1 line-clamp-1">
                    {entry.title}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {entry.preview}
                  </div>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {entry.wordCount} words
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Editor */}
        <Card className="lg:col-span-3 border-0 shadow-soft">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  {isCreatingNew ? "New Journal Entry" : "Edit Entry"}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {today}
                </p>
              </div>
              <Button
                onClick={handleSave}
                disabled={!entryTitle.trim() || !currentEntry.trim() || isSaving}
                className="bg-primary hover:bg-primary-dark text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Entry"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title">Entry Title</Label>
              <Input
                id="title"
                placeholder="Give your entry a title..."
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                className="text-lg font-medium border-border focus:border-primary"
              />
            </div>

            {/* Main Editor */}
            <div className="space-y-2">
              <Label htmlFor="content">Your Thoughts</Label>
              <div className="relative">
                <Textarea
                  id="content"
                  placeholder="Start writing your thoughts here... Let your feelings flow freely onto the page."
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  className="min-h-[400px] text-base leading-relaxed resize-none border-border focus:border-primary bg-gradient-to-br from-background to-muted/20"
                  style={{
                    backgroundImage: `
                      linear-gradient(transparent 49px, hsl(var(--border)) 50px),
                      linear-gradient(90deg, transparent 49px, hsl(var(--border)) 50px)
                    `,
                    backgroundSize: '50px 50px, 50px 50px',
                    backgroundPosition: '0 0, 0 0'
                  }}
                />
                
                {/* Word Counter */}
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                  {currentEntry.trim().split(/\s+/).filter(word => word.length > 0).length} words
                </div>
              </div>
            </div>

            {/* Writing Tips */}
            <Card className="bg-accent-light/20 border-accent-light">
              <CardContent className="p-4">
                <h4 className="font-medium text-accent-foreground mb-2">
                  ✨ Journal Writing Tips
                </h4>
                <ul className="text-sm text-accent-foreground/80 space-y-1">
                  <li>• Write about your emotions and what triggered them</li>
                  <li>• Include positive moments, even small ones</li>
                  <li>• Be honest with yourself - this is your safe space</li>
                  <li>• Try to identify patterns in your thoughts and feelings</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}