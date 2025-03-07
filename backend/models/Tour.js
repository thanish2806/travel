// models/Tour.js
import mongoose from 'mongoose';

// Tour schema definition
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name of the tour is required
    },
    description: {
      type: String,
      required: true, // Description is required
    },
    price: {
      type: Number,
      required: true, // Price is required
    },
    location: {
      type: String,
      required: true, // Location of the tour
    },
    duration: {
      type: String, // Duration of the tour (e.g., "5 days")
    },
    difficulty: {
      type: String, // Difficulty level of the tour (e.g., "easy", "medium", "hard")
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the Tour model
export default mongoose.model('Tour', tourSchema);
