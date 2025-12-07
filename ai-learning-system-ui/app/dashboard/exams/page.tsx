"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  Clock,
  FileText,
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
} from "lucide-react"

const exams = [
  { id: 1, title: "Module 1 Assessment", questions: 10, duration: "20 min", status: "completed", score: 85 },
  { id: 2, title: "Module 2 Assessment", questions: 15, duration: "30 min", status: "not-started" },
  { id: 3, title: "Module 3 Assessment", questions: 15, duration: "30 min", status: "not-started" },
  { id: 4, title: "Midterm Exam", questions: 30, duration: "60 min", status: "not-started" },
]

const examQuestions = [
  {
    id: 1,
    question: "What is the primary goal of supervised learning?",
    options: [
      "To find hidden patterns in data",
      "To predict outputs based on labeled training data",
      "To maximize a reward signal",
      "To reduce data dimensionality",
    ],
  },
  {
    id: 2,
    question: "Which of the following is NOT a type of machine learning?",
    options: ["Supervised Learning", "Unsupervised Learning", "Determined Learning", "Reinforcement Learning"],
  },
  {
    id: 3,
    question: "What does 'overfitting' refer to in machine learning?",
    options: [
      "When a model is too simple",
      "When a model performs well on training data but poorly on new data",
      "When training takes too long",
      "When there is not enough data",
    ],
  },
]

export default function ExamsPage() {
  const [view, setView] = useState<"list" | "instructions" | "exam">("list")
  const [selectedExam, setSelectedExam] = useState<(typeof exams)[0] | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes in seconds

  const startExam = (exam: (typeof exams)[0]) => {
    setSelectedExam(exam)
    setView("instructions")
  }

  const beginExam = () => {
    setView("exam")
    setCurrentQuestion(0)
    setAnswers({})
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (view === "instructions" && selectedExam) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">{selectedExam.title}</CardTitle>
            <CardDescription>Please read the instructions carefully before starting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-card-foreground">Exam Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="ml-2 font-medium text-card-foreground">{selectedExam.questions}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="ml-2 font-medium text-card-foreground">{selectedExam.duration}</span>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Important Instructions</p>
                  <ul className="mt-2 space-y-1 text-yellow-700">
                    <li>• Once started, the exam cannot be paused</li>
                    <li>• You can navigate between questions</li>
                    <li>• Make sure to submit before time runs out</li>
                    <li>• All questions are multiple choice</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button variant="outline" onClick={() => setView("list")} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={beginExam} className="flex-1">
              Start Exam
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (view === "exam") {
    const question = examQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / examQuestions.length) * 100

    return (
      <div className="max-w-3xl mx-auto">
        {/* Timer Bar */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-mono text-lg font-semibold text-card-foreground">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {examQuestions.length}
            </span>
            <Progress value={progress} className="w-32" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <RadioGroupItem value={option} id={`q${question.id}-option-${index}`} />
                  <Label htmlFor={`q${question.id}-option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {currentQuestion === examQuestions.length - 1 ? (
              <Button onClick={() => setView("list")}>
                Submit Exam
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => setCurrentQuestion((prev) => prev + 1)}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Question Navigation */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {examQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                currentQuestion === index
                  ? "bg-primary text-primary-foreground border-primary"
                  : answers[examQuestions[index].id]
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-card text-card-foreground border-border hover:bg-muted"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Exams</h1>
        <p className="text-muted-foreground mt-1">Test your knowledge and track your progress</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {exams.map((exam) => (
          <Card key={exam.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <CardDescription>
                      {exam.questions} questions • {exam.duration}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={exam.status === "completed" ? "default" : "secondary"}>
                  {exam.status === "completed" ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {exam.score}%
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Circle className="h-3 w-3" />
                      Not Started
                    </span>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{exam.questions} Questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{exam.duration}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={exam.status === "completed" ? "outline" : "default"}
                onClick={() => startExam(exam)}
              >
                {exam.status === "completed" ? "Review Exam" : "Start Exam"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
