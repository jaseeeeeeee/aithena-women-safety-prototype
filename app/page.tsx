"use client"
import { useRouter } from "next/navigation"
import { SplashScreen } from "@/components/splash-screen"

export default function HomePage() {
  const router = useRouter()

  const handleSplashComplete = () => {
    router.push("/onboarding")
  }

  return <SplashScreen onComplete={handleSplashComplete} duration={3000} />
}
