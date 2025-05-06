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
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';

// Define the plan interface for use in this form
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

interface PlanFormProps {
  initialData?: PlanFormData;
  onSubmit: (data: PlanFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const defaultPlan: PlanFormData = {
  name: '',
  description: '',
  monthlyPrice: 0,
  specs: {
    cpu: '',
    ram: '',
    storage: '',
    bandwidth: 'Unlimited'
  },
  location: 'USA',
  popular: false,
  purchaseUrl: '',
};

const PlanForm: React.FC<PlanFormProps> = ({ 
  initialData = defaultPlan, 
  onSubmit, 
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<PlanFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle nested spec fields
    if (name.startsWith('specs.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specField]: value
        }
      }));
    } else if (name === 'monthlyPrice') {
      // Handle numeric fields
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
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

  // Handle checkbox/switch changes
  const handleToggleChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.monthlyPrice <= 0) {
      newErrors.monthlyPrice = 'Price must be greater than 0';
    }
    
    if (!formData.specs.cpu.trim()) {
      newErrors['specs.cpu'] = 'CPU spec is required';
    }
    
    if (!formData.specs.ram.trim()) {
      newErrors['specs.ram'] = 'RAM spec is required';
    }
    
    if (!formData.specs.storage.trim()) {
      newErrors['specs.storage'] = 'Storage spec is required';
    }
    
    if (!formData.purchaseUrl.trim()) {
      newErrors.purchaseUrl = 'Purchase URL is required';
    } else if (!formData.purchaseUrl.startsWith('http')) {
      newErrors.purchaseUrl = 'URL must start with http:// or https://';
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
            <CardTitle>{isEditing ? 'Edit Plan' : 'Add New Plan'}</CardTitle>
            <CardDescription className="text-white/70">
              {isEditing 
                ? 'Update the hosting plan details below.' 
                : 'Fill out the form below to create a new hosting plan.'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plan Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Plan Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Silver USA"
                className="bg-charcoal/50 border-white/10 text-white"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <Select 
                defaultValue={formData.location}
                onValueChange={(value) => handleSelectChange('location', value)}
              >
                <SelectTrigger className="bg-charcoal/50 border-white/10 text-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-midnight border-white/10">
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="EU">EU</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Blazing Fast Connectivity"
                className="bg-charcoal/50 border-white/10 text-white"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="monthlyPrice" className="text-white">Monthly Price (USD)</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/70">$</span>
                <Input
                  id="monthlyPrice"
                  name="monthlyPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.monthlyPrice}
                  onChange={handleChange}
                  className="pl-8 bg-charcoal/50 border-white/10 text-white"
                />
              </div>
              {errors.monthlyPrice && <p className="text-red-500 text-xs mt-1">{errors.monthlyPrice}</p>}
            </div>

            {/* Featured Plan */}
            <div className="flex items-center space-x-2 pt-4">
              <Switch
                id="popular"
                checked={formData.popular}
                onCheckedChange={(checked) => handleToggleChange('popular', checked)}
              />
              <Label htmlFor="popular" className="text-white">
                Featured Plan
              </Label>
            </div>

            {/* Specs Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4 text-white">Plan Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CPU */}
                <div className="space-y-2">
                  <Label htmlFor="specs.cpu" className="text-white">CPU</Label>
                  <Input
                    id="specs.cpu"
                    name="specs.cpu"
                    value={formData.specs.cpu}
                    onChange={handleChange}
                    placeholder="e.g. 2 Core"
                    className="bg-charcoal/50 border-white/10 text-white"
                  />
                  {errors['specs.cpu'] && <p className="text-red-500 text-xs mt-1">{errors['specs.cpu']}</p>}
                </div>

                {/* RAM */}
                <div className="space-y-2">
                  <Label htmlFor="specs.ram" className="text-white">RAM</Label>
                  <Input
                    id="specs.ram"
                    name="specs.ram"
                    value={formData.specs.ram}
                    onChange={handleChange}
                    placeholder="e.g. 4 GB RAM"
                    className="bg-charcoal/50 border-white/10 text-white"
                  />
                  {errors['specs.ram'] && <p className="text-red-500 text-xs mt-1">{errors['specs.ram']}</p>}
                </div>

                {/* Storage */}
                <div className="space-y-2">
                  <Label htmlFor="specs.storage" className="text-white">Storage</Label>
                  <Input
                    id="specs.storage"
                    name="specs.storage"
                    value={formData.specs.storage}
                    onChange={handleChange}
                    placeholder="e.g. 60 GB SSD"
                    className="bg-charcoal/50 border-white/10 text-white"
                  />
                  {errors['specs.storage'] && <p className="text-red-500 text-xs mt-1">{errors['specs.storage']}</p>}
                </div>

                {/* Bandwidth */}
                <div className="space-y-2">
                  <Label htmlFor="specs.bandwidth" className="text-white">Bandwidth</Label>
                  <Input
                    id="specs.bandwidth"
                    name="specs.bandwidth"
                    value={formData.specs.bandwidth}
                    onChange={handleChange}
                    placeholder="e.g. Unlimited"
                    className="bg-charcoal/50 border-white/10 text-white"
                  />
                  {errors['specs.bandwidth'] && <p className="text-red-500 text-xs mt-1">{errors['specs.bandwidth']}</p>}
                </div>
              </div>
            </div>

            {/* Purchase URL */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="purchaseUrl" className="text-white">Purchase URL</Label>
              <Input
                id="purchaseUrl"
                name="purchaseUrl"
                value={formData.purchaseUrl}
                onChange={handleChange}
                placeholder="https://example.com/purchase"
                className="bg-charcoal/50 border-white/10 text-white"
              />
              {errors.purchaseUrl && <p className="text-red-500 text-xs mt-1">{errors.purchaseUrl}</p>}
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
            {isEditing ? 'Update Plan' : 'Create Plan'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PlanForm; 