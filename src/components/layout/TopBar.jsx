import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, Search, ArrowLeft } from 'lucide-react';
import SideMenu from './SideMenu';

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Check if we are currently on the search page
  const isSearchPage = location.pathname === '/app/search';

  // State for the search input field
  const [inputTerm, setInputTerm] = useState('');

  // When the page loads, sync the input with the URL's query
  useEffect(() => {
    setInputTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputTerm.trim()) {
      // Navigate to the search page with the query in the URL
      navigate(`/app/search?q=${inputTerm.trim()}`);
    }
  };

  // Render the search-specific top bar
  if (isSearchPage) {
    return (
      <header className="bg-black border-b border-dark-card px-4 py-3 flex items-center gap-4 sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-gray" />
            <input
              type="text"
              value={inputTerm}
              onChange={(e) => setInputTerm(e.target.value)}
              placeholder="Search accounts and churches..."
              className="w-full bg-dark-card text-white rounded-lg pl-10 pr-4 py-2 outline-none placeholder-light-gray"
              autoFocus // Automatically focus the input on this page
            />
          </div>
        </form>
      </header>
    );
  }

  // Render the default top bar
  return (
    <>
      <header className="bg-black border-b border-dark-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => setMenuOpen(true)} className="text-white">
          <Menu size={24} />
        </button>
        <h1 className="text-white text-xl font-bold">Kairos</h1>
        <button onClick={() => navigate('/app/search')} className="text-white">
          <Search size={24} />
        </button>
      </header>
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}