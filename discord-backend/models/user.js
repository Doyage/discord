import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);

export default User;
