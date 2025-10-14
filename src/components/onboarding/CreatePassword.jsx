import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext'; // <-- ADDED
import { supabase } from '@/supabase.js'; // <-- ADDED

export default function CreatePassword() {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding(); // <-- ADDED
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // <-- ADDED
  const [error, setError] = useState('');

  const handleFinishSetup = async () => { // <-- MODIFIED to be async
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);

    // Step 1: Update the user's password in Supabase Auth
    const { data: user, error: passwordError } = await supabase.auth.updateUser({ password });

    if (passwordError) {
      setError(passwordError.message);
      setLoading(false);
      return;
    }

    if (user) {
      // Step 2: Save the full profile to our 'profiles' table
      const { error: profileError } = await supabase.from('profiles').insert({
        id: user.user.id, // Link the profile to the authenticated user
        full_name: onboardingData.fullName,
        username: onboardingData.username,
        bio: onboardingData.bio,
        phone_number: onboardingData.phoneNumber,
        account_type: onboardingData.accountType,
      });

      if (profileError) {
        setError(`Could not save profile: ${profileError.message}`);
      } else {
        // Success!
        navigate('/app/chats');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col px-6 pt-12 pb-8">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Create a Password
        </h1>
        {/* ... rest of UI is unchanged ... */}
        <p className="text-light-gray text-center mb-12">
          This will be used for logging in to your account.
        </p>

        <div className="space-y-6">
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

          <div>
            <label className="text-white text-sm mb-2 block">Confirm Password</label>
            <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
              <Lock className="text-light-gray mr-3" size={20} />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder-light-gray"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </div>
      </div>

      <button
        onClick={handleFinishSetup}
        disabled={loading} // <-- ADDED
        className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-8"
      >
        {loading ? 'Finishing...' : 'Finish Setup'} {/* <-- ADDED */}
      </button>
    </div>
  );
}