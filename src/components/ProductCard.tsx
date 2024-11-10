import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { Product } from "../types/types";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <Typography variant="h6">{product.name}</Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginBottom: "8px" }}
      >
        {product.description}
      </Typography>
      <Typography variant="body1">Price: ${product.price}</Typography>
      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        Stock: {product.stock}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="contained" color="primary">
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
