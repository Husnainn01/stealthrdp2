import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

// Lucide icons available for selection
const availableIcons = [
  'Server', 'Cloud', 'Settings', 'Cpu', 'Database', 'HardDrive', 'Globe', 
  'Shield', 'Users', 'Lock', 'BarChart', 'Laptop', 'Zap', 'Clock'
];

// Feature categories based on the existing Features page
const featureCategories = [
  'core-services',
  'hardware-resources',
  'security-management',
  'specialized-use-cases',
  'service-guarantees'
];

// Define the feature interface for use in this form
interface FeatureFormData {
  title: string;
  description: string;
  iconName: string;
  category: string;
  displayOrder: number;
}

interface FeatureFormProps {
  initialData?: FeatureFormData;
  onSubmit: (data: FeatureFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const defaultFeature: FeatureFormData = {
  title: '',
  description: '',
  iconName: 'Server',
  category: 'core-services',
  displayOrder: 0
};

const FeatureForm: React.FC<FeatureFormProps> = ({ 
  initialData = defaultFeature, 
  onSubmit, 
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<FeatureFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'displayOrder') {
      // Handle numeric field
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      // Handle regular fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get category display name
  const getCategoryDisplayName = (category: string): string => {
    switch (category) {
      case 'core-services': return 'Core Services';
      case 'hardware-resources': return 'Hardware Resources';
      case 'security-management': return 'Security & Management';
      case 'specialized-use-cases': return 'Specialized Use Cases';
      case 'service-guarantees': return 'Service Guarantees';
      default: return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.iconName) {
      newErrors.iconName = 'Icon selection is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="bg-midnight/60 border-white/10 text-white max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{isEditing ? 'Edit Feature' : 'Add New Feature'}</CardTitle>
            <CardDescription className="text-white/70">
              {isEditing 
                ? 'Update the feature details below.' 
                : 'Fill out the form below to create a new feature.'}
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCancel}
            className="text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Feature Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Feature Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. High-Performance CPU"
                className="bg-charcoal/50 border-white/10 text-white"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Feature Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Powerful processing capabilities to handle any workload"
                className="bg-charcoal/50 border-white/10 text-white min-h-[100px]"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Icon Selection */}
              <div className="space-y-2">
                <Label htmlFor="iconName" className="text-white">Icon</Label>
                <Select 
                  defaultValue={formData.iconName}
                  onValueChange={(value) => handleSelectChange('iconName', value)}
                >
                  <SelectTrigger className="bg-charcoal/50 border-white/10 text-white">
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent className="bg-midnight border-white/10">
                    {availableIcons.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.iconName && <p className="text-red-500 text-xs mt-1">{errors.iconName}</p>}
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Category</Label>
                <Select 
                  defaultValue={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className="bg-charcoal/50 border-white/10 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-midnight border-white/10">
                    {featureCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {getCategoryDisplayName(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Display Order */}
            <div className="space-y-2">
              <Label htmlFor="displayOrder" className="text-white">Display Order (lower numbers displayed first)</Label>
              <Input
                id="displayOrder"
                name="displayOrder"
                type="number"
                min="0"
                value={formData.displayOrder}
                onChange={handleChange}
                className="bg-charcoal/50 border-white/10 text-white"
              />
              {errors.displayOrder && <p className="text-red-500 text-xs mt-1">{errors.displayOrder}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="border-white/20 text-white/70 hover:text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-cyber text-midnight hover:bg-cyber/90"
          >
            {isEditing ? 'Update Feature' : 'Create Feature'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeatureForm; 