"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Eye, Lock, Globe } from "lucide-react"
import Link from "next/link"

export default function IdentityShieldPage() {
  const [isShieldActive, setIsShieldActive] = useState(false)
  const [protectionLevel, setProtectionLevel] = useState(65)

  const protectionFeatures = [
    {
      id: "data-encryption",
      title: "Data Encryption",
      description: "Encrypt personal information across all platforms",
      icon: Lock,
      active: true,
      impact: "High",
    },
    {
      id: "identity-masking",
      title: "Identity Masking",
      description: "Hide your real identity when browsing",
      icon: Eye,
      active: false,
      impact: "Medium",
    },
    {
      id: "social-monitoring",
      title: "Social Media Monitoring",
      description: "Monitor mentions of your personal information",
      icon: Globe,
      active: true,
      impact: "High",
    },
    {
      id: "data-breach-alerts",
      title: "Data Breach Alerts",
      description: "Get notified if your data appears in breaches",
      icon: AlertTriangle,
      active: true,
      impact: "High",
    },
  ]

  const handleActivateShield = () => {
    setIsShieldActive(true)
    setProtectionLevel(95)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "High":
        return <Badge variant="destructive">High Impact</Badge>
      case "Medium":
        return <Badge variant="secondary">Medium Impact</Badge>
      case "Low":
        return <Badge variant="outline">Low Impact</Badge>
      default:
        return null
    }
  }

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
            <div className="w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Digital Identity Shield</h1>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Shield Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Shield Status</span>
              <Badge variant={isShieldActive ? "default" : "secondary"}>{isShieldActive ? "Active" : "Inactive"}</Badge>
            </CardTitle>
            <CardDescription>Your digital identity protection level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  isShieldActive ? "bg-green-100" : "bg-muted"
                }`}
              >
                <Shield className={`w-12 h-12 ${isShieldActive ? "text-green-600" : "text-muted-foreground"}`} />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div
                className={`text-3xl font-bold ${
                  protectionLevel >= 80 ? "text-green-600" : protectionLevel >= 60 ? "text-yellow-600" : "text-red-600"
                }`}
              >
                {protectionLevel}%
              </div>
              <p className="text-sm text-muted-foreground">Protection Level</p>
              <Progress value={protectionLevel} className="h-2" />
            </div>

            {!isShieldActive && (
              <Button onClick={handleActivateShield} className="w-full" size="lg">
                <Shield className="w-4 h-4 mr-2" />
                Activate Shield
              </Button>
            )}

            {isShieldActive && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Shield Activated</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your digital identity is now protected with advanced security measures.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Protection Features */}
        <Card>
          <CardHeader>
            <CardTitle>Protection Features</CardTitle>
            <CardDescription>Advanced security measures to protect your digital identity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {protectionFeatures.map((feature) => {
                const IconComponent = feature.icon
                return (
                  <div key={feature.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        feature.active ? "bg-green-100" : "bg-muted"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${feature.active ? "text-green-600" : "text-muted-foreground"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{feature.title}</h4>
                        <div className="flex items-center space-x-2">
                          {getImpactBadge(feature.impact)}
                          {feature.active ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Identity Threats */}
        <Card>
          <CardHeader>
            <CardTitle>Common Identity Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Identity Theft</h4>
                  <p className="text-sm text-muted-foreground">
                    Criminals steal personal information to impersonate you
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Data Breaches</h4>
                  <p className="text-sm text-muted-foreground">
                    Your personal data gets exposed in company security breaches
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Social Engineering</h4>
                  <p className="text-sm text-muted-foreground">
                    Attackers manipulate you into revealing sensitive information
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protection Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Protection Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Use unique, strong passwords for all accounts</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Enable two-factor authentication wherever possible</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Regularly monitor your credit reports and financial accounts</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Be cautious about sharing personal information online</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
