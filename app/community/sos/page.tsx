"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Phone, MessageSquare, MapPin, Clock } from "lucide-react"

export default function SOSPage() {
  const [alertTriggered, setAlertTriggered] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const triggerSOS = () => {
    setAlertTriggered(true)
    setCountdown(10)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const cancelSOS = () => {
    setAlertTriggered(false)
    setCountdown(0)
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
            <div className="w-8 h-8 bg-destructive rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive-foreground" />
            </div>
            <h1 className="text-xl font-bold">SOS Safety Button</h1>
          </div>
          <Badge variant="destructive">Emergency</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        <div className="max-w-md mx-auto space-y-6">
          {/* Emergency Button */}
          <Card className={`text-center ${alertTriggered ? "border-destructive" : ""}`}>
            <CardHeader>
              <CardTitle className="text-destructive">Emergency Alert System</CardTitle>
              <CardDescription>
                {alertTriggered
                  ? "Alert is being sent to emergency contacts and authorities"
                  : "Press the button below if you need immediate help"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!alertTriggered ? (
                <Button
                  size="lg"
                  variant="destructive"
                  className="w-32 h-32 rounded-full text-xl font-bold"
                  onClick={triggerSOS}
                >
                  <div className="flex flex-col items-center">
                    <AlertTriangle className="w-8 h-8 mb-2" />
                    SOS
                  </div>
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-full bg-destructive/10 border-4 border-destructive flex items-center justify-center">
                    <div className="text-center">
                      <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
                      <div className="text-2xl font-bold text-destructive">{countdown}</div>
                    </div>
                  </div>
                  <Button variant="outline" onClick={cancelSOS} className="w-full bg-transparent">
                    Cancel Alert
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status */}
          {alertTriggered && (
            <Card className="border-destructive">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Emergency Alert Active</p>
                    <p className="text-sm">Notifying emergency contacts...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Emergency Contacts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Emergency Services</p>
                  <p className="text-sm text-muted-foreground">911</p>
                </div>
                <Badge variant="secondary">Primary</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <Badge variant="outline">Contact</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Crisis Helpline</p>
                  <p className="text-sm text-muted-foreground">988</p>
                </div>
                <Badge variant="outline">Support</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>SOS Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Location Sharing</p>
                  <p className="text-sm text-muted-foreground">Automatically shares your location</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Silent Alert</p>
                  <p className="text-sm text-muted-foreground">Sends alerts without sound</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">24/7 Monitoring</p>
                  <p className="text-sm text-muted-foreground">Round-the-clock emergency response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
