import { Card, CardMedia, CardContent, Typography, CardActionArea, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";



const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); // detay sayfasına yönlendir
  };
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some((f) => f.id === movie.id);


  return (
    <Card sx={{ maxWidth: 200, margin: 1, transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" } }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        
        <IconButton  sx={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.2)" }
                        }}
            color={isFavorite ? "error" : "default"}
            onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}>
            <FavoriteIcon />
        </IconButton>
        
        <CardContent sx={{ padding: "8px" }}>
          <Typography variant="h6" noWrap>{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {movie.vote_average}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
