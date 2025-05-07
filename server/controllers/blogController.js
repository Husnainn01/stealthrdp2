const Blog = require('../models/Blog');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

/**
 * Get all blogs
 * @route GET /api/blogs
 * @access Public
 */
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error getting blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get published blogs
 * @route GET /api/blogs/published
 * @access Public
 */
exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error getting published blogs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get blog by ID
 * @route GET /api/blogs/:id
 * @access Public
 */
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error getting blog by ID:', error);
    
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get blog by slug
 * @route GET /api/blogs/slug/:slug
 * @access Public
 */
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error getting blog by slug:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Create blog
 * @route POST /api/blogs
 * @access Private
 */
exports.createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Blog with that slug already exists' });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update blog
 * @route PUT /api/blogs/:id
 * @access Private
 */
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Blog with that slug already exists' });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete blog
 * @route DELETE /api/blogs/:id
 * @access Private
 */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Upload blog image
 * @route POST /api/blogs/upload-image
 * @access Private
 */
exports.uploadImage = async (req, res) => {
  console.log('Upload image controller reached');
  console.log('Request headers:', req.headers);
  console.log('Request files:', req.files ? 'Available' : 'Not available');
  
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.error('No files in request');
      console.log('Request body:', req.body);
      return res.status(400).json({ message: 'No files were uploaded' });
    }
    
    const image = req.files.image;
    console.log('Image received:', {
      name: image.name,
      size: image.size,
      mimetype: image.mimetype
    });
    
    const uploadDir = path.join(__dirname, '../../public/uploads/blog');
    console.log('Upload directory:', uploadDir);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      console.log('Creating upload directory');
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Generate unique filename
    const fileName = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, fileName);
    console.log('File will be saved to:', filePath);
    
    // Save the file
    try {
      await image.mv(filePath);
      console.log('File saved successfully');
      
      // Verify file was saved
      const fileExists = fs.existsSync(filePath);
      console.log('File exists after save:', fileExists);
      
      // Return response with correct URL
      const imageUrl = `/uploads/blog/${fileName}`;
      console.log('Returning URL:', imageUrl);
      
      res.status(200).json({ imageUrl });
    } catch (mvError) {
      console.error('Error moving file:', mvError);
      res.status(500).json({ 
        message: 'File upload failed', 
        error: mvError.message,
        details: 'Error occurred while saving the file' 
      });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    });
  }
}; 