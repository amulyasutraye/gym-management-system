import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockMembers } from '../../data/mockData';
import { User, Mail, Phone, Save, Camera } from 'lucide-react';
import { toast } from 'react-toastify';

const MemberProfile = () => {
  const { user } = useAuth();
  
  // Find the member data for the current user
  const memberData = mockMembers.find(member => member.email === user?.email);
  
  // State for form data
  const [formData, setFormData] = useState({
    name: memberData?.name || user?.name || '',
    email: memberData?.email || user?.email || '',
    phone: memberData?.phone || '',
    profileImage: memberData?.profileImage || user?.profileImage || '',
  });
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would update the user profile through an API
    // For now, we'll just show a success message
    
    setTimeout(() => {
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };
  
  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={formData.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg'}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-4 border-white"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-1 rounded-full">
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold">{formData.name}</h2>
              <p className="text-blue-100">{formData.email}</p>
              <p className="text-blue-100 mt-1">Member since {memberData?.startDate ? new Date(memberData.startDate).toLocaleDateString() : 'N/A'}</p>
            </div>
            
            <div className="md:ml-auto">
              <button
                onClick={toggleEdit}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  isEditing
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                } transition-colors`}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Profile Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`pl-10 block w-full rounded-md shadow-sm input-field ${
                      isEditing ? 'bg-white' : 'bg-gray-50'
                    }`}
                  />
                </div>
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`pl-10 block w-full rounded-md shadow-sm input-field ${
                      isEditing ? 'bg-white' : 'bg-gray-50'
                    }`}
                  />
                </div>
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`pl-10 block w-full rounded-md shadow-sm input-field ${
                      isEditing ? 'bg-white' : 'bg-gray-50'
                    }`}
                  />
                </div>
              </div>
            </div>
            
            {/* Membership Information (Read Only) */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Membership Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Membership Type</p>
                  <p className="font-medium text-gray-900">{memberData?.membershipType || 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium text-gray-900">
                    {memberData?.startDate 
                      ? new Date(memberData.startDate).toLocaleDateString() 
                      : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium text-gray-900">
                    {memberData?.endDate 
                      ? new Date(memberData.endDate).toLocaleDateString() 
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            {isEditing && (
              <div className="mt-8">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;