const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");  // ✅ import mongoose

const app = express();

app.use(cors());
app.use(express.json());

// ✅ PUT MONGODB CONNECTION HERE
mongoose.connect("mongodb://127.0.0.1:27017/movietracker")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Routes
const movieRoutes = require("./routes/movieRoutes");
app.use("/api/movies", movieRoutes);

// ✅ Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});