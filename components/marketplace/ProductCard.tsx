'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ShoppingCart, Verified } from 'lucide-react';
import { type Product } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const vendor = product.profiles;
  const category = product.categories;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square relative overflow-hidden rounded-t-lg">
        <img
          src={product.image_url || 'https://images.pexels.com/photos/6540978/pexels-photo-6540978.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {category && (
            <Badge className="bg-white/90 text-gray-700 hover:bg-white">
              {category.icon} {category.name}
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-green-100 text-green-700">
            ${product.price}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {vendor && (
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={vendor.avatar_url || ''} />
              <AvatarFallback className="text-xs">
                {(vendor.full_name || vendor.username || 'V').charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">
              {vendor.full_name || vendor.username}
            </span>
            {vendor.vendor_verified && (
              <Verified className="w-4 h-4 text-purple-600" />
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8 (24)</span>
          </div>
          <div className="text-sm text-gray-600">
            {product.stock_quantity > 0 ? (
              <span className="text-green-600">In Stock ({product.stock_quantity})</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1" size="sm" asChild>
          <Link href={`/marketplace/products/${product.id}`}>
            View Details
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}