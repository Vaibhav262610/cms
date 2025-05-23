"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { deleteContent, getContent } from "@/lib/content-actions"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type ContentItem = {
  id: string
  title: string
  category: string
  content: string
  imageUrl: string
  createdAt: string
}

export function ContentList() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContent()
        setContent(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      try {
        await deleteContent(id)
        setContent(content.filter((item) => item.id !== id))
        toast({
          title: "Content Deleted",
          description: "The content has been successfully deleted.",
        })
        router.refresh()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete content. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading content...</div>
  }

  if (content.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="mb-4">No content found. Start by adding some content.</p>
        <Link href="/add-content">
          <Button>Add Content</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={item.imageUrl || "/placeholder.svg?height=200&width=400"}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="line-clamp-1">{item.title}</CardTitle>
              <Badge>{item.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-muted-foreground">{item.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/edit-content/${item.id}`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
