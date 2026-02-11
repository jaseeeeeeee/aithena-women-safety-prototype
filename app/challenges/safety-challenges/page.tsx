"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowLeft, Trophy, Star, CheckCircle } from "lucide-react"

const challenges = [
  {
    id: 1,
    title: "Password Security Master",
    description: "Create strong passwords and enable 2FA on all accounts",
    difficulty: "Beginner",
    points: 100,
    progress: 100,
    completed: true,
    tasks: [
      { id: 1, text: "Update weak passwords", completed: true },
      { id: 2, text: "Enable 2FA on email", completed: true },
      { id: 3, text: "Enable 2FA on social media", completed: true },
    ],
  },
  {
    id: 2,
    title: "Privacy Settings Pro",
    description: "Audit and optimize privacy settings across platforms",
    difficulty: "Intermediate",
    points: 200,
    progress: 60,
    completed: false,
    tasks: [
      { id: 1, text: "Review Facebook privacy settings", completed: true },
      { id: 2, text: "Update Google account privacy", completed: true },
      { id: 3, text: "Configure browser privacy settings", completed: false },
      { id: 4, text: "Review app permissions on phone", completed: false },
      { id: 5, text: "Set up VPN for browsing", completed: false },
    ],
  },
  {
    id: 3,
    title: "Phishing Detection Expert",
    description: "Learn to identify and avoid phishing attempts",
    difficulty: "Intermediate",
    points: 150,
    progress: 25,
    completed: false,
    tasks: [
      { id: 1, text: "Complete phishing quiz", completed: true },
      { id: 2, text: "Report 3 suspicious emails", completed: false },
      { id: 3, text: "Install anti-phishing browser extension", completed: false },
      { id: 4, text: "Share knowledge with 2 friends", completed: false },
    ],
  },
  {
    id: 4,
    title: "Digital Footprint Minimizer",
    description: "Reduce your online presence and data exposure",
    difficulty: "Advanced",
    points: 300,
    progress: 0,
    completed: false,
    tasks: [
      { id: 1, text: "Delete unused social media accounts", completed: false },
      { id: 2, text: "Remove personal info from data brokers", completed: false },
      { id: 3, text: "Set up email aliases", completed: false },
      { id: 4, text: "Configure secure messaging apps", completed: false },
      { id: 5, text: "Implement data minimization practices", completed: false },
    ],
  },
]

export default function SafetyChallengesPage() {
  const [challengeStates, setChallengeStates] = useState(challenges)

  const toggleTask = (challengeId: number, taskId: number) => {
    setChallengeStates((prev) =>
      prev.map((challenge) => {
        if (challenge.id === challengeId) {
          const updatedTasks = challenge.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          )
          const completedTasks = updatedTasks.filter((task) => task.completed).length
          const progress = Math.round((completedTasks / updatedTasks.length) * 100)
          const completed = progress === 100

          return {
            ...challenge,
            tasks: updatedTasks,
            progress,
            completed,
          }
        }
        return challenge
      }),
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-accent"
      case "Intermediate":
        return "bg-primary"
      case "Advanced":
        return "bg-destructive"
      default:
        return "bg-secondary"
    }
  }

  const totalPoints = challengeStates.reduce(
    (sum, challenge) =>
      sum + (challenge.completed ? challenge.points : Math.round((challenge.points * challenge.progress) / 100)),
    0,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/challenges">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold">Cyber Safety Challenges</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Progress</span>
              <Badge variant="secondary">
                <Star className="w-3 h-3 mr-1" />
                {totalPoints} pts
              </Badge>
            </CardTitle>
            <CardDescription>Complete challenges to earn points and improve your security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">
                  {challengeStates.filter((c) => c.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {challengeStates.filter((c) => c.progress > 0 && !c.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-chart-1">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenges List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Available Challenges</h3>
          {challengeStates.map((challenge) => (
            <Card key={challenge.id} className={challenge.completed ? "border-accent" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-base">{challenge.title}</CardTitle>
                      {challenge.completed && <CheckCircle className="w-4 h-4 text-accent" />}
                    </div>
                    <CardDescription className="mb-2">{challenge.description}</CardDescription>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="secondary">
                        <Trophy className="w-3 h-3 mr-1" />
                        {challenge.points} pts
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tasks:</h4>
                    {challenge.tasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`task-${challenge.id}-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(challenge.id, task.id)}
                        />
                        <label
                          htmlFor={`task-${challenge.id}-${task.id}`}
                          className={`text-sm flex-1 cursor-pointer ${
                            task.completed ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {task.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
