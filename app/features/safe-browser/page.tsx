"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Globe, Shield, CheckCircle, AlertTriangle, Lock, Eye, Filter } from "lucide-react"
import Link from "next/link"

interface BrowserFeature {
  id: string
  title: string
  description: string
  icon: any
  enabled: boolean
  category: string
}

export default function SafeBrowserPage() {
  const [isBrowserActive, setIsBrowserActive] = useState(true)
  const [features, setFeatures] = useState<BrowserFeature[]>([
    {
      id: "ad-blocker",
      title: "Ad Blocker",
      description: "Block intrusive ads and trackers",
      icon: Filter,
      enabled: true,
      category: "Privacy",
    },
    {
      id: "tracker-protection",
      title: "Tracker Protection",
      description: "Prevent websites from tracking your activity",
      icon: Eye,
      enabled: true,
      category: "Privacy",
    },
    {
      id: "malware-protection",
      title: "Malware Protection",
      description: "Block access to malicious websites",
      icon: Shield,
      enabled: true,
      category: "Security",
    },
    {
      id: "https-enforcement",
      title: "HTTPS Enforcement",
      description: "Force secure connections when available",
      icon: Lock,
      enabled: true,
      category: "Security",
    },
    {
      id: "cookie-management",
      title: "Cookie Management",
      description: "Control which cookies websites can set",
      icon: Globe,
      enabled: false,
      category: "Privacy",
    },
    {
      id: "fingerprint-protection",
      title: "Fingerprint Protection",
      description: "Prevent browser fingerprinting",
      icon: Shield,
      enabled: false,
      category: "Privacy",
    },
  ])

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((feature) => (feature.id === id ? { ...feature, enabled: !feature.enabled } : feature)),
    )
  }

  const getProtectionLevel = () => {
    const enabledFeatures = features.filter((f) => f.enabled).length
    return Math.round((enabledFeatures / features.length) * 100)
  }

  const protectionLevel = getProtectionLevel()
  const categories = [...new Set(features.map((f) => f.category))]

  const blockedStats = {
    ads: 1247,
    trackers: 892,
    malware: 23,
    cookies: 456,
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
            <div className="w-8 h-8 bg-chart-3 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Safe Browser Mode</h1>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Browser Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Secure Browser Status</span>
              <Badge variant={isBrowserActive ? "default" : "secondary"}>
                {isBrowserActive ? "Active" : "Inactive"}
              </Badge>
            </CardTitle>
            <CardDescription>Enhanced protection for your browsing experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isBrowserActive ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Secure Browser Activated</span>
                </div>
                <p className="text-sm text-green-700">
                  Your browsing is protected with advanced security features and privacy controls.
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800">Protection Level</span>
                    <span className="text-sm font-bold text-green-800">{protectionLevel}%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${protectionLevel}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-muted-foreground" />
                </div>
                <Button onClick={() => setIsBrowserActive(true)} size="lg" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Activate Secure Browser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Protection Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Protection Statistics</CardTitle>
            <CardDescription>Items blocked in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{blockedStats.ads}</div>
                <div className="text-sm text-muted-foreground">Ads Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{blockedStats.trackers}</div>
                <div className="text-sm text-muted-foreground">Trackers Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{blockedStats.malware}</div>
                <div className="text-sm text-muted-foreground">Malware Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{blockedStats.cookies}</div>
                <div className="text-sm text-muted-foreground">Cookies Blocked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features by Category */}
        {categories.map((category) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category} Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features
                  .filter((f) => f.category === category)
                  .map((feature) => {
                    const IconComponent = feature.icon
                    return (
                      <div key={feature.id} className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              feature.enabled ? "bg-green-100" : "bg-muted"
                            }`}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${feature.enabled ? "text-green-600" : "text-muted-foreground"}`}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {feature.enabled ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          )}
                          <Switch checked={feature.enabled} onCheckedChange={() => toggleFeature(feature.id)} />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Browsing Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Safe Browsing Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Always check for HTTPS (lock icon) on sensitive websites</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Be cautious when downloading files from unknown sources</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Keep your browser and extensions updated</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Use private/incognito mode for sensitive browsing</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
