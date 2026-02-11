"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Eye, CheckCircle, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"

interface PrivacySetting {
  id: string
  title: string
  description: string
  enabled: boolean
  importance: "high" | "medium" | "low"
  category: string
}

export default function PrivacyAuditorPage() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: "two-factor",
      title: "Two-Factor Authentication",
      description: "Enable 2FA on all important accounts",
      enabled: true,
      importance: "high",
      category: "Account Security",
    },
    {
      id: "location-tracking",
      title: "Location Tracking",
      description: "Disable unnecessary location tracking",
      enabled: false,
      importance: "high",
      category: "Privacy",
    },
    {
      id: "ad-personalization",
      title: "Ad Personalization",
      description: "Limit personalized advertising",
      enabled: false,
      importance: "medium",
      category: "Privacy",
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      description: "Restrict data sharing with third parties",
      enabled: true,
      importance: "high",
      category: "Privacy",
    },
    {
      id: "public-profile",
      title: "Public Profile Visibility",
      description: "Make social media profiles private",
      enabled: true,
      importance: "medium",
      category: "Social Media",
    },
    {
      id: "email-tracking",
      title: "Email Tracking Protection",
      description: "Block email tracking pixels",
      enabled: false,
      importance: "medium",
      category: "Email",
    },
  ])

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  const getPrivacyScore = () => {
    const totalSettings = settings.length
    const enabledSettings = settings.filter((s) => s.enabled).length
    return Math.round((enabledSettings / totalSettings) * 100)
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return null
    }
  }

  const privacyScore = getPrivacyScore()
  const categories = [...new Set(settings.map((s) => s.category))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center p-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mr-3">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-accent-foreground" />
            </div>
            <h1 className="text-xl font-bold">Privacy Auditor</h1>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Privacy Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Privacy Score</span>
              <Badge variant={privacyScore >= 80 ? "default" : privacyScore >= 60 ? "secondary" : "destructive"}>
                {privacyScore >= 80 ? "Excellent" : privacyScore >= 60 ? "Good" : "Needs Work"}
              </Badge>
            </CardTitle>
            <CardDescription>Your overall privacy protection level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-3xl font-bold ${privacyScore >= 80 ? "text-green-600" : privacyScore >= 60 ? "text-yellow-600" : "text-red-600"}`}
                >
                  {privacyScore}
                </span>
                <span className="text-sm text-muted-foreground">out of 100</span>
              </div>
              <Progress value={privacyScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {settings.filter((s) => s.enabled).length} of {settings.length} privacy settings enabled
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings by Category */}
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {settings
                  .filter((s) => s.category === category)
                  .map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{setting.title}</h4>
                          {getImportanceBadge(setting.importance)}
                        </div>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {setting.enabled ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                        <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>Privacy Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Review app permissions regularly and revoke unnecessary access</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Use privacy-focused browsers and search engines</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Enable automatic security updates on all devices</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Consider using a VPN for additional privacy protection</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
