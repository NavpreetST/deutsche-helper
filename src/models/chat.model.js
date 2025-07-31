import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ['user', 'bot'],
  },
  text: {
    type: String,
    required: true,
  },
}, { _id: false });

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
}, {
  timestamps: true,
});

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);
