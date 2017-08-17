import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('OAuthAuthorizationCode', new Schema({
  code: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  redirectUri: {
    type: String
  },
  scope: {
    type: String,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  client: { type: Schema.Types.ObjectId, ref: 'OAuthClient' }
}));
