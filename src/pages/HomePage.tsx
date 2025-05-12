import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Receipt, Bell, Calendar, ShieldCheck, CreditCard } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Simplify Your Gym Management
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Digital receipts, payment tracking, and announcement management all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-semibold transition-all"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="btn border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold transition-all"
                >
                  Log In
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Gym Management"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Gym
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform streamlines gym operations for both owners and members with powerful digital tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:-translate-y-2">
              <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Receipt className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Receipts</h3>
              <p className="text-gray-600">
                Say goodbye to paper receipts. All payment records are stored digitally and accessible anytime.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:-translate-y-2">
              <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Bell className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Announcements</h3>
              <p className="text-gray-600">
                Easily communicate important information about working hours, holidays, and events.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:-translate-y-2">
              <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Calendar className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Membership Tracking</h3>
              <p className="text-gray-600">
                Keep track of membership status, expiration dates, and renewals in one place.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover:-translate-y-2">
              <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <ShieldCheck className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-gray-600">
                Role-based access ensures that members and staff see only what they need to.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card hover:-translate-y-2">
              <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <CreditCard className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Management</h3>
              <p className="text-gray-600">
                Track payments, manage dues, and get notified about upcoming and overdue payments.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card hover:-translate-y-2">
              <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Dumbbell className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gym Management</h3>
              <p className="text-gray-600">
                Comprehensive tools for gym owners to effectively manage their facility and members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Gym Management?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of gyms already using our platform to streamline operations and improve member satisfaction.
              </p>
              <Link
                to="/register"
                className="btn bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold transition-all text-lg"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;