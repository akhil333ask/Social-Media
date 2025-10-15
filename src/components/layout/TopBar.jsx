import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, Search, ArrowLeft } from 'lucide-react';
import SideMenu from './SideMenu';
// --- MODIFICATION START ---
import { useDebounce } from '../../hooks/useDebounce'; // Import our new hook
// --- MODIFICATION END ---

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isSearchPage = location.pathname === '/app/search';

  const [inputTerm, setInputTerm] = useState(searchParams.get('q') || '');
  
  // --- MODIFICATION START ---
  // Create a debounced version of the input term. It will only update
  // 500ms after the user stops typing.
  const debouncedTerm = useDebounce(inputTerm, 500);

  // This effect will run whenever the debouncedTerm changes
  useEffect(() => {
    // Only perform navigation if we are on the search page and the term is not empty
    if (isSearchPage && debouncedTerm.trim()) {
      navigate(`/app/search?q=${debouncedTerm.trim()}`);
    }
  }, [debouncedTerm, isSearchPage, navigate]); // Dependencies for the effect
  
  // This effect syncs the input field if the URL changes (e.g., browser back button)
  useEffect(() => {
    setInputTerm(searchParams.get('q') || '');
  }, [searchParams]);
  // --- MODIFICATION END ---
  
  // Render the search-specific top bar
  if (isSearchPage) {
    return (
      <header className="bg-black border-b border-dark-card px-4 py-3 flex items-center gap-4 sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={24} />
        </button>
        {/* --- MODIFICATION START: Removed the form wrapper --- */}
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-gray" />
          <input
            type="text"
            value={inputTerm}
            onChange={(e) => setInputTerm(e.target.value)}
            placeholder="Search accounts and churches..."
            className="w-full bg-dark-card text-white rounded-lg pl-10 pr-4 py-2 outline-none placeholder-light-gray"
            autoFocus
          />
        </div>
        {/* --- MODIFICATION END --- */}
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