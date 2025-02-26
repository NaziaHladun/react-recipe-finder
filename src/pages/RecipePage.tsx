import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  fetchRecipeById,
  clearSelectedRecipe,
} from "../store/features/recipeSlice";

import { Box, Button, Typography, styled } from "@mui/material";
import IngredientsList from "../components/UI/IngredientsCard";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const recipe = useSelector(
    (state: RootState) => state.recipes.selectedRecipe
  );
  const status = useSelector((state: RootState) => state.recipes.status);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }

    return () => {
      dispatch(clearSelectedRecipe());
    };
  }, [dispatch, id]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (!recipe) {
    return <Typography>Recipe not found</Typography>;
  }

  return (
    <Container>
      <Link to={`/react-recipe-finder/`}>
        <BackButton variant="outlined" color="success">
          Back to recipes
        </BackButton>
      </Link>
      <Content>
        <Details>
          <Typography variant="h4">{recipe.strMeal}</Typography>
          <Typography variant="body1">
            <strong>Category:</strong> {recipe.strCategory}
          </Typography>
          <Typography variant="body1">
            <strong>Country:</strong> {recipe.strArea}
          </Typography>
        </Details>
        <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
      </Content>

      <RecipeSection>
        <IngredientsList ingredients={recipe.ingredients} />
        <Instructions>
          <Typography variant="h5">Instructions</Typography>
          <Typography variant="body1">{recipe.strInstructions}</Typography>
        </Instructions>
      </RecipeSection>
    </Container>
  );
};

export default RecipePage;

const Container = styled(Box)(() => ({
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  backgroundColor: "#fdfaf6",
  minHeight: "calc(100vh - 120px)",
}));

const Content = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "start",
  gap: "20px",
  flexWrap: "wrap",
  borderRadius: "10px",
  margin: "20px",
}));

const Image = styled("img")(() => ({
  width: "100%",
  maxWidth: "400px",
  borderRadius: "10px",
  objectFit: "cover",
}));

const Details = styled(Box)(() => ({
  flex: 1,
  textAlign: "left",
}));

const RecipeSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
  flexWrap: "wrap",
  margin: "20px",
}));

const Instructions = styled(Box)(() => ({
  flex: 1,
  textAlign: "justify",
}));

const BackButton = styled(Button)(() => ({
  margin: "10px 15px ",
}));
