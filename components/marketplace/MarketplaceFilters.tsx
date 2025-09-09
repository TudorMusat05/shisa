'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function MarketplaceFilters() {
  const categories = [
    { id: 'hookahs', name: 'Hookahs & Pipes', count: 124 },
    { id: 'flavors', name: 'Tobacco & Flavors', count: 256 },
    { id: 'coals', name: 'Coals & Charcoal', count: 89 },
    { id: 'accessories', name: 'Accessories', count: 167 },
    { id: 'lounge', name: 'Lounge Equipment', count: 43 }
  ];

  const brands = [
    { id: 'alfakher', name: 'Al Fakher', count: 45 },
    { id: 'starbuzz', name: 'Starbuzz', count: 32 },
    { id: 'fumari', name: 'Fumari', count: 28 },
    { id: 'adalya', name: 'Adalya', count: 24 },
    { id: 'tangiers', name: 'Tangiers', count: 19 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={category.id} />
                <Label htmlFor={category.id} className="text-sm font-normal">
                  {category.name}
                </Label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            defaultValue={[0, 500]}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id={brand.id} />
                <Label htmlFor={brand.id} className="text-sm font-normal">
                  {brand.name}
                </Label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {brand.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vendor Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="verified" />
            <Label htmlFor="verified" className="text-sm font-normal">
              Verified Vendors Only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="individual" />
            <Label htmlFor="individual" className="text-sm font-normal">
              Individual Sellers
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="business" />
            <Label htmlFor="business" className="text-sm font-normal">
              Business Accounts
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" defaultChecked />
            <Label htmlFor="in-stock" className="text-sm font-normal">
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="free-shipping" />
            <Label htmlFor="free-shipping" className="text-sm font-normal">
              Free Shipping
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}