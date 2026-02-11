"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, type LucideIcon } from "lucide-react"

interface SecurityFeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  status: "active" | "premium"
  color: string
  textColor: string
  onClick?: () => void
}

export function SecurityFeatureCard({
  title,
  description,
  icon: IconComponent,
  status,
  color,
  textColor,
  onClick,
}: SecurityFeatureCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
            <IconComponent className={`w-6 h-6 ${textColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-foreground text-sm">{title}</h4>
              {status === "premium" && (
                <Badge variant="secondary" className="text-xs">
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-3">{description}</p>
            <Button size="sm" variant={status === "premium" ? "outline" : "default"} className="w-full">
              {status === "premium" ? "Upgrade to Use" : "Open"}
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
