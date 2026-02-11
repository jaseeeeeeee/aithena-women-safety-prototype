"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, Home, Users, Trophy, User, ChevronRight, BarChart3, Target, Crown } from "lucide-react"

const challengeFeatures = [
  {
    id: "footprint-visualizer",
    title: "Digital Footprint Visualizer",
    description: "Interactive visualization of your digital presence",
    icon: BarChart3,
    color: "bg-primary",
    textColor: "text-primary-foreground",
  },
  {
    id: "safety-challenges",
    title: "Cyber Safety Challenges",
    description: "Complete challenges to improve your security skills",
    icon: Target,
    color: "bg-accent",
    textColor: "text-accent-foreground",
  },
  {
    id: "leaderboard",
    title: "Leaderboard",
    description: "See how you rank among other cyber-safe users",
    icon: Crown,
    color: "bg-chart-1",
    textColor: "text-white",
  },
]

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("challenges")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">
              Ai<span className="text-primary">THENA</span>
            </h1>
          </div>
          <Badge variant="secondary">
            <Trophy className="w-3 h-3 mr-1" />
            Challenges
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Cyber Safety Challenges</h2>
          <p className="text-muted-foreground">Level up your digital security skills</p>
        </div>

        {/* Challenge Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your cyber safety journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">5</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-chart-1">850</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenge Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Challenge Features</h3>
          <div className="grid grid-cols-1 gap-4">
            {challengeFeatures.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Card key={feature.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent className={`w-6 h-6 ${feature.textColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground mb-3">{feature.description}</p>
                        <Link href={`/challenges/${feature.id}`} className="block">
                          <Button size="sm" variant="default" className="w-full">
                            Open
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="flex items-center justify-around p-2">
          {[
            { id: "home", icon: Home, label: "Home", href: "/dashboard" },
            { id: "community", icon: Users, label: "Community", href: "/community" },
            { id: "challenges", icon: Trophy, label: "Challenges", href: "/challenges" },
            { id: "profile", icon: User, label: "Profile", href: "/profile" },
          ].map((tab) => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.id
            return (
              <Link key={tab.id} href={tab.href || "#"} className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 w-full ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs">{tab.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
