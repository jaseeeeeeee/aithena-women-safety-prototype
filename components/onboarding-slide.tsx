import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface OnboardingSlideProps {
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  iconColor: string
  bgColor: string
}

export function OnboardingSlide({
  title,
  subtitle,
  description,
  icon: IconComponent,
  iconColor,
  bgColor,
}: OnboardingSlideProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-8">
        <div className={`w-full h-48 rounded-lg bg-gradient-to-br ${bgColor} flex items-center justify-center mb-6`}>
          <IconComponent className={`w-16 h-16 ${iconColor}`} />
        </div>

        <div className="text-center space-y-4">
          <div>
            <p className="text-sm font-medium text-primary mb-1">{subtitle}</p>
            <h1 className="text-2xl font-bold text-foreground text-balance">{title}</h1>
          </div>

          <p className="text-muted-foreground text-pretty leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
