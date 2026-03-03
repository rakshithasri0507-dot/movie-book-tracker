const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// ✅ GET all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// ✅ POST new movie
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const savedMovie = await movie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ PUT update movie (ADD THIS HERE)
router.put("/:id", async (req, res) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedMovie);
});

// ✅ DELETE movie
router.delete("/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
});

module.exports = router;