import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogApi } from '@/lib/api/blogApi';
import { seoBotApi } from '@/lib/api/seobotApi';
import { IBlog } from '@/lib/models/Blog';
import Layout from '@/components/Layout';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Share2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        
        // First try to get from SEO Bot
        try {
          const seoBotBlog = await seoBotApi.getBlogBySlug(slug);
          
          if (seoBotBlog) {
            // Convert to IBlog format
            const blogData = {
              ...seoBotBlog,
              _id: `seobot-${slug}`,
              createdAt: seoBotBlog.publishedAt || new Date(),
              updatedAt: seoBotBlog.publishedAt || new Date()
            } as IBlog;
            
            console.log('Fetched blog from SEO Bot:', blogData);
            setBlog(blogData);
            
            // Get related blogs by category
            const relatedFromSeoBot = await seoBotApi.getBlogsByCategory(seoBotBlog.category as string, 3);
            
            // Filter out the current blog and convert to IBlog format
            const relatedBlogs = relatedFromSeoBot
              .filter(related => related.slug !== slug)
              .map((related, index) => ({
                ...related,
                _id: `seobot-related-${index}`,
                createdAt: related.publishedAt || new Date(),
                updatedAt: related.publishedAt || new Date()
              } as IBlog))
              .slice(0, 3); // Only take the first 3
              
            setRelatedBlogs(relatedBlogs);
            setError(null);
            setIsLoading(false);
            return;
          }
        } catch (seoBotError) {
          console.error('Failed to fetch from SEO Bot, falling back to local API:', seoBotError);
        }
        
        // If SEO Bot failed or returned null, use internal API
        const blogData = await blogApi.getBlogBySlug(slug);
        setBlog(blogData);
        
        // Get related blogs from the same category
        const related = await blogApi.getPublishedBlogs(blogData.category);
        setRelatedBlogs(related.filter(b => b._id !== blogData._id).slice(0, 3));
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blog details:', err);
        setError('Failed to load the blog post. It may have been removed or is temporarily unavailable.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [slug]);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || 'StealthRDP Blog Post',
        text: blog?.excerpt || 'Check out this blog post from StealthRDP',
        url: window.location.href,
      })
      .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{blog?.metaTitle || blog?.title || 'Blog Post'} | StealthRDP</title>
        <meta name="description" content={blog?.metaDescription || blog?.excerpt || 'Read our latest blog post on StealthRDP'} />
        <meta property="og:title" content={blog?.title || 'Blog Post'} />
        <meta property="og:description" content={blog?.excerpt || 'Read our latest blog post on StealthRDP'} />
        {blog?.featuredImage && <meta property="og:image" content={blog.featuredImage} />}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="bg-midnight py-12 min-h-screen">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-10 h-10 text-electric animate-spin" />
              <span className="ml-3 text-white text-lg">Loading blog post...</span>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-900 rounded-lg p-6 flex flex-col items-center max-w-2xl mx-auto">
              <AlertCircle className="text-red-500 h-10 w-10 mb-3" />
              <p className="text-white text-center mb-4">{error}</p>
              <Button onClick={() => navigate('/blog')} variant="outline" className="text-white border-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </div>
          ) : blog ? (
            <div className="max-w-4xl mx-auto">
              {/* Navigation & Share */}
              <div className="flex justify-between items-center mb-6">
                <Button 
                  onClick={() => navigate('/blog')} 
                  variant="ghost" 
                  className="text-white/70 hover:text-white hover:bg-white/5"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
                
                <Button 
                  onClick={handleShareClick} 
                  variant="outline" 
                  className="text-white/70 border-white/10 hover:text-electric hover:border-electric/30"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              
              {/* Category Badge */}
              <div className="mb-4">
                <Badge className="bg-electric text-midnight px-3 py-1">
                  {blog.category}
                </Badge>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {blog.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-white/60 mb-8">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                </div>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="text-white/60">
                          {tag}{index < blog.tags.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img 
                    src={blog.featuredImage} 
                    alt={blog.title} 
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      // Fallback image if loading fails
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              )}
              
              {/* Blog Content */}
              <div className="mb-12">
                <div 
                  className="prose prose-lg prose-invert max-w-none bg-charcoal p-8 md:p-10 rounded-xl border border-white/10 shadow-lg"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                
                {/* Reading progress indicator */}
                <div className="mt-8 flex justify-center">
                  <span className="text-white/60 text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-electric" />
                    {blog.readingTime ? `${blog.readingTime} min read` : 'Quick read'}
                  </span>
                </div>
              </div>
              
              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="border-t border-white/10 pt-6 mb-12">
                  <h3 className="text-white font-semibold mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-white/80">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Related Posts */}
              {relatedBlogs.length > 0 && (
                <div className="border-t border-white/10 pt-8 mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link 
                        key={relatedBlog._id} 
                        to={`/blog/${relatedBlog.slug}`}
                        className="bg-charcoal rounded-lg p-4 border border-white/10 hover:border-electric/30 transition-all hover:shadow-glow-sm"
                      >
                        {relatedBlog.featuredImage && (
                          <div className="aspect-video mb-3 rounded-md overflow-hidden">
                            <img 
                              src={relatedBlog.featuredImage} 
                              alt={relatedBlog.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                        )}
                        <h3 className="text-white font-semibold mb-2 line-clamp-2 hover:text-electric transition-colors">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white text-lg mb-4">Blog post not found</p>
              <Button 
                onClick={() => navigate('/blog')}
                className="bg-electric text-midnight hover:bg-electric/90"
              >
                Back to Blog
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetailPage; 