import { ApiConfigForm } from "@/components/api-config-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getApiConfig } from "@/lib/api-config"

export default async function ApiConfigPage() {
  const config = await getApiConfig()

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
          <h1 className="text-3xl font-bold">API Configuration</h1>
          <p className="text-muted-foreground">Configure your API settings for external access</p>
        </div>
      </div>
      <ApiConfigForm initialConfig={config} />
    </div>
  )
}
