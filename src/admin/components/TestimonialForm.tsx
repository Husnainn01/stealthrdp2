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
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

// Define the testimonial interface for use in this form
interface TestimonialFormData {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  avatarUrl?: string;
  displayOrder: number;
}

interface TestimonialFormProps {
  initialData?: TestimonialFormData;
  onSubmit: (data: TestimonialFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const defaultTestimonial: TestimonialFormData = {
  quote: '',
  authorName: '',
  authorPosition: '',
  authorCompany: '',
  avatarUrl: '',
  displayOrder: 0
};

const TestimonialForm: React.FC<TestimonialFormProps> = ({ 
  initialData = defaultTestimonial, 
  onSubmit, 
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<TestimonialFormData>(initialData);
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

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.quote.trim()) {
      newErrors.quote = 'Testimonial quote is required';
    }
    
    if (!formData.authorName.trim()) {
      newErrors.authorName = 'Author name is required';
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
            <CardTitle>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
            <CardDescription className="text-white/70">
              {isEditing 
                ? 'Update the testimonial details below.' 
                : 'Fill out the form below to create a new testimonial.'}
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
            {/* Testimonial Quote */}
            <div className="space-y-2">
              <Label htmlFor="quote" className="text-white">Testimonial Quote</Label>
              <Textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="e.g. StealthRDP provided excellent service and performance for our business needs..."
                className="bg-charcoal/50 border-white/10 text-white min-h-[120px]"
              />
              {errors.quote && <p className="text-red-500 text-xs mt-1">{errors.quote}</p>}
            </div>

            {/* Author Name */}
            <div className="space-y-2">
              <Label htmlFor="authorName" className="text-white">Author Name</Label>
              <Input
                id="authorName"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                className="bg-charcoal/50 border-white/10 text-white"
              />
              {errors.authorName && <p className="text-red-500 text-xs mt-1">{errors.authorName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author Position */}
              <div className="space-y-2">
                <Label htmlFor="authorPosition" className="text-white">Position (Optional)</Label>
                <Input
                  id="authorPosition"
                  name="authorPosition"
                  value={formData.authorPosition}
                  onChange={handleChange}
                  placeholder="e.g. CEO"
                  className="bg-charcoal/50 border-white/10 text-white"
                />
              </div>

              {/* Author Company */}
              <div className="space-y-2">
                <Label htmlFor="authorCompany" className="text-white">Company (Optional)</Label>
                <Input
                  id="authorCompany"
                  name="authorCompany"
                  value={formData.authorCompany}
                  onChange={handleChange}
                  placeholder="e.g. Acme Inc."
                  className="bg-charcoal/50 border-white/10 text-white"
                />
              </div>
            </div>

            {/* Avatar URL */}
            <div className="space-y-2">
              <Label htmlFor="avatarUrl" className="text-white">Avatar URL (Optional)</Label>
              <Input
                id="avatarUrl"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                placeholder="e.g. https://example.com/avatars/john-smith.jpg"
                className="bg-charcoal/50 border-white/10 text-white"
              />
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
            {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TestimonialForm; 