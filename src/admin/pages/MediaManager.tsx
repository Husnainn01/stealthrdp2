import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { PageHeader } from '@/admin/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertCircle, 
  Trash2, 
  Search, 
  X, 
  Loader2, 
  FolderIcon, 
  Image as ImageIcon, 
  Upload, 
  RefreshCw,
  ChevronDown,
  Grid3X3,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mediaApi, MediaItem } from '@/lib/api/mediaApi';

const MediaManager: React.FC = () => {
  const { toast } = useToast();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [folderFilter, setFolderFilter] = useState<string>('all');
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [previewImage, setPreviewImage] = useState<MediaItem | null>(null);

  // Fetch media items from server
  const fetchMediaItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get media counts to determine available folders
        const counts = await mediaApi.getMediaCounts();
        setFolders(Object.keys(counts));
        
        // Get all media items
        const data = await mediaApi.getAllMedia();
        setMediaItems(data);
        setFilteredItems(data);
      } catch (err) {
        console.error('Failed to fetch media items:', err);
        throw new Error(`Failed to load media items. ${err instanceof Error ? err.message : 'Please try again.'}`);
      }
    } catch (err) {
      console.error('Error in fetchMediaItems:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchMediaItems();
  }, []);

  // Update filtered items when search term or folder filter changes
  useEffect(() => {
    let filtered = [...mediaItems];
    
    // Apply folder filter
    if (folderFilter !== 'all') {
      filtered = filtered.filter(item => item.folder === folderFilter);
    }
    
    // Apply search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.fileName.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    filtered = sortItems(filtered, sortBy, sortOrder);
    
    setFilteredItems(filtered);
  }, [mediaItems, searchTerm, folderFilter, sortBy, sortOrder]);

  // Sort items
  const sortItems = (items: MediaItem[], by: string, order: 'asc' | 'desc') => {
    return [...items].sort((a, b) => {
      let comparison = 0;
      
      if (by === 'date') {
        comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (by === 'name') {
        comparison = a.fileName.localeCompare(b.fileName);
      } else if (by === 'size') {
        comparison = a.size - b.size;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
  };

  // Format file size to human-readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date to readable format
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle delete confirmation
  const confirmDelete = (item: MediaItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Handle batch delete confirmation
  const confirmBatchDelete = () => {
    if (selectedItems.length > 0) {
      setDeleteDialogOpen(true);
    }
  };

  // Handle actual deletion
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      if (itemToDelete) {
        // Single item delete
        await mediaApi.deleteMedia(itemToDelete.id);
        
        // Update state to remove the deleted item
        setMediaItems(prev => prev.filter(item => item.id !== itemToDelete.id));
        
        toast({
          title: "Media deleted",
          description: `${itemToDelete.fileName} was successfully deleted.`
        });
      } else if (selectedItems.length > 0) {
        // Batch delete
        await mediaApi.batchDeleteMedia(selectedItems);
        
        // Update state to remove the deleted items
        setMediaItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
        
        toast({
          title: "Media deleted",
          description: `${selectedItems.length} items were successfully deleted.`
        });
        
        // Clear selection
        setSelectedItems([]);
      }
      
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error('Error deleting media:', err);
      
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "There was an error deleting the media. Please try again."
      });
      
      setIsDeleting(false);
    }
  };

  // Toggle item selection
  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  // Select/deselect all items
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFolderFilter('all');
  };

  // Refresh the media list
  const refreshMedia = () => {
    fetchMediaItems();
  };

  // Toggle view mode between grid and list
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  // Handle changing sort options
  const handleSortChange = (by: 'date' | 'name' | 'size') => {
    if (sortBy === by) {
      // Toggle order if clicking the same field
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field with default desc order
      setSortBy(by);
      setSortOrder('desc');
    }
  };

  // Open image preview
  const openPreview = (item: MediaItem) => {
    setPreviewImage(item);
  };

  return (
    <div className="space-y-6 w-full max-w-full px-0">
      <PageHeader 
        title="Media Library" 
        description="Manage uploaded images and files for your website" 
        icon={<FolderIcon className="h-6 w-6 text-electric" />}
        actions={
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={refreshMedia}
              className="border-white/10 text-white hover:bg-white/5 gap-1"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button 
              className="bg-cyber text-midnight hover:bg-cyber/90"
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload Files
            </Button>
          </>
        }
      />

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-charcoal/30 p-4 rounded-lg border border-white/5">
        <div className="flex-1 w-full md:max-w-md relative">
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-midnight/50 border-white/10 text-white pl-10 focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Select value={folderFilter} onValueChange={setFolderFilter}>
            <SelectTrigger className="bg-midnight/50 border-white/10 text-white focus:border-electric focus:ring-1 focus:ring-electric/30 transition-all w-full md:w-[150px]">
              <SelectValue placeholder="Filter by folder" />
            </SelectTrigger>
            <SelectContent className="bg-midnight border-white/10">
              <SelectItem value="all">All folders</SelectItem>
              {folders.map(folder => (
                <SelectItem key={folder} value={folder}>{folder}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                <SortAsc className="h-4 w-4 mr-1" />
                Sort by
                <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-midnight border-white/10">
              <DropdownMenuItem 
                className={`flex items-center ${sortBy === 'date' ? 'text-electric' : 'text-white'}`}
                onClick={() => handleSortChange('date')}
              >
                {sortBy === 'date' && sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
                Date {sortBy === 'date' && (sortOrder === 'desc' ? '(newest)' : '(oldest)')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center ${sortBy === 'name' ? 'text-electric' : 'text-white'}`}
                onClick={() => handleSortChange('name')}
              >
                {sortBy === 'name' && sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
                Name {sortBy === 'name' && (sortOrder === 'desc' ? '(Z-A)' : '(A-Z)')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center ${sortBy === 'size' ? 'text-electric' : 'text-white'}`}
                onClick={() => handleSortChange('size')}
              >
                {sortBy === 'size' && sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
                Size {sortBy === 'size' && (sortOrder === 'desc' ? '(largest)' : '(smallest)')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleViewMode}
            className="border-white/10 text-white hover:bg-white/5 w-10 h-10"
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          
          {(searchTerm || folderFilter !== 'all') && (
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="border-white/10 text-white hover:bg-white/5"
            >
              Clear filters
            </Button>
          )}
          
          {selectedItems.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={confirmBatchDelete}
              className="bg-red-900/80 text-white hover:bg-red-800"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete ({selectedItems.length})
            </Button>
          )}
        </div>
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-electric animate-spin" />
          <span className="ml-3 text-white text-lg">Loading media...</span>
        </div>
      ) : error ? (
        <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : filteredItems.length === 0 ? (
        <Card className="bg-charcoal/50 text-center p-12 border-white/10">
          <ImageIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No media found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || folderFilter !== 'all' 
              ? 'No media matches your current filters.'
              : 'Upload some images to get started.'}
          </p>
          {(searchTerm || folderFilter !== 'all') && (
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="border-white/20 text-white hover:bg-white/5"
            >
              Clear filters
            </Button>
          )}
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3 bg-charcoal/20 p-2 rounded-md border border-white/5">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="select-all"
                className="rounded bg-charcoal/80 border-white/30 text-electric focus:ring-electric/30 mr-2 h-4 w-4"
                checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                onChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-white text-sm cursor-pointer select-none">
                {selectedItems.length > 0 
                  ? `Selected ${selectedItems.length} of ${filteredItems.length}`
                  : 'Select all'}
              </label>
            </div>
            <div className="text-sm text-white/60">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
            </div>
          </div>

          {viewMode === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {filteredItems.map(item => (
                <Card 
                  key={item.id} 
                  className={`bg-charcoal/50 border overflow-hidden flex flex-col transition-all group ${
                    selectedItems.includes(item.id) 
                      ? 'border-electric shadow-glow-sm' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => openPreview(item)}>
                    <img 
                      src={item.url} 
                      alt={item.fileName} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback for missing images
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    
                    {/* Checkbox overlay in top left */}
                    <div className="absolute top-3 left-3 z-10">
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelect(item.id);
                        }}
                        className="rounded bg-charcoal/70 border-white/20 text-electric focus:ring-electric/30 h-5 w-5"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    
                    {/* File extension badge for non-image files */}
                    {!item.type.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) && (
                      <div className="absolute top-3 right-3 bg-midnight/80 text-electric text-xs font-bold px-2 py-1 rounded uppercase">
                        {item.type.replace('.', '')}
                      </div>
                    )}
                    
                    {/* Actions overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <div className="text-white text-sm truncate pr-2 font-medium">
                        {item.fileName}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(item);
                        }}
                        className="text-white/70 hover:text-red-500 hover:bg-white/10 rounded-full h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t border-white/10 text-xs text-gray-400 flex flex-col">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="text-white">{formatFileSize(item.size)}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Folder:</span>
                      <span className="text-white capitalize">{item.folder}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Date:</span>
                      <span className="text-white">{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-charcoal/30 rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full min-w-full divide-y divide-white/10">
                <thead className="bg-midnight/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider w-8">
                      <input 
                        type="checkbox" 
                        className="rounded bg-charcoal/80 border-white/30 text-electric focus:ring-electric/30 h-4 w-4"
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Preview
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      File Name
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Folder
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-charcoal/20 divide-y divide-white/5">
                  {filteredItems.map(item => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          className="rounded bg-charcoal/80 border-white/30 text-electric focus:ring-electric/30 h-4 w-4"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div 
                          className="w-10 h-10 rounded bg-charcoal/50 flex items-center justify-center overflow-hidden cursor-pointer"
                          onClick={() => openPreview(item)}
                        >
                          {item.type.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                            <img src={item.url} alt={item.fileName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-xs font-bold text-electric uppercase">{item.type.replace('.', '')}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-white">{item.fileName}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-white/80 capitalize">{item.folder}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-white/80">{formatFileSize(item.size)}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-white/80">{formatDate(item.createdAt)}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDelete(item)}
                          className="text-white/70 hover:text-red-500 hover:bg-white/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-midnight border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {itemToDelete ? (
              <p>
                Are you sure you want to delete <span className="font-bold">{itemToDelete.fileName}</span>?
                This action cannot be undone.
              </p>
            ) : (
              <p>
                Are you sure you want to delete <span className="font-bold">{selectedItems.length} items</span>?
                This action cannot be undone.
              </p>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-900/80 text-white hover:bg-red-800"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent className="bg-midnight border-white/10 text-white max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>{previewImage?.fileName}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 flex flex-col items-center">
            <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-charcoal/50 rounded-lg p-2">
              <img 
                src={previewImage?.url} 
                alt={previewImage?.fileName || 'Preview'} 
                className="max-w-full max-h-[65vh] object-contain"
              />
            </div>
            
            {previewImage && (
              <div className="w-full mt-4 grid grid-cols-3 gap-4 text-sm text-white/70">
                <div>
                  <div className="font-semibold text-white/90">Size</div>
                  <div>{formatFileSize(previewImage.size)}</div>
                </div>
                <div>
                  <div className="font-semibold text-white/90">Folder</div>
                  <div className="capitalize">{previewImage.folder}</div>
                </div>
                <div>
                  <div className="font-semibold text-white/90">Date</div>
                  <div>{formatDate(previewImage.createdAt)}</div>
                </div>
                <div className="col-span-3">
                  <div className="font-semibold text-white/90">URL</div>
                  <div className="bg-charcoal/50 rounded p-2 mt-1 flex items-center justify-between text-xs overflow-x-auto">
                    <code className="text-electric">{previewImage.url}</code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-2 text-white/70 hover:text-white"
                      onClick={() => {
                        navigator.clipboard.writeText(previewImage.url);
                        toast({
                          title: "URL copied",
                          description: "Image URL copied to clipboard"
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                Close
              </Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (previewImage) {
                  confirmDelete(previewImage);
                  setPreviewImage(null);
                }
              }}
              className="bg-red-900/80 text-white hover:bg-red-800"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaManager; 