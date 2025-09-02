import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardMedia, CardContent, Typography, CircularProgress, Box, Grid } from "@mui/material";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("API hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) return <div>Film bulunamadı.</div>;

  return (
    <Card sx={{ maxWidth: 900, margin: "20px auto", p: 2, boxShadow: 3 }}>
      <Grid container spacing={2}>
        {/* Poster */}
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            sx={{ width: "100%", maxHeight: 500, objectFit: "cover", borderRadius: 2 }}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </Grid>

        {/* İçerik */}
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {movie.overview}
            </Typography>
            <Typography variant="body2">Release Date: {movie.release_date}</Typography>
            <Typography variant="body2">Rating: {movie.vote_average}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MovieDetail;
