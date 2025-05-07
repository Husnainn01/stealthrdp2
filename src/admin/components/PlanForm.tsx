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
import { 
  X, 
  DollarSign, 
  Building2, 
  Server, 
  Cpu, 
  HardDrive, 
  Link2, 
  Activity,
  Calendar,
  Award,
  FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from '@/components/ui/separator';

// Define the plan interface for use in this form
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
  billingOptions: {
    quarterly: {
      enabled: false,
      discountPercentage: 10
    },
    annual: {
      enabled: false,
      discountPercentage: 20
    },
    biannual: {
      enabled: false,
      discountPercentage: 30
    }
  },
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
  const [activeTab, setActiveTab] = useState("general");

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
    } else if (name.startsWith('billingOptions.')) {
      // Handle billing option discount percentages
      const [_, period, field] = name.split('.');
      if (field === 'discountPercentage') {
        setFormData(prev => ({
          ...prev,
          billingOptions: {
            ...prev.billingOptions,
            [period]: {
              ...prev.billingOptions[period as keyof typeof prev.billingOptions],
              discountPercentage: parseFloat(value) || 0
            }
          }
        }));
      }
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
    if (name.startsWith('billingOptions.')) {
      // Handle billing option enabled toggle
      const [_, period, field] = name.split('.');
      if (field === 'enabled') {
        setFormData(prev => ({
          ...prev,
          billingOptions: {
            ...prev.billingOptions,
            [period]: {
              ...prev.billingOptions[period as keyof typeof prev.billingOptions],
              enabled: checked
            }
          }
        }));
      }
    } else {
      // Handle other toggle fields
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      setActiveTab("general");
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      setActiveTab("general");
    }
    
    if (formData.monthlyPrice <= 0) {
      newErrors.monthlyPrice = 'Price must be greater than 0';
      setActiveTab("pricing");
    }
    
    if (!formData.specs.cpu.trim()) {
      newErrors['specs.cpu'] = 'CPU spec is required';
      setActiveTab("specifications");
    }
    
    if (!formData.specs.ram.trim()) {
      newErrors['specs.ram'] = 'RAM spec is required';
      setActiveTab("specifications");
    }
    
    if (!formData.specs.storage.trim()) {
      newErrors['specs.storage'] = 'Storage spec is required';
      setActiveTab("specifications");
    }
    
    if (!formData.purchaseUrl.trim()) {
      newErrors.purchaseUrl = 'Purchase URL is required';
      setActiveTab("settings");
    } else if (!formData.purchaseUrl.startsWith('http')) {
      newErrors.purchaseUrl = 'URL must start with http:// or https://';
      setActiveTab("settings");
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
    <Card className="bg-midnight border-electric/30 text-white max-w-3xl mx-auto shadow-glow animate-fadeIn">
      <CardHeader className="border-b border-white/10 pb-4 relative">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Server className="h-5 w-5 mr-2 text-electric" /> 
              {isEditing ? 'Edit Plan' : 'Add New Plan'}
            </CardTitle>
            <CardDescription className="text-white/70 mt-1">
              {isEditing 
                ? 'Update the hosting plan details below.' 
                : 'Fill out the form below to create a new hosting plan.'}
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onCancel}
                  className="rounded-full bg-white/5 text-white/70 hover:text-electric hover:bg-white/10 transition-all"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close form</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-charcoal">
              <TabsTrigger 
                value="general" 
                className="data-[state=active]:bg-electric data-[state=active]:text-midnight"
              >
                General
              </TabsTrigger>
              <TabsTrigger 
                value="pricing" 
                className="data-[state=active]:bg-electric data-[state=active]:text-midnight"
              >
                Pricing
              </TabsTrigger>
              <TabsTrigger 
                value="specifications" 
                className="data-[state=active]:bg-electric data-[state=active]:text-midnight"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-electric data-[state=active]:text-midnight"
              >
                Settings
              </TabsTrigger>
            </TabsList>
            
            {/* General Tab */}
            <TabsContent value="general" className="space-y-4 animate-fadeIn">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white font-medium flex items-center mb-2">
                    <Award className="h-4 w-4 mr-1 text-electric" /> Plan Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Basic VPS, Premium Hosting"
                    className={`bg-charcoal border-white/20 focus:border-electric text-white ${
                      errors.name ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-white font-medium flex items-center mb-2">
                    <FileText className="h-4 w-4 mr-1 text-electric" /> Description
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        description: e.target.value
                      }));
                      if (errors.description) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.description;
                          return newErrors;
                        });
                      }
                    }}
                    placeholder="Describe the main features and benefits of this plan"
                    rows={3}
                    className={`w-full rounded-md p-2 bg-charcoal border border-white/20 focus:border-electric text-white ${
                      errors.description ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-white font-medium flex items-center mb-2">
                    <Building2 className="h-4 w-4 mr-1 text-electric" /> Server Location
                  </Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleSelectChange('location', value)}
                  >
                    <SelectTrigger className="bg-charcoal border-white/20 focus:border-electric text-white">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-midnight border-white/20 text-white">
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="EU">EU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6 animate-fadeIn">
              <div>
                <Label htmlFor="monthlyPrice" className="text-white font-medium flex items-center mb-2">
                  <DollarSign className="h-4 w-4 mr-1 text-electric" /> Monthly Price (USD)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">$</span>
                  <Input
                    id="monthlyPrice"
                    name="monthlyPrice"
                    type="number"
                    value={formData.monthlyPrice.toString()}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`pl-8 bg-charcoal border-white/20 focus:border-electric text-white ${
                      errors.monthlyPrice ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.monthlyPrice && <p className="text-red-500 text-sm mt-1">{errors.monthlyPrice}</p>}
              </div>
              
              <div className="bg-charcoal/50 p-4 rounded-md border border-white/10">
                <h3 className="text-white font-medium flex items-center mb-4">
                  <Calendar className="h-4 w-4 mr-2 text-electric" /> 
                  Additional Billing Options
                </h3>
                
                <div className="space-y-5">
                  {/* Quarterly Option */}
                  <div className="flex items-start justify-between space-x-4 pb-3 border-b border-white/5">
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <Switch
                          id="billingOptions.quarterly.enabled"
                          checked={formData.billingOptions.quarterly.enabled}
                          onCheckedChange={(checked) => 
                            handleToggleChange('billingOptions.quarterly.enabled', checked)
                          }
                          className="data-[state=checked]:bg-electric"
                        />
                        <Label 
                          htmlFor="billingOptions.quarterly.enabled" 
                          className="ml-2 text-white font-medium"
                        >
                          Quarterly Plan
                        </Label>
                      </div>
                      {formData.billingOptions.quarterly.enabled && (
                        <p className="text-white/60 text-sm ml-10 mt-1">
                          Billed every 3 months
                        </p>
                      )}
                    </div>
                    
                    {formData.billingOptions.quarterly.enabled && (
                      <div className="w-32">
                        <Label 
                          htmlFor="billingOptions.quarterly.discountPercentage" 
                          className="text-white/70 text-sm mb-1 block"
                        >
                          Discount %
                        </Label>
                        <div className="relative">
                          <Input
                            id="billingOptions.quarterly.discountPercentage"
                            name="billingOptions.quarterly.discountPercentage"
                            type="number"
                            value={formData.billingOptions.quarterly.discountPercentage.toString()}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="pr-7 bg-charcoal/80 border-white/10 focus:border-electric text-white"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Annual Option */}
                  <div className="flex items-start justify-between space-x-4 pb-3 border-b border-white/5">
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <Switch
                          id="billingOptions.annual.enabled"
                          checked={formData.billingOptions.annual.enabled}
                          onCheckedChange={(checked) => 
                            handleToggleChange('billingOptions.annual.enabled', checked)
                          }
                          className="data-[state=checked]:bg-electric"
                        />
                        <Label 
                          htmlFor="billingOptions.annual.enabled" 
                          className="ml-2 text-white font-medium"
                        >
                          Annual Plan
                        </Label>
                      </div>
                      {formData.billingOptions.annual.enabled && (
                        <p className="text-white/60 text-sm ml-10 mt-1">
                          Billed yearly (best value)
                        </p>
                      )}
                    </div>
                    
                    {formData.billingOptions.annual.enabled && (
                      <div className="w-32">
                        <Label 
                          htmlFor="billingOptions.annual.discountPercentage" 
                          className="text-white/70 text-sm mb-1 block"
                        >
                          Discount %
                        </Label>
                        <div className="relative">
                          <Input
                            id="billingOptions.annual.discountPercentage"
                            name="billingOptions.annual.discountPercentage"
                            type="number"
                            value={formData.billingOptions.annual.discountPercentage.toString()}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="pr-7 bg-charcoal/80 border-white/10 focus:border-electric text-white"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Biannual Option */}
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <Switch
                          id="billingOptions.biannual.enabled"
                          checked={formData.billingOptions.biannual.enabled}
                          onCheckedChange={(checked) => 
                            handleToggleChange('billingOptions.biannual.enabled', checked)
                          }
                          className="data-[state=checked]:bg-electric"
                        />
                        <Label 
                          htmlFor="billingOptions.biannual.enabled" 
                          className="ml-2 text-white font-medium"
                        >
                          Biannual Plan
                        </Label>
                      </div>
                      {formData.billingOptions.biannual.enabled && (
                        <p className="text-white/60 text-sm ml-10 mt-1">
                          Billed every 2 years
                        </p>
                      )}
                    </div>
                    
                    {formData.billingOptions.biannual.enabled && (
                      <div className="w-32">
                        <Label 
                          htmlFor="billingOptions.biannual.discountPercentage" 
                          className="text-white/70 text-sm mb-1 block"
                        >
                          Discount %
                        </Label>
                        <div className="relative">
                          <Input
                            id="billingOptions.biannual.discountPercentage"
                            name="billingOptions.biannual.discountPercentage"
                            type="number"
                            value={formData.billingOptions.biannual.discountPercentage.toString()}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            className="pr-7 bg-charcoal/80 border-white/10 focus:border-electric text-white"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Specifications Tab */}
            <TabsContent value="specifications" className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specs.cpu" className="text-white font-medium flex items-center mb-2">
                    <Cpu className="h-4 w-4 mr-1 text-electric" /> CPU
                  </Label>
                  <Input
                    id="specs.cpu"
                    name="specs.cpu"
                    value={formData.specs.cpu}
                    onChange={handleChange}
                    placeholder="e.g. 4 vCPU Cores"
                    className={`bg-charcoal border-white/20 focus:border-electric text-white ${
                      errors['specs.cpu'] ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors['specs.cpu'] && <p className="text-red-500 text-sm mt-1">{errors['specs.cpu']}</p>}
                </div>
                
                <div>
                  <Label htmlFor="specs.ram" className="text-white font-medium flex items-center mb-2">
                    <Activity className="h-4 w-4 mr-1 text-electric" /> RAM
                  </Label>
                  <Input
                    id="specs.ram"
                    name="specs.ram"
                    value={formData.specs.ram}
                    onChange={handleChange}
                    placeholder="e.g. 8 GB RAM"
                    className={`bg-charcoal border-white/20 focus:border-electric text-white ${
                      errors['specs.ram'] ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors['specs.ram'] && <p className="text-red-500 text-sm mt-1">{errors['specs.ram']}</p>}
                </div>
                
                <div>
                  <Label htmlFor="specs.storage" className="text-white font-medium flex items-center mb-2">
                    <HardDrive className="h-4 w-4 mr-1 text-electric" /> Storage
                  </Label>
                  <Input
                    id="specs.storage"
                    name="specs.storage"
                    value={formData.specs.storage}
                    onChange={handleChange}
                    placeholder="e.g. 100 GB SSD"
                    className={`bg-charcoal border-white/20 focus:border-electric text-white ${
                      errors['specs.storage'] ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors['specs.storage'] && <p className="text-red-500 text-sm mt-1">{errors['specs.storage']}</p>}
                </div>
                
                <div>
                  <Label htmlFor="specs.bandwidth" className="text-white font-medium flex items-center mb-2">
                    <Activity className="h-4 w-4 mr-1 text-electric" /> Bandwidth
                  </Label>
                  <Input
                    id="specs.bandwidth"
                    name="specs.bandwidth"
                    value={formData.specs.bandwidth}
                    onChange={handleChange}
                    placeholder="e.g. Unlimited, 1TB"
                    className="bg-charcoal border-white/20 focus:border-electric text-white"
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 animate-fadeIn">
              <div>
                <Label htmlFor="purchaseUrl" className="text-white font-medium flex items-center mb-2">
                  <Link2 className="h-4 w-4 mr-1 text-electric" /> Purchase URL
                </Label>
                <Input
                  id="purchaseUrl"
                  name="purchaseUrl"
                  value={formData.purchaseUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/purchase/plan"
                  className={`bg-charcoal border-white/20 focus:border-electric text-white ${
                    errors.purchaseUrl ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                />
                {errors.purchaseUrl && <p className="text-red-500 text-sm mt-1">{errors.purchaseUrl}</p>}
              </div>
              
              <div className="flex items-center space-x-2 py-2">
                <Checkbox
                  id="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) => 
                    handleToggleChange('popular', checked === true)
                  }
                  className="data-[state=checked]:bg-cyber data-[state=checked]:border-cyber"
                />
                <div className="grid gap-1">
                  <Label
                    htmlFor="popular"
                    className="text-white font-medium cursor-pointer"
                  >
                    Mark as Popular
                  </Label>
                  <p className="text-sm text-white/60">
                    Featured plans will be highlighted on the pricing page
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      
      <CardFooter className="border-t border-white/10 pt-4 pb-4 flex justify-between items-center">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-transparent border-white/20 text-white hover:bg-white/5 transition-all"
        >
          Cancel
        </Button>
        
        <div className="flex items-center gap-2">
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData(initialData)}
              className="bg-transparent border-white/20 text-white hover:bg-white/5 transition-all"
            >
              Reset
            </Button>
          )}
          
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-cyber text-midnight hover:bg-cyber/90 transition-all"
          >
            {isEditing ? 'Update Plan' : 'Create Plan'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlanForm; 