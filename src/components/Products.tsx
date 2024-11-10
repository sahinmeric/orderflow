import React from "react";
import { Box, CircularProgress } from "@mui/material";
import useGetProducts from "../hooks/useGetProducts";

const Products = () => {
  const { data: products, loading, error } = useGetProducts();

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <Box p={3}>
      {products.map((product) => (
        <Box
          key={product.id}
          sx={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
        >
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </Box>
      ))}
    </Box>
  );
};

export default Products;
