import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{ height: 300 }} component={Link} to={`/products/${product.productId}`}>
        <CardMedia component="img" height="140" image={product.imageUrl} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price} ₫
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
