// src/pages/mood-log.tsx

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Calendar, TrendingUp, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { addMoodLog } from "@/services/api"; 
import { useAuthStore } from "@/store/auth";

const moodEmojis = [
    { value: 1, emoji: "😢", label: "Very Sad" },
    { value: 2, emoji: "😞", label: "Sad" },
    { value: 3, emoji: "😔", label: "Down" },
    { value: 4, emoji: "😐", label: "Okay" },
    { value: 5, emoji: "🙂", label: "Good" },
    { value: 6, emoji: "😊", label: "Happy" },
    { value: 7, emoji: "😃", label: "Very Happy" },
    { value: 8, emoji: "😄", label: "Joyful" },
    { value: 9, emoji: "🤩", label: "Amazing" },
    { value: 10, emoji: "🥳", label: "Euphoric" },
];

export default function MoodLog() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useAuthStore();

  // UPDATED: Is function ko API se connect kiya gaya hai
  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);

    const selectedMoodData = moodEmojis.find(m => m.value === selectedMood);

    const moodLogData = {
      user_id: userId, 
      mood: selectedMoodData?.label || 'Okay', 
      note: notes,
    };

    try {
      const response = await addMoodLog(moodLogData);
      console.log("Mood successfully logged:", response.data);
      alert("Mood logged successfully!");
      setSelectedMood(null);
      setNotes("");
    } catch (error) {
      console.error("Error logging mood:", error);
      alert("Failed to log mood. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMoodData = moodEmojis.find(m => m.value === selectedMood);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-poppins font-bold text-foreground">
            How are you feeling today?
          </h1>
          <p className="text-muted-foreground">
            Track your daily mood to understand your patterns better
          </p>
        </div>

        {/* Mood Selector */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Select Your Mood (1-10)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-6">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-300 hover:scale-110 hover:shadow-medium
                    ${selectedMood === mood.value 
                      ? 'border-primary bg-primary/10 shadow-medium' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-xs font-medium text-center">{mood.value}</div>
                </button>
              ))}
            </div>
            {selectedMoodData && (
              <div className="text-center p-4 rounded-lg bg-muted/30 animate-fade-in">
                <div className="text-4xl mb-2">{selectedMoodData.emoji}</div>
                <Badge className="bg-primary text-primary-foreground">
                  {selectedMoodData.label} ({selectedMoodData.value}/10)
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Add a Note (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">What's on your mind today?</Label>
              <Textarea
                id="notes"
                placeholder="Describe what's affecting your mood today..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px] resize-none border-border focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!selectedMood || isSubmitting}
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Log My Mood"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}