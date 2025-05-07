const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../db');

// Load env vars
dotenv.config();

// Define a simple schema for testimonials that might contain FAQ-like data
const TestimonialSchema = new mongoose.Schema({
  // All possible fields from testimonials
  quote: String,
  authorName: String,
  authorPosition: String,
  authorCompany: String,
  avatarUrl: String,
  displayOrder: Number,
  
  // Potential FAQ fields
  question: String,
  answer: String,
  category: String,
  isPublished: Boolean
}, { 
  strict: false,
  collection: 'testimonials'
});

const Testimonial = mongoose.model('TestimonialTemp', TestimonialSchema);

// Define schema for FAQs
const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: {
    type: String,
    enum: ['Services & Plans', 'Pricing & Billing', 'Account Management', 'Technical Support & Security'],
    default: 'Services & Plans'
  },
  displayOrder: Number,
  isPublished: Boolean
}, { 
  timestamps: true,
  collection: 'faqs'
});

const Faq = mongoose.model('FaqTemp', FaqSchema);

// Main migration function
const migrateFaqsFromTestimonials = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Find all documents in testimonials collection that have question and answer fields
    // or that might be FAQ-like (having quote field but missing testimonial fields)
    const potentialFaqs = await Testimonial.find({
      $or: [
        // Has both question and answer fields
        { question: { $exists: true }, answer: { $exists: true } },
        
        // Has quote but missing author fields - might be FAQ data in testimonial fields
        { 
          quote: { $exists: true }, 
          $or: [
            { authorName: { $exists: false } },
            { authorName: null },
            { authorName: "" }
          ]
        }
      ]
    });
    
    console.log(`Found ${potentialFaqs.length} potential FAQs in testimonials collection`);
    
    // Process each potential FAQ
    for (const item of potentialFaqs) {
      // Convert to plain object
      const docObj = item.toObject();
      
      // Create new FAQ document
      const newFaq = {
        // If it has question/answer fields, use those
        question: docObj.question || docObj.quote || "",
        answer: docObj.answer || docObj.authorName || "",
        
        // Use category if available, or default
        category: docObj.category || 'Services & Plans',
        
        // Use displayOrder if available, or default to 1
        displayOrder: docObj.displayOrder || 1,
        
        // Set as published by default
        isPublished: docObj.isPublished !== undefined ? docObj.isPublished : true,
        
        // Preserve timestamps if available
        createdAt: docObj.createdAt || new Date(),
        updatedAt: docObj.updatedAt || new Date()
      };
      
      // Check if this item might already exist in faqs collection
      const existingFaq = await Faq.findOne({ 
        question: newFaq.question
      });
      
      if (!existingFaq) {
        // Save to faqs collection
        await Faq.create(newFaq);
        console.log(`Migrated FAQ: "${newFaq.question}"`);
      } else {
        console.log(`Skipping duplicate FAQ: "${newFaq.question}"`);
      }
    }
    
    console.log('Migration complete!');
    
    // Optional: You can delete the migrated items from testimonials collection
    // Uncomment the below line if you want to delete
    // await Testimonial.deleteMany({ question: { $exists: true }, answer: { $exists: true } });
    
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

// Run the migration
migrateFaqsFromTestimonials(); 