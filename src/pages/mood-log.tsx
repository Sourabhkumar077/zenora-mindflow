import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Calendar, TrendingUp, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const moodEmojis = [
  { value: 1, emoji: "😢", label: "Very Sad", color: "text-red-500" },
  { value: 2, emoji: "😞", label: "Sad", color: "text-red-400" },
  { value: 3, emoji: "😔", label: "Down", color: "text-orange-400" },
  { value: 4, emoji: "😐", label: "Okay", color: "text-yellow-400" },
  { value: 5, emoji: "🙂", label: "Good", color: "text-yellow-500" },
  { value: 6, emoji: "😊", label: "Happy", color: "text-green-400" },
  { value: 7, emoji: "😃", label: "Very Happy", color: "text-green-500" },
  { value: 8, emoji: "😄", label: "Joyful", color: "text-green-600" },
  { value: 9, emoji: "🤩", label: "Amazing", color: "text-blue-500" },
  { value: 10, emoji: "🥳", label: "Euphoric", color: "text-purple-500" },
];

export default function MoodLog() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock past week data
  const pastWeekMoods = [
    { date: "Mon", mood: 7, emoji: "😃" },
    { date: "Tue", mood: 6, emoji: "😊" },
    { date: "Wed", mood: 8, emoji: "😄" },
    { date: "Thu", mood: 7, emoji: "😃" },
    { date: "Fri", mood: 9, emoji: "🤩" },
    { date: "Sat", mood: 8, emoji: "😄" },
    { date: "Sun", mood: null, emoji: "?" },
  ];

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    // API call placeholder
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
      console.log("Mood logged:", { mood: selectedMood, notes });
    }, 1000);
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

        {/* Past Week Overview */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              This Week's Moods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-3">
              {pastWeekMoods.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">{day.date}</div>
                  <div className={`
                    w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center text-lg
                    ${day.mood 
                      ? 'border-primary bg-primary/10' 
                      : 'border-dashed border-muted-foreground bg-muted/30'
                    }
                  `}>
                    {day.emoji}
                  </div>
                  {day.mood && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {day.mood}/10
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-accent-light/30">
              <div className="flex items-center gap-2 text-accent-foreground">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Week Summary:</span>
              </div>
              <p className="text-sm text-accent-foreground/80 mt-1">
                Your average mood this week is 7.2/10 - You're doing great! 
                Keep tracking to maintain this positive trend.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}