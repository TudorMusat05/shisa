/*
# Initial Shisha Platform Schema

1. New Tables
   - `profiles` - User profiles with roles and vendor info
   - `categories` - Product and post categories
   - `products` - Marketplace product listings
   - `posts` - Community forum posts
   - `comments` - Comments on posts
   - `reviews` - User and product reviews
   - `orders` - Purchase orders (placeholder for payment integration)

2. Security
   - Enable RLS on all tables
   - Add policies for role-based access control
   - Secure vendor-only operations

3. Initial Data
   - Seed categories for products and discussions
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  role text DEFAULT 'buyer' CHECK (role IN ('buyer', 'vendor', 'admin')),
  vendor_verified boolean DEFAULT false,
  vendor_description text,
  vendor_website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories for products and posts
CREATE TABLE IF NOT EXISTS categories (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('product', 'post')),
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendor_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id),
  title text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  image_url text,
  images text[], -- Array of image URLs
  tags text[],
  available boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  shipping_info text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Community posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id),
  title text NOT NULL,
  content text NOT NULL,
  tags text[],
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Comments on posts
CREATE TABLE IF NOT EXISTS comments (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Reviews for vendors and products
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  reviewer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  reviewed_user_id uuid REFERENCES profiles(id),
  product_id uuid REFERENCES products(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  type text CHECK (type IN ('vendor', 'product')),
  created_at timestamptz DEFAULT now()
);

-- Orders table (placeholder for Stripe integration)
CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  buyer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantity integer DEFAULT 1,
  total_amount decimal(10,2),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Post likes (many-to-many)
CREATE TABLE IF NOT EXISTS post_likes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Policies for products
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Vendors can create products"
  ON products FOR INSERT
  WITH CHECK (
    auth.uid() = vendor_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('vendor', 'admin')
    )
  );

CREATE POLICY "Vendors can update own products"
  ON products FOR UPDATE
  USING (auth.uid() = vendor_id);

-- Policies for posts
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id);

-- Policies for comments
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- Policies for reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Policies for orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- Policies for post_likes
CREATE POLICY "Likes are viewable by everyone"
  ON post_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like posts"
  ON post_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own likes"
  ON post_likes FOR DELETE
  USING (auth.uid() = user_id);

-- Insert initial categories
INSERT INTO categories (name, slug, type, description, icon) VALUES
-- Product categories
('Hookahs & Pipes', 'hookahs-pipes', 'product', 'Traditional and modern hookah pipes', '🪔'),
('Tobacco & Flavors', 'tobacco-flavors', 'product', 'Shisha tobacco and flavor varieties', '🍃'),
('Coals & Charcoal', 'coals-charcoal', 'product', 'Natural and quick-light coals', '🔥'),
('Accessories', 'accessories', 'product', 'Hoses, bowls, screens, and tools', '🔧'),
('Lounge Equipment', 'lounge-equipment', 'product', 'Professional lounge supplies', '🏪'),

-- Discussion categories
('General Discussion', 'general-discussion', 'post', 'General shisha conversations', '💬'),
('Flavor Reviews', 'flavor-reviews', 'post', 'Share your flavor experiences', '⭐'),
('Setup & Techniques', 'setup-techniques', 'post', 'Tips and tutorials for perfect sessions', '🎯'),
('Lounge Reviews', 'lounge-reviews', 'post', 'Reviews of hookah lounges worldwide', '📍'),
('Equipment Advice', 'equipment-advice', 'post', 'Help choosing the right gear', '🛠️'),
('Community Events', 'community-events', 'post', 'Meetups and community gatherings', '🎉');

-- Functions to update counters
CREATE OR REPLACE FUNCTION update_post_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'comments' THEN
      UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_TABLE_NAME = 'post_likes' THEN
      UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'comments' THEN
      UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
    ELSIF TG_TABLE_NAME = 'post_likes' THEN
      UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_comments_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_post_stats();

CREATE TRIGGER update_likes_count
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_stats();