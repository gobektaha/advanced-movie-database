import { useEffect, useState } from "react";
import { getPopularMovies, getTopRatedMovies, searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { Grid, Typography, TextField, Button, ButtonGroup, Box } from "@mui/material";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("popular"); // popular, top_rated, upcoming
  const [loading, setLoading] = useState(true);

  // Filmleri çek
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data = [];
        if (searchTerm.trim() !== "") {
          data = await searchMovies(searchTerm);
        } else {
          if (category === "popular") data = await getPopularMovies();
          else if (category === "top_rated") data = await getTopRatedMovies();
        }
        setMovies(data);
      } catch (error) {
        console.error("API hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, searchTerm]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>Movies & Series</Typography>

      {/* Arama */}
      <TextField
        label="Search.."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Kategori Butonları */}
      <ButtonGroup variant="contained" sx={{ marginBottom: 2 }}>
        <Button
          color={category === "popular" ? "primary" : "default"}
          onClick={() => setCategory("popular")}
        >
          Popular
        </Button>
        <Button
          color={category === "top_rated" ? "primary" : "default"}
          onClick={() => setCategory("top_rated")}
        >
          Most Voted
        </Button>
      </ButtonGroup>

      {/* Film Listesi */}
      {loading ? (
        <Typography>Yükleniyor...</Typography>
      ) : (
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
