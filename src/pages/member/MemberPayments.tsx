import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockMembers, mockPayments } from '../../data/mockData';
import PaymentCard from '../../components/payments/PaymentCard';
import { FilterX, Search, Filter } from 'lucide-react';

const MemberPayments = () => {
  const { user } = useAuth();
  
  // Find the member data for the current user
  const memberData = mockMembers.find(member => member.email === user?.email);
  
  // Filter payments for this member
  const memberPayments = mockPayments.filter(payment => payment.memberId === memberData?.id);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter payments based on search and status
  const filteredPayments = memberPayments.filter(payment => {
    const matchesSearch = 
      payment.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.membershipType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort payments by date (newest first)
  const sortedPayments = [...filteredPayments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h1>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by receipt number or membership type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            {/* Reset Filters */}
            {(searchTerm || statusFilter !== 'all') && (
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
      
      {/* Payments List */}
      <div>
        {sortedPayments.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-600">No payment records found.</p>
          </div>
        ) : (
          sortedPayments.map(payment => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        )}
      </div>
    </div>
  );
};

export default MemberPayments;