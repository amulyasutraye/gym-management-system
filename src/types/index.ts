// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  profileImage?: string;
}

// Authentication types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Member types
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  profileImage?: string;
}

// Payment types
export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  paymentMethod: 'cash' | 'card' | 'online';
  status: 'paid' | 'pending' | 'failed';
  membershipType: string;
  durationMonths: number;
  receiptNumber: string;
}

// Announcement types
export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'holiday' | 'maintenance' | 'event' | 'other';
  isActive: boolean;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'payment' | 'announcement' | 'system';
}

// Membership types
export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  durationMonths: number;
  price: number;
  features: string[];
}