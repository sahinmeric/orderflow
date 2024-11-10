import React from "react";
import { Container, Typography, Button, Stack, Box } from "@mui/material";
import { Order, OrderItem } from "../types/types";

type OrderCardProps = {
  order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
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
      <Typography variant="h6">Order #{order.id}</Typography>
      <Typography variant="subtitle1">
        Customer: {order.customerName}
      </Typography>
      <Typography variant="body2">Date: {order.date}</Typography>
      <Typography variant="body2" sx={{ marginBottom: "8px" }}>
        Status: {order.status}
      </Typography>
      <Box>
        <Typography variant="subtitle1">Items:</Typography>
        {order.items.map((item: OrderItem) => (
          <Typography key={item.id} variant="body2">
            - {item.name} (Quantity: {item.quantity}) - $
            {item.price * item.quantity}
          </Typography>
        ))}
      </Box>
      <Typography variant="h6" sx={{ marginTop: "8px" }}>
        Total: ${order.totalPrice}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ marginTop: "16px" }}
      >
        <Button variant="contained">Edit</Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </Stack>
    </Container>
  );
};

export default OrderCard;
