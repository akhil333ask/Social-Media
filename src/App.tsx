// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingProvider } from './context/OnboardingContext';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Welcome from './components/onboarding/Welcome';
import SignUp from './components/onboarding/SignUp';
import Login from './components/onboarding/Login';
import ChoosePath from './components/onboarding/ChoosePath';
import CreateProfile from './components/onboarding/CreateProfile';
import CreatePassword from './components/onboarding/CreatePassword';
import MainLayout from './components/layout/MainLayout';
import ChatsScreen from './components/screens/ChatsScreen';
import FeedScreen from './components/screens/FeedScreen';
import ReelsScreen from './components/screens/ReelsScreen';
import MyChurchScreen from './components/screens/MyChurchScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import BibleScreen from './components/screens/BibleScreen';
import InviteScreen from './components/screens/InviteScreen';
import GlobalChannelScreen from './components/screens/GlobalChannelScreen';
// --- MODIFICATION START ---
import SearchScreen from './components/screens/SearchScreen'; // Import the new screen
// --- MODIFICATION END ---


const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return session ? <MainLayout /> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { session, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return session ? <Navigate to="/app/chats" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute><Welcome /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/choose-path" element={<PublicRoute><ChoosePath /></PublicRoute>} />
            <Route path="/create-profile" element={<PublicRoute><CreateProfile /></PublicRoute>} />
            <Route path="/create-password" element={<PublicRoute><CreatePassword /></PublicRoute>} />

            <Route path="/app" element={<ProtectedRoute />}>
              <Route index element={<Navigate to="/app/chats" replace />} />
              <Route path="chats" element={<ChatsScreen />} />
              <Route path="feed" element={<FeedScreen />} />
              <Route path="reels" element={<ReelsScreen />} />
              <Route path="my-church" element={<MyChurchScreen />} />
              <Route path="profile" element={<ProfileScreen />} />
              <Route path="bible" element={<BibleScreen />} />
              <Route path="invite" element={<InviteScreen />} />
              <Route path="global-channel" element={<GlobalChannelScreen />} />
              {/* --- MODIFICATION START --- */}
              <Route path="search" element={<SearchScreen />} /> {/* Add the search route */}
              {/* --- MODIFICATION END --- */}
            </Route>
          </Routes>
        </BrowserRouter>
      </OnboardingProvider>
    </AuthProvider>
  );
}

export default App;