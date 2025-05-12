import React from 'react';
import { mockMembers, mockPayments, mockAnnouncements } from '../../data/mockData';
import StatsCard from '../../components/dashboard/StatsCard';
import RecentPayments from '../../components/dashboard/RecentPayments';
import Announcements from '../../components/dashboard/Announcements';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  ArrowUpRight, 
  BarChart3 
} from 'lucide-react';

const AdminDashboard = () => {
  // Calculate statistics
  const activeMembers = mockMembers.filter(member => member.status === 'active').length;
  const totalMembers = mockMembers.length;
  const activePercentage = Math.round((activeMembers / totalMembers) * 100);
  
  const thisMonthPayments = mockPayments.filter(
    payment => {
      const paymentDate = new Date(payment.date);
      const now = new Date();
      return paymentDate.getMonth() === now.getMonth() && 
             paymentDate.getFullYear() === now.getFullYear();
    }
  );
  
  const thisMonthTotal = thisMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const prevMonthTotal = 850; // Mock data
  const revenueChange = Math.round(((thisMonthTotal - prevMonthTotal) / prevMonthTotal) * 100);
  
  const pendingPayments = mockPayments.filter(payment => payment.status === 'pending').length;
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button className="btn btn-primary">
          <BarChart3 className="h-4 w-4" />
          Generate Reports
        </button>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Active Members"
          value={activeMembers}
          icon={<Users size={20} />}
          trend={{ value: activePercentage, isUpward: activePercentage >= 0 }}
        />
        
        <StatsCard
          title="Total Revenue (Month)"
          value={`$${thisMonthTotal}`}
          icon={<DollarSign size={20} />}
          trend={{ value: Math.abs(revenueChange), isUpward: revenueChange >= 0 }}
        />
        
        <StatsCard
          title="Expiring Memberships"
          value="4"
          icon={<Calendar size={20} />}
          trend={{ value: 20, isUpward: false }}
        />
        
        <StatsCard
          title="Pending Payments"
          value={pendingPayments}
          icon={<AlertTriangle size={20} />}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="#" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <span className="font-medium text-gray-900">Add Member</span>
              </a>
              
              <a href="#" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center">
                <DollarSign className="h-6 w-6 text-green-600 mb-2" />
                <span className="font-medium text-gray-900">Record Payment</span>
              </a>
              
              <a href="#" className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mb-2" />
                <span className="font-medium text-gray-900">Add Announcement</span>
              </a>
            </div>
          </div>
          
          {/* Recent Payments */}
          <RecentPayments 
            payments={mockPayments} 
            limit={5} 
            viewAllLink="/admin/payments" 
          />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>New Members</span>
                <div className="flex items-center">
                  <span className="font-bold">2</span>
                  <ArrowUpRight className="h-4 w-4 ml-1 text-green-300" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Payments Received</span>
                <div className="flex items-center">
                  <span className="font-bold">$450</span>
                  <ArrowUpRight className="h-4 w-4 ml-1 text-green-300" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Visits Today</span>
                <div className="flex items-center">
                  <span className="font-bold">24</span>
                  <ArrowUpRight className="h-4 w-4 ml-1 text-green-300" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Announcements */}
          <Announcements announcements={mockAnnouncements} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;