"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { ArrowLeft, Crown, Trophy, Medal, TrendingUp } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Sarah Chen",
    username: "@sarahc",
    points: 2850,
    level: "Expert",
    avatar: "/diverse-woman-portrait.png",
    badge: "Crown",
    streak: 45,
    completedChallenges: 28,
  },
  {
    rank: 2,
    name: "Alex Rodriguez",
    username: "@alexr",
    points: 2720,
    level: "Expert",
    avatar: "/thoughtful-man.png",
    badge: "Trophy",
    streak: 32,
    completedChallenges: 26,
  },
  {
    rank: 3,
    name: "Maya Patel",
    username: "@mayap",
    points: 2650,
    level: "Advanced",
    avatar: "/woman-2.jpg",
    badge: "Medal",
    streak: 28,
    completedChallenges: 25,
  },
  {
    rank: 4,
    name: "Jordan Kim",
    username: "@jordank",
    points: 2480,
    level: "Advanced",
    avatar: "/diverse-group.png",
    badge: null,
    streak: 21,
    completedChallenges: 23,
  },
  {
    rank: 5,
    name: "Emily Johnson",
    username: "@emilyj",
    points: 2350,
    level: "Advanced",
    avatar: "/woman-3.jpg",
    badge: null,
    streak: 19,
    completedChallenges: 22,
  },
  {
    rank: 6,
    name: "David Wilson",
    username: "@davidw",
    points: 2200,
    level: "Intermediate",
    avatar: "/man-2.jpg",
    badge: null,
    streak: 15,
    completedChallenges: 20,
  },
  {
    rank: 7,
    name: "Lisa Zhang",
    username: "@lisaz",
    points: 2100,
    level: "Intermediate",
    avatar: "/woman-4.jpg",
    badge: null,
    streak: 12,
    completedChallenges: 19,
  },
  {
    rank: 8,
    name: "You",
    username: "@alex",
    points: 1850,
    level: "Intermediate",
    avatar: "/abstract-geometric-shapes.png",
    badge: null,
    streak: 8,
    completedChallenges: 17,
    isCurrentUser: true,
  },
]

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("all-time")
  const currentUser = leaderboardData.find((user) => user.isCurrentUser)

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case "Crown":
        return <Crown className="w-4 h-4 text-yellow-500" />
      case "Trophy":
        return <Trophy className="w-4 h-4 text-gray-400" />
      case "Medal":
        return <Medal className="w-4 h-4 text-amber-600" />
      default:
        return null
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "text-purple-600"
      case "Advanced":
        return "text-blue-600"
      case "Intermediate":
        return "text-green-600"
      case "Beginner":
        return "text-gray-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/challenges">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold">Leaderboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Your Rank Card */}
        {currentUser && (
          <Card className="mb-6 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Ranking</span>
                <Badge variant="outline">
                  <TrendingUp className="w-3 h-3 mr-1" />#{currentUser.rank}
                </Badge>
              </CardTitle>
              <CardDescription>Keep climbing the leaderboard!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback>
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{currentUser.name}</h3>
                    <span className="text-lg font-bold text-primary">{currentUser.points} pts</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className={getLevelColor(currentUser.level)}>{currentUser.level}</span>
                    <span>{currentUser.streak} day streak</span>
                    <span>{currentUser.completedChallenges} challenges</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeframe Selector */}
        <div className="flex space-x-2 mb-6">
          {["all-time", "monthly", "weekly"].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(period)}
              className="capitalize"
            >
              {period.replace("-", " ")}
            </Button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Top Cyber Safety Champions</CardTitle>
            <CardDescription>The most security-conscious users this {timeframe.replace("-", " ")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-end space-x-4 mb-6">
              {/* 2nd Place */}
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-2">
                  <AvatarImage src={leaderboardData[1].avatar || "/placeholder.svg"} alt={leaderboardData[1].name} />
                  <AvatarFallback>
                    {leaderboardData[1].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="w-20 h-16 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">2</span>
                </div>
                <p className="text-sm font-medium mt-1">{leaderboardData[1].name}</p>
                <p className="text-xs text-muted-foreground">{leaderboardData[1].points} pts</p>
              </div>

              {/* 1st Place */}
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-2 ring-2 ring-yellow-500">
                  <AvatarImage src={leaderboardData[0].avatar || "/placeholder.svg"} alt={leaderboardData[0].name} />
                  <AvatarFallback>
                    {leaderboardData[0].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="w-20 h-20 bg-yellow-400 rounded-t-lg flex items-center justify-center">
                  <Crown className="w-8 h-8 text-yellow-800" />
                </div>
                <p className="text-sm font-medium mt-1">{leaderboardData[0].name}</p>
                <p className="text-xs text-muted-foreground">{leaderboardData[0].points} pts</p>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-2">
                  <AvatarImage src={leaderboardData[2].avatar || "/placeholder.svg"} alt={leaderboardData[2].name} />
                  <AvatarFallback>
                    {leaderboardData[2].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="w-20 h-12 bg-amber-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-800">3</span>
                </div>
                <p className="text-sm font-medium mt-1">{leaderboardData[2].name}</p>
                <p className="text-xs text-muted-foreground">{leaderboardData[2].points} pts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
            <CardDescription>Complete leaderboard for {timeframe.replace("-", " ")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center space-x-4 p-3 rounded-lg ${
                    user.isCurrentUser ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex items-center space-x-2 w-8">
                      <span className={`text-lg font-bold ${getRankColor(user.rank)}`}>#{user.rank}</span>
                      {getBadgeIcon(user.badge)}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{user.name}</h4>
                        {user.isCurrentUser && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span className={getLevelColor(user.level)}>{user.level}</span>
                        <span>{user.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{user.points}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
