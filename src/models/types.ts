export interface RawMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  ingredients: { ingredient: string; measure: string }[];
}

export interface RecipesState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  favorites: Recipe[];
}

export interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  area: string;
  category: string;
  recipe: Recipe;
}

export interface FavoriteButtonProps {
  recipe: Recipe;
}
