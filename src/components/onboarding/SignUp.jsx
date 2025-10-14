import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase.js';
import { useOnboarding } from '../../context/OnboardingContext'; // <-- ADDED

// (Country data and getFlagEmoji function remain the same)
const allCountryCodes = [
    { name: 'India', dial_code: '+91', code: 'IN' },
    { name: 'United States', dial_code: '+1', code: 'US' },
    { name: 'United Kingdom', dial_code: '+44', code: 'GB' },
    { name: 'Nigeria', dial_code: '+234', code: 'NG' },
    { name: 'Afghanistan', dial_code: '+93', code: 'AF' },
    { name: 'Albania', dial_code: '+355', code: 'AL' },
    { name: 'Algeria', dial_code: '+213', code: 'DZ' },
    { name: 'American Samoa', dial_code: '+1684', code: 'AS' },
    { name: 'Andorra', dial_code: '+376', code: 'AD' },
    { name: 'Angola', dial_code: '+244', code: 'AO' },
    { name: 'Argentina', dial_code: '+54', code: 'AR' },
    { name: 'Australia', dial_code: '+61', code: 'AU' },
    { name: 'Canada', dial_code: '+1', code: 'CA' },
    { name: 'China', dial_code: '+86', code: 'CN' },
    { name: 'Brazil', dial_code: '+55', code: 'BR' },
];

function getFlagEmoji(countryCode) {
    if (!countryCode) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}


export default function SignUp() {
    const navigate = useNavigate();
    const { updateOnboardingData } = useOnboarding(); // <-- ADDED
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(new Array(6).fill(''));

    // State for Supabase logic
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOTP = async () => {
        setError('');
        if (!phoneNumber || phoneNumber.length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }

        setLoading(true);
        const fullPhoneNumber = selectedCountry.dial_code + phoneNumber;
        updateOnboardingData({ phoneNumber: fullPhoneNumber }); // <-- ADDED

        const { error } = await supabase.auth.signInWithOtp({
            phone: fullPhoneNumber,
        });

        if (error) {
            setError(error.message);
            console.error("Supabase error:", error);
        } else {
            setOtpSent(true);
            console.log("OTP sent successfully!");
        }
        setLoading(false);
    };

    const handleVerify = async () => {
        // Save the phone number to our central context before navigating
        const fullPhoneNumber = selectedCountry.dial_code + phoneNumber;
        updateOnboardingData({ phoneNumber: fullPhoneNumber }); // <-- ADDED
        
        // For now, we will bypass the OTP check and navigate directly.
        navigate('/choose-path');

        /*
        // --- The original logic is commented out below ---
        // --- You can uncomment it later to re-enable OTP verification ---

        setError('');
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 6) {
            setError("Please enter the complete 6-digit code.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.verifyOtp({
            phone: fullPhoneNumber,
            token: enteredOtp,
            type: 'sms',
        });

        if (error) {
            setError("The code you entered is incorrect. Please try again.");
            console.error("Supabase verification error:", error);
        } else {
            // User signed in successfully.
            navigate('/choose-path');
        }
        setLoading(false);
        */
    };
    
    // Handles OTP input and auto-focusing to the next field
    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false; // Only allow numbers

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const [view, setView] = useState('SIGNUP');
    const [selectedCountry, setSelectedCountry] = useState(allCountryCodes[0]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCountries = useMemo(() => {
        return allCountryCodes.filter(
            (country) =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            country.dial_code.includes(searchQuery)
        );
    }, [searchQuery]);


    const renderSignupView = () => (
        <div className="min-h-screen bg-black flex flex-col px-6 pt-16">
            <div className="flex-1 flex flex-col">
                <h1 className="text-3xl font-bold text-white text-center mb-4">
                    Your phone number
                </h1>
                <p className="text-light-gray text-center mb-8">
                    Please confirm your country code and enter your phone number.
                </p>
                <button
                    onClick={() => setView('COUNTRY_SELECTION')}
                    className="bg-dark-card rounded-xl px-4 py-4 flex items-center justify-between mb-4"
                >
                    <span className="text-white text-lg">
                        {getFlagEmoji(selectedCountry.code)} {selectedCountry.name}
                    </span>
                    <span className="text-light-gray text-lg">{'>'}</span>
                </button>
                <div className="bg-dark-card rounded-xl px-4 py-4 flex items-center">
                    <span className="text-white text-lg pr-2 border-r border-gray-600">
                        {selectedCountry.dial_code}
                    </span>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 bg-transparent text-white ml-3 text-lg placeholder-light-gray outline-none"
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
            </div>

            <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mb-8 disabled:bg-yellow-800"
            >
                {loading ? 'Sending...' : 'Send OTP'}
            </button>
        </div>
    );

    const renderCountrySelectionView = () => (
         <div className="min-h-screen bg-black flex flex-col px-6 pt-8">
            <div className="flex items-center mb-6">
                <button onClick={() => setView('SIGNUP')} className="text-white text-2xl mr-4">
                    {'←'}
                </button>
                <input
                    type="text"
                    placeholder="Search by country or code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-dark-card text-white rounded-xl px-4 py-3 text-lg placeholder-light-gray outline-none focus:ring-2 focus:ring-vibrant-yellow"
                    autoFocus
                />
            </div>
            <div className="flex-1 overflow-y-auto">
                {filteredCountries.map((country) => (
                    <button
                        key={country.code}
                        onClick={() => {
                            setSelectedCountry(country);
                            setView('SIGNUP');
                            setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between py-3 px-2 rounded-lg hover:bg-dark-card"
                    >
                        <span className="text-white text-lg">
                            {getFlagEmoji(country.code)} {country.name}
                        </span>
                        <span className="text-light-gray text-lg">{country.dial_code}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderOtpView = () => (
         <div className="min-h-screen bg-black flex flex-col px-6 pt-32">
            <h1 className="text-3xl font-bold text-white text-center mb-16">
                Enter Verification Code
            </h1>
             <div className="flex gap-2 justify-center mb-12">
                 {otp.map((data, index) => (
                     <input
                         key={index}
                         type="text"
                         maxLength="1"
                         value={data}
                         onChange={(e) => handleOtpChange(e.target, index)}
                         onFocus={(e) => e.target.select()}
                         className="w-ll h-14 bg-dark-card text-white text-center text-2xl rounded-xl outline-none focus:ring-2 focus:ring-vibrant-yellow"
                     />
                 ))}
             </div>
             <p className="text-light-gray text-sm text-center mb-8">
                 Enter the 6-digit code sent to {selectedCountry.dial_code} {phoneNumber}
             </p>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
             
             <button
                 onClick={handleVerify}
                 disabled={loading}
                 className="w-full bg-vibrant-yellow text-black font-semibold py-4 rounded-xl text-lg mt-auto mb-8 disabled:bg-yellow-800"
             >
                 {loading ? 'Verifying...' : 'Verify and Continue'}
             </button>
         </div>
    );

    if (otpSent) {
        return renderOtpView();
    }

    return view === 'SIGNUP' ? renderSignupView() : renderCountrySelectionView();
}