import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { CalendarClock, CheckCircle, AlertTriangle } from 'lucide-react';

interface MembershipStatusProps {
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  type: string;
}

const MembershipStatus: React.FC<MembershipStatusProps> = ({
  startDate,
  endDate,
  status,
  type,
}) => {
  // Calculate days remaining
  const today = new Date();
  const end = new Date(endDate);
  const daysRemaining = differenceInDays(end, today);
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Membership Status</h3>
      
      <div className="flex items-center mb-4">
        {status === 'active' ? (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Active</span>
          </div>
        ) : status === 'expired' ? (
          <div className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="font-medium">Expired</span>
          </div>
        ) : (
          <div className="flex items-center text-yellow-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="font-medium">Pending Activation</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-500">Membership Type</span>
          <p className="font-medium text-gray-900">{type}</p>
        </div>
        
        <div>
          <span className="text-sm text-gray-500">Start Date</span>
          <p className="font-medium text-gray-900">{format(new Date(startDate), 'PPP')}</p>
        </div>
        
        <div>
          <span className="text-sm text-gray-500">End Date</span>
          <p className="font-medium text-gray-900">{format(new Date(endDate), 'PPP')}</p>
        </div>
        
        {status === 'active' && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center mb-2">
              <CalendarClock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-900">
                {daysRemaining > 0 
                  ? `${daysRemaining} days remaining` 
                  : 'Expires today'}
              </span>
            </div>
            
            {daysRemaining <= 7 && daysRemaining > 0 && (
              <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-sm rounded-md">
                Your membership is about to expire. Please renew soon.
              </div>
            )}
            
            {daysRemaining <= 0 && (
              <div className="mt-2 p-2 bg-red-50 text-red-800 text-sm rounded-md">
                Your membership expires today. Please renew immediately.
              </div>
            )}
          </div>
        )}
        
        {status === 'expired' && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 text-sm rounded-md">
            Your membership has expired. Please renew to continue accessing the gym.
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipStatus;