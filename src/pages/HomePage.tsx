import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchRecipes } from "../store/features/recipeSlice";

import RecipeCard from "../components/RecipeCard";
import { Box, Pagination, Stack, styled } from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes } = useSelector((state: RootState) => state.recipes);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  useEffect(() => {
    dispatch(fetchRecipes(""));
  }, [dispatch]);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  return (
    <Container>
      <CardContainer>
        {currentRecipes.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            id={meal.idMeal}
            title={meal.strMeal}
            image={meal.strMealThumb}
            area={meal.strArea}
            category={meal.strCategory}
          />
        ))}
      </CardContainer>

      <PaginationStack>
        <Pagination
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
  minHeight: "calc(100vh - 200px)",
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
