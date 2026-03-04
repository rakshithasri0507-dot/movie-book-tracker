const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,   // 🚀 prevents duplicates
      trim: true
    },
    genre: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["watched", "want to watch"],
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);