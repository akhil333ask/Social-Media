import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Home, MapPin, Tag, Users } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';

export default function CreateProfile() {
  const navigate = useNavigate();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { accountType } = onboardingData;

  const [step, setStep] = useState('profile');
  const [profileData, setProfileData] = useState({ fullName: '', username: '', bio: '' });
  const [churchData, setChurchData] = useState({ churchName: '', churchUsername: '', churchAddress: '', churchDenomination: '', userRoleInChurch: 'Pastor' });

  useEffect(() => {
    setProfileData({
      fullName: onboardingData.fullName || '',
      username: onboardingData.username || '',
      bio: onboardingData.bio || '',
    });
    setChurchData({
      churchName: onboardingData.churchName || '',
      churchUsername: onboardingData.churchUsername || '',
      churchAddress: onboardingData.churchAddress || '',
      churchDenomination: onboardingData.churchDenomination || '',
      userRoleInChurch: onboardingData.userRoleInChurch || 'Pastor',
    });
  }, [onboardingData]);

  const handleProfileSubmit = () => {
    updateOnboardingData(profileData);
    if (accountType === 'individual') navigate('/create-password');
    else if (accountType === 'join_church') setStep('find_church');
    else if (accountType === 'register_church') setStep('register_church');
  };

  const handleChurchFormSubmit = () => {
    updateOnboardingData(churchData);
    navigate('/create-password');
  };

  if (step === 'profile') {
    return (
      <div className="min-h-screen bg-black px-6 pt-12 pb-8 flex flex-col">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Create Your Profile</h1>
          <div className="flex flex-col items-center mb-8"><div className="relative"><div className="w-32 h-32 rounded-full bg-dark-card flex items-center justify-center border-2 border-dashed border-light-gray"><Camera className="text-light-gray" size={40} /></div></div></div>
          <div className="space-y-6">
            <InputField icon={<User />} label="Full Name" value={profileData.fullName} onChange={(val) => setProfileData({ ...profileData, fullName: val })} placeholder="Alex Johnson" />
            <InputField icon={<User />} label="Username" value={profileData.username} onChange={(val) => setProfileData({ ...profileData, username: val })} placeholder="johnson_alex" isUsername />
            <div><label className="text-white text-sm mb-2 block">Bio</label><textarea placeholder="Tell us about yourself..." value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} className="w-full bg-dark-card text-white rounded-xl px-4 py-4 outline-none placeholder-light-gray resize-none h-32" /></div>
          </div>
        </div>
        <button onClick={handleProfileSubmit} className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-8">
          {accountType === 'individual' ? 'Continue to Final Step' : 'Continue'}
        </button>
      </div>
    );
  }

  if (step === 'find_church') return <div>Find Church Placeholder</div>;

  if (step === 'register_church') {
    return (
      <div className="min-h-screen bg-black flex flex-col px-6 pt-12 pb-8">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Register Your Church</h1>
          <p className="text-light-gray text-center mb-12">Create a digital home for your ministry.</p>
          <div className="space-y-6">
            <InputField icon={<Home />} label="Church Name" value={churchData.churchName} onChange={(val) => setChurchData({...churchData, churchName: val})} placeholder="e.g., United Community Church" />
            <InputField icon={<User />} label="Church Username" value={churchData.churchUsername} onChange={(val) => setChurchData({...churchData, churchUsername: val})} placeholder="e.g., unitedchurch" isUsername />
            <InputField icon={<MapPin />} label="Church Address" value={churchData.churchAddress} onChange={(val) => setChurchData({...churchData, churchAddress: val})} placeholder="Full address for location search" />
            <InputField icon={<Tag />} label="Denomination (Optional)" value={churchData.churchDenomination} onChange={(val) => setChurchData({...churchData, churchDenomination: val})} placeholder="e.g., Baptist, Non-denominational" />
            <div>
              <label className="text-white text-sm mb-2 block">Your Role</label>
              <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
                <Users className="text-light-gray mr-3" size={20} />
                <select value={churchData.userRoleInChurch} onChange={(e) => setChurchData({...churchData, userRoleInChurch: e.target.value})} className="flex-1 bg-transparent text-white outline-none">
                  <option className="bg-dark-card" value="Pastor">Pastor</option>
                  <option className="bg-dark-card" value="Youth Leader">Youth Leader</option>
                  <option className="bg-dark-card" value="Member">Member</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleChurchFormSubmit} className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-8">
          Continue to Final Step
        </button>
      </div>
    );
  }

  return null;
}

// --- MODIFICATION START: This helper component is now smarter ---
const InputField = ({ icon, label, value, onChange, placeholder, isUsername = false }) => {
  const handleChange = (e) => {
    let inputValue = e.target.value;
    // If it's a username, automatically sanitize it
    if (isUsername) {
      inputValue = inputValue.replace(/[^a-z0-9_]/gi, '').toLowerCase();
    }
    onChange(inputValue);
  };

  return (
    <div>
      <label className="text-white text-sm mb-2 block">{label}</label>
      <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
        {isUsername ? <span className="text-light-gray">@</span> : icon}
        <input 
          type="text" 
          placeholder={placeholder} 
          value={value} 
          onChange={handleChange} 
          className={`flex-1 bg-transparent text-white outline-none placeholder-light-gray ${isUsername ? 'ml-1' : 'ml-3'}`} 
        />
      </div>
    </div>
  );
};
// --- MODIFICATION END ---