import React, { createContext, useState, useContext } from 'react';

/**
 * @typedef {object} OnboardingData
 * @property {string} phoneNumber
 * @property {string} accountType
 * @property {string} fullName
 * @property {string} username
 * @property {string} bio
 * @property {string} churchName
 * @property {string} churchUsername
 * @property {string} churchAddress
 * @property {string} churchDenomination
 * @property {string} userRoleInChurch
 */

/**
 * @typedef {object} OnboardingContextType
 * @property {OnboardingData} onboardingData
 * @property {(newData: Partial<OnboardingData>) => void} updateOnboardingData
 */

// Create the context
/** @type {React.Context<OnboardingContextType>} */
const OnboardingContext = createContext();

// Create a provider component
export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    phoneNumber: '',
    accountType: 'individual',
    fullName: '',
    username: '',
    bio: '',
    // --- MODIFICATION START ---
    // Added fields to temporarily store church data during onboarding
    churchName: '',
    churchUsername: '',
    churchAddress: '',
    churchDenomination: '',
    userRoleInChurch: 'Pastor', // Default role
    // --- MODIFICATION END ---
  });

  const updateOnboardingData = (newData) => {
    setOnboardingData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Create a custom hook to use the context easily
/**
 * @returns {OnboardingContextType}
 */
export const useOnboarding = () => {
  return useContext(OnboardingContext);
};