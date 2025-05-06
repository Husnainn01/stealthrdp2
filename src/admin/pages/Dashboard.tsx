import React from 'react';
import { FileText, Package, MessageSquare, Image, Users, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Placeholder data - will be replaced with real data from MongoDB later
  const dashboardStats = [
    {
      title: 'Plans',
      count: 11,
      icon: <Package className="h-8 w-8 text-cyber" />,
      description: 'Hosting plans available',
      link: '/admin/plans'
    },
    {
      title: 'Features',
      count: 18,
      icon: <FileText className="h-8 w-8 text-electric" />,
      description: 'Product features',
      link: '/admin/features'
    },
    {
      title: 'Testimonials',
      count: 3,
      icon: <MessageSquare className="h-8 w-8 text-cyber" />,
      description: 'Customer testimonials',
      link: '/admin/testimonials'
    },
    {
      title: 'Blog Posts',
      count: 0,
      icon: <FileText className="h-8 w-8 text-electric" />,
      description: 'Published articles',
      link: '/admin/blog'
    },
    {
      title: 'Media Items',
      count: 24,
      icon: <Image className="h-8 w-8 text-cyber" />,
      description: 'Images and files',
      link: '/admin/media'
    },
    {
      title: 'Admin Users',
      count: 1,
      icon: <Users className="h-8 w-8 text-electric" />,
      description: 'Admin accounts',
      link: '/admin/settings'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-white/70">Overview of your website content and statistics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((stat, i) => (
          <Card key={i} className="bg-midnight/60 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.count}</div>
              <p className="text-xs text-white/70 mt-1">{stat.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="hover:text-electric">
                <Link to={stat.link} className="flex items-center gap-1 text-xs">
                  Manage {stat.title} <ArrowUpRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-midnight/60 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription className="text-white/70">Latest content changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* This will be populated from the database later */}
              <div className="border-b border-white/10 pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Homepage Updated</p>
                    <p className="text-xs text-white/70">Removed testimonial section</p>
                  </div>
                  <span className="text-xs text-white/50">2 days ago</span>
                </div>
              </div>
              <div className="border-b border-white/10 pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">New Plan Added</p>
                    <p className="text-xs text-white/70">Added Platinum EU plan</p>
                  </div>
                  <span className="text-xs text-white/50">5 days ago</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">User Interface Updated</p>
                    <p className="text-xs text-white/70">Updated pricing section</p>
                  </div>
                  <span className="text-xs text-white/50">1 week ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-midnight/60 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription className="text-white/70">Commonly used tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-electric/30 text-electric hover:bg-electric/10">
                <FileText className="mr-2 h-4 w-4" />
                Create New Blog Post
              </Button>
              <Button variant="outline" className="w-full justify-start border-cyber/30 text-cyber hover:bg-cyber/10">
                <Package className="mr-2 h-4 w-4" />
                Update Plan Pricing
              </Button>
              <Button variant="outline" className="w-full justify-start border-electric/30 text-electric hover:bg-electric/10">
                <MessageSquare className="mr-2 h-4 w-4" />
                Add New Testimonial
              </Button>
              <Button variant="outline" className="w-full justify-start border-cyber/30 text-cyber hover:bg-cyber/10">
                <Image className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 