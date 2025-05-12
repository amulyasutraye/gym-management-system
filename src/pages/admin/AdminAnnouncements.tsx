import React, { useState } from 'react';
import { mockAnnouncements } from '../../data/mockData';
import { Bell, Calendar, Settings, Info, Plus, Edit, Trash, Search, FilterX, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import { Announcement } from '../../types';

const AdminAnnouncements = () => {
  // State for announcements management
  const [announcements, setAnnouncements] = useState([...mockAnnouncements]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for announcement form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'event',
    isActive: true,
  });
  
  // Filter announcements based on search and filters
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || announcement.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && announcement.isActive) ||
      (statusFilter === 'inactive' && !announcement.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Sort announcements by date (newest first)
  const sortedAnnouncements = [...filteredAnnouncements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Function to render announcement icon based on type
  const renderAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'holiday':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'maintenance':
        return <Settings className="h-5 w-5 text-yellow-500" />;
      case 'event':
        return <Bell className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  // Open form for creating new announcement
  const openCreateForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'event',
      isActive: true,
    });
    setEditingAnnouncement(null);
    setIsFormOpen(true);
  };
  
  // Open form for editing announcement
  const openEditForm = (announcement: Announcement) => {
    setFormData({
      title: announcement.title,
      message: announcement.message,
      type: announcement.type,
      isActive: announcement.isActive,
    });
    setEditingAnnouncement(announcement);
    setIsFormOpen(true);
  };
  
  // Close form
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingAnnouncement(null);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (editingAnnouncement) {
      // Update existing announcement
      const updatedAnnouncements = announcements.map(announcement => 
        announcement.id === editingAnnouncement.id 
          ? { 
              ...announcement, 
              title: formData.title,
              message: formData.message,
              type: formData.type as 'holiday' | 'maintenance' | 'event' | 'other',
              isActive: formData.isActive,
            } 
          : announcement
      );
      
      setAnnouncements(updatedAnnouncements);
      toast.success('Announcement updated successfully');
    } else {
      // Create new announcement
      const newAnnouncement: Announcement = {
        id: `announcement-${Date.now()}`,
        title: formData.title,
        message: formData.message,
        date: new Date().toISOString().split('T')[0],
        type: formData.type as 'holiday' | 'maintenance' | 'event' | 'other',
        isActive: formData.isActive,
      };
      
      setAnnouncements([newAnnouncement, ...announcements]);
      toast.success('Announcement created successfully');
    }
    
    closeForm();
  };
  
  // Handle announcement deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      const updatedAnnouncements = announcements.filter(
        announcement => announcement.id !== id
      );
      setAnnouncements(updatedAnnouncements);
      toast.success('Announcement deleted successfully');
    }
  };
  
  // Toggle announcement active status
  const toggleActiveStatus = (id: string) => {
    const updatedAnnouncements = announcements.map(announcement => 
      announcement.id === id 
        ? { ...announcement, isActive: !announcement.isActive } 
        : announcement
    );
    
    setAnnouncements(updatedAnnouncements);
    const announcement = updatedAnnouncements.find(a => a.id === id);
    
    if (announcement) {
      toast.success(`Announcement ${announcement.isActive ? 'activated' : 'deactivated'} successfully`);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Announcements</h1>
        
        <button 
          className="btn btn-primary" 
          onClick={openCreateForm}
        >
          <Plus className="h-4 w-4" />
          Create Announcement
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="holiday">Holiday</option>
                <option value="maintenance">Maintenance</option>
                <option value="event">Event</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            {/* Reset Filters */}
            {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all') && (
              <button
                onClick={resetFilters}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <FilterX size={16} className="mr-1" />
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Announcement Form */}
      {isFormOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Announcement title"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Announcement message"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="holiday">Holiday</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="event">Event</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="flex items-center mt-8">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active Announcement
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={closeForm}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {editingAnnouncement ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Announcements List */}
      <div className="space-y-4">
        {sortedAnnouncements.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-600">No announcements found matching your criteria.</p>
          </div>
        ) : (
          sortedAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    {renderAnnouncementIcon(announcement.type)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        announcement.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {announcement.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Posted on {new Date(announcement.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">{announcement.message}</p>
                    
                    {announcement.type === 'holiday' && (
                      <div className="mt-2 p-2 bg-blue-50 text-blue-800 text-sm rounded-md">
                        Please note this change in our operating hours.
                      </div>
                    )}
                    
                    {announcement.type === 'maintenance' && (
                      <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-sm rounded-md">
                        We apologize for any inconvenience this may cause.
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 md:ml-auto">
                  <button
                    onClick={() => toggleActiveStatus(announcement.id)}
                    className={`btn ${announcement.isActive ? 'btn-secondary' : 'btn-success'} btn-sm`}
                  >
                    {announcement.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => openEditForm(announcement)}
                    className="btn btn-primary btn-sm"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="btn btn-accent btn-sm"
                  >
                    <Trash size={14} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAnnouncements;