import { connectToDatabase } from '../db/mongodb';
import Feature, { IFeature } from '../models/Feature';

// Get all features
export const getAllFeatures = async (): Promise<IFeature[]> => {
  await connectToDatabase();
  return Feature.find().sort({ displayOrder: 1 });
};

// Get features by category
export const getFeaturesByCategory = async (category: string): Promise<IFeature[]> => {
  await connectToDatabase();
  return Feature.find({ category }).sort({ displayOrder: 1 });
};

// Get a single feature by ID
export const getFeatureById = async (id: string): Promise<IFeature | null> => {
  await connectToDatabase();
  return Feature.findById(id);
};

// Create a new feature
export const createFeature = async (featureData: Omit<IFeature, '_id' | 'createdAt' | 'updatedAt'>): Promise<IFeature> => {
  await connectToDatabase();
  const feature = new Feature(featureData);
  return feature.save();
};

// Update an existing feature
export const updateFeature = async (id: string, featureData: Partial<IFeature>): Promise<IFeature | null> => {
  await connectToDatabase();
  return Feature.findByIdAndUpdate(id, featureData, { new: true, runValidators: true });
};

// Delete a feature
export const deleteFeature = async (id: string): Promise<boolean> => {
  await connectToDatabase();
  const result = await Feature.findByIdAndDelete(id);
  return !!result;
};

// Seed initial features from hardcoded data (for development)
export const seedFeaturesFromHardcoded = async (featuresData: any[]): Promise<void> => {
  await connectToDatabase();

  // Clear existing features
  await Feature.deleteMany({});

  // Insert all features
  await Feature.insertMany(featuresData);
}; 