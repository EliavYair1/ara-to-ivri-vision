
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Save, Trash2, Edit2, X } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const { language, direction } = useApp();

  // Labels based on language
  const labels = {
    notesTitle: language === "hebrew" ? "הערות" : "Notes",
    newNote: language === "hebrew" ? "הערה חדשה" : "New Note",
    editNote: language === "hebrew" ? "ערוך הערה" : "Edit Note",
    saveNote: language === "hebrew" ? "שמור הערה" : "Save Note",
    deleteNote: language === "hebrew" ? "מחק הערה" : "Delete Note",
    cancel: language === "hebrew" ? "ביטול" : "Cancel",
    titlePlaceholder: language === "hebrew" ? "כותרת..." : "Title...",
    contentPlaceholder: language === "hebrew" ? "תוכן ההערה..." : "Note content...",
    noNotes: language === "hebrew" 
      ? "אין הערות שמורות. לחץ על 'הערה חדשה' כדי להתחיל."
      : "No saved notes. Click 'New Note' to get started.",
    created: language === "hebrew" ? "נוצר:" : "Created:",
  };

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('translation-notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Failed to parse saved notes", error);
        setNotes([]);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('translation-notes', JSON.stringify(notes));
  }, [notes]);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "",
      content: "",
      date: new Date().toISOString(),
    };
    setCurrentNote(newNote);
    setEditTitle("");
    setEditContent("");
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(true);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    if (currentNote && currentNote.id === noteId) {
      setCurrentNote(null);
      setIsEditing(false);
    }
  };

  const handleSaveNote = () => {
    if (!currentNote) return;
    
    const updatedNote: Note = {
      ...currentNote,
      title: editTitle.trim() || (language === "hebrew" ? "הערה חדשה" : "New Note"),
      content: editContent,
      date: currentNote.id === 'new' ? new Date().toISOString() : currentNote.date,
    };
    
    setNotes(prev => {
      const existingIndex = prev.findIndex(note => note.id === updatedNote.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = updatedNote;
        return updated;
      } else {
        return [...prev, updatedNote];
      }
    });
    
    setCurrentNote(null);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setCurrentNote(null);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy HH:mm');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="mt-12 pt-6 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${language === "hebrew" ? "hebrew-text" : ""}`}>
          {labels.notesTitle}
        </h2>
        <Button onClick={handleNewNote} className="gap-2">
          <Plus className="h-4 w-4" />
          <span>{labels.newNote}</span>
        </Button>
      </div>

      {isEditing ? (
        <Card className="mb-8 border-primary/20">
          <CardHeader className="pb-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder={labels.titlePlaceholder}
              className={language === "hebrew" ? "hebrew-text" : ""}
              dir={direction}
            />
          </CardHeader>
          <CardContent>
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder={labels.contentPlaceholder}
              className={`h-32 resize-none ${language === "hebrew" ? "hebrew-text" : ""}`}
              dir={direction}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-1" />
              {labels.cancel}
            </Button>
            <Button onClick={handleSaveNote}>
              <Save className="h-4 w-4 mr-1" />
              {labels.saveNote}
            </Button>
          </CardFooter>
        </Card>
      ) : null}

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card key={note.id} className="note-card group">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className={`text-lg ${language === "hebrew" ? "hebrew-text" : ""}`}>
                    {note.title}
                  </CardTitle>
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => handleEditNote(note)} className="h-8 px-2">
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(note.id)} className="h-8 px-2 hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{labels.created} {formatDate(note.date)}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className={`h-24 ${language === "hebrew" ? "hebrew-text" : ""}`} dir={direction}>
                  <p className="whitespace-pre-wrap text-sm">{note.content}</p>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg bg-muted/30">
          <p className={`text-muted-foreground ${language === "hebrew" ? "hebrew-text" : ""}`}>
            {labels.noNotes}
          </p>
        </div>
      )}
    </div>
  );
}
