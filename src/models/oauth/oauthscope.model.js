import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('OAuthScope', new Schema({
  scope: String,
  isDefault: Boolean
}));
