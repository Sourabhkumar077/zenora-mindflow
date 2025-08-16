import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Brain,
  Heart,
  Target,
  ArrowRight,
  Download,
  Share2
} from "lucide-react";

export default function Results() {
  // Mock data - would come from API
  const overallScore = 7.2;
  const stressLevel = "Moderate";
  const moodTrend = "+15%";
  const lastAssessment = "2 days ago";

  // Mock mood history data
  const moodHistory = [
    { date: "Jan 8", mood: 6 },
    { date: "Jan 9", mood: 7 },
    { date: "Jan 10", mood: 6.5 },
    { date: "Jan 11", mood: 8 },
    { date: "Jan 12", mood: 7.5 },
    { date: "Jan 13", mood: 8.5 },
    { date: "Jan 14", mood: 9 },
    { date: "Jan 15", mood: 8 },
  ];

  // Mock quiz results
  const quizResults = [
    { 
      name: "GAD-7 (Anxiety)", 
      score: 5, 
      maxScore: 21, 
      level: "Mild", 
      date: "Jan 15",
      color: "bg-green-500"
    },
    { 
      name: "PHQ-9 (Depression)", 
      score: 3, 
      maxScore: 27, 
      level: "Minimal", 
      date: "Jan 14",
      color: "bg-blue-500"
    },
    { 
      name: "Stress Assessment", 
      score: 12, 
      maxScore: 30, 
      level: "Moderate", 
      date: "Jan 13",
      color: "bg-yellow-500"
    },
  ];

  const maxMood = Math.max(...moodHistory.map(d => d.mood));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-foreground">
              Your Mental Health Results
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive overview of your mental health journey
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft gradient-calm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/80">
                Overall Wellbeing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-foreground">
                  {overallScore}/10
                </div>
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-foreground/70 mt-1">
                Above average
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Current Stress Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stressLevel}</div>
              <Badge className="mt-1 bg-yellow-100 text-yellow-800">
                Manageable
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Mood Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-green-600">{moodTrend}</div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Last Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-foreground">{lastAssessment}</div>
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                GAD-7 completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood History Chart */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Mood History (Last 8 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {moodHistory.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div className="text-xs font-medium text-foreground">
                      {data.mood}
                    </div>
                    <div 
                      className="w-full bg-gradient-to-t from-primary via-accent to-secondary rounded-t-lg transition-all duration-500 hover:shadow-medium relative"
                      style={{ height: `${(data.mood / maxMood) * 200}px` }}
                    >
                      {data.mood === maxMood && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            Best
                          </Badge>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{data.date}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                <span>1 (Low)</span>
                <span>10 (High)</span>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Results Chart */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Assessment Results Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizResults.map((result, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{result.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${
                            result.level === 'Minimal' ? 'bg-green-100 text-green-800' :
                            result.level === 'Mild' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {result.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {result.score}/{result.maxScore}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${result.color} transition-all duration-500`}
                          style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                        />
                      </div>
                      <div className="absolute right-0 -bottom-6 text-xs text-muted-foreground">
                        {result.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Insights */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-secondary" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="font-medium text-green-900">Positive Trend</p>
                    <p className="text-sm text-green-700 mt-1">
                      Your mood has improved by 15% over the past month, showing consistent positive progress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="font-medium text-blue-900">Strong Engagement</p>
                    <p className="text-sm text-blue-700 mt-1">
                      You've maintained a 7-day journaling streak and completed 2 assessments this week.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                  <div>
                    <p className="font-medium text-yellow-900">Areas to Focus</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Stress levels are moderate. Consider incorporating more relaxation techniques.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-primary">Continue Daily Mood Tracking</p>
                      <p className="text-sm text-primary/80 mt-1">
                        Your consistent tracking is showing great results.
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="border-primary text-primary">
                      Log Mood
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-accent/20 bg-accent/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-accent">Try Stress Relief Exercises</p>
                      <p className="text-sm text-accent/80 mt-1">
                        Based on your stress levels, breathing exercises could help.
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="border-accent text-accent">
                      Explore
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-secondary/20 bg-secondary/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-secondary">Schedule Weekly Check-ins</p>
                      <p className="text-sm text-secondary/80 mt-1">
                        Regular assessments help track your progress effectively.
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="border-secondary text-secondary">
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground mt-4"
                onClick={() => window.location.href = "/therapy"}
              >
                View All Therapy Suggestions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}