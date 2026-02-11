"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Shield,
  Search,
  Eye,
  Filter,
  Key,
  Globe,
  Home,
  Users,
  Trophy,
  User,
  Bell,
  Settings,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

const securityFeatures = [
  {
    id: "scam-detector",
    title: "Scam & Phishing Detector",
    description: "AI-powered detection of malicious links and emails",
    icon: Search,
    status: "active",
    color: "bg-primary",
    textColor: "text-primary-foreground",
  },
  {
    id: "privacy-auditor",
    title: "Privacy Auditor",
    description: "Scan and audit your digital privacy settings",
    icon: Eye,
    status: "active",
    color: "bg-accent",
    textColor: "text-accent-foreground",
  },
  {
    id: "abuse-filter",
    title: "Abuse Filter",
    description: "Filter out harassment and toxic content",
    icon: Filter,
    status: "active",
    color: "bg-secondary",
    textColor: "text-secondary-foreground",
  },
  {
    id: "identity-shield",
    title: "Digital Identity Shield",
    description: "Protect your personal information online",
    icon: Shield,
    status: "active",
    color: "bg-chart-1",
    textColor: "text-white",
  },
  {
    id: "password-vault",
    title: "Password Vault",
    description: "Secure storage for all your passwords",
    icon: Key,
    status: "premium",
    color: "bg-chart-2",
    textColor: "text-white",
  },
  {
    id: "safe-browser",
    title: "Safe Browser Mode",
    description: "Browse the web with enhanced protection",
    icon: Globe,
    status: "premium",
    color: "bg-chart-3",
    textColor: "text-white",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home")
  const [digitalScore] = useState(87)

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
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, Alex</h2>
          <p className="text-muted-foreground">Your digital security is our priority</p>
        </div>

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
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Last updated 2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Security Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityFeatures.map((feature) => {
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
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                          {feature.status === "premium" && (
                            <Badge variant="secondary" className="text-xs">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{feature.description}</p>
                        {feature.status === "premium" ? (
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            Upgrade to Use
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        ) : (
                          <Link href={`/features/${feature.id}`} className="block">
                            <Button size="sm" variant="default" className="w-full">
                              Open
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Community Features Section */}
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-semibold text-foreground">Community & Safety</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm mb-1">SOS Safety Button</h4>
                    <p className="text-xs text-muted-foreground mb-3">Emergency alert system for immediate help</p>
                    <Link href="/community/sos" className="block">
                      <Button size="sm" variant="destructive" className="w-full">
                        Access SOS
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-chart-4 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm mb-1">Anonymous Reporting</h4>
                    <p className="text-xs text-muted-foreground mb-3">Report incidents safely and anonymously</p>
                    <Link href="/community/reporting" className="block">
                      <Button size="sm" variant="default" className="w-full">
                        Report Issue
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-chart-5 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm mb-1">Cyber Safety Mentor</h4>
                    <p className="text-xs text-muted-foreground mb-3">AI-powered guidance for digital safety</p>
                    <Link href="/community/mentor" className="block">
                      <Button size="sm" variant="default" className="w-full">
                        Chat with Mentor
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm mb-1">Safe Community Space</h4>
                    <p className="text-xs text-muted-foreground mb-3">Connect with others in a protected environment</p>
                    <Link href="/community/space" className="block">
                      <Button size="sm" variant="default" className="w-full">
                        Join Community
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Phishing email blocked</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Privacy scan completed</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Weak password detected</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
