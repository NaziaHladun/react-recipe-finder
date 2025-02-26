import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  category: string;
}

const initialState: SearchState = {
  category: "",
};

const searchSlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = searchSlice.actions;
export default searchSlice.reducer;
