import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogApi } from '@/lib/api/blogApi';
import { IBlog, BlogCategory } from '@/lib/models/Blog';
import Layout from '@/components/Layout';
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

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the current blog post
        const blogData = await blogApi.getBlogBySlug(slug);
        setBlog(blogData);
        
        // Fetch related posts from the same category
        const allPosts = await blogApi.getPublishedBlogs(blogData.category as BlogCategory);
        
        // Filter out the current post and limit to 3 related posts
        const related = allPosts
          .filter(post => post._id !== blogData._id)
          .slice(0, 3);
          
        setRelatedPosts(related);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Failed to load this blog post. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [slug]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || 'StealthRDP Blog',
        text: blog?.excerpt || '',
        url: window.location.href,
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying link:', err));
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="bg-midnight min-h-screen py-16">
          <div className="container mx-auto px-4 flex justify-center items-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 text-electric animate-spin" />
            <span className="ml-3 text-white text-lg">Loading article...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout>
        <div className="bg-midnight min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="bg-red-900/20 border border-red-900 rounded-lg p-6 flex items-center max-w-2xl mx-auto">
              <AlertCircle className="text-red-500 h-6 w-6 mr-3" />
              <div>
                <p className="text-white">{error || 'Blog post not found'}</p>
                <Button 
                  variant="link" 
                  onClick={() => navigate('/blog')}
                  className="text-electric p-0 mt-2"
                >
                  Return to blog listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-midnight min-h-screen py-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="max-w-3xl mx-auto mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="text-gray-400 hover:text-electric"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all posts
            </Button>
          </div>
          
          <article className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <Badge className="mb-4 bg-electric text-midnight px-3 py-1">
                {blog.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {blog.title}
              </h1>
              
              {/* Meta */}
              <div className="flex items-center text-gray-400 space-x-4 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                </div>
              </div>
              
              {/* Featured Image */}
              <div className="aspect-video rounded-xl overflow-hidden mb-8">
                <img 
                  src={blog.featuredImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            </header>
            
            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              {/* Simple content renderer - in a production app, use a proper markdown/rich text renderer */}
              {blog.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            
            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="border-t border-white/10 pt-6 pb-8">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-electric mr-2" />
                  {blog.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-charcoal/50 text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Share */}
            <div className="border-t border-white/10 pt-6 pb-12">
              <Button
                variant="outline"
                onClick={handleShare}
                className="text-white border-white/20 hover:bg-electric hover:text-midnight hover:border-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share this article
              </Button>
            </div>
          </article>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-5xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(post => (
                  <Link 
                    key={post._id} 
                    to={`/blog/${post.slug}`}
                    className="bg-charcoal rounded-xl overflow-hidden border border-white/10 hover:border-electric/30 transition-all hover:shadow-glow-sm group"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-electric transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetailPage; 