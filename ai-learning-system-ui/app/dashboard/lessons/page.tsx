"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, CheckCircle2, Circle, ChevronDown, ChevronRight, MessageSquare, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const modules = [
  {
    id: 1,
    title: "Module 1: ML Foundations",
    lessons: [
      { id: "1-1", title: "Introduction to ML Concepts", completed: true },
      { id: "1-2", title: "Types of Machine Learning", completed: true },
      { id: "1-3", title: "Setting Up Your Environment", completed: false },
    ],
  },
  {
    id: 2,
    title: "Module 2: Supervised Learning",
    lessons: [
      { id: "2-1", title: "Linear Regression", completed: false },
      { id: "2-2", title: "Logistic Regression", completed: false },
      { id: "2-3", title: "Decision Trees", completed: false },
    ],
  },
  {
    id: 3,
    title: "Module 3: Neural Networks",
    lessons: [
      { id: "3-1", title: "Perceptrons and Neurons", completed: false },
      { id: "3-2", title: "Activation Functions", completed: false },
      { id: "3-3", title: "Backpropagation", completed: false },
    ],
  },
]

const lessonContent = {
  title: "Introduction to Machine Learning Concepts",
  content: `
Machine Learning (ML) is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

## What is Machine Learning?

Machine learning algorithms use historical data as input to predict new output values. It's the science of getting computers to act without being explicitly programmed.

## Key Concepts

### 1. Training Data
Training data is the dataset used to train a machine learning model. It consists of input-output pairs that the model uses to learn patterns.

### 2. Features
Features are individual measurable properties of the phenomena being observed. They are the input variables used to make predictions.

### 3. Labels
Labels are the output variable that the model is trying to predict. In supervised learning, each training example has a corresponding label.

### 4. Model
A model is a mathematical representation of a real-world process. Machine learning models learn from training data to make predictions.

## Types of Machine Learning

1. **Supervised Learning**: The algorithm learns from labeled training data
2. **Unsupervised Learning**: The algorithm finds patterns in unlabeled data
3. **Reinforcement Learning**: The algorithm learns through trial and error

## Why Machine Learning Matters

Machine learning is revolutionizing industries by:
- Automating repetitive tasks
- Providing personalized experiences
- Making predictions and recommendations
- Analyzing large amounts of data

In the next lesson, we'll dive deeper into each type of machine learning and explore real-world applications.
  `,
}

export default function LessonsPage() {
  const [expandedModules, setExpandedModules] = useState<number[]>([1])
  const [selectedLesson, setSelectedLesson] = useState("1-1")
  const [isCompleted, setIsCompleted] = useState(false)

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-12rem)]">
      {/* Sidebar - Lesson List */}
      <Card className="lg:w-80 shrink-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Course Content
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-18rem)]">
            <div className="p-4 space-y-2">
              {modules.map((module) => (
                <div key={module.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-3 hover:bg-muted transition-colors text-left"
                  >
                    <span className="font-medium text-sm text-card-foreground">{module.title}</span>
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                  {expandedModules.includes(module.id) && (
                    <div className="border-t border-border">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson.id)}
                          className={cn(
                            "w-full flex items-center gap-3 p-3 text-left text-sm transition-colors",
                            selectedLesson === lesson.id
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted text-muted-foreground",
                          )}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0" />
                          )}
                          <span className="line-clamp-1">{lesson.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle>{lessonContent.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-6">
          <div className="prose prose-slate max-w-none">
            {lessonContent.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">
                    {line.replace("## ", "")}
                  </h2>
                )
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-semibold text-foreground mt-4 mb-2">
                    {line.replace("### ", "")}
                  </h3>
                )
              }
              if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
                return (
                  <p key={i} className="text-muted-foreground ml-4">
                    {line}
                  </p>
                )
              }
              if (line.startsWith("- ")) {
                return (
                  <p key={i} className="text-muted-foreground ml-4">
                    {line}
                  </p>
                )
              }
              if (line.trim()) {
                return (
                  <p key={i} className="text-muted-foreground mb-3">
                    {line}
                  </p>
                )
              }
              return null
            })}
          </div>
        </CardContent>
        <div className="border-t border-border p-4 flex flex-col sm:flex-row gap-3 justify-between">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Ask AI Agent
          </Button>
          <Button onClick={() => setIsCompleted(!isCompleted)} variant={isCompleted ? "outline" : "default"}>
            {isCompleted ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                Completed
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Mark as Completed
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
