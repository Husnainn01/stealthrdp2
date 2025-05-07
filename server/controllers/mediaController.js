const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

/**
 * Gets all media files from the uploads directory
 * @route GET /api/media
 * @access Private
 */
exports.getAllMedia = async (req, res) => {
  try {
    const { folder } = req.query;
    const mediaItems = [];
    
    // Base uploads directory
    const uploadsDir = path.join(__dirname, '../../public/uploads');
    
    // Check if the base directory exists
    if (!fs.existsSync(uploadsDir)) {
      console.log('Uploads directory does not exist:', uploadsDir);
      return res.status(200).json([]);
    }
    
    // If folder is specified, only scan that folder
    const dirToScan = folder ? path.join(uploadsDir, folder) : uploadsDir;
    
    // Check if the specified folder exists
    if (folder && !fs.existsSync(dirToScan)) {
      console.log('Specified folder does not exist:', dirToScan);
      return res.status(200).json([]);
    }
    
    // Function to scan directory recursively
    const scanDirectory = (dir, baseFolder = '') => {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          // Recursive call for subdirectories
          scanDirectory(itemPath, baseFolder ? `${baseFolder}/${item}` : item);
        } else {
          // Process files
          const folder = baseFolder || path.basename(dir);
          const relativePath = path.relative(uploadsDir, dir);
          
          // Don't include hidden files
          if (!item.startsWith('.')) {
            mediaItems.push({
              id: path.join(relativePath, item), // Use relative path as ID
              fileName: item,
              url: `/uploads/${relativePath}/${item}`,
              type: path.extname(item).toLowerCase(),
              size: stats.size,
              createdAt: stats.mtime,
              folder: relativePath || 'root'
            });
          }
        }
      });
    };
    
    // Start scanning
    scanDirectory(dirToScan);
    
    // Sort by date (newest first)
    mediaItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.status(200).json(mediaItems);
  } catch (error) {
    console.error('Error getting media:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Gets media counts by folder
 * @route GET /api/media/counts
 * @access Private
 */
exports.getMediaCounts = async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../../public/uploads');
    const counts = {};
    
    // Check if uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      return res.status(200).json(counts);
    }
    
    // Get all directories in uploads
    const items = fs.readdirSync(uploadsDir);
    
    for (const item of items) {
      const itemPath = path.join(uploadsDir, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        // Count files in this directory
        try {
          const files = fs.readdirSync(itemPath).filter(file => 
            !file.startsWith('.') && fs.statSync(path.join(itemPath, file)).isFile()
          );
          counts[item] = files.length;
        } catch (err) {
          console.error(`Error reading directory ${item}:`, err);
          counts[item] = 0;
        }
      }
    }
    
    res.status(200).json(counts);
  } catch (error) {
    console.error('Error getting media counts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete a media file
 * @route DELETE /api/media/:id
 * @access Private
 */
exports.deleteMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    
    // Decode the URL-encoded mediaId which contains the relative path
    const decodedPath = decodeURIComponent(mediaId);
    
    // Construct the full path to the file
    const filePath = path.join(__dirname, '../../public/uploads', decodedPath);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Delete the file
    fs.unlinkSync(filePath);
    
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Batch delete multiple media files
 * @route POST /api/media/batch-delete
 * @access Private
 */
exports.batchDeleteMedia = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No media IDs provided' });
    }
    
    const results = {
      success: [],
      failed: []
    };
    
    for (const mediaId of ids) {
      try {
        // Decode the URL-encoded mediaId which contains the relative path
        const decodedPath = decodeURIComponent(mediaId);
        
        // Construct the full path to the file
        const filePath = path.join(__dirname, '../../public/uploads', decodedPath);
        
        // Check if file exists
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          results.success.push(mediaId);
        } else {
          results.failed.push({ id: mediaId, reason: 'File not found' });
        }
      } catch (err) {
        console.error(`Error deleting ${mediaId}:`, err);
        results.failed.push({ id: mediaId, reason: err.message });
      }
    }
    
    const message = `Successfully deleted ${results.success.length} of ${ids.length} files`;
    res.status(200).json({ message, results });
  } catch (error) {
    console.error('Error in batch delete:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 