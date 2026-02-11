"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import {
  Home,
  ArrowLeft,
  Plus,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Shield,
  Users,
  Verified,
} from "lucide-react"

interface Post {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: Date
  likes: number
  comments: number
  verified: boolean
  category: string
}

export default function CommunitySpacePage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Sarah M.",
      avatar: "SM",
      content:
        "Just wanted to share that I successfully identified and avoided a phishing scam today thanks to the tips I learned here! The email looked so convincing but I remembered to check the sender's address carefully. Stay vigilant everyone! 🛡️",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      comments: 8,
      verified: true,
      category: "Success Story",
    },
    {
      id: "2",
      author: "Alex K.",
      avatar: "AK",
      content:
        "PSA: There's a new scam going around where they impersonate your bank and ask you to 'verify' your account. Remember, banks will NEVER ask for your password or PIN via email or text. Always call them directly using the number on your card!",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 31,
      comments: 12,
      verified: false,
      category: "Warning",
    },
    {
      id: "3",
      author: "Community Mod",
      avatar: "CM",
      content:
        "Weekly reminder: Update your passwords regularly and use a password manager if possible. Your future self will thank you! 💪 What's your favorite password manager? Share your recommendations below.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      likes: 18,
      comments: 15,
      verified: true,
      category: "Tips",
    },
  ])

  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")

  const handleAddPost = () => {
    if (!newPostContent.trim()) return

    const newPost: Post = {
      id: Date.now().toString(),
      author: "You",
      avatar: "YO",
      content: newPostContent,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      verified: false,
      category: "Discussion",
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
    setShowNewPost(false)
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Success Story":
        return "bg-accent text-accent-foreground"
      case "Warning":
        return "bg-destructive text-destructive-foreground"
      case "Tips":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
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
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-accent-foreground" />
            </div>
            <h1 className="text-xl font-bold">Safe Community Space</h1>
          </div>
          <Button size="sm" onClick={() => setShowNewPost(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Post
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Community Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Protected Community</p>
                    <p className="text-sm text-muted-foreground">All posts are moderated for safety</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">1,247</div>
                  <div className="text-xs text-muted-foreground">Active Members</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Post Form */}
          {showNewPost && (
            <Card>
              <CardHeader>
                <CardTitle>Share with the Community</CardTitle>
                <CardDescription>Help others stay safe by sharing your experiences and tips</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What would you like to share? Tips, experiences, warnings, or questions are all welcome..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPost} disabled={!newPostContent.trim()}>
                    Share Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{post.author}</p>
                          {post.verified && <Verified className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-muted-foreground">
                            {post.timestamp.toLocaleDateString()} at{" "}
                            {post.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          <Badge variant="outline" className={`text-xs ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm mb-4 leading-relaxed">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Community Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Community Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Be respectful and supportive of all community members</p>
              <p>• Share helpful cybersecurity tips and experiences</p>
              <p>• No personal attacks, harassment, or inappropriate content</p>
              <p>• Protect privacy - don't share personal information</p>
              <p>• Report suspicious or harmful content to moderators</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
