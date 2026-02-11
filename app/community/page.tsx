"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Users,
  Home,
  Trophy,
  User,
  AlertTriangle,
  MessageCircle,
  FileText,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"

const communityFeatures = [
  {
    id: "sos",
    title: "SOS Safety Button",
    description: "Emergency alert system for immediate help",
    icon: AlertTriangle,
    color: "bg-destructive",
    textColor: "text-destructive-foreground",
    href: "/community/sos",
  },
  {
    id: "reporting",
    title: "Anonymous Reporting Hub",
    description: "Report incidents safely and anonymously",
    icon: FileText,
    color: "bg-chart-4",
    textColor: "text-white",
    href: "/community/reporting",
  },
  {
    id: "mentor",
    title: "Cyber Safety Mentor Mode",
    description: "AI-powered guidance for digital safety",
    icon: MessageCircle,
    color: "bg-chart-5",
    textColor: "text-white",
    href: "/community/mentor",
  },
  {
    id: "space",
    title: "Safe Community Space",
    description: "Connect with others in a protected environment",
    icon: Home,
    color: "bg-accent",
    textColor: "text-accent-foreground",
    href: "/community/space",
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Community & Safety</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Stay Safe Together</h2>
          <p className="text-muted-foreground">Access community resources and safety tools</p>
        </div>

        {/* Community Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communityFeatures.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card key={feature.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className={`w-6 h-6 ${feature.textColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-base mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                      <Link href={feature.href} className="block">
                        <Button size="sm" variant="default" className="w-full">
                          Access Feature
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

        {/* Community Stats */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Community Impact</CardTitle>
            <CardDescription>How we're making the digital world safer together</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2,847</div>
                <div className="text-sm text-muted-foreground">Threats Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1,293</div>
                <div className="text-sm text-muted-foreground">Reports Submitted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-4">856</div>
                <div className="text-sm text-muted-foreground">People Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-5">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
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
            { id: "community", icon: Users, label: "Community", href: "/community", active: true },
            { id: "challenges", icon: Trophy, label: "Challenges", href: "/challenges" },
            { id: "profile", icon: User, label: "Profile", href: "/profile" },
          ].map((tab) => {
            const IconComponent = tab.icon
            return (
              <Link key={tab.id} href={tab.href} className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 w-full ${
                    tab.active ? "text-primary" : "text-muted-foreground"
                  }`}
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
