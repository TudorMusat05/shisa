'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function CommunityHeader() {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-gray-600">Connect, share, and learn with fellow shisha enthusiasts</p>
        </div>
        
        <Button asChild>
          <Link href="/community/posts/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search discussions..." className="pl-10" />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="reviews">Reviews</SelectItem>
              <SelectItem value="techniques">Techniques</SelectItem>
              <SelectItem value="lounges">Lounges</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="latest">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <TrendingUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}