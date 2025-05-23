import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

type ContentProps = {
  content: {
    id: string
    title: string
    category: string
    content: string
    imageUrl: string
    createdAt: string
  }
}

export function ContentCard({ content }: ContentProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={content.imageUrl || "/placeholder.svg?height=200&width=400"}
          alt={content.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-xl font-bold line-clamp-1">{content.title}</h2>
          <Link href={`/frontend/${content.category.toLowerCase()}`}>
            <Badge className="capitalize">{content.category}</Badge>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-4">{content.content}</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {new Date(content.createdAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  )
}
