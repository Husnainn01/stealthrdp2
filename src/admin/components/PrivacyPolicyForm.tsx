import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { IPrivacyPolicy, PrivacyPolicyFormData } from '@/lib/models/PrivacyPolicy';
import { 
  FileText, 
  CalendarCheck, 
  Tag, 
  Eye, 
  X, 
  FileCode 
} from 'lucide-react';

// We'll use a simple textarea instead of ReactQuill for now
const quillStyles = `
  .privacy-editor {
    min-height: 400px;
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.6;
    color: white;
    background-color: rgba(16, 18, 36, 0.3);
    padding: 1rem;
    border-radius: 0.375rem;
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .privacy-editor:focus {
    outline: 2px solid rgba(0, 240, 255, 0.4);
    border-color: rgba(0, 240, 255, 0.6);
  }
`;

interface PrivacyPolicyFormProps {
  initialData?: IPrivacyPolicy;
  onSubmit: (data: PrivacyPolicyFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const defaultFormData: PrivacyPolicyFormData = {
  content: `<h2>Privacy Policy</h2>
<p>Last updated: [Date]</p>

<h3>1. Introduction</h3>
<p>Welcome to StealthRDP ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and share information about you when you use our services.</p>

<h3>2. Information We Collect</h3>
<p>We collect information you provide directly to us, such as when you create an account, subscribe to our service, or contact us for support.</p>

<h3>3. How We Use Your Information</h3>
<p>We use the information we collect to provide, maintain, and improve our services, and to develop new services.</p>

<h3>4. How We Share Your Information</h3>
<p>We do not sell your personal information. We may share your information with third parties in limited circumstances.</p>

<h3>5. Your Rights and Choices</h3>
<p>You have certain rights regarding your personal information, including the right to access, correct, or delete your personal information.</p>

<h3>6. Security</h3>
<p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.</p>

<h3>7. Changes to This Privacy Policy</h3>
<p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

<h3>8. Contact Us</h3>
<p>If you have any questions about this Privacy Policy, please contact us at: support@stealthrdp.com</p>`,
  publishedVersion: '1.0',
  effectiveDate: new Date().toISOString().split('T')[0],
  isPublished: true
};

const PrivacyPolicyForm: React.FC<PrivacyPolicyFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isEditing 
}) => {
  const [formData, setFormData] = useState<PrivacyPolicyFormData>(
    initialData ? {
      content: initialData.content,
      publishedVersion: initialData.publishedVersion,
      effectiveDate: typeof initialData.effectiveDate === 'string' 
        ? initialData.effectiveDate.split('T')[0] 
        : new Date(initialData.effectiveDate).toISOString().split('T')[0],
      isPublished: initialData.isPublished
    } : defaultFormData
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof PrivacyPolicyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.publishedVersion.trim()) {
      newErrors.publishedVersion = 'Version is required';
    }
    
    if (!formData.effectiveDate) {
      newErrors.effectiveDate = 'Effective date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="bg-midnight border-electric/20 border-2 text-white w-full shadow-glow rounded-xl animate-fadeIn">
      {/* Inject custom styles */}
      <style>{quillStyles}</style>
      
      <form onSubmit={handleSubmit}>
        <CardHeader className="border-b border-white/10 pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-electric" />
                {isEditing ? 'Edit Privacy Policy' : 'New Privacy Policy'}
              </CardTitle>
              <CardDescription className="text-white/70 mt-1">
                {isEditing 
                  ? 'Update the privacy policy to reflect current practices.' 
                  : 'Create a new privacy policy for your website.'}
              </CardDescription>
            </div>
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              onClick={onCancel}
              className="text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Content Field */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-white flex items-center gap-2">
              <FileCode className="h-4 w-4 text-electric" />
              <span>Privacy Policy Content</span>
              <span className="text-white/50 text-xs ml-2">(HTML formatting supported)</span>
            </Label>
            <div className="bg-charcoal/50 border border-white/10 rounded-md text-white">
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                className="privacy-editor bg-transparent min-h-[400px] text-white focus:border-electric"
                placeholder="Enter your privacy policy content here..."
              />
            </div>
            {errors.content && (
              <p className="text-sm text-red-500 animate-pulse">{errors.content}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Version Field */}
            <div className="space-y-2">
              <Label htmlFor="publishedVersion" className="text-white flex items-center gap-2">
                <Tag className="h-4 w-4 text-electric" />
                <span>Version</span>
              </Label>
              <Input
                id="publishedVersion"
                value={formData.publishedVersion}
                onChange={(e) => handleChange('publishedVersion', e.target.value)}
                className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
                placeholder="e.g. 1.0, 1.1, 2.0"
              />
              {errors.publishedVersion && (
                <p className="text-sm text-red-500 animate-pulse">{errors.publishedVersion}</p>
              )}
            </div>

            {/* Effective Date Field */}
            <div className="space-y-2">
              <Label htmlFor="effectiveDate" className="text-white flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-electric" />
                <span>Effective Date</span>
              </Label>
              <Input
                id="effectiveDate"
                type="date"
                value={typeof formData.effectiveDate === 'string' ? formData.effectiveDate : ''}
                onChange={(e) => handleChange('effectiveDate', e.target.value)}
                className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all w-full"
              />
              {errors.effectiveDate && (
                <p className="text-sm text-red-500 animate-pulse">{errors.effectiveDate}</p>
              )}
            </div>
          </div>

          {/* Published Status Field */}
          <div className="flex items-center space-x-2 p-4 bg-charcoal/30 rounded-lg border border-white/10">
            <div className="flex-1">
              <Label htmlFor="isPublished" className="text-white flex items-center gap-2 mb-1">
                <Eye className="h-4 w-4 text-electric" />
                <span>Published Status</span>
              </Label>
              <p className="text-white/50 text-xs">When published, this privacy policy will be visible to all users</p>
            </div>
            <Switch
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) => handleChange('isPublished', checked)}
              className="data-[state=checked]:bg-cyber"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 border-t border-white/10 pt-6">
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
            {isEditing ? 'Update' : 'Create'} Privacy Policy
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PrivacyPolicyForm; 