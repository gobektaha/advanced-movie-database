import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { Grid, Typography } from "@mui/material";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  if (!favorites.length) return <Typography>Favori film yok.</Typography>;

  return (
    <Grid container spacing={2}>
      {favorites.map((movie) => (
        <Grid item key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Favorites;
