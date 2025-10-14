import { NavLink } from 'react-router-dom';
import { MessageCircle, Rss, Video, Church, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: '/app/chats', icon: MessageCircle, label: 'Chats' },
    { to: '/app/feed', icon: Rss, label: 'Feed' },
    { to: '/app/reels', icon: Video, label: 'Reels' },
    { to: '/app/my-church', icon: Church, label: 'My Church' },
    { to: '/app/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-black border-t border-dark-card px-2 py-2 flex items-center justify-around fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition ${
              isActive ? 'text-vibrant-yellow' : 'text-light-gray'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <item.icon size={24} fill={isActive ? '#FFD60A' : 'none'} />
              <span className="text-xs">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
