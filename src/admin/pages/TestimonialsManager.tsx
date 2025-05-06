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
  Quote
} from 'lucide-react';
import TestimonialForm from '../components/TestimonialForm';

// Import the testimonial service functions (commented for now)
// import { 
//   getAllTestimonials, 
//   createTestimonial,
//   updateTestimonial,
//   deleteTestimonial
// } from '@/lib/services/testimonialService';

// Import the form data type to ensure compatibility
interface TestimonialFormData {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  avatarUrl?: string;
  displayOrder: number;
}

// Define a simplified testimonial interface for the UI that doesn't include Mongoose methods
interface TestimonialUI {
  _id: string;
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  avatarUrl?: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialsManager: React.FC = () => {
  // State for testimonial data
  const [testimonials, setTestimonials] = useState<TestimonialUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialUI | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // This will be implemented when we connect to the database
        // const data = await getAllTestimonials();
        // setTestimonials(data);
        // setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // For now, since we're in early development, use mock data
    const mockTestimonials: TestimonialUI[] = [
      {
        _id: '1',
        quote: 'StealthRDP has transformed our remote work capabilities. The performance is outstanding and the security features give us peace of mind.',
        authorName: 'David Chen',
        authorPosition: 'CTO',
        authorCompany: 'TechSolutions Inc.',
        avatarUrl: 'https://i.pravatar.cc/150?img=11',
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        quote: 'We\'ve been using StealthRDP for our trading operations for over a year. The low latency and reliability are exactly what we needed.',
        authorName: 'Sarah Williams',
        authorPosition: 'Lead Developer',
        authorCompany: 'FinTech Partners',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
        displayOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '3',
        quote: 'The customer support team at StealthRDP goes above and beyond. They helped us optimize our setup for our specific needs.',
        authorName: 'Michael Rodriguez',
        authorPosition: 'IT Director',
        authorCompany: 'Global Retail Group',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        displayOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    setTestimonials(mockTestimonials);
    setLoading(false);

    // Uncomment this when you're ready to fetch from the database
    // fetchTestimonials();
  }, []);

  // Convert TestimonialUI to TestimonialFormData for form
  const testimonialToFormData = (testimonial: TestimonialUI): TestimonialFormData => {
    return {
      quote: testimonial.quote,
      authorName: testimonial.authorName,
      authorPosition: testimonial.authorPosition,
      authorCompany: testimonial.authorCompany,
      avatarUrl: testimonial.avatarUrl,
      displayOrder: testimonial.displayOrder
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
  const handleFormSubmit = (formData: TestimonialFormData) => {
    // This is a placeholder. Later, we'll connect to the database.
    if (isEditing && currentTestimonial) {
      // Update existing testimonial
      // With MongoDB connection:
      // updateTestimonial(currentTestimonial._id, formData)
      //   .then(updatedTestimonial => {
      //     setTestimonials(testimonials.map(testimonial => 
      //       testimonial._id === currentTestimonial._id ? updatedTestimonial : testimonial
      //     ));
      //   })
      //   .catch(err => console.error('Error updating testimonial:', err));
      
      // For now with mock data:
      setTestimonials(testimonials.map(testimonial => 
        testimonial._id === currentTestimonial._id 
          ? { 
              ...testimonial, 
              ...formData,
              updatedAt: new Date() 
            } 
          : testimonial
      ));
    } else {
      // Create new testimonial
      // With MongoDB connection:
      // createTestimonial(formData)
      //   .then(newTestimonial => {
      //     setTestimonials([...testimonials, newTestimonial]);
      //   })
      //   .catch(err => console.error('Error creating testimonial:', err));
      
      // For now with mock data:
      const newTestimonial: TestimonialUI = {
        _id: `temp-${Date.now()}`, // Temporary ID until we use the database
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTestimonials([...testimonials, newTestimonial]);
    }
    
    // Close the form
    setShowForm(false);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (testimonialToDelete) {
      // With MongoDB connection:
      // deleteTestimonial(testimonialToDelete)
      //   .then(success => {
      //     if (success) {
      //       setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialToDelete));
      //     }
      //   })
      //   .catch(err => console.error('Error deleting testimonial:', err));
      
      // For now with mock data:
      setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialToDelete));
      setShowDeleteConfirm(false);
      setTestimonialToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Testimonials Management</h1>
          <p className="text-white/70">View and manage customer testimonials.</p>
        </div>

        <Button 
          onClick={handleCreateTestimonial}
          className="bg-cyber text-midnight hover:bg-cyber/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Testimonial
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
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
        <AlertDialogContent className="bg-midnight border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This will permanently delete this testimonial. This action cannot be undone.
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
          <CardTitle className="text-white">All Testimonials</CardTitle>
          <CardDescription className="text-white/70">
            Manage customer testimonials displayed on the website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-white/70">Loading testimonials...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <Button variant="outline" className="mt-2" onClick={() => setLoading(true)}>
                Try Again
              </Button>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/70">No testimonials found. Create your first testimonial to get started.</p>
              <Button variant="outline" className="mt-2" onClick={handleCreateTestimonial}>
                <Plus className="h-4 w-4 mr-2" /> Create Testimonial
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/70 w-1/2">Quote</TableHead>
                  <TableHead className="text-white/70">Author</TableHead>
                  <TableHead className="text-white/70">Company</TableHead>
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
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id} className="border-white/10">
                    <TableCell className="max-w-xs font-medium text-white">
                      <div className="flex items-start space-x-2">
                        <Quote className="h-4 w-4 text-cyber flex-shrink-0 mt-1" />
                        <span className="line-clamp-2">{testimonial.quote}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {testimonial.avatarUrl && (
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            <img 
                              src={testimonial.avatarUrl} 
                              alt={testimonial.authorName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-white">{testimonial.authorName}</span>
                          {testimonial.authorPosition && (
                            <span className="text-xs text-white/70">{testimonial.authorPosition}</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/70">{testimonial.authorCompany || '-'}</TableCell>
                    <TableCell className="text-center text-white/70">{testimonial.displayOrder}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditTestimonial(testimonial._id)}
                          className="h-8 w-8 p-0 text-electric border-electric/30"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteTestimonial(testimonial._id)}
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

export default TestimonialsManager; 