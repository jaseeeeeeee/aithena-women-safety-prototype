"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Filter, Send, AlertTriangle, Shield } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  text: string
  isAbusive: boolean
  severity: "low" | "medium" | "high"
  timestamp: Date
  flaggedTerms?: string[]
}

export default function AbuseFilterPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey, how are you doing today?",
      isAbusive: false,
      severity: "low",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      text: "You're such an idiot, I hate you!",
      isAbusive: true,
      severity: "high",
      timestamp: new Date(Date.now() - 240000),
      flaggedTerms: ["idiot", "hate"],
    },
    {
      id: "3",
      text: "That's a stupid idea, but whatever.",
      isAbusive: true,
      severity: "medium",
      timestamp: new Date(Date.now() - 180000),
      flaggedTerms: ["stupid"],
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const analyzeMessage = (
    text: string,
  ): { isAbusive: boolean; severity: "low" | "medium" | "high"; flaggedTerms: string[] } => {
    const abusiveTerms = {
      high: ["hate", "kill", "die", "idiot", "moron", "stupid person"],
      medium: ["stupid", "dumb", "loser", "pathetic", "worthless"],
      low: ["annoying", "weird", "lame"],
    }

    const flaggedTerms: string[] = []
    let severity: "low" | "medium" | "high" = "low"
    let isAbusive = false

    const lowerText = text.toLowerCase()

    // Check for high severity terms
    for (const term of abusiveTerms.high) {
      if (lowerText.includes(term)) {
        flaggedTerms.push(term)
        severity = "high"
        isAbusive = true
      }
    }

    // Check for medium severity terms if no high severity found
    if (!isAbusive) {
      for (const term of abusiveTerms.medium) {
        if (lowerText.includes(term)) {
          flaggedTerms.push(term)
          severity = "medium"
          isAbusive = true
        }
      }
    }

    // Check for low severity terms if no higher severity found
    if (!isAbusive) {
      for (const term of abusiveTerms.low) {
        if (lowerText.includes(term)) {
          flaggedTerms.push(term)
          severity = "low"
          isAbusive = true
        }
      }
    }

    return { isAbusive, severity, flaggedTerms }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const analysis = analyzeMessage(newMessage)
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      ...analysis,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-orange-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
      case "low":
        return <Badge variant="outline">Low Risk</Badge>
      default:
        return null
    }
  }

  const highlightAbusiveTerms = (text: string, flaggedTerms: string[] = []) => {
    if (!flaggedTerms.length) return text

    let highlightedText = text
    flaggedTerms.forEach((term) => {
      const regex = new RegExp(`(${term})`, "gi")
      highlightedText = highlightedText.replace(regex, '<mark class="bg-red-200 text-red-800 px-1 rounded">$1</mark>')
    })

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
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
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-secondary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Abuse Filter</h1>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Demo Description */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Abuse Detection</CardTitle>
            <CardDescription>
              This demo shows how our AI identifies and highlights abusive content in real-time
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Chat Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Chat Demo</CardTitle>
            <CardDescription>Type messages to see the abuse filter in action</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Messages */}
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={`p-3 rounded-lg ${message.isAbusive ? "bg-red-50 border border-red-200" : "bg-muted"}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {message.isAbusive ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : (
                          <Shield className="w-4 h-4 text-green-600" />
                        )}
                        <span className="text-sm font-medium">
                          {message.isAbusive ? "Flagged Message" : "Safe Message"}
                        </span>
                        {message.isAbusive && getSeverityBadge(message.severity)}
                      </div>
                      <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm">
                      {message.isAbusive ? highlightAbusiveTerms(message.text, message.flaggedTerms) : message.text}
                    </p>
                    {message.flaggedTerms && message.flaggedTerms.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-red-200">
                        <p className="text-xs text-red-600">Flagged terms: {message.flaggedTerms.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message to test the abuse filter..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filter Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{messages.filter((m) => !m.isAbusive).length}</div>
                <div className="text-sm text-muted-foreground">Safe Messages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{messages.filter((m) => m.isAbusive).length}</div>
                <div className="text-sm text-muted-foreground">Flagged Messages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {messages.filter((m) => m.severity === "high").length}
                </div>
                <div className="text-sm text-muted-foreground">High Risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round((messages.filter((m) => !m.isAbusive).length / messages.length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Safety Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                <span>AI analyzes text in real-time for abusive language patterns</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <span>Messages are categorized by severity level (Low, Medium, High)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Filter className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>Specific abusive terms are highlighted for review</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
