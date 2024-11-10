import { useEffect, useState } from "react";
import { orders } from "../services/mockData";
import { Order } from "../types/types";

const useGetOrders = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setData(orders);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to load orders");
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};

export default useGetOrders;
