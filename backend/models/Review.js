// models/Review.js
import mongoose from 'mongoose';

// Review schema definition
const reviewSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true, // The review is linked to a specific tour
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // The review is linked to a specific user
    },
    rating: {
      type: Number,
      required: true, // Rating is required
      min: 1,
      max: 5, // Rating should be between 1 and 5
    },
    comment: {
      type: String,
      required: true, // Comment is required
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Export the Review model
export default mongoose.model('Review', reviewSchema);
