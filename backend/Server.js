import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import User from './models/User.js';  // User model
import Tour from './models/Tour.js';  // Tour model
import Review from './models/Review.js';  // Review model

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// CREATE a new user
app.post('/users', async (req, res) => {
  const { username, email, password, photo } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,  // Don't forget to hash passwords in a real scenario
      photo,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err });
  }
});

// CREATE a new tour
app.post('/tours', async (req, res) => {
  const { name, description, price, location, duration, difficulty } = req.body;

  try {
    const newTour = new Tour({
      name,
      description,
      price,
      location,
      duration,
      difficulty,
    });

    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(400).json({ message: 'Error creating tour', error: err });
  }
});

// CREATE a review for a tour
app.post('/reviews', async (req, res) => {
  const { tourId, userId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      tour: tourId,
      user: userId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: 'Error creating review', error: err });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});