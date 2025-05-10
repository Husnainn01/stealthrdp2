import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
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
  FileText,
  Eye,
  EyeOff,
  Clock,
  CalendarCheck,
  Tag,
  X,
  History
} from 'lucide-react';
import { privacyPolicyApi } from '@/lib/api/privacyPolicyApi';
import { IPrivacyPolicy, PrivacyPolicyFormData } from '@/lib/models/PrivacyPolicy';
import PrivacyPolicyForm from '@/admin/components/PrivacyPolicyForm';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const PrivacyPolicyManager: React.FC = () => {
  // State for privacy policy data
  const [policies, setPolicies] = useState<IPrivacyPolicy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for add/edit form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPolicy, setCurrentPolicy] = useState<IPrivacyPolicy | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [policyToDelete, setPolicyToDelete] = useState<string | null>(null);

  // Fetch privacy policies data
  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const data = await privacyPolicyApi.getAllPrivacyPolicies();
      console.log('Fetched Privacy Policies:', data);
      setPolicies(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching Privacy Policies:', err);
      setError('Failed to load Privacy Policies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // Convert IPrivacyPolicy to PrivacyPolicyFormData for form
  const policyToFormData = (policy: IPrivacyPolicy): PrivacyPolicyFormData => {
    return {
      content: policy.content,
      publishedVersion: policy.publishedVersion,
      effectiveDate: policy.effectiveDate,
      isPublished: policy.isPublished
    };
  };

  // Handle creating a new privacy policy
  const handleCreatePolicy = () => {
    setCurrentPolicy(null);
    setIsEditing(false);
    setShowForm(true);
  };

  // Handle editing a privacy policy
  const handleEditPolicy = (id: string) => {
    const policyToEdit = policies.find(policy => policy._id === id);
    if (policyToEdit) {
      setCurrentPolicy(policyToEdit);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  // Handle deleting a privacy policy
  const handleDeletePolicy = (id: string) => {
    setPolicyToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Handle toggling privacy policy published status
  const handleTogglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const updatedPolicy = await privacyPolicyApi.updatePrivacyPolicy(id, { isPublished: !currentStatus });
      setPolicies(policies.map(policy => policy._id === id ? updatedPolicy : policy));
      console.log(`Privacy Policy ${currentStatus ? 'unpublished' : 'published'} successfully`);
    } catch (err) {
      console.error('Error toggling Privacy Policy published status:', err);
    }
  };

  // Handle form submission (create/edit)
  const handleFormSubmit = async (formData: PrivacyPolicyFormData) => {
    try {
      console.log('Privacy Policy Form Data being submitted:', formData);
      
      // Add lastUpdated field to formData
      const updatedFormData = {
        ...formData,
        lastUpdated: new Date().toISOString()
      };
      
      if (isEditing && currentPolicy && currentPolicy._id) {
        // Update existing privacy policy
        console.log('Updating Privacy Policy with ID:', currentPolicy._id);
        const updatedPolicy = await privacyPolicyApi.updatePrivacyPolicy(
          String(currentPolicy._id),
          updatedFormData
        );
        console.log('Privacy Policy update response:', updatedPolicy);
        setPolicies(policies.map(policy => 
          policy._id === currentPolicy._id ? updatedPolicy : policy
        ));
        console.log('Privacy Policy updated successfully:', updatedPolicy);
      } else {
        // Create new privacy policy
        console.log('Creating new Privacy Policy');
        const newPolicy = await privacyPolicyApi.createPrivacyPolicy(updatedFormData);
        console.log('Privacy Policy creation response:', newPolicy);
        setPolicies([...policies, newPolicy]);
        console.log('Privacy Policy created successfully:', newPolicy);
      }
      
      // Close the form
      setShowForm(false);
    } catch (err) {
      console.error('Error saving Privacy Policy:', err);
      // You might want to show an error message to the user here
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (policyToDelete) {
      try {
        await privacyPolicyApi.deletePrivacyPolicy(String(policyToDelete));
        setPolicies(policies.filter(policy => policy._id !== policyToDelete));
        console.log('Privacy Policy deleted successfully');
      } catch (err) {
        console.error('Error deleting Privacy Policy:', err);
        // You might want to show an error message to the user here
      } finally {
        setShowDeleteConfirm(false);
        setPolicyToDelete(null);
      }
    }
  };

  // Format date helper function
  const formatDate = (date: string | Date): string => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'MMMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Truncate long text with ellipsis
  const truncateText = (text: string, maxLength: number = 100): string => {
    // Strip HTML tags for display
    const strippedText = text.replace(/<[^>]*>?/gm, '');
    return strippedText.length > maxLength ? `${strippedText.substring(0, maxLength)}...` : strippedText;
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Privacy Policy Management</h1>
          <p className="text-white/70">Manage your website's privacy policy and version history.</p>
        </div>

        <Button 
          onClick={handleCreatePolicy}
          className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200 shadow-glow-sm flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Version
        </Button>
      </div>

      {/* Show the form when add/edit is active */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="max-w-4xl w-full my-8">
            <PrivacyPolicyForm
              initialData={currentPolicy ? currentPolicy : undefined}
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
              This action cannot be undone. This privacy policy version will be permanently removed from the system.
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
      
      {/* Privacy Policies List */}
      <Card className="bg-midnight/80 border-white/10 shadow-lg overflow-hidden rounded-xl w-full">
        <CardHeader className="pb-3 border-b border-white/5">
          <CardTitle className="text-white text-xl flex items-center">
            <FileText className="h-5 w-5 mr-2 text-electric" />
            Privacy Policy Versions
          </CardTitle>
          <CardDescription className="text-white/70 mt-2">
            Maintain and update your privacy policy to comply with legal requirements and best practices.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="text-center py-12 px-4 w-full min-h-[400px] flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric mx-auto mb-4"></div>
              <p className="text-white/70">Loading Privacy Policies...</p>
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
                onClick={() => fetchPolicies()}
              >
                Try Again
              </Button>
            </div>
          ) : policies.length === 0 ? (
            <div className="text-center py-16 px-4 bg-charcoal/30 rounded-lg border border-white/5 w-full min-h-[400px] flex flex-col items-center justify-center">
              <div className="bg-electric/10 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-glow-sm">
                <FileText className="h-10 w-10 text-electric" />
              </div>
              <h3 className="text-white text-xl font-medium mb-2">No Privacy Policy Found</h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                Create your first privacy policy to comply with legal requirements and inform users about how you handle their data.
              </p>
              <Button 
                className="bg-cyber text-midnight hover:bg-cyber/90 transition-all duration-200"
                onClick={handleCreatePolicy}
              >
                <Plus className="h-4 w-4 mr-2" /> Create Privacy Policy
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {policies.map((policy) => (
                <Card 
                  key={String(policy._id)} 
                  className={`border ${policy.isPublished ? 'border-cyber/30 bg-midnight/60' : 'border-white/10 bg-charcoal/20'} rounded-lg shadow-sm transition-all hover:shadow-md group`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${policy.isPublished ? 'bg-cyber/10 text-cyber' : 'bg-white/5 text-white/70'}`}>
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                              Privacy Policy 
                              <span className="ml-2 text-sm px-2 py-0.5 rounded-full bg-electric/10 text-electric font-normal">
                                v{policy.publishedVersion}
                              </span>
                            </h3>
                            {policy.isPublished && (
                              <Badge className="ml-2 bg-cyber/20 text-cyber border-cyber/20 px-2 py-0.5 text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-white/70 mt-0.5 flex items-center gap-3">
                            <span className="flex items-center">
                              <CalendarCheck className="h-3 w-3 mr-1 text-electric/70" />
                              Effective: {formatDate(policy.effectiveDate)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-electric/70" />
                              Last Updated: {formatDate(policy.lastUpdated || policy.updatedAt || '')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleTogglePublished(String(policy._id), policy.isPublished)}
                          className={`h-9 px-3 ${
                            policy.isPublished 
                              ? 'text-amber-400 border-amber-400/30 hover:bg-amber-400/10 hover:border-amber-400' 
                              : 'text-cyber border-cyber/30 hover:bg-cyber/10 hover:border-cyber'
                          } transition-all`}
                        >
                          {policy.isPublished ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Publish
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditPolicy(String(policy._id))}
                          className="h-9 w-9 p-0 text-electric border-electric/30 hover:bg-electric/10 hover:border-electric transition-all"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeletePolicy(String(policy._id))}
                          className="h-9 w-9 p-0 text-red-500 border-red-500/30 hover:bg-red-500/10 hover:border-red-500 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-charcoal/30 rounded-lg border border-white/5">
                      <div className="text-white/80 text-sm line-clamp-3 italic">
                        {truncateText(policy.content, 250)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t border-white/5 py-4 flex justify-center">
          <p className="text-sm text-white/50 flex items-center">
            <History className="h-4 w-4 mr-1" />
            {policies.length} version{policies.length !== 1 ? 's' : ''} found
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PrivacyPolicyManager; 