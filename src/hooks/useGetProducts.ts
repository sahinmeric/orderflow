import { useEffect, useState } from "react";
import { products } from "../services/mockData";
import { Product } from "../types/types";

const useGetProducts = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setData(products);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};

export default useGetProducts;
