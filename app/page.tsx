import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  MessageCircle, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Globe,
  Star,
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Store className="w-6 h-6" />,
      title: "Global Marketplace",
      description: "Buy and sell authentic shisha products from verified vendors worldwide"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Vibrant Community",
      description: "Connect with fellow enthusiasts, share experiences, and learn new techniques"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Network",
      description: "Get advice from seasoned experts and certified vendor partners"
    }
  ];

  const stats = [
    { number: "2,500+", label: "Active Members" },
    { number: "1,200+", label: "Products Listed" },
    { number: "50+", label: "Verified Vendors" },
    { number: "25+", label: "Countries" }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Welcome to the Future of Shisha Community
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shisha Hub
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              The ultimate destination for shisha enthusiasts. Discover premium products, connect with the community, and elevate your experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/marketplace">
                  Explore Marketplace
                  <Store className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/community">
                  Join Community
                  <MessageCircle className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-2">
                <div className="text-3xl font-bold text-purple-600">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Shisha Hub?</h2>
          <p className="text-xl text-gray-600">Everything you need for the perfect shisha experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: "Hookahs", icon: "🪔", color: "from-blue-400 to-blue-600" },
            { name: "Flavors", icon: "🍃", color: "from-green-400 to-green-600" },
            { name: "Coals", icon: "🔥", color: "from-red-400 to-red-600" },
            { name: "Accessories", icon: "🔧", color: "from-purple-400 to-purple-600" },
            { name: "Lounges", icon: "🏪", color: "from-yellow-400 to-yellow-600" }
          ].map((category, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-0 text-center space-y-2">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Community Highlights */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Join the Conversation</h2>
            <p className="text-xl text-gray-600">See what the community is talking about</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Best Setup for Beginners?",
                category: "General Discussion",
                replies: 24,
                likes: 18,
                author: "SmokeExpert",
                time: "2 hours ago"
              },
              {
                title: "Al Fakher Double Apple Review",
                category: "Flavor Reviews",
                replies: 12,
                likes: 31,
                author: "FlavorMaster",
                time: "4 hours ago"
              }
            ].map((post, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>by {post.author}</span>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replies}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/community">
                View All Discussions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Hub?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with thousands of shisha enthusiasts, discover amazing products, and be part of the ultimate community.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/auth/register">
              Get Started Today
              <Users className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}