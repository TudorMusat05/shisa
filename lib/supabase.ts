import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: 'buyer' | 'vendor' | 'admin';
  vendor_verified: boolean;
  vendor_description: string | null;
  vendor_website: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  vendor_id: string;
  category_id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  images: string[] | null;
  tags: string[] | null;
  available: boolean;
  stock_quantity: number;
  shipping_info: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  categories?: Category;
};

export type Post = {
  id: string;
  author_id: string;
  category_id: string;
  title: string;
  content: string;
  tags: string[] | null;
  likes_count: number;
  comments_count: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  categories?: Category;
};

export type Comment = {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  profiles?: Profile;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  type: 'product' | 'post';
  description: string | null;
  icon: string | null;
  created_at: string;
};

export type Review = {
  id: string;
  reviewer_id: string;
  reviewed_user_id: string | null;
  product_id: string | null;
  rating: number;
  comment: string | null;
  type: 'vendor' | 'product';
  created_at: string;
  profiles?: Profile;
};