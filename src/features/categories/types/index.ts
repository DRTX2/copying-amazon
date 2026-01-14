export interface Category {
  id: number;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
}

export interface CategoryCardProps {
  category: Category;
  className?: string;
}
