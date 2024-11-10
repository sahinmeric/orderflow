export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export type OrderItem = Product & {
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  status: "Pending" | "Shipped" | "Delivered";
  date: string;
};
