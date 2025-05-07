import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Image, 
  LogOut, 
  Package, 
  MessageSquare, 
  HelpCircle, 
  ChevronLeft,
  Bell,
  User,
  PanelLeft,
  Home,
  ExternalLink,
  Circle,
  LucideIcon
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Custom animations and styling for the sidebar
const sidebarCustomStyles = `
  @keyframes slideIn {
    from { transform: translateX(-10px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(0, 240, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0); }
  }
  
  .sidebar-menu-item {
    transition: all 0.2s ease;
    position: relative;
  }
  
  .sidebar-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .sidebar-menu-item.active {
    background-color: rgba(0, 240, 255, 0.1);
    border-left: 3px solid #00F0FF;
  }
  
  .sidebar-menu-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(to bottom, #00F0FF, #22D46B);
  }
  
  .sidebar-category {
    animation: slideIn 0.3s ease forwards;
  }
  
  .menu-badge {
    animation: pulse 2s infinite;
  }
  
  .user-profile-container {
    transition: all 0.3s ease;
  }
  
  .user-profile-container:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
  
  .sidebar-collapse-btn {
    transition: all 0.2s ease;
  }
  
  .sidebar-collapse-btn:hover {
    background-color: rgba(0, 240, 255, 0.1);
    transform: scale(1.05);
  }
  
  /* Custom scrollbar styling */
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 240, 255, 0.2);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 240, 255, 0.4);
  }
  
  /* Fixed sidebar styling */
  .admin-layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  
  .admin-sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    flex-shrink: 0;
  }
`;

// Type for menu categories and items
interface MenuCategory {
  name: string;
  items: MenuItemType[];
}

interface MenuItemType {
  icon: React.ReactNode;
  label: string;
  href: string;
  description: string;
  badge?: {
    count?: number;
    variant: 'default' | 'new' | 'update';
  };
}

