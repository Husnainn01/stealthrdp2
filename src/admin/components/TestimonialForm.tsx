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
import { 
  X, 
  MessageSquare, 
  HelpCircle, 
  User, 
  Briefcase, 
  Building2, 
  Image as ImageIcon, 
  LayoutList
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the testimonial interface for use in this form
interface TestimonialFormData {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  avatarUrl?: string;
  displayOrder: number;
  isFaq?: boolean; // New field to identify if this is a FAQ item
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
  displayOrder: 0,
  isFaq: false
};

const TestimonialForm: React.FC<TestimonialFormProps> = ({ 
  initialData = defaultTestimonial, 
  onSubmit, 
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<TestimonialFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formType, setFormType] = useState<'testimonial' | 'faq'>(formData.isFaq ? 'faq' : 'testimonial');

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

  // Handle form type change
  const handleFormTypeChange = (value: 'testimonial' | 'faq') => {
    setFormType(value);
    setFormData(prev => ({
      ...prev,
      isFaq: value === 'faq'
    }));
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formType === 'testimonial') {
      // Required fields for testimonial
      if (!formData.quote.trim()) {
        newErrors.quote = 'Testimonial quote is required';
      }
      
      if (!formData.authorName.trim()) {
        newErrors.authorName = 'Author name is required';
      }
    } else {
      // Required fields for FAQ
      if (!formData.quote.trim()) {
        newErrors.quote = 'Question is required';
      }
      
      if (!formData.authorName.trim()) {
        newErrors.authorName = 'Answer is required';
      }
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
    <Card className="bg-midnight border-electric/20 border-2 text-white max-w-2xl mx-auto shadow-glow rounded-xl animate-fadeIn">
      <CardHeader className="border-b border-white/10 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              {formType === 'testimonial' ? (
                <MessageSquare className="h-5 w-5 text-electric" />
              ) : (
                <HelpCircle className="h-5 w-5 text-electric" />
              )}
              {isEditing ? 'Edit Item' : `New ${formType === 'faq' ? 'FAQ' : 'Testimonial'}`}
            </CardTitle>
            <CardDescription className="text-white/70 mt-1">
              {isEditing 
                ? 'Update the item details below.' 
                : 'Fill out the form below to create a new item.'}
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCancel}
            className="text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          {/* Content Type Selection */}
          {!isEditing && (
            <div className="p-4 bg-charcoal/30 rounded-lg border border-white/10">
              <Label className="text-white font-medium mb-3 block">Content Type</Label>
              <RadioGroup 
                defaultValue={formType} 
                onValueChange={(v) => handleFormTypeChange(v as 'testimonial' | 'faq')}
                className="flex space-x-4"
              >
                <div className="flex-1">
                  <div 
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border border-white/10 cursor-pointer
                      ${formType === 'testimonial' 
                        ? 'bg-electric/10 border-electric/30 shadow-glow-sm' 
                        : 'hover:bg-white/5'}
                      transition-all duration-200
                    `}
                    onClick={() => handleFormTypeChange('testimonial')}
                  >
                    <RadioGroupItem value="testimonial" id="type-testimonial" className="text-electric" />
                    <Label htmlFor="type-testimonial" className="cursor-pointer flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-electric" />
                      <span>Testimonial</span>
                    </Label>
                  </div>
                </div>
                <div className="flex-1">
                  <div 
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border border-white/10 cursor-pointer
                      ${formType === 'faq' 
                        ? 'bg-electric/10 border-electric/30 shadow-glow-sm' 
                        : 'hover:bg-white/5'}
                      transition-all duration-200
                    `}
                    onClick={() => handleFormTypeChange('faq')}
                  >
                    <RadioGroupItem value="faq" id="type-faq" className="text-electric" />
                    <Label htmlFor="type-faq" className="cursor-pointer flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-electric" />
                      <span>FAQ</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {/* Quote/Question */}
            <div className="space-y-2">
              <Label htmlFor="quote" className="text-white flex items-center gap-2">
                {formType === 'faq' ? (
                  <>
                    <HelpCircle className="h-4 w-4 text-electric" />
                    <span>Question</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 text-electric" />
                    <span>Testimonial Quote</span>
                  </>
                )}
              </Label>
              <Textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder={formType === 'faq' 
                  ? 'e.g. How do I sign up for StealthRDP?' 
                  : 'e.g. StealthRDP provided excellent service...'}
                className="bg-charcoal/50 border-white/10 text-white min-h-[120px] focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
              />
              {errors.quote && (
                <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.quote}</p>
              )}
            </div>

            {/* Author Name/Answer */}
            <div className="space-y-2">
              <Label htmlFor="authorName" className="text-white flex items-center gap-2">
                {formType === 'faq' ? (
                  <>
                    <MessageSquare className="h-4 w-4 text-electric" />
                    <span>Answer</span>
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 text-electric" />
                    <span>Author Name</span>
                  </>
                )}
              </Label>
              <Textarea
                id="authorName"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                placeholder={formType === 'faq'
                  ? 'e.g. You can sign up by visiting our pricing page...'
                  : 'e.g. John Smith'}
                className={`bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all ${formType === 'faq' ? 'min-h-[120px]' : ''}`}
              />
              {errors.authorName && (
                <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.authorName}</p>
              )}
            </div>

            {/* Category (for FAQs) or Position/Company (for Testimonials) */}
            {formType === 'faq' ? (
              <div className="space-y-2">
                <Label htmlFor="authorPosition" className="text-white flex items-center gap-2">
                  <LayoutList className="h-4 w-4 text-electric" />
                  <span>FAQ Category</span>
                </Label>
                <Select 
                  value={formData.authorPosition || 'Services & Plans'}
                  onValueChange={(value) => handleSelectChange('authorPosition', value)}
                >
                  <SelectTrigger className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-midnight border-white/10">
                    <SelectItem value="Services & Plans">Services & Plans</SelectItem>
                    <SelectItem value="Pricing & Billing">Pricing & Billing</SelectItem>
                    <SelectItem value="Account Management">Account Management</SelectItem>
                    <SelectItem value="Technical Support & Security">Technical Support & Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Author Position */}
                <div className="space-y-2">
                  <Label htmlFor="authorPosition" className="text-white flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-electric" />
                    <span>Position (Optional)</span>
                  </Label>
                  <Input
                    id="authorPosition"
                    name="authorPosition"
                    value={formData.authorPosition}
                    onChange={handleChange}
                    placeholder="e.g. CEO"
                    className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                  />
                </div>

                {/* Author Company */}
                <div className="space-y-2">
                  <Label htmlFor="authorCompany" className="text-white flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-electric" />
                    <span>Company (Optional)</span>
                  </Label>
                  <Input
                    id="authorCompany"
                    name="authorCompany"
                    value={formData.authorCompany}
                    onChange={handleChange}
                    placeholder="e.g. Acme Inc."
                    className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Avatar URL - only for testimonials */}
            {formType === 'testimonial' && (
              <div className="space-y-2">
                <Label htmlFor="avatarUrl" className="text-white flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-electric" />
                  <span>Avatar URL (Optional)</span>
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      id="avatarUrl"
                      name="avatarUrl"
                      value={formData.avatarUrl}
                      onChange={handleChange}
                      placeholder="e.g. https://example.com/avatars/john-smith.jpg"
                      className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                    />
                  </div>
                  {formData.avatarUrl && (
                    <div className="w-10 h-10 rounded-full border border-electric/20 overflow-hidden shadow-glow-sm">
                      <img
                        src={formData.avatarUrl}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=Error';
                        }}
                      />
                    </div>
                  )}
                </div>
                <p className="text-white/50 text-xs">Enter a URL for the author's profile picture</p>
              </div>
            )}

            {/* Display Order */}
            <div className="space-y-2">
              <Label htmlFor="displayOrder" className="text-white flex items-center gap-2">
                <LayoutList className="h-4 w-4 text-electric" />
                <span>Display Order</span>
              </Label>
              <Input
                id="displayOrder"
                name="displayOrder"
                type="number"
                min="0"
                value={formData.displayOrder}
                onChange={handleChange}
                className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all w-32"
              />
              <p className="text-white/50 text-xs">Lower numbers displayed first</p>
              {errors.displayOrder && (
                <p className="text-red-500 text-xs mt-1 animate-pulse">{errors.displayOrder}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-white/10 pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="border-white/20 text-white hover:text-white hover:bg-white/5 transition-all"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 shadow-glow-sm"
          >
            {isEditing ? 'Update Item' : `Create ${formType === 'faq' ? 'FAQ' : 'Testimonial'}`}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TestimonialForm; 