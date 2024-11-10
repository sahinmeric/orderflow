import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderItem, Order } from "../types/types";
import { products } from "../services/mockData";

type CreateEditOrderModalProps = {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  order?: Order | null;
  onSave: (order: Order) => void;
};

const CreateEditOrderModal = ({
  open,
  onClose,
  mode,
  order,
  onSave,
}: CreateEditOrderModalProps) => {
  const [customerName, setCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (mode === "edit" && order) {
      setCustomerName(order.customerName);
      setSelectedItems(order.items);
    } else {
      setCustomerName("");
      setSelectedItems([]);
    }
  }, [mode, order]);

  const handleAddItem = () => {
    const product = products.find((p) => p.id === selectedProductId);
    if (product) {
      const existingItemIndex = selectedItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...selectedItems];
        updatedItems[existingItemIndex].quantity += quantity;
        setSelectedItems(updatedItems);
      } else {
        const newItem: OrderItem = { ...product, quantity };
        setSelectedItems([...selectedItems, newItem]);
      }
      setSelectedProductId("");
      setQuantity(1);
    }
  };

  const handleDeleteItem = (productId: string) => {
    const updatedItems = selectedItems.filter((item) => item.id !== productId);
    setSelectedItems(updatedItems);
  };

  const handleSave = () => {
    const newOrder: Order = {
      id:
        order?.id ||
        `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      customerName,
      items: selectedItems,
      totalPrice: selectedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    onSave(newOrder);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">
          {mode === "edit" ? "Edit Order" : "Create Order"}
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Select Product</InputLabel>
            <Select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddItem}
            disabled={!selectedProductId}
          >
            Add Item
          </Button>

          {/* Display the list of selected items */}
          <Box>
            {selectedItems.map((item, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ marginTop: 2 }}
              >
                <Typography>
                  {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!customerName || selectedItems.length === 0}
            >
              {mode === "edit" ? "Update" : "Create"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateEditOrderModal;
