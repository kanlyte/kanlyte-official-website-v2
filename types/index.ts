export interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
}

export interface Order {
  id: string
  customerName: string
  email: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  totalOrders: number
  totalSpent: number
  createdAt: string
}
