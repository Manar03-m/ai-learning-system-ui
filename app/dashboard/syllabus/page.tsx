"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, RefreshCw, Play, Clock, CheckCircle2, Circle, Loader2 } from "lucide-react"
import Link from "next/link"

const syllabusData = [
  {
    week: 1,
    title: "Foundations of Machine Learning",
    lessons: [
      { name: "Introduction to ML Concepts", duration: "30 min", difficulty: "Beginner", completed: true },
      { name: "Types of Machine Learning", duration: "25 min", difficulty: "Beginner", completed: true },
      { name: "Setting Up Your Environment", duration: "20 min", difficulty: "Beginner", completed: false },
    ],
  },
  {
    week: 2,
    title: "Supervised Learning",
    lessons: [
      { name: "Linear Regression", duration: "35 min", difficulty: "Intermediate", completed: false },
      { name: "Logistic Regression", duration: "30 min", difficulty: "Intermediate", completed: false },
      { name: "Decision Trees", duration: "40 min", difficulty: "Intermediate", completed: false },
    ],
  },
  {
    week: 3,
    title: "Neural Networks Basics",
    lessons: [
      { name: "Perceptrons and Neurons", duration: "35 min", difficulty: "Intermediate", completed: false },
      { name: "Activation Functions", duration: "25 min", difficulty: "Intermediate", completed: false },
      { name: "Backpropagation", duration: "45 min", difficulty: "Advanced", completed: false },
    ],
  },
  {
    week: 4,
    title: "Deep Learning Fundamentals",
    lessons: [
      { name: "Multi-layer Networks", duration: "40 min", difficulty: "Advanced", completed: false },
      { name: "Convolutional Neural Networks", duration: "50 min", difficulty: "Advanced", completed: false },
      { name: "Recurrent Neural Networks", duration: "45 min", difficulty: "Advanced", completed: false },
    ],
  },
]

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
}

export default function SyllabusPage() {
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRegenerating(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Personalized Syllabus</h1>
          <p className="text-muted-foreground mt-1">Your AI-generated learning path</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRegenerate} disabled={isRegenerating}>
            {isRegenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Regenerate Syllabus
          </Button>
          <Link href="/dashboard/lessons">
            <Button>
              <Play className="mr-2 h-4 w-4" />
              Start Learning
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {syllabusData.map((week) => (
          <Card key={week.week}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    Week {week.week}: {week.title}
                  </CardTitle>
                  <CardDescription>{week.lessons.length} lessons</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {week.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium text-card-foreground">{lesson.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={difficultyColors[lesson.difficulty]}>{lesson.difficulty}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
