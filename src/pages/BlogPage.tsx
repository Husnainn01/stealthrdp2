import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi } from '@/lib/api/blogApi';
import { seoBotApi, testSeoBotApi } from '@/lib/api/seobotApi';
import { IBlog, BlogCategory } from '@/lib/models/Blog';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  User,
  Tag,
  ChevronRight,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  Wrench
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [useSeoBotApi, setUseSeoBotApi] = useState<boolean>(true); // Default to using SEO Bot API

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        
        let blogData: IBlog[] = [];
        
        if (useSeoBotApi) {
          // First try to fetch blogs from SEO Bot
          try {
            console.log('Attempting to fetch blogs from SEO Bot...');
            const seoBotBlogs = await seoBotApi.getBlogs(20);
            console.log('SEO Bot blogs retrieved:', seoBotBlogs.length);
            
            if (seoBotBlogs.length === 0) {
              console.warn('SEO Bot returned zero blogs - check category mappings');
            } else {
              // Log the original category from SEO Bot and the mapped category
              seoBotBlogs.forEach((blog, index) => {
                console.log(`Blog #${index + 1}: "${blog.title}"`, {
                  category: blog.category,
                  slug: blog.slug
                });
              });
            }
            
            // Convert to IBlog format (adding placeholder _id, createdAt, and updatedAt)
            blogData = seoBotBlogs.map((blog, index) => ({
              ...blog,
              _id: `seobot-${index}`,
              createdAt: blog.publishedAt || new Date(),
              updatedAt: blog.publishedAt || new Date()
            } as IBlog));
            
            console.log('Successfully fetched blogs from SEO Bot:', blogData);
          } catch (seoBotError) {
            console.error('Failed to fetch from SEO Bot, falling back to local API:', seoBotError);
            
            // Additional debug info in development mode
            if (process.env.NODE_ENV === 'development') {
              console.warn(
                'SEO Bot Error Info:',
                '\n- Make sure the seobot package is correctly installed',
                '\n- Verify API key is correct',
                '\n- Check if you have internet access'
              );
            }
            
            setUseSeoBotApi(false); // Fallback to our own API for future requests
            
            // Fetch from our own API as fallback
            const data = await blogApi.getPublishedBlogs();
            blogData = data;
          }
        } else {
          // Use our own API
          const data = await blogApi.getPublishedBlogs();
          blogData = data;
        }
        
        setBlogs(blogData);
        setFilteredBlogs(blogData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [useSeoBotApi]);

  useEffect(() => {
    let result = [...blogs];

    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(blog => blog.category === activeFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        blog =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.content.toLowerCase().includes(query) ||
          blog.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredBlogs(result);
  }, [blogs, activeFilter, searchQuery]);

  const handleCategoryFilter = (category: BlogCategory | 'all') => {
    setActiveFilter(category);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleApiSource = () => {
    setUseSeoBotApi(!useSeoBotApi);
    setIsLoading(true);
  };

  const handleTestSeoBotApi = async () => {
    console.log('Running SEO Bot API test...');
    const result = await testSeoBotApi();
    console.log('SEO Bot API Test Result:', result);
    
    if (result.success) {
      alert('SEO Bot API test successful! See console for details.');
    } else {
      alert(`SEO Bot API test failed: ${result.message || 'See console for details'}`);
    }
  };

  return (
    <Layout>
      <div className="bg-midnight py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              StealthRDP Blog
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Expert insights, tutorials, and updates on remote desktop security and management
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-charcoal border border-white/10 text-white pl-10 focus:border-electric focus:ring-1 focus:ring-electric transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              onClick={() => handleCategoryFilter('all')}
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              className={activeFilter === 'all' ? 'bg-electric text-midnight' : 'text-white border-white/20'}
            >
              All
            </Button>
            {Object.values(BlogCategory).map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                variant={activeFilter === category ? 'default' : 'outline'}
                className={activeFilter === category ? 'bg-electric text-midnight' : 'text-white border-white/20'}
              >
                {category}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-10 h-10 text-electric animate-spin" />
              <span className="ml-3 text-white text-lg">Loading articles...</span>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-900 rounded-lg p-6 flex items-center max-w-2xl mx-auto">
              <AlertCircle className="text-red-500 h-6 w-6 mr-3" />
              <p className="text-white">{error}</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white text-lg mb-4">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                className="text-white border-white/20"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article 
                  key={blog._id} 
                  className="bg-charcoal rounded-xl overflow-hidden border border-white/10 hover:border-electric/30 transition-all hover:shadow-glow-sm group"
                >
                  <Link to={`/blog/${blog.slug}`} className="block">
                    {/* Featured Image */}
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={blog.featuredImage} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback image if loading fails
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-electric text-midnight px-3 py-1 text-xs">
                          {blog.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-electric transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500 border-t border-white/10 pt-4 mt-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage; 