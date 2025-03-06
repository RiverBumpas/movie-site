import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api"; 
import "../css/MovieDetails.css"; 

function MovieDetails() {
  const { id } = useParams();  // 🔍 Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching details for movie ID:", id); // Debugging log

    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        console.log("API Response:", data); // Debugging log

        if (!data || data.success === false) {
          setError("Movie not found.");
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError("An error occurred while fetching movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
      <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
    </div>
  );
}

export default MovieDetails;
