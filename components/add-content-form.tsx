"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { addContent } from "@/lib/content-actions"

export function AddContentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    content: "",
    imageUrls: [""],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleImageUrlChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newImageUrls = [...prev.imageUrls]
      newImageUrls[index] = value
      return { ...prev, imageUrls: newImageUrls }
    })
  }

  const addImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""]
    }))
  }

  const removeImageUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await addContent(formData)
      toast({
        title: "Content Added",
        description: "Your content has been successfully added.",
      })
      router.push("/content")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter content title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              name="subtitle"
              placeholder="Enter subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter your content here..."
              value={formData.content}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            {formData.imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Enter image URL"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  required
                />
                {formData.imageUrls.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeImageUrl(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addImageUrl}
              className="mt-2"
            >
              Add Another Image
            </Button>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Content"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
