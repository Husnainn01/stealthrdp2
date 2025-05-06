import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check,
  X,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import PlanForm from '../components/PlanForm';

// Import the form data type to ensure compatibility
interface PlanFormData {
  name: string;
  description: string;
  monthlyPrice: number;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  location: 'USA' | 'EU';
  popular: boolean;
  purchaseUrl: string;
}

// Define a simplified plan interface for the UI that doesn't include Mongoose methods
interface PlanUI {
  _id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  location: 'USA' | 'EU';
  popular?: boolean;
  purchaseUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// We'll import the real service functions later when we're ready to connect to the database
// import { getAllPlans, getPlansByLocation } from '@/lib/services/planService';

const PlansManager: React.FC = () => {
  // State for plan data
  const [plans, setPlans] = useState<PlanUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'USA' | 'EU'>('all');
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<PlanUI | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  // Fetch plans data
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        // This will be implemented when we connect to the database
        // let data;
        // if (filter === 'all') {
        //   data = await getAllPlans();
        // } else {
        //   data = await getPlansByLocation(filter);
        // }
        // setPlans(data);
        // setError(null);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Failed to load plans. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // For now, since we're in early development, use mock data
    const mockPlans: PlanUI[] = [
      {
        _id: '1',
        name: 'Bronze USA',
        description: 'Blazing Fast Connectivity',
        monthlyPrice: 9.50,
        specs: {
          cpu: '2 Core',
          ram: '4 GB RAM',
          storage: '60 GB SSD',
          bandwidth: 'Unlimited'
        },
        location: 'USA',
        purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/bronze-usa2&billingcycle=monthly',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        name: 'Silver USA',
        description: 'Blazing Fast Connectivity',
        monthlyPrice: 18.04,
        specs: {
          cpu: '2 Core',
          ram: '8 GB RAM',
          storage: '80 GB SSD',
          bandwidth: 'Unlimited'
        },
        location: 'USA',
        popular: true,
        purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-usa-rdp-vps/silver-usa&billingcycle=monthly',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '3',
        name: 'Bronze EU',
        description: 'Secure. Fast. Limitless',
        monthlyPrice: 9.50,
        specs: {
          cpu: '2 Core',
          ram: '4 GB RAM',
          storage: '40 GB SSD',
          bandwidth: 'Unlimited'
        },
        location: 'EU',
        purchaseUrl: 'https://stealthrdp.com/dash/index.php?rp=/store/standard-eu-rdp-vps/bronze-eu&billingcycle=monthly',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filter the mock data based on the selected filter
    if (filter !== 'all') {
      setPlans(mockPlans.filter(plan => plan.location === filter));
    } else {
      setPlans(mockPlans);
    }
    
    setLoading(false);

    // Uncomment this when you're ready to fetch from the database
    // fetchPlans();
  }, [filter]);

  // Convert PlanUI to PlanFormData for form
  const planToFormData = (plan: PlanUI): PlanFormData => {
    return {
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      specs: {
        cpu: plan.specs.cpu,
        ram: plan.specs.ram,
        storage: plan.specs.storage,
        bandwidth: plan.specs.bandwidth,
      },
      location: plan.location,
      popular: plan.popular || false, // Default to false if undefined
      purchaseUrl: plan.purchaseUrl,
    };
  };

  // Handle creating a new plan
  const handleCreatePlan = () => {
    setCurrentPlan(null);
    setIsEditing(false);
    setShowForm(true);
  };

  // Handle editing a plan
  const handleEditPlan = (id: string) => {
    const planToEdit = plans.find(plan => plan._id === id);
    if (planToEdit) {
      setCurrentPlan(planToEdit);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Handle deleting a plan
  const handleDeletePlan = (id: string) => {
    setPlanToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Handle form submission (create/edit)
  const handleFormSubmit = (formData: PlanFormData) => {
    // This is a placeholder. Later, we'll connect to the database.
    if (isEditing && currentPlan) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan._id === currentPlan._id 
          ? { 
              ...plan, 
              ...formData,
              updatedAt: new Date() 
            } 
          : plan
      ));
    } else {
      // Create new plan
      const newPlan: PlanUI = {
        _id: `temp-${Date.now()}`, // Temporary ID until we use the database
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setPlans([...plans, newPlan]);
    }
    
    // Close the form
    setShowForm(false);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (planToDelete) {
      // Filter out the plan to delete
      setPlans(plans.filter(plan => plan._id !== planToDelete));
      setShowDeleteConfirm(false);
      setPlanToDelete(null);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter: 'all' | 'USA' | 'EU') => {
    setFilter(newFilter);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Plans Management</h1>
          <p className="text-white/70">View and manage your hosting plans.</p>
        </div>

        <Button 
          onClick={handleCreatePlan}
          className="bg-cyber text-midnight hover:bg-cyber/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Plan
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full">
            <PlanForm
              initialData={currentPlan ? planToFormData(currentPlan) : undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
              isEditing={isEditing}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-midnight border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This will permanently delete this plan. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="bg-midnight/60 border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">All Plans</CardTitle>
          <CardDescription className="text-white/70">
            Manage your VPS hosting plans and pricing.
          </CardDescription>
          <div className="flex gap-2 mt-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleFilterChange('all')}
              className={filter === 'all' ? 'bg-electric text-midnight' : 'border-white/20 text-white/70'}
            >
              <Filter className="h-4 w-4 mr-1" />
              All
            </Button>
            <Button 
              variant={filter === 'USA' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleFilterChange('USA')}
              className={filter === 'USA' ? 'bg-electric text-midnight' : 'border-white/20 text-white/70'}
            >
              USA
            </Button>
            <Button 
              variant={filter === 'EU' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleFilterChange('EU')}
              className={filter === 'EU' ? 'bg-electric text-midnight' : 'border-white/20 text-white/70'}
            >
              EU
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-white/70">Loading plans...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <Button variant="outline" className="mt-2" onClick={() => setFilter('all')}>
                Try Again
              </Button>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/70">No plans found. Create your first plan to get started.</p>
              <Button variant="outline" className="mt-2" onClick={handleCreatePlan}>
                <Plus className="h-4 w-4 mr-2" /> Create Plan
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/70">Name</TableHead>
                  <TableHead className="text-white/70">Location</TableHead>
                  <TableHead className="text-white/70">
                    <div className="flex items-center">
                      Price
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="text-white/70">CPU</TableHead>
                  <TableHead className="text-white/70">RAM</TableHead>
                  <TableHead className="text-white/70">Storage</TableHead>
                  <TableHead className="text-white/70">Featured</TableHead>
                  <TableHead className="text-white/70">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan._id} className="border-white/10">
                    <TableCell className="font-medium text-white">{plan.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        plan.location === 'USA' 
                          ? 'bg-blue-950/30 text-blue-400' 
                          : 'bg-green-950/30 text-green-400'
                      }`}>
                        {plan.location}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-cyber">{formatCurrency(plan.monthlyPrice)}</TableCell>
                    <TableCell className="text-white/70">{plan.specs.cpu}</TableCell>
                    <TableCell className="text-white/70">{plan.specs.ram}</TableCell>
                    <TableCell className="text-white/70">{plan.specs.storage}</TableCell>
                    <TableCell>
                      {plan.popular ? (
                        <div className="flex justify-center">
                          <Check className="h-5 w-5 text-cyber" />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <X className="h-5 w-5 text-white/30" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditPlan(plan._id)}
                          className="h-8 w-8 p-0 text-electric border-electric/30"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeletePlan(plan._id)}
                          className="h-8 w-8 p-0 text-red-500 border-red-500/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlansManager; 