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
  Settings
} from 'lucide-react';
import FeatureForm from '../components/FeatureForm';

// Import the feature service functions (commented for now)
// import { 
//   getAllFeatures, 
//   getFeaturesByCategory, 
//   createFeature,
//   updateFeature,
//   deleteFeature
// } from '@/lib/services/featureService';

// Import the form data type to ensure compatibility
interface FeatureFormData {
  title: string;
  description: string;
  iconName: string;
  category: string;
  displayOrder: number;
}

// Define a simplified feature interface for the UI that doesn't include Mongoose methods
interface FeatureUI {
  _id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
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
  const [features, setFeatures] = useState<FeatureUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentFeature, setCurrentFeature] = useState<FeatureUI | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [featureToDelete, setFeatureToDelete] = useState<string | null>(null);

  // Fetch features data
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        // This will be implemented when we connect to the database
        // let data;
        // if (filter === 'all') {
        //   data = await getAllFeatures();
        // } else {
        //   data = await getFeaturesByCategory(filter);
        // }
        // setFeatures(data);
        // setError(null);
      } catch (err) {
        console.error('Error fetching features:', err);
        setError('Failed to load features. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // For now, since we're in early development, use mock data
    const mockFeatures: FeatureUI[] = [
      {
        _id: '1',
        title: 'Dedicated Servers',
        description: 'Dedicated RDP servers with full admin rights',
        iconName: 'Server',
        category: 'core-services',
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        title: 'CPU Options',
        description: 'Powerful processing capabilities to handle any workload',
        iconName: 'Cpu',
        category: 'hardware-resources',
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '3',
        title: 'Security Features',
        description: 'Enterprise-grade protection for your virtual infrastructure',
        iconName: 'Shield',
        category: 'security-management',
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '4',
        title: 'Forex Trading',
        description: 'Optimized infrastructure for trading platforms and algorithms',
        iconName: 'BarChart',
        category: 'specialized-use-cases',
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '5',
        title: '99.99% Uptime',
        description: 'Our servers maintain exceptional reliability with minimal downtime',
        iconName: 'Clock',
        category: 'service-guarantees',
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filter the mock data based on the selected filter
    if (filter !== 'all') {
      setFeatures(mockFeatures.filter(feature => feature.category === filter));
    } else {
      setFeatures(mockFeatures);
    }
    
    setLoading(false);

    // Uncomment this when you're ready to fetch from the database
    // fetchFeatures();
  }, [filter]);

  // Convert FeatureUI to FeatureFormData for form
  const featureToFormData = (feature: FeatureUI): FeatureFormData => {
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
  const handleFormSubmit = (formData: FeatureFormData) => {
    // This is a placeholder. Later, we'll connect to the database.
    if (isEditing && currentFeature) {
      // Update existing feature
      // With MongoDB connection:
      // updateFeature(currentFeature._id, formData)
      //   .then(updatedFeature => {
      //     setFeatures(features.map(feature => 
      //       feature._id === currentFeature._id ? updatedFeature : feature
      //     ));
      //   })
      //   .catch(err => console.error('Error updating feature:', err));
      
      // For now with mock data:
      setFeatures(features.map(feature => 
        feature._id === currentFeature._id 
          ? { 
              ...feature, 
              ...formData,
              updatedAt: new Date() 
            } 
          : feature
      ));
    } else {
      // Create new feature
      // With MongoDB connection:
      // createFeature(formData)
      //   .then(newFeature => {
      //     setFeatures([...features, newFeature]);
      //   })
      //   .catch(err => console.error('Error creating feature:', err));
      
      // For now with mock data:
      const newFeature: FeatureUI = {
        _id: `temp-${Date.now()}`, // Temporary ID until we use the database
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setFeatures([...features, newFeature]);
    }
    
    // Close the form
    setShowForm(false);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (featureToDelete) {
      // With MongoDB connection:
      // deleteFeature(featureToDelete)
      //   .then(success => {
      //     if (success) {
      //       setFeatures(features.filter(feature => feature._id !== featureToDelete));
      //     }
      //   })
      //   .catch(err => console.error('Error deleting feature:', err));
      
      // For now with mock data:
      setFeatures(features.filter(feature => feature._id !== featureToDelete));
      setShowDeleteConfirm(false);
      setFeatureToDelete(null);
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Features Management</h1>
          <p className="text-white/70">View and manage product features.</p>
        </div>

        <Button 
          onClick={handleCreateFeature}
          className="bg-cyber text-midnight hover:bg-cyber/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Feature
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
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
        <AlertDialogContent className="bg-midnight border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This will permanently delete this feature. This action cannot be undone.
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
          <CardTitle className="text-white">All Features</CardTitle>
          <CardDescription className="text-white/70">
            Manage product features displayed on the website.
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {featureCategories.map((category) => (
              <Button 
                key={category.value}
                variant={filter === category.value ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleFilterChange(category.value)}
                className={filter === category.value ? 'bg-electric text-midnight' : 'border-white/20 text-white/70'}
              >
                <Filter className="h-4 w-4 mr-1" />
                {category.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-white/70">Loading features...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <Button variant="outline" className="mt-2" onClick={() => setFilter('all')}>
                Try Again
              </Button>
            </div>
          ) : features.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/70">No features found. Create your first feature to get started.</p>
              <Button variant="outline" className="mt-2" onClick={handleCreateFeature}>
                <Plus className="h-4 w-4 mr-2" /> Create Feature
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/70">Icon</TableHead>
                  <TableHead className="text-white/70">Title</TableHead>
                  <TableHead className="text-white/70">Description</TableHead>
                  <TableHead className="text-white/70">Category</TableHead>
                  <TableHead className="text-white/70">
                    <div className="flex items-center">
                      Order
                      <ArrowUpDown className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="text-white/70">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature._id} className="border-white/10">
                    <TableCell>
                      <div className="flex justify-center items-center h-9 w-9 rounded-full bg-charcoal text-cyber">
                        <IconComponent name={feature.iconName} />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-white">{feature.title}</TableCell>
                    <TableCell className="max-w-xs text-white/70 truncate">{feature.description}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-charcoal text-electric">
                        {getCategoryDisplayName(feature.category)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-white/70">{feature.displayOrder}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditFeature(feature._id)}
                          className="h-8 w-8 p-0 text-electric border-electric/30"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteFeature(feature._id)}
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

export default FeaturesManager; 