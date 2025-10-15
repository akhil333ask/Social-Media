import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { supabase } from '@/supabase';

export default function CreatePassword() {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFinishSetup = async () => {
    setError('');
    if (!onboardingData.username) {
      setError('Username is missing. Please go back.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);

    // The "Dummy Email" Trick: We create a unique, fake email using the username.
    const dummyEmail = `${onboardingData.username}@kairos.app`;

    // We use supabase.auth.signUp() to create a brand NEW user. This is correct.
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: dummyEmail,
      password: password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // We use the 'id' from the NEWLY created user to insert the profile.
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: onboardingData.fullName,
        username: onboardingData.username,
        bio: onboardingData.bio,
        phone_number: onboardingData.phoneNumber,
        account_type: onboardingData.accountType,
      });

      if (profileError) {
        setError(`Could not save profile: ${profileError.message}`);
      } else {
        // Success! We send the user to the login page to use their new credentials.
        await supabase.auth.signOut();
        alert('Account created successfully! Please log in with your new account.');
        navigate('/login');
      }
    } else {
      setError('An unknown error occurred during sign up.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col px-6 pt-12 pb-8">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Create a Password
        </h1>
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
        disabled={loading}
        className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-8"
      >
        {loading ? 'Finishing...' : 'Finish Setup'}
      </button>
    </div>
  );
}