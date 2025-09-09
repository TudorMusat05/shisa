'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function CommunityFilters() {
  const categories = [
    { id: 'general', name: 'General Discussion', count: 248, color: 'bg-blue-100 text-blue-700' },
    { id: 'reviews', name: 'Flavor Reviews', count: 156, color: 'bg-green-100 text-green-700' },
    { id: 'techniques', name: 'Setup & Techniques', count: 134, color: 'bg-purple-100 text-purple-700' },
    { id: 'lounges', name: 'Lounge Reviews', count: 89, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'equipment', name: 'Equipment Advice', count: 67, color: 'bg-red-100 text-red-700' },
    { id: 'events', name: 'Community Events', count: 23, color: 'bg-pink-100 text-pink-700' }
  ];

  const trendingTags = [
    '#alfakher', '#beginnersetup', '#coaltips', '#newbie', '#starbuzz',
    '#tangiers', '#fumari', '#adalya', '#loungereview', '#technique'
  ];

  const topMembers = [
    { name: 'SmokeExpert', posts: 145, avatar: null },
    { name: 'FlavorMaster', posts: 132, avatar: null },
    { name: 'HookahGuru', posts: 98, avatar: null },
    { name: 'CloudChaser', posts: 87, avatar: null }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <Badge className={`text-xs ${category.color}`}>
                {category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trending Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs cursor-pointer hover:bg-purple-50 hover:border-purple-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {member.name.charAt(0)}
                </div>
                <span className="text-sm font-medium">{member.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {member.posts} posts
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Posts</span>
            <span className="text-sm font-semibold">2,847</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Active Today</span>
            <span className="text-sm font-semibold">156</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">New Members</span>
            <span className="text-sm font-semibold">23</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}