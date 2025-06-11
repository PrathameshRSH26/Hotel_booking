import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    index: true 
  },
  email: { 
    type: String, 
    index: true,
    lowercase: true
  },
  image: String,
  role: { 
    type: String, 
    enum: ["user", "hotelOwner"], 
    default: "user" 
  },
  recentSearchCities: [{ 
    type: String,
    trim: true 
  }]
}, { 
  timestamps: true,
  optimisticConcurrency: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  }
});

// Add indexes
userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });

const User = mongoose.model("User", userSchema);
export default User;