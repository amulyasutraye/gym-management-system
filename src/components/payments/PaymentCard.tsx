import React from 'react';
import { format } from 'date-fns';
import { Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Payment } from '../../types';

interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  // Function to get status badge class
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  // Function to handle receipt download (mock)
  const handleDownloadReceipt = () => {
    alert(`Receipt ${payment.receiptNumber} would be downloaded in a real application.`);
  };

  return (
    <div className="card mb-4 hover:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex items-center mb-3 md:mb-0">
          <div className="mr-3">{renderStatusIcon(payment.status)}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{payment.membershipType} Membership</h3>
            <p className="text-sm text-gray-500">
              Paid on {format(new Date(payment.date), 'PPP')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(payment.status)}`}>
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-bold text-gray-900">${payment.amount.toFixed(2)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-medium text-gray-900">
              {payment.paymentMethod.charAt(0).toUpperCase() + payment.paymentMethod.slice(1)}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Receipt Number</p>
            <p className="font-medium text-gray-900">{payment.receiptNumber}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium text-gray-900">{payment.durationMonths} months</p>
          </div>
          
          {payment.status === 'paid' && (
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Download Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;