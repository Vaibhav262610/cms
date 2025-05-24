import { notFound } from "next/navigation"
import { EditContentForm } from "@/components/edit-content-form"
import { getContentById } from "@/lib/content-actions"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditContentPage({ params }: PageProps) {
  try {
    const content = await getContentById(params.id)

    if (!content) {
      notFound()
    }

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Edit Content</h1>
        <EditContentForm contentId={params.id} />
      </div>
    )
  } catch (error) {
    console.error('Error loading edit page:', error)
    notFound()
  }
}
