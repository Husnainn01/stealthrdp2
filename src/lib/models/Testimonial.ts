import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface to define our Testimonial type
export interface ITestimonial extends Document {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  avatarUrl?: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const TestimonialSchema: Schema = new Schema({
  quote: {
    type: String,
    required: [true, 'Quote is required'],
    trim: true,
  },
  authorName: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  authorPosition: {
    type: String,
    trim: true,
  },
  authorCompany: {
    type: String,
    trim: true,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
  displayOrder: {
    type: Number,
    default: 0, // Lower numbers will be displayed first
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Check if the model already exists to prevent OverwriteModelError during hot reloading
export const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || 
                                               mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial; 