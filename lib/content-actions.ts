"use server"

import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const contentFilePath = path.join(process.cwd(), "data", "content.json")

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Get all content
export async function getContent() {
  await ensureDataDirectory()

  try {
    const fileData = await fs.readFile(contentFilePath, "utf-8")
    return JSON.parse(fileData)
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

// Get content by ID
export async function getContentById(id: string) {
  const content = await getContent()
  return content.find((item: any) => item.id === id)
}

// Add new content
export async function addContent(contentData: any) {
  await ensureDataDirectory()

  const content = await getContent()

  const newContent = {
    id: uuidv4(),
    ...contentData,
    createdAt: new Date().toISOString(),
  }

  content.push(newContent)
  await fs.writeFile(contentFilePath, JSON.stringify(content, null, 2))

  return newContent
}

// Update content
export async function updateContent(id: string, contentData: any) {
  const content = await getContent()

  const index = content.findIndex((item: any) => item.id === id)
  if (index === -1) {
    throw new Error("Content not found")
  }

  content[index] = {
    ...content[index],
    ...contentData,
    updatedAt: new Date().toISOString(),
  }

  await fs.writeFile(contentFilePath, JSON.stringify(content, null, 2))

  return content[index]
}

// Delete content
export async function deleteContent(id: string) {
  const content = await getContent()

  const newContent = content.filter((item: any) => item.id !== id)

  await fs.writeFile(contentFilePath, JSON.stringify(newContent, null, 2))

  return { success: true }
}
