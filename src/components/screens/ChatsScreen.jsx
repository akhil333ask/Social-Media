import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Bookmark, Radio } from 'lucide-react';

export default function ChatsScreen() {
  const [activeTab, setActiveTab] = useState('mychats');
  const navigate = useNavigate();

  const stories = [
    { name: 'Your Story', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: false },
    { name: 'Alex', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: true },
    { name: 'Sarah', image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: true },
    { name: 'Pastor', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: false },
    { name: 'Emily', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: true },
  ];
  
  const savedMessageChat = {
    name: 'Saved Messages',
    message: '2 photos',
    time: 'Oct 2',
    unread: 0,
    image: 'special-icon', 
    hasStory: false
  };

  const chats = [
    savedMessageChat,
    { name: 'Jane Doe', message: 'meet up this Sunday after ser', time: '10:30 AM', unread: 2, image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: true },
    { name: 'John Smith', message: 'Sounds good! I\'ll bring the cookie', time: 'Yesterday', unread: 0, image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: false },
    { name: 'Elder Mary', message: 'Praying for you and your family', time: 'Tuesday', unread: 0, image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: true },
    { name: 'Youth Group', message: 'Don\'t forget the mission trip sign-up', time: 'Monday', unread: 5, image: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: false },
    { name: 'Pastor Tom', message: 'Great sermon this week, Pastor!', time: 'Dec 15', unread: 0, image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', hasStory: false },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Stories section (preserved) */}
      <div className="px-4 py-4 flex gap-3 overflow-x-auto no-scrollbar border-b border-dark-card">
        {stories.map((story, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className={`relative ${story.hasStory ? 'p-0.5 bg-gradient-to-tr from-vibrant-yellow via-yellow-500 to-vibrant-yellow rounded-full' : ''}`}>
              <div className="bg-black rounded-full p-0.5">
                <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full object-cover" />
              </div>
              {index === 0 && (
                <div className="absolute bottom-0 right-0 bg-vibrant-yellow rounded-full p-1">
                  <Plus size={12} className="text-black" />
                </div>
              )}
            </div>
            <span className="text-white text-xs">{story.name}</span>
          </div>
        ))}
      </div>

      <div className="flex border-b border-dark-card">
        <button
          onClick={() => setActiveTab('mychats')}
          className={`flex-1 py-3 text-center text-sm font-semibold transition-colors duration-300 ${activeTab === 'mychats' ? 'text-vibrant-yellow border-b-2 border-vibrant-yellow' : 'text-light-gray'}`}
        >
          My Chats
        </button>

        <button
          onClick={() => setActiveTab('channel')}
          className={`flex-1 py-3 text-center text-sm font-semibold transition-colors duration-300 ${activeTab === 'channel' ? 'text-vibrant-yellow border-b-2 border-vibrant-yellow' : 'text-light-gray'}`}
        >
          My Church Channel
        </button>

        <button
          onClick={() => navigate('/app/my-church', { state: { initialTab: 'group-chat' } })}
          className="flex-1 py-3 text-center text-sm font-semibold transition-colors duration-300 text-light-gray"
        >
          My Church Group Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'mychats' && (
          <div className="px-4 py-2">
            {chats.map((chat, index) => (
              <div key={index} className="flex items-center gap-3 py-3 border-b border-dark-card last:border-0">
                {chat.image === 'special-icon' ? (
                  <div className="w-14 h-14 rounded-full bg-vibrant-yellow flex items-center justify-center flex-shrink-0">
                    <Bookmark className="text-black" size={28} />
                  </div>
                ) : (
                  <div className={`relative ${chat.hasStory ? 'p-0.5 bg-gradient-to-tr from-vibrant-yellow via-yellow-500 to-vibrant-yellow rounded-full' : ''}`}>
                    <div className="bg-black rounded-full p-0.5">
                      <img src={chat.image} alt={chat.name} className="w-14 h-14 rounded-full object-cover"/>
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {/* --- MODIFICATION START --- */}
                  {/* Corrected the typo from <hh3> to <h3> */}
                  <h3 className="text-white font-semibold">{chat.name}</h3>
                  {/* --- MODIFICATION END --- */}
                  <p className="text-light-gray text-sm truncate">{chat.message}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-light-gray text-xs">{chat.time}</span>
                  {chat.unread > 0 && (
                    <div className="bg-vibrant-yellow text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'channel' && (
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center">
              <Radio size={48} className="text-light-gray mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg">Church Channel</h3>
              <p className="text-light-gray mt-1">Announcements and updates from your church will appear here.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
