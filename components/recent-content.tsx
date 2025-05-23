import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

type ContentItem = {
  id: string
  title: string
  category: string
  content: string
  imageUrl: string
  createdAt: string
}

export function RecentContent({ content }: { content: ContentItem[] }) {
  // Sort by date (newest first) and take the 5 most recent items
  const recentContent = [...content]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  if (recentContent.length === 0) {
    return (
      <div className="text-center py-6">
        <p>No content has been added yet. Start by adding some content.</p>
        <Link href="/add-content" className="mt-4 inline-block">
          <Button>Add Content</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentContent.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
              <Image
                src={item.imageUrl || "/placeholder.svg?height=200&width=200"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <Badge>{item.category}</Badge>
              </div>
              <p className="text-muted-foreground line-clamp-2 mb-4">{item.content}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                <Link href={`/edit-content/${item.id}`}>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
