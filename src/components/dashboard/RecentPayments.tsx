import React from 'react';
import { format } from 'date-fns';
import { ChevronRight, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Payment } from '../../types';
import { Link } from 'react-router-dom';

interface RecentPaymentsProps {
  payments: Payment[];
  limit?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const RecentPayments: React.FC<RecentPaymentsProps> = ({
  payments,
  limit = 5,
  showViewAll = true,
  viewAllLink = '/member/payments',
}) => {
  // Function to render status icon
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Sort payments by date (newest first) and limit them
  const sortedPayments = [...payments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
        {showViewAll && payments.length > limit && (
          <Link
            to={viewAllLink}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
          >
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>

      {sortedPayments.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No payment records found.
        </div>
      ) : (
        <div className="space-y-3">
          {sortedPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {renderStatusIcon(payment.status)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {payment.membershipType} Membership
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(payment.date), 'PP')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${payment.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 uppercase">
                  {payment.paymentMethod}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentPayments;