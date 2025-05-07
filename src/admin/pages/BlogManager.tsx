import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Plus, 
  Edit, 
  Trash2,
  FileText,
  Eye,
  EyeOff,
  ArrowUpDown,
  Filter,
  Tag,
  Calendar,
  User,
  Clock,
  LayoutGrid,
  X,
  RefreshCw
} from 'lucide-react';
import { blogApi } from '@/lib/api/blogApi';
import { IBlog, BlogCategory } from '@/lib/models/Blog';
import { Badge } from '@/components/ui/badge';
import BlogForm from '@/admin/components/BlogForm';
import { format } from 'date-fns';

// Interface for Blog form data
interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

const BlogManager: React.FC = () => {
  // State for blog data
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<BlogCategory | 'all'>('all');
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentBlog, setCurrentBlog] = useState<IBlog | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  // Add event handler for escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showForm) {
        setShowForm(false);
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showForm]);

  // Fetch blogs data
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      try {
        const data = await blogApi.getAllBlogs();
        console.log('Fetched blogs:', data);
        setBlogs(data);
      } catch (apiError) {
        console.error('API Error, using mock data for development:', apiError);
        
        // Use more realistic and diverse mock data with actual images
        const mockBlogs = [
          {
            _id: '1',
            title: 'Getting Started with Remote Desktop Protocol',
            slug: 'getting-started-with-rdp',
            content: 'This is a comprehensive guide to help you get started with Remote Desktop Protocol...',
            excerpt: 'Learn the basics of RDP and how to get started with secure remote access.',
            featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200&h=200',
            author: 'John Smith',
            category: BlogCategory.TUTORIAL,
            tags: ['RDP', 'Tutorial', 'Security'],
            isPublished: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
          },
          {
            _id: '2',
            title: 'Best Security Practices for RDP Services',
            slug: 'security-practices-rdp',
            content: 'In this post, we discuss the essential security practices for your RDP services...',
            excerpt: 'Protect your remote desktop connections with these essential security measures.',
            featuredImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=200&h=200',
            author: 'Jane Doe',
            category: BlogCategory.SECURITY,
            tags: ['Security', 'Best Practices', 'Protection'],
            isPublished: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) // 14 days ago
          },
          {
            _id: '3',
            title: 'Introducing Our New Premium Plan',
            slug: 'new-premium-plan',
            content: 'We are excited to announce our new Premium RDP plan with enhanced features...',
            excerpt: 'Discover our latest offering with enhanced performance and security features.',
            featuredImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=200&h=200',
            author: 'Admin Team',
            category: BlogCategory.ANNOUNCEMENT,
            tags: ['Product', 'Pricing', 'Features'],
            isPublished: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) // 1 day ago
          },
          {
            _id: '4',
            title: 'Industry Report: Cloud Desktop Solutions in 2023',
            slug: 'industry-report-cloud-desktop-2023',
            content: 'Our latest industry analysis of cloud desktop trends and predictions for the coming year...',
            excerpt: 'Explore the latest trends in cloud desktop solutions and what to expect in 2023.',
            featuredImage: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?auto=format&fit=crop&q=80&w=200&h=200',
            author: 'Alex Johnson',
            category: BlogCategory.INDUSTRY,
            tags: ['Industry', 'Trends', 'Analysis'],
            isPublished: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) // 30 days ago
          },
          {
            _id: '5',
            title: 'How to Secure Your RDP Connection: Technical Deep Dive',
            slug: 'secure-rdp-connection-technical',
            content: 'A technical exploration of security protocols and best practices for RDP connections...',
            excerpt: 'Technical guide to implementing advanced security measures for your RDP environments.',
            featuredImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=200&h=200',
            author: 'Tech Security Team',
            category: BlogCategory.TECHNICAL,
            tags: ['Technical', 'Security', 'Deep Dive'],
            isPublished: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45), // 45 days ago
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10) // 10 days ago
          }
        ];
        
        setBlogs(mockBlogs as IBlog[]);
        // Set a specific message for API errors to distinguish from other errors
        throw new Error(`API connection failed: ${apiError instanceof Error ? apiError.message : 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      if (blogs.length === 0) {
        // Only show error if no blogs could be loaded (not even mock data)
        setError(`Failed to load blogs: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Convert IBlog to BlogFormData for form
  const blogToFormData = (blog: IBlog): BlogFormData => {
    return {
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      featuredImage: blog.featuredImage,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      isPublished: blog.isPublished,
      metaTitle: blog.metaTitle,
      metaDescription: blog.metaDescription,
    };
  };

  // Handle creating a new blog
  const handleCreateBlog = () => {
    setCurrentBlog(null);
    setIsEditing(false);
    setShowForm(true);
  };

  // Handle editing a blog
  const handleEditBlog = (id: string) => {
    const blogToEdit = blogs.find(blog => blog._id === id);
    if (blogToEdit) {
      setCurrentBlog(blogToEdit);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = (id: string) => {
    setBlogToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Handle toggling blog published status
  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const updatedBlog = await blogApi.updateBlog(id, { isPublished: !currentStatus });
      setBlogs(blogs.map(blog => blog._id === id ? updatedBlog : blog));
      console.log(`Blog ${currentStatus ? 'unpublished' : 'published'} successfully`);
    } catch (err) {
      console.error('Error toggling blog published status:', err);
      // If the API fails, update the state directly for demonstration
      setBlogs(blogs.map(blog => 
        blog._id === id ? {...blog, isPublished: !currentStatus} as IBlog : blog
      ));
    }
  };

  // Handle form submission (create/edit)
  const handleFormSubmit = async (formData: BlogFormData) => {
    try {
      console.log('Blog Form Data being submitted:', formData);
      
      if (isEditing && currentBlog) {
        // Update existing blog
        console.log('Updating blog with ID:', currentBlog._id);
        try {
          const updatedBlog = await blogApi.updateBlog(
            String(currentBlog._id),
            formData
          );
          setBlogs(blogs.map(blog => 
            blog._id === currentBlog._id ? updatedBlog : blog
          ));
        } catch (apiError) {
          console.error('API Error, updating in state only:', apiError);
          // Update in state only if the API fails
          const updatedBlog = {
            ...currentBlog,
            ...formData,
            updatedAt: new Date()
          };
          setBlogs(blogs.map(blog => 
            blog._id === currentBlog._id ? updatedBlog as IBlog : blog
          ));
        }
      } else {
        // Create new blog
        console.log('Creating new blog');
        try {
          const newBlog = await blogApi.createBlog(formData as any);
          setBlogs([...blogs, newBlog]);
        } catch (apiError) {
          console.error('API Error, creating mock in state only:', apiError);
          // Create a mock blog if the API fails
          const newBlog = {
            _id: String(Date.now()),
            ...formData,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          setBlogs([...blogs, newBlog as IBlog]);
        }
      }
      
      // Close the form
      setShowForm(false);
    } catch (err) {
      console.error('Error saving blog:', err);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (blogToDelete) {
      try {
        await blogApi.deleteBlog(String(blogToDelete));
        setBlogs(blogs.filter(blog => blog._id !== blogToDelete));
        console.log('Blog deleted successfully');
      } catch (err) {
        console.error('Error deleting blog:', err);
        // Delete from state anyway for demo purposes
        setBlogs(blogs.filter(blog => blog._id !== blogToDelete));
      } finally {
        setShowDeleteConfirm(false);
        setBlogToDelete(null);
      }
    }
  };

  // Get category badge helper function
  const getCategoryBadge = (category: BlogCategory) => {
    const colorMap = {
      [BlogCategory.TECHNICAL]: 'bg-blue-600/30 text-blue-400 border-blue-600/30',
      [BlogCategory.SECURITY]: 'bg-red-600/30 text-red-400 border-red-600/30',
      [BlogCategory.ANNOUNCEMENT]: 'bg-green-600/30 text-green-400 border-green-600/30',
      [BlogCategory.TUTORIAL]: 'bg-purple-600/30 text-purple-400 border-purple-600/30',
      [BlogCategory.INDUSTRY]: 'bg-yellow-600/30 text-yellow-400 border-yellow-600/30'
    };

    return (
      <Badge className={`${colorMap[category]} px-2 py-1 text-xs border rounded-full`}>
        {category}
      </Badge>
    );
  };

  // Handle filter change
  const handleFilterChange = (newFilter: BlogCategory | 'all') => {
    setFilter(newFilter);
  };

  // Filtered blogs based on selected category
  const filteredBlogs = filter === 'all' ? blogs : blogs.filter(blog => blog.category === filter);

  // Format date helper function
  const formatDate = (dateString: string | Date) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Truncate long text with ellipsis
  const truncateText = (text: string, maxLength: number = 70): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Improved error UI component
  const ErrorDisplay = () => (
    <div className="text-center py-16 px-8 bg-gradient-to-b from-red-500/10 to-red-900/5 rounded-lg border border-red-500/20 w-full min-h-[400px] flex flex-col items-center justify-center">
      <div className="bg-red-500/20 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
        <X className="h-10 w-10 text-red-500" />
      </div>
      <h3 className="text-red-400 text-2xl font-medium mb-3">Error Loading Blogs</h3>
      <p className="text-red-300/80 mb-6 max-w-md text-center">
        {error || "We couldn't connect to the blog service. This could be due to network issues or the server might be down."}
      </p>
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          size="lg"
          className="border-red-500/30 text-white hover:bg-red-500/10 transition-all px-8 shadow-glow-sm" 
          onClick={() => fetchBlogs()}
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Try Again
        </Button>
        <Button 
          variant="ghost" 
          size="lg"
          className="text-white/70 hover:text-white hover:bg-white/5 transition-all px-6" 
          onClick={handleCreateBlog}
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Post
        </Button>
      </div>
    </div>
  );

  // Improved loading UI component
  const LoadingDisplay = () => (
    <div className="text-center py-16 px-4 w-full min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-b from-electric/5 to-transparent">
      <div className="relative mb-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-electric mx-auto"></div>
        <div className="animate-pulse absolute inset-0 rounded-full h-16 w-16 border border-electric/30 mx-auto"></div>
      </div>
      <p className="text-white/80 text-xl font-medium mb-2">Loading blog posts...</p>
      <p className="text-white/50 text-sm max-w-md">
        We're retrieving your blog content. If this takes longer than expected, you can try refreshing the page.
      </p>
    </div>
  );

  // Improved empty state UI component
  const EmptyStateDisplay = () => (
    <div className="text-center py-16 px-8 bg-gradient-to-b from-charcoal/50 to-transparent rounded-lg border border-white/5 w-full min-h-[400px] flex flex-col items-center justify-center">
      <div className="bg-cyber/10 rounded-full p-6 w-28 h-28 flex items-center justify-center mx-auto mb-8 shadow-glow-sm">
        <FileText className="h-12 w-12 text-cyber" />
      </div>
      <h3 className="text-white text-2xl font-medium mb-3">No Blog Posts Found</h3>
      <p className="text-white/70 mb-7 max-w-md mx-auto">
        {filter !== 'all' 
          ? `No blog posts found in the ${filter} category. Try selecting a different category or create a new post.` 
          : 'Create your first blog post to start sharing content with your audience and improve your SEO.'}
      </p>
      <Button 
        size="lg"
        className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 px-8 shadow-glow-sm"
        onClick={handleCreateBlog}
      >
        <Plus className="h-5 w-5 mr-2" /> Create Blog Post
      </Button>
    </div>
  );

  // Update the table rows to show better thumbnails and improved formatting
  const BlogTableRows = () => (
    <>
      {filteredBlogs.map((blog) => (
        <TableRow 
          key={String(blog._id)} 
          className="border-b border-white/5 transition-all hover:bg-white/5 group"
        >
          <TableCell className="py-4 px-4">
            <div className="flex items-start gap-3">
              {/* Improved thumbnail with better fallback */}
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-charcoal/50 hidden sm:block border border-white/10 shadow-md">
                <img 
                  src={blog.featuredImage} 
                  alt=""
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-base truncate">
                  {blog.title}
                </div>
                <div className="text-white/60 text-xs mt-1 line-clamp-2">
                  {blog.excerpt}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] text-white/60">
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span className="text-[10px] text-white/40">+{blog.tags.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell className="py-4 px-4">
            {getCategoryBadge(blog.category)}
          </TableCell>
          <TableCell className="py-4 px-4 text-white/80">
            {blog.author}
          </TableCell>
          <TableCell className="py-4 px-4 text-white/80">
            <div className="flex flex-col">
              <span>{formatDate(blog.createdAt)}</span>
              <span className="text-xs text-white/50 flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {blog.updatedAt && new Date(blog.updatedAt).getTime() !== new Date(blog.createdAt).getTime() 
                  ? `Updated ${formatDate(blog.updatedAt)}` 
                  : 'Original version'}
              </span>
            </div>
          </TableCell>
          <TableCell className="py-4 px-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleTogglePublished(String(blog._id), blog.isPublished)}
              className={`px-3 py-1 rounded-full border ${
                blog.isPublished 
                  ? 'text-cyber border-cyber/30 bg-cyber/10 hover:bg-cyber/20' 
                  : 'text-white/60 border-white/10 bg-white/5 hover:bg-white/10'
              } transition-all duration-200`}
            >
              {blog.isPublished ? (
                <Eye className="h-4 w-4 mr-1" />
              ) : (
                <EyeOff className="h-4 w-4 mr-1" />
              )}
              <span>{blog.isPublished ? 'Published' : 'Draft'}</span>
            </Button>
          </TableCell>
          <TableCell className="py-4 px-4">
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleEditBlog(String(blog._id))}
                className="h-9 w-9 p-0 text-electric border-electric/30 hover:bg-electric/10 hover:border-electric transition-all"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDeleteBlog(String(blog._id))}
                className="h-9 w-9 p-0 text-red-500 border-red-500/30 hover:bg-red-500/10 hover:border-red-500 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="w-full h-full space-y-6 px-0 mx-0 max-w-none">
      <div className="flex justify-between items-center w-full mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Blog Management</h1>
          <p className="text-white/70">Create and manage blog articles for your website.</p>
        </div>

        <Button 
          onClick={handleCreateBlog}
          className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 shadow-glow-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-hidden" 
          onClick={(e) => {
            // Close modal when clicking outside the form
            if (e.target === e.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div className="max-w-4xl w-full h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <BlogForm
              initialData={currentBlog ? blogToFormData(currentBlog) : undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              isEditing={isEditing}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-midnight border-electric/20 border-2 text-white animate-slideUp shadow-glow">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This blog post will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/20 text-white hover:bg-white/5 transition-all">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-500 text-white hover:bg-red-600 transition-all"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Category filter tabs */}
      <div className="flex justify-between items-center w-full overflow-x-auto pb-2 -mb-2">
        <div className="bg-charcoal rounded-lg p-1 flex items-center shadow-md">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleFilterChange('all')}
            className={`rounded-md transition-all duration-200 px-4 py-2 mx-0.5 min-w-max ${
              filter === 'all' 
                ? 'bg-electric text-midnight shadow-glow-sm' 
                : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Filter className="h-4 w-4 mr-2" />
            All Posts
          </Button>
          {Object.values(BlogCategory).map((category) => (
            <Button 
              key={category}
              variant="ghost" 
              size="sm"
              onClick={() => handleFilterChange(category)}
              className={`rounded-md transition-all duration-200 px-4 py-2 mx-0.5 min-w-max ${
                filter === category 
                  ? 'bg-electric text-midnight shadow-glow-sm' 
                  : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Blogs Table - Updated with new components */}
      <Card className="bg-midnight/80 border-white/10 shadow-lg overflow-hidden rounded-xl w-full">
        <CardHeader className="pb-3 border-b border-white/5 w-full flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-white text-xl flex items-center">
              <FileText className="h-5 w-5 mr-2 text-electric" />
              Blog Posts
            </CardTitle>
            <CardDescription className="text-white/70 mt-1">
              Share knowledge and updates with your customers through well-crafted blog posts.
            </CardDescription>
          </div>
          
          {!loading && !error && blogs.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBlogs}
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </CardHeader>
        <CardContent className="pt-4 w-full">
          {loading ? (
            <LoadingDisplay />
          ) : error ? (
            <ErrorDisplay />
          ) : filteredBlogs.length === 0 ? (
            <EmptyStateDisplay />
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent w-full">
              <Table className="border-collapse w-full table-fixed">
                <TableCaption>
                  Showing {filteredBlogs.length} blog post{filteredBlogs.length !== 1 ? 's' : ''}
                  {filter !== 'all' ? ` in ${filter} category` : ''}
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-b border-white/10 bg-charcoal/30">
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[40%]">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-electric/60" />
                        Title
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[15%]">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-electric/60" />
                        Category
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[15%]">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-electric/60" />
                        Author
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[15%]">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-electric/60" />
                        Date
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium text-center w-[8%]">Status</TableHead>
                    <TableHead className="py-3 px-4 text-right text-white/90 font-medium w-[7%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <BlogTableRows />
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManager; 