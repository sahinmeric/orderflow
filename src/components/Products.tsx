import React, { useEffect, useState } from "react";
import { Container, Button, Stack } from "@mui/material";
import AddProductModal from "./AddProductModal";
import ProductCard from "./ProductCard";
import useGetProducts from "../hooks/useGetProducts";
import { Product } from "../types/types";

const Products = () => {
  const { data: products, loading, error } = useGetProducts();
  const [openModal, setOpenModal] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleAddProduct = (newProduct: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) => {
    const uniqueId = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    const productWithId: Product = { ...newProduct, id: uniqueId };
    setProductList([...productList, productWithId]);
  };

  return (
    <Container maxWidth="md">
      <Stack direction="row" justifyContent="flex-start" mb={2}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Product
        </Button>
      </Stack>
      {error && <p>{error}</p>}
      {!loading &&
        productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddProduct}
      />
    </Container>
  );
};

export default Products;
