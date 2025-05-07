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
  ArrowUpDown,
  Package,
  Cpu,
  Activity,
  HardDrive
} from 'lucide-react';
import PlanForm from '../components/PlanForm';
import { planApi, PlanApiData, PlanApiResponse } from '@/lib/api/planApi';

// Define a simplified plan interface for the UI that doesn't include Mongoose methods
interface PlanUI {
  _id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  billingOptions: {
    quarterly: {
      enabled: boolean;
      discountPercentage: number;
    };
    annual: {
      enabled: boolean;
      discountPercentage: number;
    };
    biannual: {
      enabled: boolean;
      discountPercentage: number;
    };
  };
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

// Import the form data type to ensure compatibility
interface PlanFormData {
  name: string;
  description: string;
  monthlyPrice: number;
  billingOptions: {
    quarterly: {
      enabled: boolean;
      discountPercentage: number;
    };
    annual: {
      enabled: boolean;
      discountPercentage: number;
    };
    biannual: {
      enabled: boolean;
      discountPercentage: number;
    };
  };
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

// Helper to convert PlanFormData to API shape
const toApiPlanData = (formData: PlanFormData): PlanApiData => ({
  name: formData.name,
  description: formData.description,
  monthlyPrice: formData.monthlyPrice,
  billingOptions: {
    quarterly: {
      enabled: formData.billingOptions.quarterly.enabled,
      discountPercentage: formData.billingOptions.quarterly.discountPercentage,
    },
    annual: {
      enabled: formData.billingOptions.annual.enabled,
      discountPercentage: formData.billingOptions.annual.discountPercentage,
    },
    biannual: {
      enabled: formData.billingOptions.biannual.enabled,
      discountPercentage: formData.billingOptions.biannual.discountPercentage,
    },
  },
  specs: {
    cpu: formData.specs.cpu,
    ram: formData.specs.ram,
    storage: formData.specs.storage,
    bandwidth: formData.specs.bandwidth,
  },
  location: formData.location,
  popular: formData.popular,
  purchaseUrl: formData.purchaseUrl,
});

const PlansManager: React.FC = () => {
  // State for plan data
  const [plans, setPlans] = useState<PlanApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'USA' | 'EU'>('all');
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<PlanApiResponse | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  // Fetch plans data from API
  const fetchPlans = async () => {
    try {
      setLoading(true);
      let data;
      if (filter === 'all') {
        data = await planApi.getPlans();
      } else {
        data = await planApi.getPlans(filter);
      }
      setPlans(data);
      setError(null);
    } catch (err) {
      setError('Failed to load plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line
  }, [filter]);

  // Convert PlanApiResponse to PlanFormData for form
  const planToFormData = (plan: PlanApiResponse): PlanFormData => {
    return {
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      billingOptions: {
        quarterly: {
          enabled: plan.billingOptions?.quarterly?.enabled || false,
          discountPercentage: plan.billingOptions?.quarterly?.discountPercentage || 10,
        },
        annual: {
          enabled: plan.billingOptions?.annual?.enabled || false,
          discountPercentage: plan.billingOptions?.annual?.discountPercentage || 20,
        },
        biannual: {
          enabled: plan.billingOptions?.biannual?.enabled || false,
          discountPercentage: plan.billingOptions?.biannual?.discountPercentage || 30,
        },
      },
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
  const handleFormSubmit = async (formData: PlanFormData) => {
    try {
      setLoading(true);
      const apiData = toApiPlanData(formData);
      if (isEditing && currentPlan) {
        // Update existing plan
        await planApi.updatePlan(currentPlan._id, apiData);
      } else {
        // Create new plan
        await planApi.createPlan(apiData);
      }
      await fetchPlans();
      setShowForm(false);
    } catch (err) {
      setError('Failed to save plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (planToDelete) {
      try {
        setLoading(true);
        await planApi.deletePlan(planToDelete);
        await fetchPlans();
      } catch (err) {
        setError('Failed to delete plan. Please try again.');
      } finally {
        setShowDeleteConfirm(false);
        setPlanToDelete(null);
        setLoading(false);
      }
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
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Plans Management</h1>
          <p className="text-white/70">View and manage your hosting plans.</p>
        </div>

        <Button 
          onClick={handleCreatePlan}
          className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 hover:scale-105 hover:shadow-glow flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Plan
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
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
        <AlertDialogContent className="bg-midnight border-electric/20 border-2 text-white animate-slideUp shadow-glow">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This will permanently delete this plan. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5 transition-all">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-500 text-white hover:bg-red-600 transition-all"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="bg-midnight/80 border-white/10 shadow-lg overflow-hidden rounded-xl w-full">
        <CardHeader className="pb-3 border-b border-white/5 w-full">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-white text-xl flex items-center">
              <Package className="h-5 w-5 mr-2 text-electric" />
              All Plans
            </CardTitle>
            
            <div className="bg-charcoal rounded-lg p-1 flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('all')}
                className={`rounded-md transition-all duration-200 ${
                  filter === 'all' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Filter className="h-4 w-4 mr-1" />
                All
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('USA')}
                className={`rounded-md transition-all duration-200 ${
                  filter === 'USA' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                USA
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('EU')}
                className={`rounded-md transition-all duration-200 ${
                  filter === 'EU' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                EU
              </Button>
            </div>
          </div>
          <CardDescription className="text-white/70 mt-2">
            Manage your VPS hosting plans and pricing.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 w-full">
          {loading ? (
            <div className="text-center py-12 px-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric mx-auto mb-4"></div>
              <p className="text-white/70">Loading plans...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 px-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="bg-red-500/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <X className="h-6 w-6 text-red-500" />
              </div>
              <p className="text-red-500 mb-3">{error}</p>
              <Button 
                variant="outline" 
                className="border-red-500/20 text-white hover:bg-red-500/10 transition-all" 
                onClick={() => setFilter('all')}
              >
                Try Again
              </Button>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-16 px-4 bg-charcoal/30 rounded-lg border border-white/5">
              <div className="bg-electric/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-glow-sm">
                <Package className="h-10 w-10 text-electric" />
              </div>
              <h3 className="text-white text-xl font-medium mb-2">No Plans Found</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Create your first hosting plan to start offering services to your customers.
              </p>
              <Button 
                className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 hover:scale-105" 
                onClick={handleCreatePlan}
              >
                <Plus className="h-4 w-4 mr-2" /> Create Plan
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent w-full">
              <Table className="border-collapse w-full table-fixed">
                <TableHeader>
                  <TableRow className="border-b border-white/10 bg-charcoal/30">
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[18%]">
                      <div className="flex items-center">
                        Name
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[10%]">
                      <div className="flex items-center">
                        Price
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[12%]">Billing Options</TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[10%]">Location</TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[25%]">Specs</TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[8%] text-center">Popular</TableHead>
                    <TableHead className="py-3 px-4 text-right text-white/90 font-medium w-[17%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow 
                      key={plan._id} 
                      className="border-b border-white/5 transition-all hover:bg-white/5 group"
                    >
                      <TableCell className="py-4 px-4">
                        <div className="font-medium text-white flex items-center gap-2">
                          {plan.name}
                          {plan.popular && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-cyber text-midnight">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-white/50 text-xs mt-1 max-w-[200px] truncate">
                          {plan.description}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="text-electric font-medium text-lg">
                          {formatCurrency(plan.monthlyPrice)} 
                        </div>
                        <div className="text-white/60 text-xs">per month</div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="text-sm space-y-1.5">
                          {plan.billingOptions?.quarterly?.enabled && (
                            <div className="px-2 py-1 rounded bg-electric/5 inline-block mr-1 border border-electric/20">
                              <span className="text-white/80">Quarterly:</span> <span className="text-cyber font-medium">{plan.billingOptions.quarterly.discountPercentage}% off</span>
                            </div>
                          )}
                          {plan.billingOptions?.annual?.enabled && (
                            <div className="px-2 py-1 rounded bg-electric/5 inline-block mr-1 border border-electric/20">
                              <span className="text-white/80">Annual:</span> <span className="text-cyber font-medium">{plan.billingOptions.annual.discountPercentage}% off</span>
                            </div>
                          )}
                          {plan.billingOptions?.biannual?.enabled && (
                            <div className="px-2 py-1 rounded bg-electric/5 inline-block border border-electric/20">
                              <span className="text-white/80">Biannual:</span> <span className="text-cyber font-medium">{plan.billingOptions.biannual.discountPercentage}% off</span>
                            </div>
                          )}
                          {!plan.billingOptions?.quarterly?.enabled && 
                           !plan.billingOptions?.annual?.enabled && 
                           !plan.billingOptions?.biannual?.enabled && (
                            <div className="text-white/50 italic">Monthly only</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className={`px-3 py-1.5 rounded-full text-sm inline-flex items-center font-medium ${
                          plan.location === 'USA' 
                            ? 'bg-blue-950 text-blue-300 border border-blue-800' 
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-1.5 ${
                            plan.location === 'USA' ? 'bg-blue-400' : 'bg-amber-400'
                          }`}></span>
                          {plan.location}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center text-white/80 bg-white/5 rounded-md px-2 py-1.5">
                            <span className="w-6 h-6 rounded-full bg-midnight flex items-center justify-center mr-2 border border-electric/30">
                              <Cpu className="h-3 w-3 text-electric" />
                            </span>
                            <div>
                              <div className="text-[10px] uppercase text-white/50">CPU</div>
                              <div className="text-sm">{plan.specs.cpu}</div>
                            </div>
                          </div>
                          <div className="flex items-center text-white/80 bg-white/5 rounded-md px-2 py-1.5">
                            <span className="w-6 h-6 rounded-full bg-midnight flex items-center justify-center mr-2 border border-electric/30">
                              <Activity className="h-3 w-3 text-electric" />
                            </span>
                            <div>
                              <div className="text-[10px] uppercase text-white/50">RAM</div>
                              <div className="text-sm">{plan.specs.ram}</div>
                            </div>
                          </div>
                          <div className="flex items-center text-white/80 bg-white/5 rounded-md px-2 py-1.5">
                            <span className="w-6 h-6 rounded-full bg-midnight flex items-center justify-center mr-2 border border-electric/30">
                              <HardDrive className="h-3 w-3 text-electric" />
                            </span>
                            <div>
                              <div className="text-[10px] uppercase text-white/50">SSD</div>
                              <div className="text-sm">{plan.specs.storage}</div>
                            </div>
                          </div>
                          <div className="flex items-center text-white/80 bg-white/5 rounded-md px-2 py-1.5">
                            <span className="w-6 h-6 rounded-full bg-midnight flex items-center justify-center mr-2 border border-electric/30">
                              <Activity className="h-3 w-3 text-electric" />
                            </span>
                            <div>
                              <div className="text-[10px] uppercase text-white/50">BW</div>
                              <div className="text-sm">{plan.specs.bandwidth}</div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        {plan.popular ? (
                          <div className="bg-green-500/10 p-1.5 rounded-full w-8 h-8 flex items-center justify-center border border-green-500/30 mx-auto">
                            <Check className="h-4 w-4 text-green-400" />
                          </div>
                        ) : (
                          <div className="bg-red-500/5 p-1.5 rounded-full w-8 h-8 flex items-center justify-center border border-red-500/20 mx-auto">
                            <X className="h-4 w-4 text-red-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-right">
                        <div className="flex gap-3 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPlan(plan._id)}
                            className="bg-electric/5 border-electric text-electric hover:bg-electric/10 transition-all rounded-md px-3 py-1 h-9"
                          >
                            <Edit className="h-4 w-4 mr-1.5" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePlan(plan._id)}
                            className="bg-transparent border-white/20 text-white hover:bg-white/5 transition-all rounded-md px-3 py-1 h-9"
                          >
                            <Trash2 className="h-4 w-4 mr-1.5" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="pt-4 pb-2 text-center text-white/40 text-sm">
                Showing {plans.length} plan{plans.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlansManager; 