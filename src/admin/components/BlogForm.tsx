import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogCategory } from '@/lib/models/Blog';
import { blogApi } from '@/lib/api/blogApi';
import {
  FileText,
  Image as ImageIcon,
  Tag,
  X,
  Upload,
  Settings,
  Eye,
  Pencil,
  Check,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Important: In a real implementation, you would use a rich text editor like TipTap,
// Slate.js, or a WYSIWYG editor. For simplicity, we're using a textarea here.

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

interface BlogFormProps {
  initialData?: BlogFormData;
  onSubmit: (data: BlogFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const defaultFormData: BlogFormData = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  featuredImage: '',
  author: '',
  category: BlogCategory.TECHNICAL,
  tags: [],
  isPublished: false,
  metaTitle: '',
  metaDescription: ''
};

const BlogForm: React.FC<BlogFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isEditing 
}) => {
  const [formData, setFormData] = useState<BlogFormData>(initialData || defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentTab, setCurrentTab] = useState<string>('content');
  const [tagInput, setTagInput] = useState<string>('');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.classList.add('body-lock');
    
    return () => {
      // Re-enable body scrolling when modal is closed
      document.body.classList.remove('body-lock');
    };
  }, []);

  // Auto-generate slug when title changes
  useEffect(() => {
    if (!isEditing && formData.title && !formData.slug) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, isEditing]);

  const handleChange = (field: keyof BlogFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.featuredImage.trim()) {
      newErrors.featuredImage = 'Featured image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      // If there are errors, switch to the tab that has the first error
      const errorFields = Object.keys(errors);
      if (errorFields.includes('title') || errorFields.includes('excerpt') || 
          errorFields.includes('content') || errorFields.includes('author') ||
          errorFields.includes('category')) {
        setCurrentTab('content');
      } else if (errorFields.includes('featuredImage')) {
        setCurrentTab('media');
      } else if (errorFields.includes('metaTitle') || errorFields.includes('metaDescription')) {
        setCurrentTab('seo');
      }
    }
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({ 
          ...prev, 
          tags: [...prev.tags, tagInput.trim()] 
        }));
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file.type.includes('image/')) {
      setImageUploadError('Only image files are allowed.');
      return;
    }

    try {
      setUploadingImage(true);
      setImageUploadError(null);
      
      // Log the file details
      console.log('Uploading file:', file.name, 'size:', file.size, 'type:', file.type);
      
      const formData = new FormData();
      formData.append('image', file);
      
      // Direct fetch approach for debugging
      const token = localStorage.getItem('auth_token');
      const url = 'http://localhost:5001/api/blogs/upload-image';
      
      console.log('Uploading to URL:', url);
      
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
          body: formData
        });
        
        if (!response.ok) {
          const responseText = await response.text();
          console.error('Upload error response:', responseText);
          throw new Error(`Server error: ${response.status} ${responseText}`);
        }
        
        const data = await response.json();
        console.log('Upload success:', data);
        
        handleChange('featuredImage', data.imageUrl);
        setUploadingImage(false);
      } catch (uploadError: any) {
        console.error('Upload error details:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

    } catch (error: any) {
      console.error('Error uploading image:', error);
      setImageUploadError(`Failed to upload image: ${error.message}`);
      setUploadingImage(false);
    }
  };

  return (
    <Card className="bg-midnight border-electric/20 border-2 text-white w-full shadow-glow rounded-xl animate-fadeIn h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <CardHeader className="border-b border-white/10 pb-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-electric" />
                {isEditing ? 'Edit Blog Post' : 'New Blog Post'}
              </CardTitle>
              <CardDescription className="text-white/70 mt-1">
                {isEditing 
                  ? 'Update your blog post content and settings.' 
                  : 'Create a new blog post to share with your audience.'}
              </CardDescription>
            </div>
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              onClick={onCancel}
              className="text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="px-6 pt-6 border-b border-white/10 flex-shrink-0">
            <TabsList className="bg-charcoal/50 rounded-lg p-1 w-full grid grid-cols-3">
              <TabsTrigger value="content" className="rounded-md transition-all data-[state=active]:bg-electric data-[state=active]:text-midnight">
                <Pencil className="h-4 w-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger value="media" className="rounded-md transition-all data-[state=active]:bg-electric data-[state=active]:text-midnight">
                <ImageIcon className="h-4 w-4 mr-2" />
                Media
              </TabsTrigger>
              <TabsTrigger value="seo" className="rounded-md transition-all data-[state=active]:bg-electric data-[state=active]:text-midnight">
                <Settings className="h-4 w-4 mr-2" />
                SEO & Metadata
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* The scrollable container */}
          <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain modal-scroll modal-content">
            <div className="pb-28">
              <TabsContent value="content" className="pt-6 px-6 space-y-6 m-0 data-[state=active]:block">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-electric" />
                    <span>Title</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                    placeholder="Enter the blog post title..."
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 animate-pulse">{errors.title}</p>
                  )}
                </div>

                {/* Slug Field */}
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-white flex items-center gap-2">
                    <Tag className="h-4 w-4 text-electric" />
                    <span>Slug</span>
                  </Label>
                  <div className="flex items-center">
                    <span className="text-white/50 mr-2 text-sm">/blog/</span>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                      placeholder="your-post-slug"
                    />
                  </div>
                  {errors.slug && (
                    <p className="text-sm text-red-500 animate-pulse">{errors.slug}</p>
                  )}
                  <p className="text-white/50 text-xs">This will be the URL of your blog post. Use only lowercase letters, numbers, and hyphens.</p>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-charcoal/30 rounded-lg">
                  <Label htmlFor="editor-mode" className="text-white font-medium">Editor Mode</Label>
                  <div className="flex bg-charcoal rounded-lg p-1">
                    <Button
                      type="button"
                      onClick={() => setPreviewMode(false)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        !previewMode 
                          ? 'bg-electric text-midnight' 
                          : 'bg-transparent text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setPreviewMode(true)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        previewMode 
                          ? 'bg-electric text-midnight' 
                          : 'bg-transparent text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Content Field */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-electric" />
                    <span>Content</span>
                  </Label>
                  {previewMode ? (
                    <div className="bg-charcoal/50 border border-white/10 rounded-md p-4 min-h-[300px] prose prose-invert max-w-none">
                      {/* Simple markdown-like rendering - in a real app, use a proper markdown renderer */}
                      {formData.content.split('\n').map((paragraph, i) => (
                        paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />
                      ))}
                    </div>
                  ) : (
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleChange('content', e.target.value)}
                      className="bg-charcoal/50 border-white/10 text-white min-h-[300px] focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                      placeholder="Write your blog post content here..."
                    />
                  )}
                  {errors.content && (
                    <p className="text-sm text-red-500 animate-pulse">{errors.content}</p>
                  )}
                </div>

                {/* Excerpt Field */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-electric" />
                    <span>Excerpt</span>
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleChange('excerpt', e.target.value)}
                    className="bg-charcoal/50 border-white/10 text-white h-20 focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                    placeholder="A brief summary of your post..."
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-red-500 animate-pulse">{errors.excerpt}</p>
                  )}
                  <p className="text-white/50 text-xs">This will be displayed in blog listings and social media shares.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Author Field */}
                  <div className="space-y-2">
                    <Label htmlFor="author" className="text-white flex items-center gap-2">
                      <FileText className="h-4 w-4 text-electric" />
                      <span>Author</span>
                    </Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleChange('author', e.target.value)}
                      className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                      placeholder="Author name..."
                    />
                    {errors.author && (
                      <p className="text-sm text-red-500 animate-pulse">{errors.author}</p>
                    )}
                  </div>

                  {/* Category Field */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white flex items-center gap-2">
                      <Tag className="h-4 w-4 text-electric" />
                      <span>Category</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleChange('category', value)}
                    >
                      <SelectTrigger className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-midnight border-white/10">
                        {Object.values(BlogCategory).map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tags Field */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-white flex items-center gap-2">
                    <Tag className="h-4 w-4 text-electric" />
                    <span>Tags</span>
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagAdd}
                      className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                      placeholder="Add a tag and press Enter..."
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        className="bg-electric/10 text-electric border-electric/20 px-2 py-1 flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="text-electric/70 hover:text-electric transition-colors ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {formData.tags.length === 0 && (
                      <span className="text-white/50 text-xs">No tags added yet. Type a tag and press Enter to add it.</span>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="pt-6 px-6 space-y-6 m-0 data-[state=active]:block">
                {/* Featured Image Uploader */}
                <div className="space-y-4">
                  <Label className="text-white flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-electric" />
                    <span>Featured Image</span>
                  </Label>
                  
                  <div className="border border-dashed border-white/20 rounded-lg p-8 text-center">
                    {formData.featuredImage ? (
                      <div className="space-y-4">
                        <div className="aspect-video relative overflow-hidden rounded-md bg-charcoal/50 flex items-center justify-center">
                          <img 
                            src={formData.featuredImage} 
                            alt="Featured" 
                            className="object-cover w-full h-full" 
                            onError={(e) => {
                              // If image fails to load, show placeholder
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div className="flex justify-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/5"
                            onClick={() => handleChange('featuredImage', '')}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                          <Label 
                            htmlFor="image-upload" 
                            className="flex items-center px-3 py-1 border border-electric/30 bg-electric/10 text-electric rounded-md text-sm cursor-pointer hover:bg-electric/20 transition-all"
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Change Image
                          </Label>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {uploadingImage ? (
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric mx-auto mb-4"></div>
                            <p className="text-white/70">Uploading image...</p>
                          </div>
                        ) : (
                          <>
                            <div className="bg-charcoal/30 rounded-lg p-8 max-w-md mx-auto">
                              <div className="p-4 rounded-full bg-electric/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-electric" />
                              </div>
                              <p className="text-white/80 mb-2">Drag and drop an image or click to browse</p>
                              <p className="text-white/50 text-xs">Recommended size: 1200×630 pixels</p>
                            </div>
                            
                            <Label 
                              htmlFor="image-upload" 
                              className="inline-flex items-center px-4 py-2 bg-electric text-midnight rounded-md cursor-pointer hover:bg-electric/90 transition-all"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Image
                            </Label>
                          </>
                        )}
                        
                        {imageUploadError && (
                          <div className="text-red-500 flex items-center justify-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <p>{imageUploadError}</p>
                          </div>
                        )}
                      </div>
                    )}
                    <input 
                      type="file" 
                      id="image-upload" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      accept="image/*"
                      disabled={uploadingImage}
                    />
                  </div>
                  
                  {errors.featuredImage && (
                    <p className="text-sm text-red-500 animate-pulse">{errors.featuredImage}</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="seo" className="pt-6 px-6 space-y-6 m-0 data-[state=active]:block">
                {/* Published Field - Make it more prominent */}
                <div className="mt-6 p-4 bg-charcoal/50 border border-white/10 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-electric" />
                      <div>
                        <h3 className="text-white font-medium">Publish Status</h3>
                        <p className="text-white/60 text-sm">
                          {formData.isPublished 
                            ? "This post will be visible on your blog" 
                            : "This post will be saved as a draft and won't appear on your blog"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="isPublished" className={`text-sm ${formData.isPublished ? 'text-cyber' : 'text-white/60'}`}>
                        {formData.isPublished ? 'Published' : 'Draft'}
                      </Label>
                      <Switch
                        id="isPublished"
                        checked={formData.isPublished}
                        onCheckedChange={(checked) => handleChange('isPublished', checked)}
                        className="data-[state=checked]:bg-cyber"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Meta Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="metaTitle" className="text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-electric" />
                    <span>Meta Title</span>
                  </Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle || ''}
                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                    className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                    placeholder="SEO title (if different from post title)..."
                  />
                  <p className="text-white/50 text-xs flex items-center justify-between">
                    <span>Leave empty to use the post title</span>
                    <span className={`${
                      (formData.metaTitle?.length || 0) > 60 ? 'text-red-500' : 'text-white/50'
                    }`}>
                      {formData.metaTitle?.length || 0}/60
                    </span>
                  </p>
                </div>

                {/* Meta Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="metaDescription" className="text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-electric" />
                    <span>Meta Description</span>
                  </Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription || ''}
                    onChange={(e) => handleChange('metaDescription', e.target.value)}
                    className="bg-charcoal/50 border-white/10 text-white h-20 focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                    placeholder="SEO description (if different from excerpt)..."
                  />
                  <p className="text-white/50 text-xs flex items-center justify-between">
                    <span>Leave empty to use the post excerpt</span>
                    <span className={`${
                      (formData.metaDescription?.length || 0) > 160 ? 'text-red-500' : 'text-white/50'
                    }`}>
                      {formData.metaDescription?.length || 0}/160
                    </span>
                  </p>
                </div>

                {/* SEO Preview */}
                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <Eye className="h-4 w-4 text-electric" />
                    <span>SEO Preview</span>
                  </Label>
                  <div className="bg-charcoal/30 p-4 rounded-lg border border-white/10">
                    <p className="text-blue-400 text-sm truncate">yourdomain.com/blog/{formData.slug}</p>
                    <h3 className="text-lg text-white">{formData.metaTitle || formData.title}</h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {formData.metaDescription || formData.excerpt}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight via-midnight/80 to-transparent pointer-events-none"></div>
        <CardFooter className="flex justify-between gap-2 bg-transparent py-5 px-6 flex-shrink-0 absolute bottom-0 left-0 right-0 z-10">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="border-white/20 text-white hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            {!formData.isPublished && (
              <Button 
                type="submit"
                variant="outline"
                className="border-cyber text-cyber hover:bg-cyber/10 transition-all"
              >
                <Check className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
            )}
            <Button 
              type="submit"
              className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 shadow-glow-sm"
            >
              {formData.isPublished ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  {isEditing ? 'Update & Publish' : 'Publish Post'}
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {isEditing ? 'Update Draft' : 'Save Draft'}
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BlogForm; 