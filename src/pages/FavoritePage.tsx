import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Button, Typography, styled } from "@mui/material";
import { Link } from "react-router";

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.recipes.favorites);

  const ingredientsMap = new Map();
  favorites.forEach((recipe) => {
    recipe.ingredients.forEach(({ ingredient, measure }) => {
      if (ingredientsMap.has(ingredient)) {
        ingredientsMap.set(
          ingredient,
          `${ingredientsMap.get(ingredient)} + ${measure}`
        );
      } else {
        ingredientsMap.set(ingredient, measure);
      }
    });
  });

  return (
    <Container>
      <Nav>
        <Link to={`/`}>
          <BackButton variant="outlined" color="success">
            Back to recipes
          </BackButton>
        </Link>
      </Nav>
      <Typography variant="h4">Favorites</Typography>
      <RecipeGrid>
        {favorites.map((recipe) => (
          <RecipeCardStyled key={recipe.idMeal}>
            <RecipeImage src={recipe.strMealThumb} alt={recipe.strMeal} />
            <Box>
              <Typography variant="h6">{recipe.strMeal}</Typography>
              <Typography variant="body2">
                Category: {recipe.strCategory}
              </Typography>
              <Typography variant="body2">Country: {recipe.strArea}</Typography>
            </Box>
          </RecipeCardStyled>
        ))}
      </RecipeGrid>

      <IngredientsList>
        <Typography variant="h5">Total Ingredients</Typography>
        <ul>
          {Array.from(ingredientsMap.entries()).map(([ingredient, measure]) => (
            <IngredientItem key={ingredient}>
              {ingredient}: {measure}
            </IngredientItem>
          ))}
        </ul>
      </IngredientsList>
    </Container>
  );
};

export default FavoritesPage;

const Container = styled(Box)(() => ({
  maxWidth: "800px",
  margin: "auto",
  padding: "20px",
  textAlign: "center",
  minHeight: "calc(100vh - 120px)",
}));

const RecipeGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  margin: "20px 0",
}));

const RecipeCardStyled = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#fff",
}));

const RecipeImage = styled("img")(() => ({
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
}));

const IngredientsList = styled(Box)(() => ({
  textAlign: "left",
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#fdfaf6",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
}));

const IngredientItem = styled("li")(() => ({
  fontStyle: "italic",
  color: "#5a4a42",
  listStyleType: "none",
  padding: "5px 0",
  borderBottom: "1px dashed #8b6f47",
  "& span": {
    fontWeight: "bold",
    color: "#7a5c3e",
  },
}));

const Nav = styled("nav")(() => ({
  display: "flex",
}));

const BackButton = styled(Button)(() => ({
  margin: "10px 0",
}));
