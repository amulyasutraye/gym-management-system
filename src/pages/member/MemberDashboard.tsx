import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockMembers, mockPayments, mockAnnouncements } from '../../data/mockData';
import MembershipStatus from '../../components/dashboard/MembershipStatus';
import RecentPayments from '../../components/dashboard/RecentPayments';
import Announcements from '../../components/dashboard/Announcements';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MemberDashboard = () => {
  const { user } = useAuth();
  
  // Find the member data for the current user
  const memberData = mockMembers.find(member => member.email === user?.email);
  
  // Filter payments for this member
  const memberPayments = mockPayments.filter(payment => payment.memberId === memberData?.id);
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
        <p className="text-gray-600">
          <CalendarDays className="inline-block mr-1" size={18} />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {memberData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
                <p className="mb-4">Track your membership, payments, and gym announcements.</p>
                <Link
                  to="/member/profile"
                  className="inline-flex items-center text-sm font-medium text-white hover:text-blue-100"
                >
                  View your profile
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 transform translate-x-8 translate-y-8">
                <div className="w-full h-full rounded-full bg-white opacity-10"></div>
              </div>
            </div>
            
            {/* Recent Payments */}
            <RecentPayments payments={memberPayments} limit={3} />
            
            {/* Announcements */}
            <Announcements announcements={mockAnnouncements} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Membership Status */}
            <MembershipStatus
              startDate={memberData.startDate}
              endDate={memberData.endDate}
              status={memberData.status}
              type={memberData.membershipType}
            />
            
            {/* Quick Links */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/member/payments"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                >
                  View All Payments
                </Link>
                <Link
                  to="/member/profile"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                >
                  Update Profile
                </Link>
                <a
                  href="#"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                >
                  Class Schedule
                </a>
                <a
                  href="#"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Loading your membership data...</p>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;