"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { saveApiConfig } from "@/lib/api-config"
import { useRouter } from "next/navigation"

type ApiConfig = {
  allowedOrigins: string[]
  enableCors: boolean
  apiKey: string
}

export function ApiConfigForm({ initialConfig }: { initialConfig: ApiConfig }) {
  const router = useRouter()
  const [config, setConfig] = useState<ApiConfig>(initialConfig)
  const [newOrigin, setNewOrigin] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddOrigin = () => {
    if (!newOrigin) return

    // Validate URL format
    try {
      new URL(newOrigin)
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      })
      return
    }

    setConfig({
      ...config,
      allowedOrigins: [...config.allowedOrigins, newOrigin],
    })
    setNewOrigin("")
  }

  const handleRemoveOrigin = (origin: string) => {
    setConfig({
      ...config,
      allowedOrigins: config.allowedOrigins.filter((o) => o !== origin),
    })
  }

  const handleToggleCors = (checked: boolean) => {
    setConfig({
      ...config,
      enableCors: checked,
    })
  }

  const generateApiKey = () => {
    const newApiKey = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    setConfig({
      ...config,
      apiKey: newApiKey,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await saveApiConfig(config)
      toast({
        title: "Configuration Saved",
        description: "Your API configuration has been updated successfully.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>CORS Settings</CardTitle>
            <CardDescription>
              Configure Cross-Origin Resource Sharing (CORS) to allow external websites to access your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="enable-cors" checked={config.enableCors} onCheckedChange={handleToggleCors} />
              <Label htmlFor="enable-cors">Enable CORS</Label>
            </div>

            <div className="space-y-2">
              <Label>Allowed Origins</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="https://example.com"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  disabled={!config.enableCors}
                />
                <Button type="button" onClick={handleAddOrigin} disabled={!config.enableCors}>
                  Add
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {config.enableCors
                  ? "Add the URLs of websites that will access your content"
                  : "Enable CORS to add allowed origins"}
              </p>
            </div>

            {config.allowedOrigins.length > 0 && (
              <div className="space-y-2">
                <Label>Current Allowed Origins</Label>
                <div className="space-y-2">
                  {config.allowedOrigins.map((origin) => (
                    <div key={origin} className="flex justify-between items-center p-2 border rounded-md">
                      <span className="text-sm truncate">{origin}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveOrigin(origin)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Key</CardTitle>
            <CardDescription>Generate an API key to secure your content API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Current API Key</Label>
              <div className="flex space-x-2">
                <Input id="api-key" value={config.apiKey} readOnly />
                <Button type="button" onClick={generateApiKey}>
                  Generate New
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This key will be required to access your API. Keep it secure.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Use these endpoints to access your content from external websites</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Content Endpoint</Label>
              <div className="p-2 bg-muted rounded-md font-mono text-sm overflow-x-auto">
                {`${typeof window !== "undefined" ? window.location.origin : ""}/api/content?apiKey=${config.apiKey}`}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Categories Endpoint</Label>
              <div className="p-2 bg-muted rounded-md font-mono text-sm overflow-x-auto">
                {`${typeof window !== "undefined" ? window.location.origin : ""}/api/categories?apiKey=${config.apiKey}`}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      </div>
    </form>
  )
}
