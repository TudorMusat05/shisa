import { Suspense } from 'react';
import { CommunityHeader } from '@/components/community/CommunityHeader';
import { CommunityFilters } from '@/components/community/CommunityFilters';
import { PostsFeed } from '@/components/community/PostsFeed';

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CommunityHeader />
      
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <CommunityFilters />
        </aside>
        
        <main className="lg:col-span-3">
          <Suspense fallback={<div className="text-center py-8">Loading discussions...</div>}>
            <PostsFeed />
          </Suspense>
        </main>
      </div>
    </div>
  );
}