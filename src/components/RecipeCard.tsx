import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RecipeCardProps } from "../models/types";

import { Link } from "react-router-dom";
import { CardActions } from "@mui/material";
import FavoriteButton from "./UI/FavoriteButton";

export default function RecipeCard({
  id,
  title,
  image,
  area,
  category,
  recipe,
}: RecipeCardProps) {
  return (
    <Card sx={{ width: 310, height: 360 }}>
      <CardMedia sx={{ height: 140 }} image={image} title={`${title} image`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`Category: ${category}`}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`Country: ${area}`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          alignItems: "flex-end",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <Link to={`recipe/${id}`}>
          <Button size="small">View Details</Button>
        </Link>
        <FavoriteButton recipe={recipe} />
      </CardActions>
    </Card>
  );
}
