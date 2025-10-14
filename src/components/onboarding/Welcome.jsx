import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8">
      <div className="flex items-center gap-3 mb-32">
        <Sparkles className="text-white" size={48} strokeWidth={2} />
        <h1 className="text-5xl font-bold text-white">Kairos</h1>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={() => navigate('/signup')}
          className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg"
        >
          Sign Up with Phone
        </button>

        <button
          onClick={() => navigate('/login')} // <-- MODIFIED
          className="w-full bg-transparent text-vibrant-yellow border-2 border-vibrant-yellow font-semibold py-4 rounded-xl text-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
