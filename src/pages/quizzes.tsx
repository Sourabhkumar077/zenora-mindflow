import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  Clock,
  Brain,
  Heart
} from "lucide-react";

const quizzes = [
  {
    id: "gad7",
    title: "GAD-7 (Anxiety Assessment)",
    description: "Generalized Anxiety Disorder 7-item scale to measure anxiety levels",
    duration: "2-3 minutes",
    questions: 7,
    icon: Brain,
    color: "bg-primary"
  },
  {
    id: "phq9",
    title: "PHQ-9 (Depression Screening)",
    description: "Patient Health Questionnaire to assess depression symptoms",
    duration: "3-4 minutes",
    questions: 9,
    icon: Heart,
    color: "bg-accent"
  }
];

const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
];

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure",
  "Trouble concentrating on things",
  "Moving or speaking slowly, or being fidgety or restless",
  "Thoughts that you would be better off dead or of hurting yourself"
];

const answerOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" }
];

export default function Quizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const getCurrentQuestions = () => {
    return selectedQuiz === "gad7" ? gad7Questions : phq9Questions;
  };

  const getCurrentQuiz = () => {
    return quizzes.find(q => q.id === selectedQuiz);
  };

  const questions = getCurrentQuestions();
  const currentQuizData = getCurrentQuiz();
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const handleAnswerSelect = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // API call placeholder
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      console.log("Quiz submitted:", { quiz: selectedQuiz, answers });
    }, 1500);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = questions.length * 3;
    const scorePercentage = (totalScore / maxScore) * 100;
    
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-0 shadow-soft text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-poppins font-bold mb-2">
                Quiz Completed!
              </h2>
              <p className="text-muted-foreground mb-6">
                Thank you for completing the {currentQuizData?.title}
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {totalScore}/{maxScore}
                </div>
                <Progress value={scorePercentage} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Your assessment score
                </p>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => window.location.href = "/results"}
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  View Detailed Results
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetQuiz}
                  className="w-full"
                >
                  Take Another Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (selectedQuiz) {
    const IconComponent = currentQuizData?.icon || ClipboardList;
    
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Quiz Header */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${currentQuizData?.color} flex items-center justify-center`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>{currentQuizData?.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
              </div>
              <Progress value={progress} className="mt-4" />
            </CardHeader>
          </Card>

          {/* Question Card */}
          <Card className="border-0 shadow-soft">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge variant="secondary" className="mb-4">
                  Over the last 2 weeks, how often have you been bothered by:
                </Badge>
                <h2 className="text-xl font-poppins font-semibold text-foreground">
                  {questions[currentQuestion]}
                </h2>
              </div>

              <div className="space-y-3">
                {answerOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswerSelect(option.value)}
                    className={`
                      w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                      ${answers[currentQuestion] === option.value
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-4 h-4 rounded-full border-2 transition-all
                        ${answers[currentQuestion] === option.value
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                        }
                      `} />
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined || isSubmitting}
              className="bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              {currentQuestion === questions.length - 1 ? (
                isSubmitting ? "Submitting..." : "Submit"
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-poppins font-bold text-foreground">
            Mental Health Assessments
          </h1>
          <p className="text-muted-foreground">
            Take validated assessments to better understand your mental health
          </p>
        </div>

        {/* Quiz Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {quizzes.map((quiz) => {
            const IconComponent = quiz.icon;
            
            return (
              <Card 
                key={quiz.id} 
                className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer group"
                onClick={() => handleQuizSelect(quiz.id)}
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-12 h-12 rounded-lg ${quiz.color} flex items-center justify-center
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {quiz.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quiz.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClipboardList className="w-4 h-4" />
                      {quiz.questions} questions
                    </span>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Information Section */}
        <Card className="border-0 shadow-soft bg-muted/30 max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h3 className="font-poppins font-semibold mb-3">
              About These Assessments
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • These are clinically validated screening tools used by mental health professionals
              </p>
              <p>
                • Your responses are private and secure - only you can see your results
              </p>
              <p>
                • Results provide insights but are not a substitute for professional diagnosis
              </p>
              <p>
                • If you're experiencing severe symptoms, please contact a mental health professional
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}