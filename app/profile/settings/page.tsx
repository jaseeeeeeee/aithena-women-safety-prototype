"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  Shield,
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  Lock,
  Eye,
  Smartphone,
  LogOut,
  Trash2,
  Download,
  HelpCircle,
} from "lucide-react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [biometrics, setBiometrics] = useState(false)
  const [autoLock, setAutoLock] = useState(true)
  const [analytics, setAnalytics] = useState(true)

  const handleLogout = () => {
    console.log("[v0] User logged out")
    // In a real app, this would clear auth tokens and redirect
  }

  const handleDeleteAccount = () => {
    console.log("[v0] Account deletion requested")
    // In a real app, this would show confirmation dialog
  }

  const handleExportData = () => {
    console.log("[v0] Data export requested")
    // In a real app, this would generate and download user data
  }

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
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Appearance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun className="w-5 h-5" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>Customize how AiTHENA looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-base">
                  Dark Mode
                </Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-muted-foreground" />
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-base">
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Receive alerts about security threats</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Security</span>
            </CardTitle>
            <CardDescription>Protect your account and data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="biometrics" className="text-base">
                  Biometric Login
                </Label>
                <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
              </div>
              <Switch id="biometrics" checked={biometrics} onCheckedChange={setBiometrics} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-lock" className="text-base">
                  Auto-Lock
                </Label>
                <p className="text-sm text-muted-foreground">Lock app when inactive for 5 minutes</p>
              </div>
              <Switch id="auto-lock" checked={autoLock} onCheckedChange={setAutoLock} />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Privacy</span>
            </CardTitle>
            <CardDescription>Control your data and privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics" className="text-base">
                  Usage Analytics
                </Label>
                <p className="text-sm text-muted-foreground">Help improve AiTHENA with anonymous usage data</p>
              </div>
              <Switch id="analytics" checked={analytics} onCheckedChange={setAnalytics} />
            </div>

            <Separator />

            <Button variant="outline" className="w-full bg-transparent" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" />
              <span>Support</span>
            </CardTitle>
            <CardDescription>Get help and support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Smartphone className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full text-destructive hover:text-destructive bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

            <Separator />

            <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
