import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  subtitle: {
    type: String,
    required: [true, 'Please provide a subtitle'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  imageUrls: {
    type: [String],
    required: [true, 'Please provide at least one image URL'],
    validate: {
      validator: function(v: string[]) {
        return Array.isArray(v) && v.length > 0 && v.every(url => typeof url === 'string' && url.trim() !== '');
      },
      message: 'Please provide at least one valid image URL'
    }
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

// Drop the old collection if it exists
if (mongoose.models.Content) {
  delete mongoose.models.Content;
}

export default mongoose.model('Content', ContentSchema); 