import { ContentList } from "@/components/content-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, PlusCircle } from "lucide-react"

export default function ContentPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">View and manage your content</p>
        </div>
        <Link href="/add-content">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Content
          </Button>
        </Link>
      </div>
      <ContentList />
    </div>
  )
}
