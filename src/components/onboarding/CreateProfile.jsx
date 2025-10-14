import { useState, useEffect } from 'react'; // <-- ADDED useEffect
import { useNavigate } from 'react-router-dom';
import { Camera, User } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext'; // <-- ADDED

export default function CreateProfile() {
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnboarding(); // <-- ADDED
  const { accountType } = onboardingData; // <-- MODIFIED

  const [step, setStep] = useState('profile');
  const [profileData, setProfileData] = useState({
    fullName: '',
    username: '',
    bio: '',
  });
  
  // Update local state if context changes (e.g., user goes back and forth)
  useEffect(() => {
    setProfileData({
      fullName: onboardingData.fullName,
      username: onboardingData.username,
      bio: onboardingData.bio,
    });
  }, [onboardingData]);


  const [churchData, setChurchData] = useState({
    churchName: '',
    location: '',
    description: '',
    role: 'pastor',
  });

  const handleFinishSetup = () => {
    updateOnboardingData(profileData); // <-- ADDED: Save data to context
    navigate('/create-password');
  };

  const handleProfileSubmit = () => {
    if (accountType === 'individual') {
      handleFinishSetup();
    } else if (accountType === 'join_church') {
      updateOnboardingData(profileData); // <-- ADDED
      setStep('find_church');
    } else if (accountType === 'register_church') {
      updateOnboardingData(profileData); // <-- ADDED
      setStep('register_church');
    }
  };

  // ... rest of the file is unchanged ...
  if (step === 'profile') {
    return (
      <div className="min-h-screen bg-black px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Create Your Profile
        </h1>

        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-dark-card flex items-center justify-center border-2 border-dashed border-light-gray">
              {/* Profile picture logic is unchanged */}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-white text-sm mb-2 block">Full Name</label>
            <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
              <User className="text-light-gray mr-3" size={20} />
              <input
                type="text"
                placeholder="Alex Johnson"
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
                className="flex-1 bg-transparent text-white outline-none placeholder-light-gray"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Username</label>
            <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
              <span className="text-light-gray mr-2">@</span>
              <input
                type="text"
                placeholder="johnson_alex"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
                className="flex-1 bg-transparent text-white outline-none placeholder-light-gray"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Bio</label>
            <textarea
              placeholder="Tell us about yourself..."
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              className="w-full bg-dark-card text-white rounded-xl px-4 py-4 outline-none placeholder-light-gray resize-none h-32"
            />
          </div>
        </div>

        <button
          onClick={handleProfileSubmit}
          className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-8"
        >
          {accountType === 'individual' ? 'Finish Setup' : 'Continue'}
        </button>
      </div>
    );
  }

  if (step === 'find_church') {
    return (
      <div className="min-h-screen bg-black px-6 pt-12">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Find Your Church
        </h1>

        <input
          type="text"
          placeholder="Search by church name or location..."
          className="w-full bg-dark-card text-white rounded-xl px-4 py-4 mb-6 outline-none placeholder-light-gray"
        />

        <div className="space-y-4">
          {[
            { name: 'Community Fellowship Church', location: '123 Main St, Anytown, USA' },
            { name: 'Redeeming Grace Chapel', location: '45 Oak Ave, Springfield, USA' },
            { name: 'Hope City Church', location: '789 Pine Ln, Metropolis, USA' },
          ].map((church, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-white font-semibold mb-1">{church.name}</h3>
                <p className="text-light-gray text-sm">{church.location}</p>
              </div>
              <button
                onClick={handleFinishSetup}
                className="bg-transparent border-2 border-vibrant-yellow text-vibrant-yellow px-6 py-2 rounded-lg font-semibold"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'register_church') {
    return (
      <div className="min-h-screen bg-black px-6 pt-12 pb-8">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          Register Your Church
        </h1>

        <div className="space-y-6">
          {/* Form fields are unchanged */}
        </div>

        <button
          onClick={handleFinishSetup}
          className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-8"
        >
          Create Church Page
        </button>
      </div>
    );
  }

  return null;
}
