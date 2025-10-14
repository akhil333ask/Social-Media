import { Copy, Bell } from 'lucide-react';

export default function InviteScreen() {
  const referralCode = 'KAIROS777';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-dark-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-white text-xl font-bold">Invite Friends</h1>
        <div className="flex items-center gap-3">
          <Bell className="text-white" size={24} />
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="px-6 py-12 flex flex-col items-center">
        <h2 className="text-vibrant-yellow text-4xl font-bold text-center mb-2">
          Invite and Save Souls
        </h2>

        <div className="bg-dark-card rounded-2xl p-8 mt-12 w-full">
          <div className="text-center mb-6">
            <div className="text-vibrant-yellow text-5xl font-bold mb-4">
              {referralCode}
            </div>
            <button
              onClick={handleCopy}
              className="bg-transparent border-2 border-vibrant-yellow text-vibrant-yellow px-8 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
            >
              <Copy size={20} />
              Tap to Copy
            </button>
          </div>
        </div>

        <button className="w-full bg-vibrant-yellow text-black font-bold text-lg py-5 rounded-xl mt-auto mb-8">
          Share Your Invite Link
        </button>
      </div>
    </div>
  );
}