// Sidebar collapse button component
const SidebarCollapseButton = () => {
  const { toggleSidebar, open } = useSidebar();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="absolute right-[-12px] top-6 z-20 h-6 w-6 rounded-full border bg-background shadow-md sidebar-collapse-btn"
    >
      <ChevronLeft className={`h-3 w-3 transition-transform ${open ? '' : 'rotate-180'}`} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

// Admin navigation items organized by category
const adminMenuCategories: MenuCategory[] = [
  {
    name: 'Core',
    items: [
      { 
        icon: <LayoutDashboard className="h-5 w-5" />, 
        label: 'Dashboard', 
        href: '/admin',
        description: 'Overview of site content and activity'
      },
      { 
        icon: <Home className="h-5 w-5" />, 
        label: 'View Site', 
        href: '/',
        description: 'Go to the public website'
      }
    ]
  },
  {
    name: 'Content',
    items: [
      { 
        icon: <Package className="h-5 w-5" />, 
        label: 'Plans', 
        href: '/admin/plans',
        description: 'Manage hosting plans and pricing',
        badge: { count: 2, variant: 'update' }
      },
      { 
        icon: <FileText className="h-5 w-5" />, 
        label: 'Features', 
        href: '/admin/features',
        description: 'Edit product features and benefits'
      },
      { 
        icon: <MessageSquare className="h-5 w-5" />, 
        label: 'Testimonials', 
        href: '/admin/testimonials',
        description: 'Manage customer testimonials'
      },
      { 
        icon: <HelpCircle className="h-5 w-5" />, 
        label: 'FAQs', 
        href: '/admin/faqs',
        description: 'Manage frequently asked questions',
        badge: { variant: 'new' }
      }
    ]
  },
  {
    name: 'Media',
    items: [
      { 
        icon: <FileText className="h-5 w-5" />, 
        label: 'Blog', 
        href: '/admin/blog',
        description: 'Manage blog posts and categories'
      },
      { 
        icon: <Image className="h-5 w-5" />, 
        label: 'Media', 
        href: '/admin/media',
        description: 'Upload and manage images and files'
      }
    ]
  },
  {
    name: 'Administration',
    items: [
      { 
        icon: <Users className="h-5 w-5" />, 
        label: 'Users', 
        href: '/admin/users',
        description: 'Manage admin users and permissions'
      },
      { 
        icon: <Settings className="h-5 w-5" />, 
        label: 'Settings', 
        href: '/admin/settings',
        description: 'Configure admin preferences'
      }
    ]
  }
];

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(3); // Placeholder for notification count
  
  // Check if user is authenticated
  useEffect(() => {
    console.log('AdminLayout: Checking auth status', { isAuthenticated, user });
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting from AdminLayout');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, user]);
  
  // Function to handle logout
  const handleLogout = () => {
    try {
      console.log('Logging out...');
      logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel.",
      });
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Logout Error",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Get initials for avatar
  const getUserInitials = () => {
    if (!user?.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  // If we're still checking auth, don't render the layout yet
  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-midnight">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber mb-4"></div>
        <p className="text-white text-lg">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Inject custom styles */}
      <style>{sidebarCustomStyles}</style>
      
      <div className="admin-layout bg-charcoal">
        {/* Sidebar */}
        <Sidebar className="admin-sidebar border-r border-white/10">
          <SidebarCollapseButton />
          
          <div className="flex flex-col h-full p-4">
            {/* Logo and Brand */}
            <Link to="/admin" className="flex items-center gap-2 mb-6 px-2">
              <div className="font-bold text-electric text-xl">StealthRDP</div>
              <div className="bg-gradient-to-r from-electric to-cyber text-midnight text-xs rounded-md px-1.5 py-0.5">
                Admin
              </div>
            </Link>
            
            {/* User Profile Section */}
            <div className="mb-6 p-2 rounded-lg user-profile-container bg-midnight/30">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-electric/30">
                  <AvatarFallback className="bg-electric/10 text-electric">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.username}</p>
                  <p className="text-xs text-white/50 truncate">{user?.role || 'Administrator'}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                  onClick={() => navigate('/admin/settings')}
                >
                  <Settings className="h-4 w-4 text-white/70" />
                </Button>
              </div>
            </div>
            
            {/* Notification & Quick Actions */}
            <div className="flex items-center justify-between mb-6 px-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="relative text-white/70 hover:text-white hover:bg-white/5"
                onClick={() => setNotifications(0)}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-cyber text-midnight menu-badge"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  asChild
                  className="text-white/70 hover:text-white hover:bg-white/5"
                >
                  <Link to="/" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span className="text-xs">View Site</span>
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <div className="flex-1 overflow-auto space-y-3 mt-2 pr-1 custom-scrollbar">
              <SidebarMenu>
                {adminMenuCategories.map((category, categoryIndex) => (
                  <div
                    key={category.name}
                    className="sidebar-category"
                    style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                  >
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                        {category.name}
                      </p>
                    </div>
                    
                    {category.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <Link to={item.href} className="block">
                          <div 
                            className={cn(
                              "sidebar-menu-item rounded-md overflow-hidden",
                              currentPath === item.href && "active"
                            )}
                          >
                            <SidebarMenuButton 
                              isActive={currentPath === item.href}
                              tooltip={item.description}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  {item.icon}
                                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>
                                </div>
                                
                                {item.badge && (
                                  <Badge 
                                    className={cn(
                                      "text-[10px] px-1 ml-1 flex-shrink-0", 
                                      item.badge.variant === 'new' 
                                        ? "bg-cyber text-midnight" 
                                        : "bg-electric/20 text-electric"
                                    )}
                                  >
                                    {item.badge.variant === 'new' 
                                      ? 'NEW' 
                                      : item.badge.count 
                                        ? `+${item.badge.count}` 
                                        : 'UPDATE'}
                                  </Badge>
                                )}
                              </div>
                            </SidebarMenuButton>
                          </div>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                    
                    {categoryIndex < adminMenuCategories.length - 1 && (
                      <Separator className="my-2 bg-white/5" />
                    )}
                  </div>
                ))}
              </SidebarMenu>
            </div>
            
            {/* Logout Button */}
            <div className="pt-4 mt-auto border-t border-white/10">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5 group"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                Log Out
              </Button>
            </div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-midnight h-16 border-b border-white/10 px-6 flex items-center justify-between">
            <h1 className="text-white font-medium">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/70 hover:text-white"
                asChild
              >
                <Link to="/admin/settings">
                  <User className="h-5 w-5 mr-2" />
                  {user?.username}
                </Link>
              </Button>
            </div>
          </header>
          
          {/* Content Area */}
          <main className="flex-1 overflow-auto p-6 bg-charcoal">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout; 