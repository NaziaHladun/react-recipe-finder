import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchRecipes } from "../store/features/recipeSlice";

import RecipeCard from "../components/RecipeCard";
import { Box, Button, Pagination, Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes } = useSelector((state: RootState) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const selectedCategory = useSelector(
    (state: RootState) => state.searchQuery.category
  );

  const filteredRecipes = selectedCategory
    ? recipes.filter((meal) => meal.strCategory === selectedCategory)
    : recipes;

  useEffect(() => {
    dispatch(fetchRecipes(""));
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, filteredRecipes.length]);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginationView = totalPages > 1 ? "visible" : "hidden";

  return (
    <Container>
      <Nav>
        <Link to={`favorites`}>
          <Button variant="outlined" color="success">
            Favorites
          </Button>
        </Link>
      </Nav>
      <CardContainer>
        {currentRecipes.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            id={meal.idMeal}
            title={meal.strMeal}
            image={meal.strMealThumb}
            area={meal.strArea}
            category={meal.strCategory}
            recipe={meal}
          />
        ))}
      </CardContainer>

      <PaginationStack>
        <Pagination
          sx={{ visibility: paginationView }}
          count={totalPages}
          page={currentPage}
          onChange={(_event, value) => {
            setCurrentPage(value);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </PaginationStack>
    </Container>
  );
};

export default HomePage;

const Container = styled(Box)(() => ({
  maxWidth: "980px",
  width: "100%",
  margin: "auto",
  backgroundColor: "#fdfaf6",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
}));

const CardContainer = styled(Box)(() => ({
  minHeight: "calc(100vh - 252px)",
  padding: "20px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "16px",
}));

const PaginationStack = styled(Stack)(() => ({
  margin: "auto",
  height: "80px",
  alignItems: "center",
  justifyContent: "center",
}));

const Nav = styled("nav")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "15px",
}));
