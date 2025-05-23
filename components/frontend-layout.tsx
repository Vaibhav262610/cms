import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MountainIcon } from "lucide-react"

type Category = {
  id: string
  name: string
}

export function FrontendLayout({
  children,
  categories,
}: {
  children: React.ReactNode
  categories: Category[]
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <Link href="/frontend" className="flex items-center gap-2">
              <MountainIcon className="h-6 w-6" />
              <span className="font-bold text-xl">Content Website</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/frontend" className="hover:text-primary">
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/frontend/${category.name.toLowerCase()}`}
                  className="hover:text-primary capitalize"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <Link href="/" className="text-sm">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="container mx-auto">{children}</div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Content Website. All rights reserved.
            </p>
            <div className="flex gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/frontend/${category.name.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-foreground capitalize"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
