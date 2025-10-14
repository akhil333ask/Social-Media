import React, { createContext, useState, useContext } from 'react';

// Create the context
const OnboardingContext = createContext();

// Create a provider component
export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    phoneNumber: '',
    accountType: 'individual',
    fullName: '',
    username: '',
    bio: '',
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
export const useOnboarding = () => {
  return useContext(OnboardingContext);
};