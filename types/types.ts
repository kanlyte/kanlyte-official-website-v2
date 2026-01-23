export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  image: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  nextCursor?: string;
  total: number;
}

export interface StatsData {
  totalCategories: number;
  totalProducts: number;
  productsPerCategory: Array<{
    categoryId: string;
    categoryName: string;
    productCount: number;
  }>;
  priceStats: {
    min: number;
    max: number;
    average: number;
  };
  lastUpdated: string;
}

export interface StatCard {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  description: string;
  footer: string;
}
