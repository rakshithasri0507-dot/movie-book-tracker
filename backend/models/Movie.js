const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  status: { type: String, enum: ["want to watch", "watched"], default: "want to watch" },
  rating: { type: Number, min: 1, max: 10 },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);