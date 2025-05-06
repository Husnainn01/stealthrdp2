import { connectToDatabase } from '../db/mongodb';
import Testimonial, { ITestimonial } from '../models/Testimonial';

// Get all testimonials
export const getAllTestimonials = async (): Promise<ITestimonial[]> => {
  await connectToDatabase();
  return Testimonial.find().sort({ displayOrder: 1 });
};

// Get a single testimonial by ID
export const getTestimonialById = async (id: string): Promise<ITestimonial | null> => {
  await connectToDatabase();
  return Testimonial.findById(id);
};

// Create a new testimonial
export const createTestimonial = async (testimonialData: Omit<ITestimonial, '_id' | 'createdAt' | 'updatedAt'>): Promise<ITestimonial> => {
  await connectToDatabase();
  const testimonial = new Testimonial(testimonialData);
  return testimonial.save();
};

// Update an existing testimonial
export const updateTestimonial = async (id: string, testimonialData: Partial<ITestimonial>): Promise<ITestimonial | null> => {
  await connectToDatabase();
  return Testimonial.findByIdAndUpdate(id, testimonialData, { new: true, runValidators: true });
};

// Delete a testimonial
export const deleteTestimonial = async (id: string): Promise<boolean> => {
  await connectToDatabase();
  const result = await Testimonial.findByIdAndDelete(id);
  return !!result;
};

// Seed initial testimonials from hardcoded data (for development)
export const seedTestimonialsFromHardcoded = async (testimonialsData: any[]): Promise<void> => {
  await connectToDatabase();

  // Clear existing testimonials
  await Testimonial.deleteMany({});

  // Insert all testimonials
  await Testimonial.insertMany(testimonialsData);
}; 