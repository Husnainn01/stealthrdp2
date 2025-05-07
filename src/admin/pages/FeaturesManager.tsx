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
  Filter,
  ArrowUpDown,
  Server,
  Cpu,
  Database,
  HardDrive,
  Globe,
  Shield,
  Users,
  Lock,
  BarChart,
  Laptop,
  Zap,
  Clock,
  Cloud,
  Settings,
  X
} from 'lucide-react';
import FeatureForm from '../components/FeatureForm';
import { featureApi } from '@/lib/api/featureApi';
import { IFeature } from '@/lib/models/Feature';

// Import the form data type to ensure compatibility and match API types
interface FeatureFormData {
  title: string;
  description: string;
  iconName: string;
  category: string;
  displayOrder: number;
}

// Feature categories for filtering
const featureCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'core-services', label: 'Core Services' },
  { value: 'hardware-resources', label: 'Hardware Resources' },
  { value: 'security-management', label: 'Security & Management' },
  { value: 'specialized-use-cases', label: 'Specialized Use Cases' },
  { value: 'service-guarantees', label: 'Service Guarantees' }
];

// Icon mapping for rendering
const IconComponent: React.FC<{ name: string }> = ({ name }) => {
  const props = { className: "h-5 w-5" };
  switch (name) {
    case 'Server': return <Server {...props} />;
    case 'Cloud': return <Cloud {...props} />;
    case 'Settings': return <Settings {...props} />;
    case 'Cpu': return <Cpu {...props} />;
    case 'Database': return <Database {...props} />;
    case 'HardDrive': return <HardDrive {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Shield': return <Shield {...props} />;
    case 'Users': return <Users {...props} />;
    case 'Lock': return <Lock {...props} />;
    case 'BarChart': return <BarChart {...props} />;
    case 'Laptop': return <Laptop {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Clock': return <Clock {...props} />;
    default: return <Server {...props} />; // Default icon
  }
};

const FeaturesManager: React.FC = () => {
  // State for feature data
  const [features, setFeatures] = useState<IFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentFeature, setCurrentFeature] = useState<IFeature | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [featureToDelete, setFeatureToDelete] = useState<string | null>(null);

  // Fetch features data
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const data = await featureApi.getFeatures(filter !== 'all' ? filter : undefined);
        console.log('Fetched features:', data);
        setFeatures(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching features:', err);
        setError('Failed to load features. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, [filter]);

  // Convert IFeature to FeatureFormData for form
  const featureToFormData = (feature: IFeature): FeatureFormData => {
    return {
      title: feature.title,
      description: feature.description,
      iconName: feature.iconName,
      category: feature.category,
      displayOrder: feature.displayOrder
    };
  };

  // Get category display name
  const getCategoryDisplayName = (category: string): string => {
    const categoryObj = featureCategories.find(cat => cat.value === category);
    return categoryObj ? categoryObj.label : category;
  };

  // Handle creating a new feature
  const handleCreateFeature = () => {
    setCurrentFeature(null);
    setIsEditing(false);
    setShowForm(true);
  };

  // Handle editing a feature
  const handleEditFeature = (id: string) => {
    const featureToEdit = features.find(feature => feature._id === id);
    if (featureToEdit) {
      setCurrentFeature(featureToEdit);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Handle deleting a feature
  const handleDeleteFeature = (id: string) => {
    setFeatureToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Handle form submission (create/edit)
  const handleFormSubmit = async (formData: FeatureFormData) => {
    try {
      if (isEditing && currentFeature) {
        // Update existing feature - cast currentFeature._id to string
        const updatedFeature = await featureApi.updateFeature(
          String(currentFeature._id), 
          formData as any // Cast to any to avoid type issues
        );
        setFeatures(features.map(feature => 
          feature._id === currentFeature._id ? updatedFeature : feature
        ));
        console.log('Feature updated successfully:', updatedFeature);
      } else {
        // Create new feature - use any type to avoid conflicts
        const newFeature = await featureApi.createFeature(formData as any);
        setFeatures([...features, newFeature]);
        console.log('Feature created successfully:', newFeature);
      }
      
      // Close the form
      setShowForm(false);
    } catch (err) {
      console.error('Error saving feature:', err);
      // You might want to show an error message to the user here
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (featureToDelete) {
      try {
        // Cast featureToDelete to string
        await featureApi.deleteFeature(String(featureToDelete));
        setFeatures(features.filter(feature => feature._id !== featureToDelete));
        console.log('Feature deleted successfully');
      } catch (err) {
        console.error('Error deleting feature:', err);
        // You might want to show an error message to the user here
      } finally {
        setShowDeleteConfirm(false);
        setFeatureToDelete(null);
      }
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Features Management</h1>
          <p className="text-white/70">View and manage product features.</p>
        </div>

        <Button 
          onClick={handleCreateFeature}
          className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 shadow-glow-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Feature
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-3xl w-full">
            <FeatureForm
              initialData={currentFeature ? featureToFormData(currentFeature) : undefined}
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
              This action cannot be undone. This feature will be permanently removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/20 text-white hover:bg-white/5 transition-all">Cancel</AlertDialogCancel>
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

      {/* Filters */}
      <Card className="bg-midnight/80 border-white/10 shadow-lg overflow-hidden rounded-xl w-full min-w-full">
        <CardHeader className="pb-3 border-b border-white/5 w-full">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-white text-xl flex items-center">
              <Server className="h-5 w-5 mr-2 text-electric" />
              All Features
            </CardTitle>
            
            <div className="bg-charcoal rounded-lg p-1 flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('all')}
                className={`rounded-md transition-all duration-200 px-3 py-1 mx-0.5 ${
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
                onClick={() => handleFilterChange('core-services')}
                className={`rounded-md transition-all duration-200 px-3 py-1 mx-0.5 ${
                  filter === 'core-services' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Core
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('hardware-resources')}
                className={`rounded-md transition-all duration-200 px-3 py-1 mx-0.5 ${
                  filter === 'hardware-resources' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Hardware
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('security-management')}
                className={`rounded-md transition-all duration-200 px-3 py-1 mx-0.5 ${
                  filter === 'security-management' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Security
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('specialized-use-cases')}
                className={`rounded-md transition-all duration-200 px-3 py-1 mx-0.5 ${
                  filter === 'specialized-use-cases' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Specialized
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('service-guarantees')}
                className={`rounded-md transition-all duration-200 px-3 py-1 mx-0.5 ${
                  filter === 'service-guarantees' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                Service
              </Button>
            </div>
          </div>
          <CardDescription className="text-white/70 mt-2">
            Manage your product features and categorization.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 w-full">
          {loading ? (
            <div className="text-center py-12 px-4 w-full min-h-[400px] flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric mx-auto mb-4"></div>
              <p className="text-white/70">Loading features...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 px-4 bg-red-500/10 rounded-lg border border-red-500/20 w-full min-h-[400px] flex flex-col items-center justify-center">
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
          ) : features.length === 0 ? (
            <div className="text-center py-16 px-4 bg-charcoal/30 rounded-lg border border-white/5 w-full min-h-[400px] flex flex-col items-center justify-center">
              <div className="bg-electric/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-glow-sm">
                <Server className="h-10 w-10 text-electric" />
              </div>
              <h3 className="text-white text-xl font-medium mb-2">No Features Found</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                {filter !== 'all' 
                  ? `No features found in the ${getCategoryDisplayName(filter)} category.` 
                  : 'Create your first feature to showcase on your product page.'}
              </p>
              <Button 
                className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200"
                onClick={handleCreateFeature}
              >
                <Plus className="h-4 w-4 mr-2" /> Create Feature
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent w-full">
              <Table className="border-collapse w-full table-fixed">
                <TableCaption>
                  Showing {features.length} feature{features.length !== 1 ? 's' : ''}
                  {filter !== 'all' ? ` in ${getCategoryDisplayName(filter)}` : ''}
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-b border-white/10 bg-charcoal/30">
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[8%]">Icon</TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[18%]">
                      <div className="flex items-center">
                        Title
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[32%]">Description</TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[25%]">
                      <div className="flex items-center">
                        Category
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium text-center w-[7%]">
                      <div className="flex items-center justify-center">
                        Order
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-right text-white/90 font-medium w-[10%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow 
                      key={String(feature._id)} 
                      className="border-b border-white/5 transition-all hover:bg-white/5 group"
                    >
                      <TableCell className="py-4 px-4">
                        <div className="flex justify-center items-center h-10 w-10 rounded-full bg-charcoal text-electric border border-electric/20 shadow-glow-sm group-hover:scale-110 transition-all">
                          <IconComponent name={feature.iconName} />
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="font-medium text-white">{feature.title}</div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="text-white/70 max-w-xs truncate">{feature.description}</div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <span className="px-3 py-1.5 rounded-full text-sm inline-flex items-center bg-electric/10 text-electric/90 border border-electric/20">
                          {getCategoryDisplayName(feature.category)}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <span className="bg-charcoal w-8 h-8 rounded-full inline-flex items-center justify-center text-white/90 font-medium border border-white/10">
                          {feature.displayOrder}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditFeature(String(feature._id))}
                            className="h-9 w-9 p-0 text-electric border-electric/30 hover:bg-electric/10 hover:border-electric transition-all"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteFeature(String(feature._id))}
                            className="h-9 w-9 p-0 text-red-500 border-red-500/30 hover:bg-red-500/10 hover:border-red-500 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesManager; 