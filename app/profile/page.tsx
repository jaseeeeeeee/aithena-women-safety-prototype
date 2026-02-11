"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import {
  Shield,
  Settings,
  Star,
  Award,
  TrendingUp,
  Calendar,
  Mail,
  User,
  ChevronRight,
  Home,
  Users,
  Trophy,
} from "lucide-react"

const userBadges = [
  {
    id: "privacy-pro",
    name: "Privacy Pro",
    description: "Completed all privacy audits",
    icon: Shield,
    color: "bg-primary",
    earned: true,
    earnedDate: "2024-01-15",
  },
  {
    id: "scam-hunter",
    name: "Scam Hunter",
    description: "Detected 50+ phishing attempts",
    icon: Star,
    color: "bg-accent",
    earned: true,
    earnedDate: "2024-01-10",
  },
  {
    id: "community-helper",
    name: "Community Helper",
    description: "Helped 25+ community members",
    icon: Users,
    color: "bg-chart-1",
    earned: true,
    earnedDate: "2024-01-05",
  },
  {
    id: "security-expert",
    name: "Security Expert",
    description: "Maintain 90+ security score for 30 days",
    icon: Award,
    color: "bg-chart-2",
    earned: false,
    progress: 75,
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [digitalScore] = useState(87)
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    joinDate: "2023-12-01",
    avatar: "/professional-avatar.png",
  })

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-accent"
    if (score >= 60) return "text-primary"
    return "text-destructive"
  }

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Attention"
  }

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
          <Link href="/profile/settings">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {user.email}
                </p>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Member since{" "}
                  {new Date(user.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(digitalScore)}`}>{digitalScore}</div>
                <div className="text-sm text-muted-foreground">Security Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{userBadges.filter((b) => b.earned).length}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Digital Footprint Score */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Digital Footprint Score</span>
              <Badge variant={digitalScore >= 80 ? "default" : digitalScore >= 60 ? "secondary" : "destructive"}>
                {getScoreStatus(digitalScore)}
              </Badge>
            </CardTitle>
            <CardDescription>Your overall digital security health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold ${getScoreColor(digitalScore)}`}>{digitalScore}</span>
                <span className="text-sm text-muted-foreground">out of 100</span>
              </div>
              <Progress value={digitalScore} className="h-2" />
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold text-accent">92</div>
                  <div className="text-muted-foreground">Privacy</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">85</div>
                  <div className="text-muted-foreground">Security</div>
                </div>
                <div>
                  <div className="font-semibold text-chart-1">84</div>
                  <div className="text-muted-foreground">Awareness</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earned Badges */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Earned Badges</CardTitle>
            <CardDescription>Your achievements in digital security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {userBadges.map((badge) => {
                const IconComponent = badge.icon
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg border ${
                      badge.earned ? "bg-card" : "bg-muted/50 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${badge.color} flex items-center justify-center flex-shrink-0 ${
                        !badge.earned ? "grayscale" : ""
                      }`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{badge.name}</h4>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                      {badge.earned ? (
                        <p className="text-xs text-accent mt-1">
                          Earned on {new Date(badge.earnedDate!).toLocaleDateString()}
                        </p>
                      ) : (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            <Link href="/profile/settings">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Settings</h4>
                        <p className="text-sm text-muted-foreground">Manage your preferences</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/profile/future-features">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Future Features</h4>
                        <p className="text-sm text-muted-foreground">See what's coming next</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </Link>
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
