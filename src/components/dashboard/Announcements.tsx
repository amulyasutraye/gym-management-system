import React from 'react';
import { format } from 'date-fns';
import { Bell, Calendar, Settings, Info } from 'lucide-react';
import { Announcement } from '../../types';

interface AnnouncementsProps {
  announcements: Announcement[];
  limit?: number;
}

const Announcements: React.FC<AnnouncementsProps> = ({
  announcements,
  limit = 3,
}) => {
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

  // Filter active announcements, sort by date (newest first) and limit them
  const activeAnnouncements = announcements
    .filter(announcement => announcement.isActive)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
      
      {activeAnnouncements.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No active announcements at the moment.
        </div>
      ) : (
        <div className="space-y-4">
          {activeAnnouncements.map((announcement) => (
            <div key={announcement.id} className="animate-slide-in">
              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  {renderAnnouncementIcon(announcement.type)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Posted on {format(new Date(announcement.date), 'PP')}
                  </p>
                  <p className="text-gray-700">{announcement.message}</p>
                </div>
              </div>
              
              {announcement.type === 'holiday' && (
                <div className="mt-2 ml-8 p-2 bg-blue-50 text-blue-800 text-sm rounded-md">
                  Please note this change in our operating hours.
                </div>
              )}
              
              {announcement.type === 'maintenance' && (
                <div className="mt-2 ml-8 p-2 bg-yellow-50 text-yellow-800 text-sm rounded-md">
                  We apologize for any inconvenience this may cause.
                </div>
              )}
              
              <div className="border-b border-gray-200 mt-4"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;