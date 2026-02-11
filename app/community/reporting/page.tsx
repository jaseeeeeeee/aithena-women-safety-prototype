"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Shield, ArrowLeft, FileText, Lock, CheckCircle, AlertTriangle, MessageSquare, Globe } from "lucide-react"

export default function ReportingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [reportType, setReportType] = useState("")
  const [description, setDescription] = useState("")
  const [anonymous, setAnonymous] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const reportTypes = [
    { id: "harassment", label: "Harassment/Bullying", icon: MessageSquare },
    { id: "phishing", label: "Phishing/Scam", icon: Shield },
    { id: "inappropriate", label: "Inappropriate Content", icon: AlertTriangle },
    { id: "privacy", label: "Privacy Violation", icon: Lock },
    { id: "other", label: "Other", icon: FileText },
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Link href="/community">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent-foreground" />
              </div>
              <h1 className="text-xl font-bold">Report Submitted</h1>
            </div>
          </div>
        </header>

        <main className="p-4 pb-20">
          <div className="max-w-md mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-xl font-bold mb-2">Report Submitted Successfully</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for helping make our community safer. Your report has been received and will be reviewed by
                  our team.
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">Report ID</span>
                    <Badge variant="secondary">#RPT-2024-001</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">Status</span>
                    <Badge variant="default">Under Review</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">Expected Response</span>
                    <span className="text-sm text-muted-foreground">24-48 hours</span>
                  </div>
                </div>
                <Button className="w-full mt-6" onClick={() => setSubmitted(false)}>
                  Submit Another Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/community">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="w-8 h-8 bg-chart-4 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Anonymous Reporting</h1>
          </div>
          <Badge variant="secondary">Secure</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        <div className="max-w-md mx-auto space-y-6">
          {/* Privacy Notice */}
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-primary">Your Privacy is Protected</p>
                  <p className="text-sm text-muted-foreground">
                    All reports are encrypted and can be submitted anonymously. Your identity is never shared without
                    your consent.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit a Report</CardTitle>
              <CardDescription>Help us keep the community safe by reporting incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Report Type */}
                <div className="space-y-3">
                  <Label>What would you like to report?</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {reportTypes.map((type) => {
                      const IconComponent = type.icon
                      return (
                        <div
                          key={type.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            reportType === type.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                          }`}
                          onClick={() => setReportType(type.id)}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span className="text-sm">{type.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide details about the incident..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="additional">Additional Information (Optional)</Label>
                  <Input id="additional" placeholder="URLs, usernames, or other relevant details" />
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={anonymous}
                    onCheckedChange={(checked) => setAnonymous(checked as boolean)}
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Submit this report anonymously
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={!reportType || !description}>
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Support Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-medium">Crisis Helpline</p>
                  <p className="text-sm text-muted-foreground">Call 988 for immediate support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Online Resources</p>
                  <p className="text-sm text-muted-foreground">Visit our help center for guidance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
