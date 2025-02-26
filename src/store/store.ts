import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./features/recipeSlice";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    searchQuery: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
