import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase.js';
import { Lock, User } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
        setError("Please enter your username and password.");
        return;
    }
    setLoading(true);

    // Invoke the Supabase Edge Function we created
    const { data, error: funcError } = await supabase.functions.invoke('login-with-username', {
      body: { username, password },
    });

    // --- START MODIFICATION ---
    // First, check if the function call itself returned an error (e.g., a status 400)
    if (funcError) {
      // The actual error message from our function is nested inside the 'context'
      // We need to parse the JSON response to display it correctly.
      const errorBody = await funcError.context.json();
      setError(errorBody.error || "An unknown error occurred.");
    } else if (data) {
      // If the function was successful, it returns session data. Let's set it.
      const { error: sessionError } = await supabase.auth.setSession(data.session);
      
      if (sessionError) {
        setError(sessionError.message);
      } else {
        // Navigate to the main app on successful login
        navigate('/app/chats');
      }
    }
    // --- END MODIFICATION ---
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col px-6 pt-12 pb-8">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-white text-center mb-12">
          Welcome Back
        </h1>
        <div className="space-y-6">
          <div>
            <label className="text-white text-sm mb-2 block">Username</label>
            <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
              <User className="text-light-gray mr-3" size={20} />
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder-light-gray"
              />
            </div>
          </div>
          <div>
            <label className="text-white text-sm mb-2 block">Password</label>
            <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
              <Lock className="text-light-gray mr-3" size={20} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder-light-gray"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </div>
      </div>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-8"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}