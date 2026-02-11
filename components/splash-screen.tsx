"use client"

import { useEffect, useState } from "react"
import { Shield } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
  duration?: number
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 300) // Allow fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [onComplete, duration])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center transition-opacity duration-300">
      <div className="text-center space-y-8 px-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-12 h-12 text-primary-foreground" />
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 w-24 h-24 border-2 border-primary/30 rounded-2xl animate-pulse"></div>
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Ai<span className="text-primary">THENA</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium">An AI that Empowers</p>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
