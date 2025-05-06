import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, Image, LogOut, Package, MessageSquare } from 'lucide-react';
import { 
  Sidebar, 
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

// Admin navigation items
const adminNavItems = [
  { 
    icon: <LayoutDashboard className="h-5 w-5" />, 
    label: 'Dashboard', 
    href: '/admin',
    description: 'Overview of site content and activity'
  },
  { 
    icon: <Package className="h-5 w-5" />, 
    label: 'Plans', 
    href: '/admin/plans',
    description: 'Manage hosting plans and pricing'
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
  },
  { 
    icon: <Settings className="h-5 w-5" />, 
    label: 'Settings', 
    href: '/admin/settings',
    description: 'Configure admin preferences'
  }
];

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Function to handle logout
  const handleLogout = () => {
    // For now just a placeholder - we'll implement this with actual auth logic later
    console.log('Logout clicked');
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-charcoal">
        {/* Sidebar */}
        <Sidebar className="border-r border-white/10">
          <div className="p-4">
            <Link to="/admin" className="flex items-center gap-2 mb-8">
              <div className="font-bold text-electric text-xl">StealthRDP</div>
              <div className="bg-electric text-midnight text-xs rounded-md px-1.5 py-0.5">
                Admin
              </div>
            </Link>

            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link to={item.href}>
                    <SidebarMenuButton 
                      isActive={currentPath === item.href}
                      tooltip={item.description}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <div className="mt-auto pt-4 border-t border-white/10">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
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
              <div className="text-white/70 text-sm">Admin User</div>
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