import { getContent } from "@/lib/content-actions"
import { getCategories } from "@/lib/category-actions"
import { FrontendLayout } from "@/components/frontend-layout"
import { ContentCard } from "@/components/content-card"

export default async function FrontendPage() {
  const content = await getContent()
  const categories = await getCategories()

  return (
    <FrontendLayout categories={categories}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item: any) => (
          <ContentCard key={item.id} content={item} />
        ))}
      </div>
    </FrontendLayout>
  )
}
