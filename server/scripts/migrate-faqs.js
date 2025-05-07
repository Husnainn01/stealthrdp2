/**
 * Migration script to fix FAQs data structure
 * 
 * This script converts FAQ documents from the old structure (with testimonial fields)
 * to the new structure with direct FAQ fields.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connection string from environment variables or fallback for local development
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://stlrdp:rg7CVEVCA6VVNck0@cluster0.oydwmof.mongodb.net/';
const DB_NAME = process.env.DB_NAME || 'stealthrdp';
const connectionURL = `${MONGODB_URI}${DB_NAME}`;

// Connect to MongoDB
mongoose.connect(connectionURL)
  .then(() => console.log('Connected to MongoDB for migration'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Create a raw mongoose model to access the collection directly
const OldFaqSchema = new mongoose.Schema({}, { 
  collection: 'faqs',
  strict: false // Allow any fields
});

const OldFaq = mongoose.model('OldFaq', OldFaqSchema);

// Migration function
async function migrateFaqs() {
  try {
    console.log('Starting FAQ migration...');
    
    // Get all existing FAQs
    const oldFaqs = await OldFaq.find({}).lean();
    console.log(`Found ${oldFaqs.length} FAQs to migrate`);
    
    if (oldFaqs.length === 0) {
      console.log('No FAQs to migrate');
      mongoose.disconnect();
      process.exit(0);
    }
    
    // Migrate each FAQ
    for (const oldFaq of oldFaqs) {
      console.log(`Migrating FAQ: ${oldFaq._id}`);
      
      // Map from old structure to new structure
      const updatedFaq = {
        question: oldFaq.quote || oldFaq.question || '',
        answer: oldFaq.authorName || oldFaq.answer || '',
        category: oldFaq.authorPosition || oldFaq.category || 'Services & Plans',
        displayOrder: oldFaq.displayOrder || 1,
        isPublished: oldFaq.isPublished !== undefined ? oldFaq.isPublished : true
      };
      
      // Update the document
      await OldFaq.findByIdAndUpdate(
        oldFaq._id,
        { $set: updatedFaq },
        { new: true }
      );
      
      console.log(`Migrated FAQ ${oldFaq._id}`);
    }
    
    console.log('FAQ migration completed successfully');
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error during FAQ migration:', error);
    mongoose.disconnect();
    process.exit(1);
  }
}

// Run the migration
migrateFaqs(); 