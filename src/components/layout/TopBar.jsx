import { Menu, Search } from 'lucide-react';
import { useState } from 'react';
import SideMenu from './SideMenu';

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-black border-b border-dark-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => setMenuOpen(true)} className="text-white">
          <Menu size={24} />
        </button>

        <h1 className="text-white text-xl font-bold">Kairos</h1>

        <button className="text-white">
          <Search size={24} />
        </button>
      </header>

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
