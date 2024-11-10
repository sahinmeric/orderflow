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
} from "@mui/material";
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
      const newItem: OrderItem = { ...product, quantity };
      setSelectedItems([...selectedItems, newItem]);
      setSelectedProductId("");
      setQuantity(1);
    }
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

          <Box>
            {selectedItems.map((item, index) => (
              <Typography key={index}>
                {item.name} (x{item.quantity}) - ${item.price * item.quantity}
              </Typography>
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
