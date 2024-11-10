import React from "react";
import { Box, CircularProgress } from "@mui/material";
import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "./ProductCard";

const Products = () => {
  const { data: products, loading, error } = useGetProducts();

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <Box p={3}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default Products;
