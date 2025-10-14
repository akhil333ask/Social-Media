import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingProvider } from './context/OnboardingContext'; // <-- ADDED
import Welcome from './components/onboarding/Welcome';
import SignUp from './components/onboarding/SignUp';
import Login from './components/onboarding/Login'; // <-- ADDED
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

function App() {
  return (
    <OnboardingProvider> {/* <-- WRAPPED */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> {/* <-- ADDED */}
          <Route path="/choose-path" element={<ChoosePath />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/create-password" element={<CreatePassword />} />

          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Navigate to="/app/chats" replace />} />
            <Route path="chats" element={<ChatsScreen />} />
            <Route path="feed" element={<FeedScreen />} />
            <Route path="reels" element={<ReelsScreen />} />
            <Route path="my-church" element={<MyChurchScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="bible" element={<BibleScreen />} />
            <Route path="invite" element={<InviteScreen />} />
            <Route path="global-channel" element={<GlobalChannelScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </OnboardingProvider>
  );
}

export default App;