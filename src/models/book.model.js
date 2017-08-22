import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('Book', new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}));
