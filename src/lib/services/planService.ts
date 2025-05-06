import { connectToDatabase } from '../db/mongodb';
import Plan, { IPlan } from '../models/Plan';

// Get all plans
export const getAllPlans = async (): Promise<IPlan[]> => {
  await connectToDatabase();
  return Plan.find().sort({ monthlyPrice: 1 });
};

// Get plans by location (USA or EU)
export const getPlansByLocation = async (location: 'USA' | 'EU'): Promise<IPlan[]> => {
  await connectToDatabase();
  return Plan.find({ location }).sort({ monthlyPrice: 1 });
};

// Get a single plan by ID
export const getPlanById = async (id: string): Promise<IPlan | null> => {
  await connectToDatabase();
  return Plan.findById(id);
};

// Create a new plan
export const createPlan = async (planData: Omit<IPlan, '_id' | 'createdAt' | 'updatedAt'>): Promise<IPlan> => {
  await connectToDatabase();
  const plan = new Plan(planData);
  return plan.save();
};

// Update an existing plan
export const updatePlan = async (id: string, planData: Partial<IPlan>): Promise<IPlan | null> => {
  await connectToDatabase();
  return Plan.findByIdAndUpdate(id, planData, { new: true, runValidators: true });
};

// Delete a plan
export const deletePlan = async (id: string): Promise<boolean> => {
  await connectToDatabase();
  const result = await Plan.findByIdAndDelete(id);
  return !!result;
};

// Export plan data from hardcoded array to database (for initial setup)
export const seedPlansFromHardcoded = async (usaPlans: any[], euPlans: any[]): Promise<void> => {
  await connectToDatabase();

  // Clear existing plans
  await Plan.deleteMany({});

  // Format and prepare the USA plans
  const formattedUSAPlans = usaPlans.map(plan => ({
    ...plan,
    location: 'USA',
  }));

  // Format and prepare the EU plans
  const formattedEUPlans = euPlans.map(plan => ({
    ...plan,
    location: 'EU',
  }));

  // Combine all plans
  const allPlans = [...formattedUSAPlans, ...formattedEUPlans];

  // Insert all plans
  await Plan.insertMany(allPlans);
}; 