import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { Product } from "../types/types";

type AddEditProductModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  mode: "add" | "edit";
  product?: Product;
};

const AddEditProductModal = ({
  open,
  onClose,
  onSave,
  mode,
  product,
}: AddEditProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    id: "",
  });

  useEffect(() => {
    if (mode === "edit" && product) {
      setFormData(product);
    } else {
      setFormData({ name: "", description: "", price: 0, stock: 0, id: "" });
    }
  }, [mode, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
    setFormData({ name: "", description: "", price: 0, stock: 0, id: "" });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          {mode === "edit" ? "Edit Product" : "Add New Product"}
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              {mode === "edit" ? "Update" : "Save"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddEditProductModal;
