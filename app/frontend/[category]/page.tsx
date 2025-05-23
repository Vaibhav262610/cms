import { getContent } from "@/lib/content-actions"
import { getCategories } from "@/lib/category-actions"
import { FrontendLayout } from "@/components/frontend-layout"
import { ContentCard } from "@/components/content-card"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const content = await getContent()
  const categories = await getCategories()

  const filteredContent = content.filter((item: any) => item.category.toLowerCase() === params.category.toLowerCase())

  return (
    <FrontendLayout categories={categories}>
      <h1 className="text-3xl font-bold mb-6 capitalize">{params.category}</h1>
      {filteredContent.length === 0 ? (
        <div className="text-center py-10">
          <p>No content found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item: any) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      )}
    </FrontendLayout>
  )
}
