import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Settings, List, Layers, ExternalLink } from "lucide-react"
import { getContent } from "@/lib/content-actions"
import { RecentContent } from "@/components/recent-content"

export default async function HomePage() {
  const content = await getContent()

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Management System</h1>
          <p className="text-muted-foreground">Manage your content and categories</p>
        </div>
        <Link href="/add-content">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Content
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Add, edit, and delete your content</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage all your content in one place. Add images, text, and categorize your content.</p>
          </CardContent>
          <CardFooter>
            <Link href="/content">
              <Button variant="outline">
                <List className="mr-2 h-4 w-4" />
                View Content
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>Organize your content with categories</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create and manage categories to organize your content for better navigation.</p>
          </CardContent>
          <CardFooter>
            <Link href="/categories">
              <Button variant="outline">
                <Layers className="mr-2 h-4 w-4" />
                Manage Categories
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Configure your API settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Set up your API configuration to allow external websites to fetch your content.</p>
          </CardContent>
          <CardFooter>
            <Link href="/api-config">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configure API
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
            <CardDescription>Learn how to use the API</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View documentation on how to integrate your content with any website.</p>
          </CardContent>
          <CardFooter>
            <Link href="/api-docs">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently Added Content</CardTitle>
          <CardDescription>View your latest content</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentContent content={content} />
        </CardContent>
      </Card>
    </div>
  )
}
