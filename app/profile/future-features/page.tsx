"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, ArrowLeft, Search, Mic, Wifi, Clock, Star, Zap, Globe, Brain, Bell } from "lucide-react"

const futureFeatures = [
  {
    id: "fake-news-detector",
    title: "Fake News Detector",
    description:
      "AI-powered analysis to identify misinformation and fake news articles across social media and news platforms.",
    icon: Search,
    status: "Coming Q2 2024",
    color: "bg-chart-1",
    features: ["Real-time fact checking", "Source credibility analysis", "Bias detection", "Social media integration"],
  },
  {
    id: "voice-fraud-blocker",
    title: "Voice Fraud Blocker",
    description: "Advanced voice analysis to detect deepfake audio and voice cloning attempts in calls and messages.",
    icon: Mic,
    status: "Coming Q3 2024",
    color: "bg-chart-2",
    features: ["Deepfake voice detection", "Real-time call analysis", "Voice authentication", "Caller verification"],
  },
  {
    id: "offline-lite-mode",
    title: "Offline Lite Mode",
    description:
      "Essential security features that work without internet connection for maximum privacy and accessibility.",
    icon: Wifi,
    status: "Coming Q4 2024",
    color: "bg-chart-3",
    features: ["Offline password vault", "Local threat detection", "Privacy-first design", "Sync when connected"],
  },
]

export default function FutureFeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Future Features</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">What's Coming Next</h2>
          <p className="text-muted-foreground">Exciting new features in development to enhance your digital security</p>
        </div>

        {/* Coming Soon Banner */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Early Access Program</h3>
                <p className="text-sm text-muted-foreground">Be the first to try new features before they launch</p>
              </div>
              <Button size="sm" variant="default">
                Join Beta
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Future Features List */}
        <div className="space-y-6">
          {futureFeatures.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card key={feature.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {feature.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-foreground">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {feature.features.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3">
                      <Button variant="outline" size="sm" className="w-full bg-transparent" disabled>
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Me When Available
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feedback Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Have Ideas?</span>
            </CardTitle>
            <CardDescription>Help shape the future of AiTHENA with your suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We're always looking for ways to improve your digital security experience. Share your ideas for new
                features or improvements.
              </p>
              <Button className="w-full">
                <Globe className="w-4 h-4 mr-2" />
                Submit Feature Request
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Teaser */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-foreground mb-2">2024 Roadmap</h3>
            <p className="text-sm text-muted-foreground mb-4">More exciting features planned throughout the year</p>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Q2: AI Detection</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Q3: Voice Security</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-chart-1 rounded-full" />
                <span>Q4: Offline Mode</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
