import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FaqCategory } from '@/lib/models/Faq';
import {
  HelpCircle,
  MessageSquare,
  Tag,
  LayoutList,
  Eye,
  X
} from 'lucide-react';

interface FAQFormData {
  question: string;
  answer: string;
  category: FaqCategory;
  displayOrder: number;
  isPublished: boolean;
}

interface FAQFormProps {
  initialData?: FAQFormData;
  onSubmit: (data: FAQFormData) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const defaultFormData: FAQFormData = {
  question: '',
  answer: '',
  category: FaqCategory.SERVICES,
  displayOrder: 1,
  isPublished: true
};

const FAQForm: React.FC<FAQFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  isEditing 
}) => {
  const [formData, setFormData] = useState<FAQFormData>(initialData || defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof FAQFormData, value: any) => {
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
    
    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    }
    
    if (!formData.answer.trim()) {
      newErrors.answer = 'Answer is required';
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
      <form onSubmit={handleSubmit}>
        <CardHeader className="border-b border-white/10 pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-electric" />
                {isEditing ? 'Edit FAQ' : 'New FAQ'}
              </CardTitle>
              <CardDescription className="text-white/70 mt-1">
                {isEditing 
                  ? 'Update this FAQ to improve your customer support.' 
                  : 'Create a new FAQ to help your customers find answers quickly.'}
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
          {/* Question Field */}
          <div className="space-y-2">
            <Label htmlFor="question" className="text-white flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-electric" />
              <span>Question</span>
            </Label>
            <Input
              id="question"
              value={formData.question}
              onChange={(e) => handleChange('question', e.target.value)}
              className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
              placeholder="Enter the question..."
            />
            {errors.question && (
              <p className="text-sm text-red-500 animate-pulse">{errors.question}</p>
            )}
          </div>

          {/* Answer Field */}
          <div className="space-y-2">
            <Label htmlFor="answer" className="text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-electric" />
              <span>Answer</span>
            </Label>
            <Textarea
              id="answer"
              value={formData.answer}
              onChange={(e) => handleChange('answer', e.target.value)}
              className="bg-charcoal/50 border-white/10 text-white min-h-32 focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
              placeholder="Enter the answer..."
            />
            {errors.answer && (
              <p className="text-sm text-red-500 animate-pulse">{errors.answer}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white flex items-center gap-2">
                <Tag className="h-4 w-4 text-electric" />
                <span>Category</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-midnight border-white/10">
                  <SelectItem value={FaqCategory.SERVICES}>{FaqCategory.SERVICES}</SelectItem>
                  <SelectItem value={FaqCategory.PRICING}>{FaqCategory.PRICING}</SelectItem>
                  <SelectItem value={FaqCategory.ACCOUNT}>{FaqCategory.ACCOUNT}</SelectItem>
                  <SelectItem value={FaqCategory.TECHNICAL}>{FaqCategory.TECHNICAL}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Display Order Field */}
            <div className="space-y-2">
              <Label htmlFor="displayOrder" className="text-white flex items-center gap-2">
                <LayoutList className="h-4 w-4 text-electric" />
                <span>Display Order</span>
              </Label>
              <Input
                id="displayOrder"
                type="number"
                min="1"
                value={formData.displayOrder}
                onChange={(e) => handleChange('displayOrder', parseInt(e.target.value) || 1)}
                className="bg-charcoal/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all w-full"
              />
              <p className="text-white/50 text-xs">Lower numbers displayed first</p>
            </div>
          </div>

          {/* Published Status Field */}
          <div className="flex items-center space-x-2 p-4 bg-charcoal/30 rounded-lg border border-white/10">
            <div className="flex-1">
              <Label htmlFor="isPublished" className="text-white flex items-center gap-2 mb-1">
                <Eye className="h-4 w-4 text-electric" />
                <span>Published Status</span>
              </Label>
              <p className="text-white/50 text-xs">When published, this FAQ will be visible to all users</p>
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
            {isEditing ? 'Update' : 'Create'} FAQ
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FAQForm; 