"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ScamDetectorPage() {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<{
    status: "safe" | "suspicious" | "dangerous" | null
    confidence: number
    threats: string[]
    details: string
  } | null>(null)

  const handleScan = async () => {
    if (!url) return

    setIsScanning(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock result based on URL content
    const isSuspicious = url.includes("phishing") || url.includes("scam") || url.includes("malware")
    const isDangerous = url.includes("dangerous") || url.includes("virus")

    if (isDangerous) {
      setResult({
        status: "dangerous",
        confidence: 95,
        threats: ["Malware detected", "Phishing attempt", "Data theft risk"],
        details: "This link contains multiple security threats and should not be accessed.",
      })
    } else if (isSuspicious) {
      setResult({
        status: "suspicious",
        confidence: 78,
        threats: ["Suspicious domain", "Potential phishing"],
        details: "This link shows signs of being potentially malicious. Exercise caution.",
      })
    } else {
      setResult({
        status: "safe",
        confidence: 92,
        threats: [],
        details: "This link appears to be safe based on our analysis.",
      })
    }

    setIsScanning(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-green-600"
      case "suspicious":
        return "text-yellow-600"
      case "dangerous":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return <Badge className="bg-green-100 text-green-800">Safe</Badge>
      case "suspicious":
        return <Badge className="bg-yellow-100 text-yellow-800">Suspicious</Badge>
      case "dangerous":
        return <Badge className="bg-red-100 text-red-800">Dangerous</Badge>
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
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Scam & Phishing Detector</h1>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Scan Input */}
        <Card>
          <CardHeader>
            <CardTitle>Scan Link for Threats</CardTitle>
            <CardDescription>Enter any URL to check for phishing, malware, and other security threats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleScan} disabled={!url || isScanning} className="px-6">
                {isScanning ? "Scanning..." : "Scan Link"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Scan Results</span>
                {getStatusBadge(result.status!)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                {result.status === "safe" ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                )}
                <div>
                  <p className={`font-semibold ${getStatusColor(result.status!)}`}>
                    {result.status === "safe"
                      ? "Link is Safe"
                      : result.status === "suspicious"
                        ? "Potentially Suspicious"
                        : "Dangerous Link"}
                  </p>
                  <p className="text-sm text-muted-foreground">Confidence: {result.confidence}%</p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">{result.details}</p>
              </div>

              {result.threats.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Detected Threats:</h4>
                  <ul className="space-y-1">
                    {result.threats.map((threat, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span>{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Scanned URL: <span className="font-mono">{url}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Always verify URLs before clicking, especially in emails</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Look for HTTPS and legitimate domain names</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Be cautious of shortened URLs from unknown sources</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
