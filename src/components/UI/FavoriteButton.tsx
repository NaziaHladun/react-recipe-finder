import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/features/recipeSlice";

import { RootState } from "../../store/store";
import { FavoriteButtonProps } from "../../models/types";

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ recipe }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.recipes.favorites.some((fav) => fav.idMeal === recipe.idMeal)
  );

  const handleToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe.idMeal));
    } else {
      dispatch(addToFavorites(recipe));
    }
  };

  return (
    <IconButton onClick={handleToggle}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
