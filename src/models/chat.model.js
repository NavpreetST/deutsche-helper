import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ['user', 'bot'],
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);
