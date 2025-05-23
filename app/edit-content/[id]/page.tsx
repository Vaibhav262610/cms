import { EditContentForm } from "@/components/edit-content-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getContentById } from "@/lib/content-actions"
import { notFound } from "next/navigation"

export default async function EditContentPage({ params }: { params: { id: string } }) {
  const content = await getContentById(params.id)

  if (!content) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/content">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Content
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Content</h1>
          <p className="text-muted-foreground">Update your content</p>
        </div>
      </div>
      <EditContentForm content={content} />
    </div>
  )
}
