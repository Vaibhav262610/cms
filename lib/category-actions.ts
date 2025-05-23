"use server"

import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const categoriesFilePath = path.join(process.cwd(), "data", "categories.json")

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Get all categories
export async function getCategories() {
  await ensureDataDirectory()

  try {
    const fileData = await fs.readFile(categoriesFilePath, "utf-8")
    return JSON.parse(fileData)
  } catch (error) {
    // If file doesn't exist, return default categories
    const defaultCategories = [
      { id: uuidv4(), name: "Technology" },
      { id: uuidv4(), name: "Health" },
      { id: uuidv4(), name: "Education" },
      { id: uuidv4(), name: "Entertainment" },
      { id: uuidv4(), name: "Business" },
    ]

    await fs.writeFile(categoriesFilePath, JSON.stringify(defaultCategories, null, 2))
    return defaultCategories
  }
}

// Add new category
export async function addCategory(name: string) {
  await ensureDataDirectory()

  const categories = await getCategories()

  const newCategory = {
    id: uuidv4(),
    name,
  }

  categories.push(newCategory)
  await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2))

  return newCategory
}

// Update category
export async function updateCategory(id: string, name: string) {
  const categories = await getCategories()

  const index = categories.findIndex((cat: any) => cat.id === id)
  if (index === -1) {
    throw new Error("Category not found")
  }

  categories[index] = {
    ...categories[index],
    name,
  }

  await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2))

  return categories[index]
}

// Delete category
export async function deleteCategory(id: string) {
  const categories = await getCategories()

  const newCategories = categories.filter((cat: any) => cat.id !== id)

  await fs.writeFile(categoriesFilePath, JSON.stringify(newCategories, null, 2))

  return { success: true }
}
