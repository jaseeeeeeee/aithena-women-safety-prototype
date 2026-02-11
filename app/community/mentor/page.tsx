"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MessageCircle, ArrowLeft, Send, Bot, User, Shield, Lightbulb, AlertTriangle } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "mentor"
  timestamp: Date
  type?: "tip" | "warning" | "info"
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI Cyber Safety Mentor. I'm here to help you stay safe online. What would you like to learn about today?",
      sender: "mentor",
      timestamp: new Date(),
      type: "info",
    },
    {
      id: "2",
      content:
        "💡 **Quick Tip**: Always verify the sender before clicking on links in emails. Hover over links to see where they actually lead!",
      sender: "mentor",
      timestamp: new Date(),
      type: "tip",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickQuestions = [
    "How do I spot phishing emails?",
    "What makes a strong password?",
    "How to protect my social media?",
    "What is two-factor authentication?",
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getMentorResponse(inputMessage),
        sender: "mentor",
        timestamp: new Date(),
        type: "info",
      }
      setMessages((prev) => [...prev, mentorResponse])
    }, 1000)
  }

  const getMentorResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("phishing") || lowerQuestion.includes("email")) {
      return 'Great question! Here are key signs of phishing emails:\n\n🚨 **Red Flags:**\n• Urgent language ("Act now!")\n• Generic greetings ("Dear Customer")\n• Suspicious sender addresses\n• Unexpected attachments\n• Requests for personal info\n\n✅ **Always verify** by contacting the company directly through official channels!'
    }

    if (lowerQuestion.includes("password")) {
      return "Strong passwords are your first line of defense! Here's how to create them:\n\n🔐 **Password Best Practices:**\n• Use 12+ characters\n• Mix letters, numbers, symbols\n• Avoid personal information\n• Use unique passwords for each account\n• Consider a password manager\n\n💡 **Pro tip**: Use passphrases like \"Coffee!Beach#Sunset2024\" - they're strong and memorable!"
    }

    if (lowerQuestion.includes("social media")) {
      return "Social media safety is crucial! Here's how to protect yourself:\n\n🔒 **Privacy Settings:**\n• Review who can see your posts\n• Limit personal information visibility\n• Be careful with location sharing\n• Check app permissions regularly\n\n⚠️ **Remember**: Once online, it's permanent. Think before you post!"
    }

    if (lowerQuestion.includes("two-factor") || lowerQuestion.includes("2fa")) {
      return "Two-Factor Authentication (2FA) adds an extra security layer!\n\n🛡️ **How it works:**\n• Something you know (password)\n• Something you have (phone/app)\n\n📱 **Best 2FA methods:**\n• Authenticator apps (Google, Authy)\n• Hardware keys\n• SMS (less secure but better than nothing)\n\nEnable 2FA on all important accounts - email, banking, social media!"
    }

    return "That's an interesting question! While I don't have a specific answer for that, here are some general cyber safety principles:\n\n🛡️ **Stay Safe Online:**\n• Keep software updated\n• Use strong, unique passwords\n• Be skeptical of unsolicited messages\n• Backup important data\n• Trust your instincts\n\nFeel free to ask about specific topics like passwords, phishing, social media safety, or privacy settings!"
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
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
            <div className="w-8 h-8 bg-chart-5 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Cyber Safety Mentor</h1>
          </div>
          <Badge variant="secondary">AI Powered</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col h-[calc(100vh-140px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === "mentor" && (
                    <div className="w-6 h-6 bg-chart-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    {message.type && (
                      <div className="flex items-center space-x-1 mb-1">
                        {message.type === "tip" && <Lightbulb className="w-3 h-3 text-primary" />}
                        {message.type === "warning" && <AlertTriangle className="w-3 h-3 text-destructive" />}
                        {message.type === "info" && <Shield className="w-3 h-3 text-accent" />}
                        <Badge variant="outline" className="text-xs">
                          {message.type === "tip" ? "Tip" : message.type === "warning" ? "Warning" : "Info"}
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-t bg-card">
          <div className="mb-3">
            <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about cyber safety..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
