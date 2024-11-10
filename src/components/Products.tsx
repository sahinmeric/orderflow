import React, { useEffect, useState } from "react";
import { Container, Button, Stack } from "@mui/material";
import AddEditProductModal from "./AddEditProductModal";
import ProductCard from "./ProductCard";
import useGetProducts from "../hooks/useGetProducts";
import { Product } from "../types/types";

const Products = () => {
  const { data: products, loading, error } = useGetProducts();
  const [openModal, setOpenModal] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleAddProduct = (newProduct: Product) => {
    const uniqueId = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    const productWithId: Product = { ...newProduct, id: uniqueId };
    setProductList([...productList, productWithId]);
    setOpenModal(false);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    if (selectedProduct) {
      const updatedList = productList.map((prod) =>
        prod.id === selectedProduct.id ? updatedProduct : prod
      );
      setProductList(updatedList);
    }
    setSelectedProduct(null);
    setOpenModal(false);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalMode("edit");
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setModalMode("add");
    setOpenModal(true);
  };

  return (
    <Container maxWidth="md">
      <Stack direction="row" justifyContent="flex-start" mb={2}>
        <Button variant="contained" onClick={handleAdd}>
          Add Product
        </Button>
      </Stack>
      {error && <p>{error}</p>}
      {!loading &&
        productList.map((product) => (
          <ProductCard key={product.id} product={product} onEdit={handleEdit} />
        ))}

      <AddEditProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={modalMode === "add" ? handleAddProduct : handleEditProduct}
        mode={modalMode}
        product={selectedProduct || undefined}
      />
    </Container>
  );
};

export default Products;
