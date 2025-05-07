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
  ArrowUpDown,
  Quote,
  MessageSquare,
  Star,
  User,
  X
} from 'lucide-react';
import TestimonialForm from '../components/TestimonialForm';
import { testimonialApi } from '@/lib/api/testimonialApi';
import { ITestimonial } from '@/lib/models/Testimonial';

// Import the form data type to ensure compatibility
interface TestimonialFormData {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  avatarUrl?: string;
  displayOrder: number;
  isFaq?: boolean;
}

const TestimonialsManager: React.FC = () => {
  // State for testimonial data
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<ITestimonial | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);

  // Fetch testimonials data
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialApi.getAllTestimonials();
      console.log('Fetched testimonials:', data);
      setTestimonials(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Convert ITestimonial to TestimonialFormData for form
  const testimonialToFormData = (testimonial: ITestimonial): TestimonialFormData => {
    return {
      quote: testimonial.quote,
      authorName: testimonial.authorName,
      authorPosition: testimonial.authorPosition,
      authorCompany: testimonial.authorCompany,
      avatarUrl: testimonial.avatarUrl,
      displayOrder: testimonial.displayOrder,
      isFaq: testimonial.isFaq || false
    };
  };

  // Handle creating a new testimonial
  const handleCreateTestimonial = () => {
    setCurrentTestimonial(null);
    setIsEditing(false);
    setShowForm(true);
  };

  // Handle editing a testimonial
  const handleEditTestimonial = (id: string) => {
    const testimonialToEdit = testimonials.find(testimonial => testimonial._id === id);
    if (testimonialToEdit) {
      setCurrentTestimonial(testimonialToEdit);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Handle deleting a testimonial
  const handleDeleteTestimonial = (id: string) => {
    setTestimonialToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Handle form submission (create/edit)
  const handleFormSubmit = async (formData: TestimonialFormData) => {
    try {
      console.log('Form data submitted:', formData);
      
      if (isEditing && currentTestimonial) {
        // Update existing testimonial
        const updatedTestimonial = await testimonialApi.updateTestimonial(
          String(currentTestimonial._id),
          formData as any // Cast to any to avoid type issues
        );
        setTestimonials(testimonials.map(testimonial => 
          testimonial._id === currentTestimonial._id ? updatedTestimonial : testimonial
        ));
        console.log('Item updated successfully:', updatedTestimonial);
      } else {
        // Create new testimonial
        const newTestimonial = await testimonialApi.createTestimonial(formData as any);
        setTestimonials([...testimonials, newTestimonial]);
        console.log('Item created successfully:', newTestimonial);
      }
      
      // Close the form
      setShowForm(false);
    } catch (err) {
      console.error('Error saving item:', err);
      // You might want to show an error message to the user here
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (testimonialToDelete) {
      try {
        await testimonialApi.deleteTestimonial(String(testimonialToDelete));
        setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialToDelete));
        console.log('Testimonial deleted successfully');
      } catch (err) {
        console.error('Error deleting testimonial:', err);
        // You might want to show an error message to the user here
      } finally {
        setShowDeleteConfirm(false);
        setTestimonialToDelete(null);
      }
    }
  };

  // Truncate long text with ellipsis
  const truncateText = (text: string, maxLength: number = 100): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Testimonials Management</h1>
          <p className="text-white/70">Manage customer testimonials displayed on the website.</p>
        </div>

        <Button 
          onClick={handleCreateTestimonial}
          className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 shadow-glow-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Testimonial
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-3xl w-full">
            <TestimonialForm
              initialData={currentTestimonial ? testimonialToFormData(currentTestimonial) : undefined}
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
              This action cannot be undone. This testimonial will be permanently removed from the system.
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
      
      {/* Testimonials Table */}
      <Card className="bg-midnight/80 border-white/10 shadow-lg overflow-hidden rounded-xl w-full min-w-full">
        <CardHeader className="pb-3 border-b border-white/5 w-full">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-white text-xl flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-electric" />
              Customer Testimonials
            </CardTitle>
          </div>
          <CardDescription className="text-white/70 mt-2">
            Showcase positive customer experiences and feedback on your website.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 w-full">
          {loading ? (
            <div className="text-center py-12 px-4 w-full min-h-[400px] flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric mx-auto mb-4"></div>
              <p className="text-white/70">Loading testimonials...</p>
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
                onClick={() => fetchTestimonials()}
              >
                Try Again
              </Button>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 px-4 bg-charcoal/30 rounded-lg border border-white/5 w-full min-h-[400px] flex flex-col items-center justify-center">
              <div className="bg-electric/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-glow-sm">
                <Star className="h-10 w-10 text-electric" />
              </div>
              <h3 className="text-white text-xl font-medium mb-2">No Testimonials Found</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Add customer testimonials to increase credibility and showcase positive experiences.
              </p>
              <Button 
                className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200"
                onClick={handleCreateTestimonial}
              >
                <Plus className="h-4 w-4 mr-2" /> Create Testimonial
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent w-full">
              <Table className="border-collapse w-full table-fixed">
                <TableCaption>
                  Showing {testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''}
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-b border-white/10 bg-charcoal/30">
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[20%]">
                      <div className="flex items-center">
                        Author
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[20%]">
                      <div className="flex items-center">
                        Position/Company
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[40%]">
                      <div className="flex items-center">
                        Quote
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium text-center w-[7%]">
                      <div className="flex items-center justify-center">
                        Order
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-right text-white/90 font-medium w-[13%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow 
                      key={String(testimonial._id)} 
                      className="border-b border-white/5 transition-all hover:bg-white/5 group"
                    >
                      <TableCell className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {testimonial.avatarUrl ? (
                            <div className="w-10 h-10 rounded-full border border-electric/20 overflow-hidden shadow-glow-sm group-hover:scale-110 transition-all duration-200">
                              <img
                                src={testimonial.avatarUrl}
                                alt={testimonial.authorName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center border border-electric/20 shadow-glow-sm group-hover:scale-110 transition-all duration-200">
                              <User className="h-5 w-5 text-electric" />
                            </div>
                          )}
                          <span className="font-medium text-white">{testimonial.authorName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-white/70">
                        {testimonial.authorPosition && testimonial.authorCompany ? (
                          <div>
                            <div className="text-electric/90">{testimonial.authorPosition}</div>
                            <div>{testimonial.authorCompany}</div>
                          </div>
                        ) : (
                          <div>
                            {testimonial.authorPosition || testimonial.authorCompany || "-"}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="relative bg-charcoal/30 rounded-lg p-3 border-l-2 border-electric/30 text-white/80 italic">
                          <Quote className="h-4 w-4 text-electric/40 absolute top-2 left-2 opacity-50" />
                          <div className="pl-5 pr-2">"{truncateText(testimonial.quote, 100)}"</div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <span className="bg-charcoal w-8 h-8 rounded-full inline-flex items-center justify-center text-white/90 font-medium border border-white/10">
                          {testimonial.displayOrder}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditTestimonial(String(testimonial._id))}
                            className="h-9 w-9 p-0 text-electric border-electric/30 hover:bg-electric/10 hover:border-electric transition-all"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteTestimonial(String(testimonial._id))}
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

export default TestimonialsManager; 