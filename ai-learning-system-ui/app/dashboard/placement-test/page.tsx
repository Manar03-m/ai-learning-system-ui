"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ClipboardCheck, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "What is the primary purpose of a neural network's activation function?",
    options: [
      "To store data temporarily",
      "To introduce non-linearity into the network",
      "To connect to external databases",
      "To reduce the size of the network",
    ],
  },
  {
    id: 2,
    question: "Which algorithm is commonly used for supervised classification?",
    options: ["K-Means Clustering", "Principal Component Analysis", "Random Forest", "Apriori Algorithm"],
  },
  {
    id: 3,
    question: "In Python, what does the 'len()' function return?",
    options: [
      "The type of an object",
      "The length of an object",
      "The memory address of an object",
      "The hash value of an object",
    ],
  },
  {
    id: 4,
    question: "What is overfitting in machine learning?",
    options: [
      "When a model is too simple to capture patterns",
      "When a model performs well on training data but poorly on new data",
      "When a model takes too long to train",
      "When a model uses too much memory",
    ],
  },
  {
    id: 5,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Array", "Stack", "Linked List"],
  },
]

export default function PlacementTestPage() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [completed, setCompleted] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    setCompleted(true)
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <ClipboardCheck className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Placement Test</CardTitle>
            <CardDescription>
              This test will help us understand your current knowledge level and create a personalized learning path for
              you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-card-foreground">Test Information</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {questions.length} multiple choice questions</li>
                <li>• Approximately 10-15 minutes to complete</li>
                <li>• No time limit per question</li>
                <li>• Results used to personalize your syllabus</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setStarted(true)}>
              Start Test
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Test Completed!</CardTitle>
            <CardDescription>
              Your placement test has been submitted. Our AI agents are analyzing your results.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-4xl font-bold text-primary mb-2">Intermediate Level</p>
              <p className="text-muted-foreground">Based on your answers</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Your personalized syllabus is being generated. You will be redirected shortly.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <a href="/dashboard/syllabus">View My Syllabus</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-lg">{currentQ.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQ.id] || ""}
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, [currentQ.id]: value }))}
            className="space-y-3"
          >
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          {currentQuestion === questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={!answers[currentQ.id]}>
              Submit Test
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!answers[currentQ.id]}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
