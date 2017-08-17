import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('OAuthRefreshToken', new Schema({
  refreshToken: {
    type: String,
    unique: true,
    required: true
  },
  refreshTokenExpiresAt: {
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
