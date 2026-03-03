import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("want to watch");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get("http://localhost:5000/api/movies");
    setMovies(res.data);
  };

  const addMovie = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateMovie(editingId);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:5000/api/movies", {
        title,
        genre,
        status,
        rating,
        notes,
      });
    }

    // Clear form
    setTitle("");
    setGenre("");
    setStatus("want to watch");
    setRating("");
    setNotes("");

    fetchMovies();
  };

  const updateMovie = async (id) => {
    await axios.put(`http://localhost:5000/api/movies/${id}`, {
      title,
      genre,
      status,
      rating,
      notes,
    });
  };

  const deleteMovie = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await axios.delete(`http://localhost:5000/api/movies/${id}`);
      fetchMovies();
    }
  };

  // Filter + Search + Sort Logic
  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((movie) =>
      filter === "all" ? true : movie.status === filter
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="app-container">
      <h1 className="app-title">🎬 Movie Book Tracker</h1>

      {/* FORM */}
      <form className="form-card" onSubmit={addMovie}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="want to watch">Want to Watch</option>
          <option value="watched">Watched</option>
        </select>

        <input
          type="number"
          min="1"
          max="10"
          placeholder="Rating (1-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit" className="primary-btn">
          {editingId ? "Update Movie" : "Add Movie"}
        </button>
      </form>

      {/* SEARCH + FILTER + SORT */}
      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="watched">Watched</option>
          <option value="want to watch">Want to Watch</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      {/* STATISTICS */}
      <div className="stats">
        <h3>📊 Statistics</h3>
        <p>Total Movies: {movies.length}</p>
        <p>
          Watched: {movies.filter(m => m.status === "watched").length}
        </p>
        <p>
          Want to Watch: {movies.filter(m => m.status === "want to watch").length}
        </p>
      </div>

      {/* MOVIE LIST */}
      <h2>Movies</h2>

      {filteredMovies.map((movie) => (
        <div key={movie._id} className="movie-card">
          <h3>{movie.title}</h3>
          <p>Genre: {movie.genre}</p>

          <p>
            Status:{" "}
            <span
              className={`status-badge ${
                movie.status === "watched" ? "watched" : "want"
              }`}
            >
              {movie.status}
            </span>
          </p>

          <p>Rating: ⭐ {movie.rating}</p>
          <p>Notes: {movie.notes}</p>

          <button
            className="edit-btn"
            onClick={() => {
              setEditingId(movie._id);
              setTitle(movie.title);
              setGenre(movie.genre);
              setStatus(movie.status);
              setRating(movie.rating);
              setNotes(movie.notes);
            }}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteMovie(movie._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;