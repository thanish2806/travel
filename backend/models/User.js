// models/User.js
import mongoose from 'mongoose';

// User schema definition
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure username is unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true, // Password must be provided
    },
    photo: {
      type: String, // Path to user photo
    },
    role: {
      type: String,
      default: 'user', // Default role is 'user'
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the User model
export default mongoose.model('User', userSchema);
