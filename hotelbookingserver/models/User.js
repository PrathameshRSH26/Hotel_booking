import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'hotelOwner', 'admin'],
    default: 'user'
  },
  recentSearchCities: [{
    type: String,
    trim: true
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes
userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });

const User = mongoose.model('User', userSchema);
export default User;