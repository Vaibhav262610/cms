"use server"

import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const configFilePath = path.join(process.cwd(), "data", "api-config.json")

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Default API configuration
const defaultConfig = {
  allowedOrigins: ["*"],
  enableCors: true,
  apiKey: uuidv4(),
}

// Get API configuration
export async function getApiConfig() {
  await ensureDataDirectory()

  try {
    const fileData = await fs.readFile(configFilePath, "utf-8")
    return JSON.parse(fileData)
  } catch (error) {
    // If file doesn't exist, create default config
    await fs.writeFile(configFilePath, JSON.stringify(defaultConfig, null, 2))
    return defaultConfig
  }
}

// Save API configuration
export async function saveApiConfig(config: any) {
  await ensureDataDirectory()
  await fs.writeFile(configFilePath, JSON.stringify(config, null, 2))
  return config
}

// Validate API key
export async function validateApiKey(apiKey: string) {
  const config = await getApiConfig()
  return config.apiKey === apiKey
}

// Check if origin is allowed
export async function isOriginAllowed(origin: string) {
  const config = await getApiConfig()

  if (!config.enableCors) {
    return false
  }

  if (config.allowedOrigins.includes("*")) {
    return true
  }

  return config.allowedOrigins.includes(origin)
}
