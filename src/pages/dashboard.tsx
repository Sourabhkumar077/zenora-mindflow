import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDashboardData } from "@/services/api"; // Correctly imported
import { useState, useEffect } from "react";
import {
  Heart,
  BookOpen,
  Brain,
  TrendingUp,
  Calendar,
  Target,
  Smile,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Interface for our data from the API
interface DashboardData {
  welcomeMessage: string;
  streakDays: number;
  todaysMood: number;
  journalsWritten: number;
  suggestionsCount: number;
  weeklyProgress: string;
  moodData: { day: string; mood: number }[];
}

export default function Dashboard() {
  // State for storing API data and loading status
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setData(response.data);
      } catch (error) {
        console.error("Dashboard data fetch karne mein error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state display
  if (loading) {
    return <DashboardLayout><div>Loading dashboard...</div></DashboardLayout>;
  }

  // Error state display
  if (!data) {
    return <DashboardLayout><div>Error: Could not load dashboard data.</div></DashboardLayout>;
  }

  // Main component render using the 'data' object
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-poppins font-bold text-foreground">
              {data.welcomeMessage}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's how you're doing today
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {data.streakDays} day streak
            </Badge>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 gradient-calm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Today's Mood
              </CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-foreground">{data.todaysMood}/10</div>
                <Smile className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Great mood today!
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Journals Written
              </CardTitle>
              <BookOpen className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{data.journalsWritten}</div>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Therapy Suggestions
              </CardTitle>
              <Brain className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{data.suggestionsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Available for you
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Weekly Progress
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{data.weeklyProgress}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Mood improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Mood Chart */}
          <Card className="lg:col-span-2 border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weekly Mood Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {data.moodData.map((moodItem, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-500 hover:shadow-medium"
                      style={{ height: `${(moodItem.mood / 10) * 200}px` }}
                    />
                    <span className="text-sm text-muted-foreground">{moodItem.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                <span>1 (Low)</span>
                <span>10 (High)</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-between bg-primary hover:bg-primary-dark text-primary-foreground"
                onClick={() => window.location.href = "/mood-log"}
              >
                Log Today's Mood
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between border-secondary text-secondary-foreground hover:bg-secondary-light"
                onClick={() => window.location.href = "/journal"}
              >
                Write Journal Entry
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between border-accent text-accent-foreground hover:bg-accent-light"
                onClick={() => window.location.href = "/therapy"}
              >
                View Suggestions
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-between hover:bg-muted"
                onClick={() => window.location.href = "/quizzes"}
              >
                Take Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity (Static for now, can be connected later) */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Logged mood: 8/10</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Completed journal entry</p>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Tried breathing exercise</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}