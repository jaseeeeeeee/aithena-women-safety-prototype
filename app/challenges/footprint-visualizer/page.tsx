"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Globe, Smartphone, Mail, Camera, MapPin, RefreshCw } from "lucide-react"

const footprintData = [
  { category: "Social Media", score: 75, risk: "Medium", icon: Camera, color: "bg-chart-1" },
  { category: "Email Accounts", score: 90, risk: "Low", icon: Mail, color: "bg-accent" },
  { category: "Location Data", score: 45, risk: "High", icon: MapPin, color: "bg-destructive" },
  { category: "Device Info", score: 80, risk: "Low", icon: Smartphone, color: "bg-primary" },
  { category: "Web Browsing", score: 60, risk: "Medium", icon: Globe, color: "bg-chart-2" },
  { category: "Privacy Settings", score: 85, risk: "Low", icon: Eye, color: "bg-chart-3" },
]

export default function FootprintVisualizerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [overallScore] = useState(72)

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 3000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-destructive"
      case "Medium":
        return "text-primary"
      case "Low":
        return "text-accent"
      default:
        return "text-muted-foreground"
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "default"
      default:
        return "outline"
    }
  }

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
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold">Digital Footprint Visualizer</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Overall Score */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Digital Footprint Score</span>
              <Badge variant={overallScore >= 80 ? "default" : overallScore >= 60 ? "secondary" : "destructive"}>
                {overallScore >= 80 ? "Good" : overallScore >= 60 ? "Fair" : "Poor"}
              </Badge>
            </CardTitle>
            <CardDescription>Your digital presence risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-4xl font-bold ${overallScore >= 80 ? "text-accent" : overallScore >= 60 ? "text-primary" : "text-destructive"}`}
                >
                  {overallScore}
                </span>
                <span className="text-sm text-muted-foreground">out of 100</span>
              </div>
              <Progress value={overallScore} className="h-3" />
              <Button onClick={handleScan} disabled={isScanning} className="w-full">
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Rescan Footprint
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footprint Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Footprint Breakdown</h3>
          <div className="grid grid-cols-1 gap-4">
            {footprintData.map((item) => {
              const IconComponent = item.icon
              return (
                <Card key={item.category}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground">{item.category}</h4>
                          <Badge variant={getRiskBadgeVariant(item.risk)}>{item.risk} Risk</Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Progress value={item.score} className="flex-1 h-2" />
                          <span className={`text-sm font-medium ${getRiskColor(item.risk)}`}>{item.score}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recommendations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Actions to improve your digital footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Review location sharing settings</p>
                  <p className="text-xs text-muted-foreground">Your location data has high exposure risk</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Update browser privacy settings</p>
                  <p className="text-xs text-muted-foreground">Enable tracking protection and clear cookies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Review social media privacy</p>
                  <p className="text-xs text-muted-foreground">Consider making profiles more private</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
