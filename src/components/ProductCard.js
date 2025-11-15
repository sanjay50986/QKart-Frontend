import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  let { name, category, cost, rating, image} = product;

  return (
    <Card className="card">
      <CardMedia component="img" alt={name} src={image} />

      <CardContent>
        <Typography color="primary" variant="h5">
          {name}
        </Typography>

        <Typography color="text-secondary" variant="subtitle2">
          {category}
        </Typography>

        <Typography color="text-secondary" variant="subtitle2">
          {`$${cost}`}
        </Typography>
      </CardContent>
      <Rating name="read-only" value={rating} precision={0.5} readOnly />

      <CardActions className="card-actions">
        <Button
          startIcon={<AddShoppingCartOutlined />}
          onClick={handleAddToCart}
          fullWidth
          className="card-button"
          variant="contained"
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
