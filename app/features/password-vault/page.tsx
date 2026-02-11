"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Key, Eye, EyeOff, Plus, CheckCircle, AlertTriangle, Copy } from "lucide-react"
import Link from "next/link"

interface PasswordEntry {
  id: string
  website: string
  username: string
  password: string
  strength: "weak" | "medium" | "strong"
  lastUpdated: Date
}

export default function PasswordVaultPage() {
  const [passwords] = useState<PasswordEntry[]>([
    {
      id: "1",
      website: "gmail.com",
      username: "alex@email.com",
      password: "MyStr0ngP@ssw0rd!",
      strength: "strong",
      lastUpdated: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      website: "facebook.com",
      username: "alex.smith",
      password: "password123",
      strength: "weak",
      lastUpdated: new Date(Date.now() - 2592000000),
    },
    {
      id: "3",
      website: "linkedin.com",
      username: "alex.smith@email.com",
      password: "LinkedInPass2023",
      strength: "medium",
      lastUpdated: new Date(Date.now() - 604800000),
    },
  ])

  const [testPassword, setTestPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number
    feedback: string[]
    strength: "weak" | "medium" | "strong"
  } | null>(null)

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const analyzePassword = (password: string) => {
    const feedback: string[] = []
    let score = 0

    if (password.length >= 8) score += 20
    else feedback.push("Use at least 8 characters")

    if (/[A-Z]/.test(password)) score += 20
    else feedback.push("Include uppercase letters")

    if (/[a-z]/.test(password)) score += 20
    else feedback.push("Include lowercase letters")

    if (/\d/.test(password)) score += 20
    else feedback.push("Include numbers")

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 20
    else feedback.push("Include special characters")

    let strength: "weak" | "medium" | "strong" = "weak"
    if (score >= 80) strength = "strong"
    else if (score >= 60) strength = "medium"

    return { score, feedback, strength }
  }

  const handlePasswordCheck = () => {
    if (!testPassword) return
    const result = analyzePassword(testPassword)
    setPasswordStrength(result)
  }

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "strong":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "weak":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case "strong":
        return <Badge className="bg-green-100 text-green-800">Strong</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "weak":
        return <Badge variant="destructive">Weak</Badge>
      default:
        return null
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const vaultStats = {
    total: passwords.length,
    strong: passwords.filter((p) => p.strength === "strong").length,
    weak: passwords.filter((p) => p.strength === "weak").length,
    needsUpdate: passwords.filter(
      (p) => Date.now() - p.lastUpdated.getTime() > 7776000000, // 90 days
    ).length,
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
            <div className="w-8 h-8 bg-chart-2 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Password Vault</h1>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Vault Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Vault Overview</CardTitle>
            <CardDescription>Your password security summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{vaultStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Passwords</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{vaultStats.strong}</div>
                <div className="text-sm text-muted-foreground">Strong</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{vaultStats.weak}</div>
                <div className="text-sm text-muted-foreground">Weak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{vaultStats.needsUpdate}</div>
                <div className="text-sm text-muted-foreground">Need Update</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Strength Checker */}
        <Card>
          <CardHeader>
            <CardTitle>Password Strength Checker</CardTitle>
            <CardDescription>Test the strength of any password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="password"
                placeholder="Enter password to check strength..."
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePasswordCheck} disabled={!testPassword}>
                Check Strength
              </Button>
            </div>

            {passwordStrength && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Strength Score:</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${getStrengthColor(passwordStrength.strength)}`}>
                      {passwordStrength.score}/100
                    </span>
                    {getStrengthBadge(passwordStrength.strength)}
                  </div>
                </div>
                <Progress value={passwordStrength.score} className="h-2" />

                {passwordStrength.feedback.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Suggestions:</h4>
                    <ul className="space-y-1">
                      {passwordStrength.feedback.map((suggestion, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Passwords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Saved Passwords</span>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Password
              </Button>
            </CardTitle>
            <CardDescription>Manage your stored passwords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {passwords.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{entry.website}</h4>
                      <p className="text-sm text-muted-foreground">{entry.username}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStrengthBadge(entry.strength)}
                      {entry.strength === "weak" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <Input
                      type={showPasswords[entry.id] ? "text" : "password"}
                      value={entry.password}
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button variant="outline" size="sm" onClick={() => togglePasswordVisibility(entry.id)}>
                      {showPasswords[entry.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(entry.password)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Last updated: {entry.lastUpdated.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Password Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Use unique passwords for every account</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Include uppercase, lowercase, numbers, and symbols</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Make passwords at least 12 characters long</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Update passwords regularly, especially after breaches</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
