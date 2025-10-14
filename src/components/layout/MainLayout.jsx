import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}