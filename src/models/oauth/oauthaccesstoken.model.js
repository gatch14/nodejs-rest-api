import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('OAuthAccessToken', new Schema({
  accessToken: {
    type: String,
    unique: true,
    required: true
  },
  accessTokenExpiresAt: {
    type: Date,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  client: { type: Schema.Types.ObjectId, ref: 'OAuthClient' }
}));
