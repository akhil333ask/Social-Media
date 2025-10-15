import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/supabase';
import { User, Home } from 'lucide-react';

// A small component to display a user result
const UserResultItem = ({ user }) => (
  <Link to={`/app/profile/${user.username}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-dark-card transition-colors">
    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
      <User className="text-light-gray" />
    </div>
    <div>
      <h3 className="text-white font-semibold">{user.username}</h3>
      <p className="text-light-gray text-sm">{user.full_name}</p>
    </div>
  </Link>
);

// A small component to display a church result
const ChurchResultItem = ({ church }) => (
  <Link to={`/app/church/${church.username}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-dark-card transition-colors">
    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
      <Home className="text-light-gray" />
    </div>
    <div>
      <h3 className="text-white font-semibold">{church.username}</h3>
      <p className="text-light-gray text-sm">{church.name}</p>
    </div>
  </Link>
);


export default function SearchScreen() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('accounts'); // 'accounts' or 'churches'
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchTerm = searchParams.get('q') || '';

  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError('');
      
      const { data, error } = await supabase.functions.invoke('unified-search', {
        body: { searchTerm },
      });

      if (error) {
        setError('Failed to fetch search results.');
        console.error(error);
      } else {
        setResults(data);
      }
      setLoading(false);
    };

    performSearch();
  }, [searchTerm]);

  const accountResults = results.filter(item => item.type === 'user');
  const churchResults = results.filter(item => item.type === 'church');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-dark-card sticky top-0 bg-black z-10">
        <button
          onClick={() => setActiveTab('accounts')}
          className={`flex-1 py-3 text-center text-sm font-semibold transition-colors duration-300 ${activeTab === 'accounts' ? 'text-vibrant-yellow border-b-2 border-vibrant-yellow' : 'text-light-gray'}`}
        >
          Accounts
        </button>
        <button
          onClick={() => setActiveTab('churches')}
          className={`flex-1 py-3 text-center text-sm font-semibold transition-colors duration-300 ${activeTab === 'churches' ? 'text-vibrant-yellow border-b-2 border-vibrant-yellow' : 'text-light-gray'}`}
        >
          Churches
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && <p className="text-center text-light-gray">Searching...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {activeTab === 'accounts' && (
              <div className="space-y-2">
                {accountResults.length > 0 ? (
                  accountResults.map(user => <UserResultItem key={user.id} user={user} />)
                ) : (
                  <p className="text-center text-light-gray mt-8">No accounts found for "{searchTerm}"</p>
                )}
              </div>
            )}

            {activeTab === 'churches' && (
              <div className="space-y-2">
                {churchResults.length > 0 ? (
                  churchResults.map(church => <ChurchResultItem key={church.id} church={church} />)
                ) : (
                  <p className="text-center text-light-gray mt-8">No churches found for "{searchTerm}"</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}