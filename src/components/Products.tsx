import React, { useEffect, useState } from "react";
import { Container, Button, Stack } from "@mui/material";
import AddEditProductModal from "./AddEditProductModal";
import ProductCard from "./ProductCard";
import ConfirmationModal from "./ConfirmationModal";
import SnackbarNotification from "./SnackbarNotification";
import useGetProducts from "../hooks/useGetProducts";
import { Product } from "../types/types";

const Products = () => {
  const { data: products, loading, error } = useGetProducts();
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

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
    showSnackbar("Product added successfully!", "success");
  };

  const handleEditProduct = (updatedProduct: Product) => {
    if (selectedProduct) {
      const updatedList = productList.map((prod) =>
        prod.id === selectedProduct.id ? updatedProduct : prod
      );
      setProductList(updatedList);
      showSnackbar("Product updated successfully!", "success");
    }
    setSelectedProduct(null);
    setOpenModal(false);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      const updatedList = productList.filter(
        (product) => product.id !== selectedProduct.id
      );
      setProductList(updatedList);
      showSnackbar("Product deleted successfully!", "success");
    }
    setSelectedProduct(null);
    setOpenConfirmModal(false);
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

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setOpenConfirmModal(true);
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md">
      <Stack direction="row" justifyContent="flex-start" mb={2}>
        <Button variant="contained" onClick={handleAdd}>
          Add Product
        </Button>
      </Stack>
      {error && (
        <SnackbarNotification
          open={true}
          onClose={handleCloseSnackbar}
          message="Error loading products!"
          severity="error"
        />
      )}
      {!loading &&
        productList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

      <AddEditProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={modalMode === "add" ? handleAddProduct : handleEditProduct}
        mode={modalMode}
        product={selectedProduct || undefined}
      />

      <ConfirmationModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete ${selectedProduct?.name}?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />

      <SnackbarNotification
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Container>
  );
};

export default Products;
