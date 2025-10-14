import { useNavigate } from 'react-router-dom';
import { Book, Globe, UserPlus, Settings, HelpCircle, X, Sparkles } from 'lucide-react';

export default function SideMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    { icon: Book, label: 'Bible', path: '/app/bible' },
    { icon: Globe, label: 'Global Channel', path: '/app/global-channel' },
    { icon: UserPlus, label: 'Invite Friends', path: '/app/invite' },
    { icon: Settings, label: 'Settings', path: '/app/settings' },
    { icon: HelpCircle, label: 'Help', path: '/app/help' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      <div className="fixed left-0 top-0 bottom-0 w-80 bg-black z-50 shadow-2xl">
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-white font-semibold text-lg">John Doe</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-vibrant-yellow" size={20} />
            <span className="text-vibrant-yellow font-semibold">
              Saved 125 Souls
            </span>
          </div>

          <div className="border-t border-dark-card pt-6 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-dark-card transition text-left"
              >
                <item.icon className="text-light-gray" size={24} />
                <span className="text-white">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
