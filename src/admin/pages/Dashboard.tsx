import React, { useState, useEffect } from 'react';
import { FileText, Package, MessageSquare, Image, Users, ArrowUpRight, BarChart3, TrendingUp, Activity, Clock, Calendar, User, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
// Import API services
import { planApi } from '@/lib/api/planApi';
import { featureApi } from '@/lib/api/featureApi';
import { testimonialApi } from '@/lib/api/testimonialApi';
import { faqApi } from '@/lib/api/faqApi';
import { mediaApi } from '@/lib/api/mediaApi';

// Add custom animation styles
const dashboardAnimations = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.1); }
    70% { box-shadow: 0 0 0 10px rgba(0, 240, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
  
  .dashboard-card-animate {
    animation: fadeIn 0.6s ease-out forwards;
    transition: all 0.3s ease;
  }
  
  .dashboard-card-animate:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 240, 255, 0.3);
  }
  
  .stats-icon-container {
    animation: float 6s ease-in-out infinite;
    transition: all 0.3s ease;
  }
  
  .stats-icon-container:hover {
    transform: scale(1.1) translateY(-5px);
  }
  
  .progress-bar-animate {
    transition: width 1s ease-in-out;
  }
  
  .quick-action-btn {
    transition: all 0.2s ease;
  }
  
  .quick-action-btn:hover {
    transform: translateX(5px);
  }
  
  .activity-item {
    transition: all 0.2s ease;
  }
  
  .activity-item:hover {
    background-color: rgba(34, 212, 107, 0.05);
    padding-left: 8px;
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  // Add state variables for data counts
  const [plansCount, setPlansCount] = useState(0);
  const [featuresCount, setFeaturesCount] = useState(0);
  const [testimonialsCount, setTestimonialsCount] = useState(0);
  const [faqsCount, setFaqsCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0); // Changed from hardcoded 24 to 0
  const [adminUsersCount, setAdminUsersCount] = useState(1); // Fallback to hardcoded (no API yet)
  
  // Add loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get time-based greeting
  useEffect(() => {
    const updateTimeDetails = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Set greeting based on time of day
      if (hour < 12) setGreeting('Good morning');
      else if (hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
      
      // Format current time
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }));
      
      // Format current date
      setCurrentDate(now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    };
    
    updateTimeDetails();
    const interval = setInterval(updateTimeDetails, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Fetch all data needed for the dashboard
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch plans data
      const plans = await planApi.getPlans();
      setPlansCount(plans.length);
      
      // Fetch features data
      const features = await featureApi.getFeatures();
      setFeaturesCount(features.length);
      
      // Fetch testimonials data
      const testimonials = await testimonialApi.getAllTestimonials();
      setTestimonialsCount(testimonials.length);
      
      // Fetch FAQs data
      const faqs = await faqApi.getAllFaqs();
      setFaqsCount(faqs.length);
      
      // Fetch media items data
      const media = await mediaApi.getAllMedia();
      setMediaCount(media.length);
      
      // Admin users would come from respective API when available
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load some dashboard data');
    } finally {
      setLoading(false);
    }
  };
  
  // Call the fetch function when component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Dashboard stats with real data
  const dashboardStats = [
    {
      title: 'Plans',
      count: plansCount,
      prevCount: 8, // We'll keep previous counts as is for now
      change: plansCount > 8 ? `+${((plansCount - 8) / 8 * 100).toFixed(1)}%` : 
             plansCount < 8 ? `-${((8 - plansCount) / 8 * 100).toFixed(1)}%` : '0%',
      icon: <Package className="h-8 w-8 text-cyber" />,
      description: 'Hosting plans available',
      link: '/admin/plans',
      color: 'cyber',
      progress: plansCount > 0 ? Math.min(100, (plansCount / 15) * 100) : 0 // Using 15 as potential max value
    },
    {
      title: 'Features',
      count: featuresCount,
      prevCount: 15,
      change: featuresCount > 15 ? `+${((featuresCount - 15) / 15 * 100).toFixed(1)}%` : 
              featuresCount < 15 ? `-${((15 - featuresCount) / 15 * 100).toFixed(1)}%` : '0%',
      icon: <FileText className="h-8 w-8 text-electric" />,
      description: 'Product features',
      link: '/admin/features',
      color: 'electric',
      progress: featuresCount > 0 ? Math.min(100, (featuresCount / 20) * 100) : 0
    },
    {
      title: 'Testimonials',
      count: testimonialsCount,
      prevCount: 2,
      change: testimonialsCount > 2 ? `+${((testimonialsCount - 2) / 2 * 100).toFixed(1)}%` : 
              testimonialsCount < 2 ? `-${((2 - testimonialsCount) / 2 * 100).toFixed(1)}%` : '0%',
      icon: <MessageSquare className="h-8 w-8 text-cyber" />,
      description: 'Customer testimonials',
      link: '/admin/testimonials',
      color: 'cyber',
      progress: testimonialsCount > 0 ? Math.min(100, (testimonialsCount / 10) * 100) : 0
    },
    {
      title: 'FAQs',
      count: faqsCount,
      prevCount: 0,
      change: faqsCount > 0 ? '+100%' : '0%',
      icon: <FileText className="h-8 w-8 text-electric" />,
      description: 'Help & support items',
      link: '/admin/faqs',
      color: 'electric',
      progress: faqsCount > 0 ? Math.min(100, (faqsCount / 20) * 100) : 0
    },
    {
      title: 'Media Items',
      count: mediaCount,
      prevCount: 18,
      change: mediaCount > 18 ? `+${((mediaCount - 18) / 18 * 100).toFixed(1)}%` : 
              mediaCount < 18 ? `-${((18 - mediaCount) / 18 * 100).toFixed(1)}%` : '0%',
      icon: <Image className="h-8 w-8 text-cyber" />,
      description: 'Images and files',
      link: '/admin/media',
      color: 'cyber',
      progress: mediaCount > 0 ? Math.min(100, (mediaCount / 30) * 100) : 0
    },
    {
      title: 'Admin Users',
      count: adminUsersCount,
      prevCount: 1,
      change: '0%',
      icon: <Users className="h-8 w-8 text-electric" />,
      description: 'Admin accounts',
      link: '/admin/settings',
      color: 'electric',
      progress: 100
    }
  ];

  // Get summary counts for overview
  const totalItems = dashboardStats.reduce((acc, stat) => acc + stat.count, 0);
  const activeItems = dashboardStats.filter(stat => stat.count > 0).length;

  // Recent activity data
  const recentActivity = [
    {
      title: 'Homepage Updated',
      description: 'Removed testimonial section',
      timeAgo: '2 days ago',
      icon: <FileText className="h-4 w-4 text-electric" />,
      type: 'update'
    },
    {
      title: 'New Plan Added',
      description: 'Added Platinum EU plan',
      timeAgo: '5 days ago',
      icon: <Package className="h-4 w-4 text-cyber" />,
      type: 'create'
    },
    {
      title: 'User Interface Updated',
      description: 'Updated pricing section',
      timeAgo: '1 week ago',
      icon: <Settings className="h-4 w-4 text-electric" />,
      type: 'update'
    }
  ];

  // Quick actions with icon mappings
  const quickActions = [
    {
      label: 'Add New FAQ',
      icon: <FileText className="h-4 w-4" />,
      link: '/admin/faqs',
      color: 'electric'
    },
    {
      label: 'Add New Plan',
      icon: <Package className="h-4 w-4" />,
      link: '/admin/plans',
      color: 'cyber'
    },
    {
      label: 'Add New Testimonial',
      icon: <MessageSquare className="h-4 w-4" />,
      link: '/admin/testimonials',
      color: 'electric'
    },
    {
      label: 'Add New Feature',
      icon: <FileText className="h-4 w-4" />,
      link: '/admin/features',
      color: 'cyber'
    }
  ];

  // Loading indicator render
  if (loading && !error) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric mx-auto"></div>
          <p className="text-white/70">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Inject custom animation styles */}
      <style>{dashboardAnimations}</style>
      
      {/* Display error if any */}
      {error && (
        <div className="bg-red-500/10 rounded-lg border border-red-500/20 p-4 text-red-400 mb-4">
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {error}
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 border-red-500/20 text-white hover:bg-red-500/10 transition-all"
            onClick={fetchDashboardData}
          >
            Retry
          </Button>
        </div>
      )}
      
      {/* Welcome section with time and user info */}
      <div className="bg-midnight/60 rounded-lg border border-white/10 p-6 dashboard-card-animate" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              {greeting}, {user?.username}
              <span className="inline-block w-2 h-2 rounded-full bg-cyber animate-pulse ml-1"></span>
            </h1>
            <p className="text-white/70 mt-1 flex items-center gap-2">
              <Clock className="h-4 w-4 text-electric" />
              <span>{currentTime}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 text-electric" />
              <span>{currentDate}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-charcoal/70 rounded-lg py-2 px-4 border border-white/5">
              <div className="mr-3">
                <div className="text-xs text-white/70">Content Items</div>
                <div className="text-xl font-bold text-white">{totalItems}</div>
              </div>
              <Activity className="h-8 w-8 text-electric" />
            </div>
            
            <div className="bg-charcoal/70 rounded-lg py-2 px-4 border border-white/5">
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="text-xs text-white/70">Active Categories</div>
                  <div className="text-xl font-bold text-white">{activeItems}/6</div>
                </div>
                <BarChart3 className="h-8 w-8 text-cyber" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardStats.map((stat, i) => (
          <Card 
            key={i} 
            className={`bg-midnight/60 border-white/10 text-white hover:bg-midnight/80 dashboard-card-animate overflow-hidden`}
            style={{ animationDelay: `${0.1 + (i * 0.05)}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full bg-${stat.color}/10 stats-icon-container`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">{stat.count}</div>
                <div className={`text-xs px-2 py-1 rounded-full flex items-center ${
                  stat.change.includes('+') ? 'bg-green-500/10 text-green-400' : 
                  stat.change === '0%' ? 'bg-gray-500/10 text-gray-400' : 
                  'bg-red-500/10 text-red-400'
                }`}>
                  {stat.change.includes('+') && <TrendingUp className="h-3 w-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs text-white/70 mt-1">{stat.description}</p>
              
              {/* Progress indicator */}
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-white/60">Completion</span>
                  <span className="text-xs text-white/60">{stat.progress.toFixed(0)}%</span>
                </div>
                <Progress value={stat.progress} className={`h-1.5 bg-white/5 progress-bar-animate`} />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className={`hover:text-${stat.color} w-full justify-between group`}>
                <Link to={stat.link} className="flex items-center text-xs">
                  <span>Manage {stat.title}</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activity Card */}
        <Card className="bg-midnight/60 border-white/10 text-white dashboard-card-animate" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-electric" />
                Recent Updates
              </CardTitle>
              <span className="text-xs bg-electric/10 text-electric px-2 py-1 rounded-full">
                Last 7 days
              </span>
            </div>
            <CardDescription className="text-white/70">Latest content changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivity.map((activity, i) => (
                <div 
                  key={i} 
                  className="border-b border-white/10 py-3 px-2 activity-item"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'create' ? 'bg-cyber/10' : 'bg-electric/10'
                      } mt-1`}>
                        {activity.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white">{activity.title}</p>
                        <p className="text-xs text-white/70">{activity.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-full">{activity.timeAgo}</span>
                  </div>
                </div>
              ))}
              
              {/* View all link */}
              <div className="pt-3 flex justify-center">
                <Button variant="ghost" className="text-electric hover:text-electric/80 hover:bg-electric/10 text-xs">
                  View all activity
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <div className="grid gap-4 grid-rows-2">
          <Card className="bg-midnight/60 border-white/10 text-white dashboard-card-animate" style={{ animationDelay: '0.5s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyber" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-white/70">Commonly used tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, i) => (
                  <Button 
                    key={i}
                    asChild
                    variant="outline" 
                    className={`w-full justify-start border-${action.color}/30 text-${action.color} hover:bg-${action.color}/10 quick-action-btn`}
                  >
                    <Link to={action.link}>
                      {action.icon}
                      <span className="ml-2">{action.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Account Summary Card */}
          <Card className="bg-midnight/60 border-white/10 text-white dashboard-card-animate" style={{ animationDelay: '0.6s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-electric" />
                Account Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center p-2 bg-charcoal/30 rounded-md">
                  <span className="text-sm text-white/80">Login Status</span>
                  <span className="text-xs bg-cyber/20 text-cyber px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber"></span>
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-charcoal/30 rounded-md">
                  <span className="text-sm text-white/80">Last Login</span>
                  <span className="text-xs text-white/70">Today, {currentTime}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-charcoal/30 rounded-md">
                  <span className="text-sm text-white/80">Role</span>
                  <span className="text-xs bg-electric/20 text-electric px-2 py-0.5 rounded-full">
                    {user?.role || 'Administrator'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 