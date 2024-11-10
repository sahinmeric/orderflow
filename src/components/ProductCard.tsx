import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { Product } from "../types/types";

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
};

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  return (
    <Container
      maxWidth="md"
      sx={{ border: "1px solid #ddd", padding: "16px", marginBottom: "16px" }}
    >
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="body2">{product.description}</Typography>
      <Typography variant="body1">Price: ${product.price}</Typography>
      <Typography variant="body1">Stock: {product.stock}</Typography>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="contained" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </Stack>
    </Container>
  );
};

export default ProductCard;
