import { Box, styled } from "@mui/material";

interface IngredientsProps {
  ingredients: { ingredient: string; measure: string }[];
}

const IngredientsList = ({ ingredients }: IngredientsProps) => {
  return (
    <IngredientsContainer>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((item) => (
          <IngredientItem key={item.ingredient + item.measure}>
            {item.ingredient}: <span>{item.measure}</span>
          </IngredientItem>
        ))}
      </ul>
    </IngredientsContainer>
  );
};

export default IngredientsList;

const IngredientsContainer = styled(Box)(() => ({
  backgroundColor: "#fdf1dc",
  padding: "15px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "300px",
  width: "100%",
  fontFamily: "Georgia, serif",
  fontStyle: "italic",
  float: "left",
  marginRight: "20px",
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
