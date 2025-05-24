"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { deleteContent, getContent } from "@/lib/content-actions"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type ContentItem = {
  _id: string
  title: string
  subtitle: string
  category: string
  content: string
  imageUrls: string[]
  createdAt: string
}

export function ContentList() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})
  const router = useRouter()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContent()
        setContent(data)
      } catch (error) {
        console.error('Error fetching content:', error)
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
        setContent(content.filter((item) => item._id !== id))
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

  const handlePreviousImage = (itemId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0 - 1 + totalImages) % totalImages
    }))
  }

  const handleNextImage = (itemId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0 + 1) % totalImages
    }))
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
        <Card key={item._id} className="overflow-hidden">
          <div className="relative h-48 w-full group">
            <Image
              src={item.imageUrls[currentImageIndex[item._id] || 0] || "/placeholder.svg?height=200&width=400"}
              alt={item.title}
              fill
              className="object-cover"
            />
            {item.imageUrls.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handlePreviousImage(item._id, item.imageUrls.length)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleNextImage(item._id, item.imageUrls.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {item.imageUrls.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === (currentImageIndex[item._id] || 0)
                          ? "bg-white"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.subtitle}</p>
              </div>
              <Badge>{item.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-muted-foreground">{item.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/edit-content/${item._id}`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(item._id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
