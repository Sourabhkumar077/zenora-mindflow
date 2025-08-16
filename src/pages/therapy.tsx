import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Heart, 
  Wind, 
  Headphones, 
  Moon, 
  Sun, 
  Target,
  Play,
  Clock,
  Star,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const therapySuggestions = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise",
    description: "A quick breathing technique to reduce anxiety and center yourself in moments of stress.",
    category: "anxiety",
    duration: "5 min",
    difficulty: "Beginner",
    rating: 4.8,
    icon: Wind,
    color: "bg-accent",
    tags: ["Quick", "Anxiety Relief"]
  },
  {
    id: 2,
    title: "Guided Meditation for Sleep",
    description: "Gentle meditation to help quiet your mind and prepare for restful sleep.",
    category: "sleep",
    duration: "15 min",
    difficulty: "Beginner",
    rating: 4.9,
    icon: Moon,
    color: "bg-primary",
    tags: ["Sleep", "Relaxation"]
  },
  {
    id: 3,
    title: "Morning Mindfulness Routine",
    description: "Start your day with intention and clarity through this energizing mindfulness practice.",
    category: "focus",
    duration: "10 min",
    difficulty: "Intermediate",
    rating: 4.7,
    icon: Sun,
    color: "bg-secondary",
    tags: ["Morning", "Energy"]
  },
  {
    id: 4,
    title: "Stress Relief Visualization",
    description: "Use the power of imagination to transport yourself to a peaceful, calming environment.",
    category: "stress",
    duration: "12 min",
    difficulty: "Beginner",
    rating: 4.6,
    icon: Heart,
    color: "bg-accent",
    tags: ["Stress Relief", "Visualization"]
  },
  {
    id: 5,
    title: "Progressive Muscle Relaxation",
    description: "Systematically tense and relax muscle groups to release physical tension and stress.",
    category: "stress",
    duration: "20 min",
    difficulty: "Intermediate",
    rating: 4.8,
    icon: Target,
    color: "bg-primary",
    tags: ["Physical", "Deep Relaxation"]
  },
  {
    id: 6,
    title: "Cognitive Restructuring Exercise",
    description: "Learn to identify and challenge negative thought patterns with practical techniques.",
    category: "depression",
    duration: "25 min",
    difficulty: "Advanced",
    rating: 4.9,
    icon: Brain,
    color: "bg-secondary",
    tags: ["CBT", "Thought Work"]
  },
  {
    id: 7,
    title: "Binaural Beats for Focus",
    description: "Use scientifically-designed audio frequencies to enhance concentration and mental clarity.",
    category: "focus",
    duration: "30 min",
    difficulty: "Beginner",
    rating: 4.5,
    icon: Headphones,
    color: "bg-accent",
    tags: ["Audio", "Concentration"]
  },
  {
    id: 8,
    title: "Self-Compassion Practice",
    description: "Develop a kinder, more supportive relationship with yourself through guided exercises.",
    category: "self-esteem",
    duration: "18 min",
    difficulty: "Intermediate",
    rating: 4.8,
    icon: Heart,
    color: "bg-primary",
    tags: ["Self-Love", "Healing"]
  }
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "anxiety", label: "Anxiety Relief" },
  { value: "stress", label: "Stress Management" },
  { value: "focus", label: "Focus & Clarity" },
  { value: "sleep", label: "Sleep & Rest" },
  { value: "depression", label: "Mood Support" },
  { value: "self-esteem", label: "Self-Esteem" }
];

export default function Therapy() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isStarting, setIsStarting] = useState<number | null>(null);

  const filteredSuggestions = therapySuggestions.filter(suggestion =>
    selectedCategory === "all" || suggestion.category === selectedCategory
  );

  const handleTryNow = async (id: number) => {
    setIsStarting(id);
    // API call placeholder
    setTimeout(() => {
      setIsStarting(null);
      console.log("Starting therapy session:", id);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-foreground">
              Therapy Suggestions
            </h1>
            <p className="text-muted-foreground mt-1">
              Personalized therapeutic activities based on your mood patterns
            </p>
          </div>
          
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Suggestion */}
        <Card className="border-0 shadow-medium gradient-calm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Wind className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <Badge className="mb-2 bg-white/20 text-white border-white/30">
                  ⭐ Recommended for You
                </Badge>
                <h3 className="text-xl font-poppins font-semibold text-white mb-2">
                  5-Minute Breathing Exercise
                </h3>
                <p className="text-white/90 mb-3">
                  Based on your recent mood patterns, this quick anxiety relief technique 
                  could help you feel more centered and calm.
                </p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    5 minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    4.8 rating
                  </span>
                </div>
              </div>
              <Button 
                className="bg-white text-primary hover:bg-white/90 shadow-soft"
                onClick={() => handleTryNow(1)}
                disabled={isStarting === 1}
              >
                <Play className="w-4 h-4 mr-2" />
                {isStarting === 1 ? "Starting..." : "Try Now"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuggestions.slice(1).map((suggestion) => {
            const IconComponent = suggestion.icon;
            
            return (
              <Card 
                key={suggestion.id} 
                className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`
                      w-12 h-12 rounded-lg ${suggestion.color} flex items-center justify-center
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {suggestion.rating}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight">
                    {suggestion.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{suggestion.duration}</span>
                    <span>•</span>
                    <Badge 
                      variant="secondary" 
                      className={getDifficultyColor(suggestion.difficulty)}
                    >
                      {suggestion.difficulty}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {suggestion.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs border-primary/30 text-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                    onClick={() => handleTryNow(suggestion.id)}
                    disabled={isStarting === suggestion.id}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isStarting === suggestion.id ? "Starting..." : "Try Now"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-soft bg-muted/30">
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-poppins font-semibold mb-2">
              Need Personalized Recommendations?
            </h3>
            <p className="text-muted-foreground mb-4">
              Take our assessment quiz to get therapy suggestions tailored specifically to your needs.
            </p>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.location.href = "/quizzes"}
            >
              Take Assessment Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}