// Mock data for products
export type Product = {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: string;
  price: number;
  discountedPrice: number | null;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium wireless headphones with noise cancellation and long battery life.",
    image: "/placeholder.svg",
    category: "Electronics",
    price: 99.99,
    discountedPrice: 79.99,
    quantity: 45,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    description: "Soft, comfortable t-shirt made from 100% organic cotton.",
    image: "/placeholder.svg",
    category: "Clothing",
    price: 29.99,
    discountedPrice: null,
    quantity: 120,
    status: "In Stock",
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    description:
      "Durable, leak-proof water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    image: "/placeholder.svg",
    category: "Home",
    price: 24.99,
    discountedPrice: 19.99,
    quantity: 78,
    status: "In Stock",
  },
  {
    id: "4",
    name: "Leather Wallet",
    description:
      "Handcrafted genuine leather wallet with multiple card slots and RFID protection.",
    image: "/placeholder.svg",
    category: "Accessories",
    price: 49.99,
    discountedPrice: null,
    quantity: 32,
    status: "In Stock",
  },
  {
    id: "5",
    name: "Smart Watch",
    description:
      "Feature-rich smartwatch with health tracking, notifications, and customizable watch faces.",
    image: "/placeholder.svg",
    category: "Electronics",
    price: 199.99,
    discountedPrice: 149.99,
    quantity: 18,
    status: "Low Stock",
  },
  {
    id: "6",
    name: "Yoga Mat",
    description:
      "Non-slip, eco-friendly yoga mat with alignment markings for proper positioning.",
    image: "/placeholder.svg",
    category: "Fitness",
    price: 39.99,
    discountedPrice: null,
    quantity: 0,
    status: "Out of Stock",
  },
  {
    id: "7",
    name: "Ceramic Coffee Mug",
    description:
      "Stylish, microwave-safe ceramic mug that keeps your coffee at the perfect temperature.",
    image: "/placeholder.svg",
    category: "Home",
    price: 14.99,
    discountedPrice: 9.99,
    quantity: 65,
    status: "In Stock",
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    description:
      "Portable, waterproof Bluetooth speaker with 360° sound and 20-hour battery life.",
    image: "/placeholder.svg",
    category: "Electronics",
    price: 79.99,
    discountedPrice: 59.99,
    quantity: 27,
    status: "In Stock",
  },
  {
    id: "9",
    name: "Denim Jeans",
    description:
      "Classic, comfortable jeans made from premium denim with a perfect fit.",
    image: "/placeholder.svg",
    category: "Clothing",
    price: 59.99,
    discountedPrice: null,
    quantity: 92,
    status: "In Stock",
  },
  {
    id: "10",
    name: "Scented Candle",
    description:
      "Luxurious scented candle made with natural soy wax and essential oils for a calming atmosphere.",
    image: "/placeholder.svg",
    category: "Home",
    price: 19.99,
    discountedPrice: 14.99,
    quantity: 3,
    status: "Low Stock",
  },
];
