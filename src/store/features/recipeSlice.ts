import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, RawMeal, RecipesState } from "../../models/types";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
  status: "idle",
  error: null,
};

//Function for grouping ingredients
const getIngredients = (meal: RawMeal) => {
  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient && ingredient !== "" && measure && measure !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return ingredients;
};

//Fetching all recipes
export const fetchRecipes = createAsyncThunk<
  Recipe[],
  string,
  { rejectValue: string }
>("recipes/fetchRecipes", async (searchTerm = "", { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}search.php?s=${searchTerm}`);
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();

    return data.meals
      ? data.meals.map((meal: RawMeal) => ({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory,
          strArea: meal.strArea,
          strInstructions: meal.strInstructions,
          ingredients: getIngredients(meal),
        }))
      : [];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

//Fetching recipe by id
export const fetchRecipeById = createAsyncThunk<
  Recipe,
  string,
  { rejectValue: string }
>("recipes/fetchRecipeById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch recipe details");
    }
    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      throw new Error("Recipe not found");
    }

    const meal = data.meals[0];

    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      strInstructions: meal.strInstructions,
      ingredients: getIngredients(meal),
    };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.status = "succeeded";
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRecipeById.fulfilled,
        (state, action: PayloadAction<Recipe>) => {
          state.status = "succeeded";
          state.selectedRecipe = action.payload;
        }
      )
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
