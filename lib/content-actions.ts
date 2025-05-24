"use server"

import connectDB from './mongodb';
import Content from '../models/Content';

// Get all content
export async function getContent() {
  try {
    await connectDB();
    const content = await Content.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(content));
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
}

// Get content by ID
export async function getContentById(id: string) {
  if (!id) {
    return null;
  }

  try {
    await connectDB();
    const content = await Content.findById(id);
    return content ? JSON.parse(JSON.stringify(content)) : null;
  } catch (error) {
    console.error('Error fetching content by ID:', error);
    return null;
  }
}

// Add new content
export async function addContent(contentData: any) {
  try {
    await connectDB();
    
    // Ensure we have at least one image URL
    const imageUrls = Array.isArray(contentData.imageUrls) 
      ? contentData.imageUrls.filter((url: string) => url.trim() !== '')
      : [];

    if (imageUrls.length === 0) {
      throw new Error('Please provide at least one image URL');
    }

    // Create new content with only the new schema fields
    const content = await Content.create({
      title: contentData.title,
      subtitle: contentData.subtitle,
      category: contentData.category,
      content: contentData.content,
      imageUrls: imageUrls,
    });

    return JSON.parse(JSON.stringify(content));
  } catch (error: any) {
    console.error('Error adding content:', error);
    if (error.name === 'ValidationError') {
      throw new Error(error.message);
    }
    throw new Error('Failed to add content');
  }
}

// Update content
export async function updateContent(id: string, contentData: any) {
  try {
    await connectDB();
    const content = await Content.findByIdAndUpdate(
      id,
      {
        ...contentData,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!content) {
      throw new Error('Content not found');
    }
    return JSON.parse(JSON.stringify(content));
  } catch (error) {
    console.error('Error updating content:', error);
    throw new Error('Failed to update content');
  }
}

// Delete content
export async function deleteContent(id: string) {
  try {
    await connectDB();
    await Content.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting content:', error);
    throw new Error('Failed to delete content');
  }
}
