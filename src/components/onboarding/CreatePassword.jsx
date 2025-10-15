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
    if (!onboardingData.username) { setError('Username is missing. Please go back.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters long.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    
    setLoading(true);

    const dummyEmail = `${onboardingData.username.toLowerCase()}@kairos.app`;
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: dummyEmail,
      password: password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!authData.user) {
      setError('Could not create user. Please try again.');
      setLoading(false);
      return;
    }

    const newUserId = authData.user.id;

    const { error: profileError } = await supabase.from('profiles').insert({
      id: newUserId,
      full_name: onboardingData.fullName,
      username: onboardingData.username,
      bio: onboardingData.bio,
      account_type: onboardingData.accountType,
    });

    if (profileError) {
      setError(`Could not save profile: ${profileError.message}`);
      setLoading(false);
      return;
    }

    if (onboardingData.accountType === 'register_church') {
      const { data: churchData, error: churchError } = await supabase
        .from('churches')
        .insert({
          name: onboardingData.churchName,
          username: onboardingData.churchUsername.toLowerCase(),
          address: onboardingData.churchAddress,
          denomination: onboardingData.churchDenomination,
          admin_id: newUserId,
        })
        .select()
        .single();
      
      if (churchError) {
        setError(`Profile created, but could not create church: ${churchError.message}`);
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          church_id: churchData.id,
          church_role: onboardingData.userRoleInChurch,
        })
        .eq('id', newUserId);
      
      if (updateError) {
        setError(`Church page created, but failed to link to your profile: ${updateError.message}`);
        setLoading(false);
        return;
      }
    }

    await supabase.auth.signOut();
    alert('Account and profile created successfully! Please log in to continue.');
    navigate('/login');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col px-6 pt-12 pb-8">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Create a Password</h1>
        <p className="text-light-gray text-center mb-12">This is the final step to create your account.</p>
        <div className="space-y-6">
          <div>
            <label className="text-white text-sm mb-2 block">Password</label>
            <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
              <Lock className="text-light-gray mr-3" size={20} />
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 bg-transparent text-white outline-none placeholder-light-gray" />
            </div>
          </div>
          <div>
            <label className="text-white text-sm mb-2 block">Confirm Password</label>
            <div className="flex items-center bg-dark-card rounded-xl px-4 py-4">
              <Lock className="text-light-gray mr-3" size={20} />
              {/* --- MODIFICATION START --- */}
              {/* Corrected typo from e.targe.value to e.target.value */}
              <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="flex-1 bg-transparent text-white outline-none placeholder-light-gray" />
              {/* --- MODIFICATION END --- */}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </div>
      </div>
      <button onClick={handleFinishSetup} disabled={loading} className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-8">
        {loading ? 'Finishing...' : 'Finish Setup'}
      </button>
    </div>
  );
}