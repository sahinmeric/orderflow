import { Container, Typography, Stack } from "@mui/material";
import useGetOrders from "../hooks/useGetOrders";
import OrderCard from "./OrderCard";

const Orders = () => {
  const { data: orders, loading, error } = useGetOrders();

  return (
    <Container maxWidth="md">
      {error && <Typography color="error">{error}</Typography>}
      {loading ? (
        <Typography>Loading orders...</Typography>
      ) : (
        <Stack spacing={2}>
          {orders.length === 0 ? (
            <Typography>No orders available</Typography>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </Stack>
      )}
    </Container>
  );
};

export default Orders;
