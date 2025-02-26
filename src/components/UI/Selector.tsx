import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setCategory } from "../../store/features/searchSlice";

export const Selector = () => {
  const dispatch = useDispatch();
  const category = useSelector(
    (state: RootState) => state.searchQuery.category
  );
  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  // Отримуємо унікальні категорії з рецептів
  const uniqueCategories = [
    ...new Set(recipes.map((recipe) => recipe.strCategory)),
  ];

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setCategory(event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="select-small-label">Category</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-small"
        value={category}
        label="Category"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {uniqueCategories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
