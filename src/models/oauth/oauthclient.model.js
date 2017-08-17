import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('OAuthClient', new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  clientId: {
    type: String,
    unique: true,
    required: true
  },
  clientSecret: {
    type: String,
    required: true
  },
  redirectUri: {
    type: [ String ]
  },
  grants: {
    type: [ String ],
    default: [ 'authorization_code', 'password', 'refresh_token', 'client_credentials' ]
  },
  scope: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}));
