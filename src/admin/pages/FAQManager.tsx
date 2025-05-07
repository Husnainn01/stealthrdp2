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
  CardHeader,
  CardTitle,
  CardDescription
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
  MessageSquare,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowUpDown,
  Filter,
  Tag,
  LayoutList,
  X
} from 'lucide-react';
import { faqApi } from '@/lib/api/faqApi';
import { IFaq, FaqCategory } from '@/lib/models/Faq';
import FAQForm from '@/admin/components/FAQForm';
import { Badge } from '@/components/ui/badge';

// Import the form data type to ensure compatibility
interface FAQFormData {
  question: string;
  answer: string;
  category: FaqCategory;
  displayOrder: number;
  isPublished: boolean;
}

const FAQManager: React.FC = () => {
  // State for FAQ data
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FaqCategory | 'all'>('all');
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentFaq, setCurrentFaq] = useState<IFaq | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);

  // Fetch FAQs data
  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const data = await faqApi.getAllFaqs();
      console.log('Fetched FAQs:', data);
      setFaqs(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setError('Failed to load FAQs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Convert IFaq to FAQFormData for form
  const faqToFormData = (faq: IFaq): FAQFormData => {
    return {
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      displayOrder: faq.displayOrder,
      isPublished: faq.isPublished
    };
  };

  // Handle creating a new FAQ
  const handleCreateFaq = () => {
    setCurrentFaq(null);
    setIsEditing(false);
    setShowForm(true);
  };

  // Handle editing a FAQ
  const handleEditFaq = (id: string) => {
    const faqToEdit = faqs.find(faq => faq._id === id);
    if (faqToEdit) {
      setCurrentFaq(faqToEdit);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Handle deleting a FAQ
  const handleDeleteFaq = (id: string) => {
    setFaqToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Handle toggling FAQ published status
  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const updatedFaq = await faqApi.updateFaq(id, { isPublished: !currentStatus });
      setFaqs(faqs.map(faq => faq._id === id ? updatedFaq : faq));
      console.log(`FAQ ${currentStatus ? 'unpublished' : 'published'} successfully`);
    } catch (err) {
      console.error('Error toggling FAQ published status:', err);
    }
  };

  // Handle form submission (create/edit)
  const handleFormSubmit = async (formData: FAQFormData) => {
    try {
      console.log('FAQ Form Data being submitted:', formData);
      
      if (isEditing && currentFaq) {
        // Update existing FAQ
        console.log('Updating FAQ with ID:', currentFaq._id);
        const updatedFaq = await faqApi.updateFaq(
          String(currentFaq._id),
          formData as any // Cast to any to avoid type issues
        );
        console.log('FAQ update response:', updatedFaq);
        setFaqs(faqs.map(faq => 
          faq._id === currentFaq._id ? updatedFaq : faq
        ));
        console.log('FAQ updated successfully:', updatedFaq);
      } else {
        // Create new FAQ
        console.log('Creating new FAQ with API endpoint:', faqApi.createFaq.toString());
        const newFaq = await faqApi.createFaq(formData as any);
        console.log('FAQ creation response:', newFaq);
        setFaqs([...faqs, newFaq]);
        console.log('FAQ created successfully:', newFaq);
      }
      
      // Close the form
      setShowForm(false);
    } catch (err) {
      console.error('Error saving FAQ:', err);
      // You might want to show an error message to the user here
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (faqToDelete) {
      try {
        await faqApi.deleteFaq(String(faqToDelete));
        setFaqs(faqs.filter(faq => faq._id !== faqToDelete));
        console.log('FAQ deleted successfully');
      } catch (err) {
        console.error('Error deleting FAQ:', err);
        // You might want to show an error message to the user here
      } finally {
        setShowDeleteConfirm(false);
        setFaqToDelete(null);
      }
    }
  };

  // Get category name helper function
  const getCategoryBadge = (category: FaqCategory) => {
    const colorMap = {
      [FaqCategory.SERVICES]: 'bg-blue-600/30 text-blue-400 border-blue-600/30',
      [FaqCategory.PRICING]: 'bg-green-600/30 text-green-400 border-green-600/30',
      [FaqCategory.ACCOUNT]: 'bg-yellow-600/30 text-yellow-400 border-yellow-600/30',
      [FaqCategory.TECHNICAL]: 'bg-purple-600/30 text-purple-400 border-purple-600/30'
    };

    return (
      <Badge className={`${colorMap[category]} px-2 py-1 text-xs border rounded-full`}>
        {category}
      </Badge>
    );
  };

  // Handle filter change
  const handleFilterChange = (newFilter: FaqCategory | 'all') => {
    setFilter(newFilter);
  };

  // Filtered FAQs based on selected category
  const filteredFaqs = filter === 'all' ? faqs : faqs.filter(faq => faq.category === filter);

  // Truncate long text with ellipsis
  const truncateText = (text: string, maxLength: number = 70): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">FAQ Management</h1>
          <p className="text-white/70">Manage frequently asked questions displayed on the website.</p>
        </div>

        <Button 
          onClick={handleCreateFaq}
          className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 shadow-glow-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New FAQ
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-3xl w-full">
            <FAQForm
              initialData={currentFaq ? faqToFormData(currentFaq) : undefined}
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
              This action cannot be undone. This FAQ will be permanently removed from the system.
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
      
      {/* FAQs Table */}
      <Card className="bg-midnight/80 border-white/10 shadow-lg overflow-hidden rounded-xl w-full min-w-full">
        <CardHeader className="pb-3 border-b border-white/5 w-full">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-white text-xl flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-electric" />
              Frequently Asked Questions
            </CardTitle>
            
            <div className="bg-charcoal rounded-lg p-1 flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleFilterChange('all')}
                className={`rounded-md transition-all duration-200 px-3 py-1 mx-0.5 ${
                  filter === 'all' 
                    ? 'bg-electric text-midnight shadow-glow-sm' 
                    : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Filter className="h-4 w-4 mr-1" />
                All
              </Button>
              {Object.values(FaqCategory).map((category) => (
                <Button 
                  key={category}
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleFilterChange(category)}
                  className={`rounded-md transition-all duration-200 px-3 py-1 mx-0.5 ${
                    filter === category 
                      ? 'bg-electric text-midnight shadow-glow-sm' 
                      : 'bg-transparent text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <CardDescription className="text-white/70 mt-2">
            Provide helpful information to your customers with well-organized FAQs.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 w-full">
          {loading ? (
            <div className="text-center py-12 px-4 w-full min-h-[400px] flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric mx-auto mb-4"></div>
              <p className="text-white/70">Loading FAQs...</p>
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
                onClick={() => fetchFaqs()}
              >
                Try Again
              </Button>
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-16 px-4 bg-charcoal/30 rounded-lg border border-white/5 w-full min-h-[400px] flex flex-col items-center justify-center">
              <div className="bg-electric/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-glow-sm">
                <HelpCircle className="h-10 w-10 text-electric" />
              </div>
              <h3 className="text-white text-xl font-medium mb-2">No FAQs Found</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                {filter !== 'all' 
                  ? `No FAQs found in the ${filter} category.` 
                  : 'Create your first FAQ to help your customers find answers easily.'}
              </p>
              <Button 
                className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200"
                onClick={handleCreateFaq}
              >
                <Plus className="h-4 w-4 mr-2" /> Create FAQ
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent w-full">
              <Table className="border-collapse w-full table-fixed">
                <TableCaption>
                  Showing {filteredFaqs.length} FAQ{filteredFaqs.length !== 1 ? 's' : ''}
                  {filter !== 'all' ? ` in ${filter} category` : ''}
                </TableCaption>
                <TableHeader>
                  <TableRow className="border-b border-white/10 bg-charcoal/30">
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[30%]">
                      <div className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-electric/60" />
                        Question
                        <ArrowUpDown className="ml-1 h-3 w-3 text-electric/60" />
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[30%]">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-electric/60" />
                        Answer
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium w-[15%]">
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-electric/60" />
                        Category
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium text-center w-[8%]">
                      <div className="flex items-center justify-center">
                        <LayoutList className="h-4 w-4 mr-2 text-electric/60" />
                        Order
                      </div>
                    </TableHead>
                    <TableHead className="py-3 px-4 text-white/90 font-medium text-center w-[10%]">Status</TableHead>
                    <TableHead className="py-3 px-4 text-right text-white/90 font-medium w-[7%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaqs.map((faq) => (
                    <TableRow 
                      key={String(faq._id)} 
                      className="border-b border-white/5 transition-all hover:bg-white/5 group"
                    >
                      <TableCell className="py-4 px-4">
                        <div className="font-medium text-white">
                          {truncateText(faq.question, 70)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="relative bg-charcoal/30 rounded-lg p-3 border-l-2 border-electric/30 text-white/80">
                          <MessageSquare className="h-4 w-4 text-electric/40 absolute top-2 left-2 opacity-50" />
                          <div className="pl-5 pr-2 line-clamp-2">{faq.answer}</div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        {getCategoryBadge(faq.category)}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <span className="bg-charcoal w-8 h-8 rounded-full inline-flex items-center justify-center text-white/90 font-medium border border-white/10">
                          {faq.displayOrder}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublished(String(faq._id), faq.isPublished)}
                          className={`px-3 py-1 rounded-full border ${
                            faq.isPublished 
                              ? 'text-cyber border-cyber/30 bg-cyber/10 hover:bg-cyber/20' 
                              : 'text-white/60 border-white/10 bg-white/5 hover:bg-white/10'
                          } transition-all duration-200`}
                        >
                          {faq.isPublished ? (
                            <Eye className="h-4 w-4 mr-1" />
                          ) : (
                            <EyeOff className="h-4 w-4 mr-1" />
                          )}
                          <span>{faq.isPublished ? 'Published' : 'Draft'}</span>
                        </Button>
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditFaq(String(faq._id))}
                            className="h-9 w-9 p-0 text-electric border-electric/30 hover:bg-electric/10 hover:border-electric transition-all"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteFaq(String(faq._id))}
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

export default FAQManager; 