import { useNavigate } from 'react-router-dom';
import { Users, Church, User } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext'; // <-- ADDED

export default function ChoosePath() {
  const navigate = useNavigate();
  const { updateOnboardingData } = useOnboarding(); // <-- ADDED

  const handlePathSelection = (path) => {
    updateOnboardingData({ accountType: path }); // <-- MODIFIED
    navigate('/create-profile');
  };

  return (
    <div className="min-h-screen bg-black px-6 pt-12">
      {/* ... rest of the UI is unchanged ... */}
      <h2 className="text-light-gray text-center mb-8">Join Kairos</h2>

      <h1 className="text-3xl font-bold text-white text-center mb-12">
        How will you join<br />Kairos?
      </h1>

      <div className="space-y-6">
        <button
          onClick={() => handlePathSelection('join_church')}
          className="w-full bg-dark-card hover:bg-opacity-80 rounded-2xl p-6 text-left transition"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-darker-card rounded-full p-6 mb-4">
              <Users className="text-vibrant-yellow" size={48} />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Join an Existing Church
            </h3>
            <p className="text-light-gray text-sm">
              Find and connect with your home church community.
            </p>
          </div>
        </button>

        <button
          onClick={() => handlePathSelection('register_church')}
          className="w-full bg-dark-card hover:bg-opacity-80 rounded-2xl p-6 text-left transition"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-darker-card rounded-full p-6 mb-4">
              <Church className="text-vibrant-yellow" size={48} />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Register a New Church
            </h3>
            <p className="text-light-gray text-sm">
              Create a digital home for your ministry.
            </p>
          </div>
        </button>

        <button
          onClick={() => handlePathSelection('individual')}
          className="w-full bg-dark-card hover:bg-opacity-80 rounded-2xl p-6 text-left transition"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-darker-card rounded-full p-6 mb-4">
              <User className="text-vibrant-yellow" size={48} />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Continue as an Individual
            </h3>
            <p className="text-light-gray text-sm">
              Start your journey and connect freely.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
