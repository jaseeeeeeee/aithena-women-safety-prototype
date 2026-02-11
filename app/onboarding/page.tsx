"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Shield, AlertTriangle, Bot, CheckCircle } from "lucide-react"

const onboardingSlides = [
  {
    id: 1,
    title: "Digital Threats Are Everywhere",
    subtitle: "The Problem",
    description:
      "Phishing attacks, online harassment, and digital scams are increasing every day. Your personal information and peace of mind are at risk.",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    bgColor: "from-destructive/5 to-destructive/10",
  },
  {
    id: 2,
    title: "AI-Powered Protection",
    subtitle: "The Solution",
    description:
      "AiTHENA uses advanced artificial intelligence to detect threats in real-time, protecting you before damage occurs.",
    icon: Bot,
    iconColor: "text-primary",
    bgColor: "from-primary/5 to-primary/10",
  },
  {
    id: 3,
    title: "Complete Digital Security",
    subtitle: "Your Features",
    description:
      "From scam detection to password management, AiTHENA provides comprehensive protection for your digital life.",
    icon: CheckCircle,
    iconColor: "text-accent",
    bgColor: "from-accent/5 to-accent/10",
  },
]

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleGetStarted = () => {
    router.push("/auth")
  }

  const slide = onboardingSlides[currentSlide]
  const IconComponent = slide.icon

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with progress */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={prevSlide} disabled={currentSlide === 0} className="p-2">
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex space-x-2">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <Button variant="ghost" size="sm" onClick={() => router.push("/auth")} className="text-muted-foreground">
            Skip
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div
              className={`w-full h-48 rounded-lg bg-gradient-to-br ${slide.bgColor} flex items-center justify-center mb-6`}
            >
              <IconComponent className={`w-16 h-16 ${slide.iconColor}`} />
            </div>

            <div className="text-center space-y-4">
              <div>
                <p className="text-sm font-medium text-primary mb-1">{slide.subtitle}</p>
                <h1 className="text-2xl font-bold text-foreground text-balance">{slide.title}</h1>
              </div>

              <p className="text-muted-foreground text-pretty leading-relaxed">{slide.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer with navigation */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-20">
            {currentSlide > 0 && (
              <Button variant="outline" onClick={prevSlide} size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            )}
          </div>

          <div className="flex-1 flex justify-center">
            {currentSlide === onboardingSlides.length - 1 ? (
              <Button onClick={handleGetStarted} className="px-8">
                Get Started
                <Shield className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={nextSlide} className="px-8">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          <div className="w-20"></div>
        </div>
      </div>
    </div>
  )
}
