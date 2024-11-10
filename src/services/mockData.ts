import { Product, Order } from "../types/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Product A",
    description: "Description of Product A",
    price: 100,
    stock: 10,
  },
  {
    id: "2",
    name: "Product B",
    description: "Description of Product B",
    price: 200,
    stock: 5,
  },
  {
    id: "3",
    name: "Product C",
    description: "Description of Product C",
    price: 150,
    stock: 8,
  },
];

export const orders: Order[] = [
  {
    id: "101",
    customerName: "Alice Johnson",
    items: [
      { ...products[0], quantity: 2 },
      { ...products[2], quantity: 1 },
    ],
    totalPrice: 350,
    status: "Pending",
    date: "2024-11-07",
  },
  {
    id: "102",
    customerName: "Bob Smith",
    items: [{ ...products[1], quantity: 3 }],
    totalPrice: 600,
    status: "Shipped",
    date: "2024-11-06",
  },
];
