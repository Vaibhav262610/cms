import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema); 