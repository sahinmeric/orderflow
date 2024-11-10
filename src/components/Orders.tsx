import React, { useState, useEffect } from "react";
import { Container, Typography, Stack, Button } from "@mui/material";
import useGetOrders from "../hooks/useGetOrders";
import OrderCard from "./OrderCard";
import CreateEditOrderModal from "./CreateEditOrderModal";
import { Order } from "../types/types";

const Orders = () => {
  const { data: initialOrders, loading, error } = useGetOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const handleAdd = () => {
    setSelectedOrder(null);
    setModalMode("add");
    setOpenModal(true);
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setModalMode("edit");
    setOpenModal(true);
  };

  const handleSaveOrder = (newOrder: Order) => {
    if (modalMode === "add") {
      setOrders([...orders, newOrder]);
    } else if (modalMode === "edit" && selectedOrder) {
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id ? newOrder : order
      );
      setOrders(updatedOrders);
    }
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md">
      <Stack direction="row" justifyContent="flex-start" mb={2}>
        <Button variant="contained" onClick={handleAdd}>
          Add Order
        </Button>
      </Stack>
      {error && <Typography color="error">{error}</Typography>}
      {loading ? (
        <Typography>Loading orders...</Typography>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id} order={order} onEdit={handleEdit} />
        ))
      )}

      <CreateEditOrderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        mode={modalMode}
        order={selectedOrder}
        onSave={handleSaveOrder}
      />
    </Container>
  );
};

export default Orders;
