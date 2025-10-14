import { useState } from 'react';
import { Bell, Calendar, MapPin } from 'lucide-react';

export default function MyChurchScreen() {
  const [activeTab, setActiveTab] = useState('events');

  const events = [
    {
      title: 'Kairos Community Worship Night',
      date: 'Sunday, October 27, 2024 @ 6:00 PM',
      location: 'Main Sanctuary',
    },
    {
      title: 'Youth Group Summer Retreat Planning',
      date: 'Tuesday, October 29, 2024 @ 7:30 PM',
      location: 'Fellowship Hall (Room 101)',
    },
    {
      title: "Senior's Monthly Fellowship Luncheon",
      date: 'Wednesday, November 6, 2024 @ 12:00 PM',
      location: 'Church Dining Area',
    },
    {
      title: 'Bible Study: Book of Romans - Session 4',
      date: 'Thursday, November 7, 2024 @ 7:00 PM',
      location: 'Online via Zoom',
    },
    {
      title: 'Annual Church Harvest Festival & Potluck',
      date: 'Saturday, November 9, 2024 @ 3:00 PM',
      location: 'Church Grounds & Gymnasium',
    },
    {
      title: 'New Member Welcome Reception',
      date: 'Sunday, November 10, 2024 @ 11:30 AM',
      location: 'Welcome Center Lounge',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-dark-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-white text-xl font-bold">My Church</h1>
        <Bell className="text-vibrant-yellow" size={24} />
      </div>

      <div className="px-6 py-6">
        <h2 className="text-white text-3xl font-bold mb-6">My Church</h2>

        <div className="flex gap-2 border-b border-dark-card">
          <button
            onClick={() => setActiveTab('channel')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'channel'
                ? 'text-white border-b-2 border-vibrant-yellow'
                : 'text-light-gray'
            }`}
          >
            Channel
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'group'
                ? 'text-white border-b-2 border-vibrant-yellow'
                : 'text-light-gray'
            }`}
          >
            Group Chat
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'events'
                ? 'text-vibrant-yellow border-b-2 border-vibrant-yellow'
                : 'text-light-gray'
            }`}
          >
            Events
          </button>
        </div>
      </div>

      {activeTab === 'events' && (
        <div className="px-4 pb-4 space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-xl p-4"
            >
              <h3 className="text-white font-semibold text-lg mb-3">
                {event.title}
              </h3>
              <div className="flex items-start gap-2 text-light-gray text-sm mb-2">
                <Calendar size={16} className="mt-0.5 flex-shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-start gap-2 text-light-gray text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>{event.location}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'channel' && (
        <div className="px-4 pb-4 text-center text-light-gray py-12">
          <p>Church announcements and updates will appear here</p>
        </div>
      )}

      {activeTab === 'group' && (
        <div className="px-4 pb-4 text-center text-light-gray py-12">
          <p>Group chat with church members</p>
        </div>
      )}
    </div>
  );
}
