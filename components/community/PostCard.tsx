'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  TrendingUp,
  Verified,
  Crown
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { type Post } from '@/lib/supabase';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const author = post.profiles;
  const category = post.categories;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-3 h-3 text-red-600" />;
      case 'vendor': return author?.vendor_verified ? <Verified className="w-3 h-3 text-purple-600" /> : null;
      default: return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={author?.avatar_url || ''} />
              <AvatarFallback>
                {(author?.full_name || author?.username || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm">
                  {author?.full_name || author?.username || 'Anonymous'}
                </span>
                {getRoleIcon(author?.role || 'buyer')}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                {category && (
                  <>
                    <span>•</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.icon} {category.name}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {post.featured && (
            <Badge className="bg-yellow-100 text-yellow-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Link href={`/community/posts/${post.id}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-purple-600 transition-colors cursor-pointer">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-3">
            {post.content}
          </p>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 5).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
              <Heart className="w-4 h-4 mr-1" />
              <span>{post.likes_count}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600" asChild>
              <Link href={`/community/posts/${post.id}`}>
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>{post.comments_count}</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href={`/community/posts/${post.id}`}>
              Read More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}