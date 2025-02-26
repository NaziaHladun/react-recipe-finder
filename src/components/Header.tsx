import { TextField, Box, styled } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../store/features/recipeSlice";
import { AppDispatch } from "../store/store";
import { Selector } from "./UI/Selector";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchRecipes(inputValue));
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, dispatch]);

  return (
    <HeaderContainer>
      <Selector />
      <TextField
        label="Search recipe"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Box)(() => ({
  backgroundColor: "#E4EFE7",
  height: "80px",
  gap: 2,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
}));
