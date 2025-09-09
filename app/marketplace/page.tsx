import { Suspense } from 'react';
import { MarketplaceGrid } from '@/components/marketplace/MarketplaceGrid';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MarketplaceHeader />
      
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <MarketplaceFilters />
        </aside>
        
        <main className="lg:col-span-3">
          <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
            <MarketplaceGrid />
          </Suspense>
        </main>
      </div>
    </div>
  );
}