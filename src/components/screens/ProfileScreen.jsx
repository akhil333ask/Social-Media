import { Bell, Sparkles } from 'lucide-react';

export default function ProfileScreen() {
  const posts = [
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/208377/pexels-photo-208377.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/8468286/pexels-photo-8468286.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1311518/pexels-photo-1311518.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=300',
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-dark-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-white text-xl font-bold">Profile</h1>
        <Bell className="text-vibrant-yellow" size={24} />
      </div>

      <div className="bg-dark-card mx-4 my-4 rounded-xl p-6">
        <div className="flex items-center gap-6 mb-6">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-white text-2xl font-bold">150</div>
              <div className="text-light-gray text-sm">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-white text-2xl font-bold">10.5K</div>
              <div className="text-light-gray text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-white text-2xl font-bold">300</div>
              <div className="text-light-gray text-sm">Following</div>
            </div>
          </div>
        </div>

        <h2 className="text-white text-2xl font-bold mb-2">Jordan Lee</h2>
        <p className="text-light-gray text-sm mb-4">
          Creator, Storyteller, and Community Builder. Sharing moments of faith
          and connection. Join the Kairos journey!
        </p>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-vibrant-yellow" size={24} />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 font-bold text-lg">
            Saved 123 Souls
          </span>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-transparent border-2 border-white text-white font-semibold py-3 rounded-xl">
            Edit Profile
          </button>
          <button className="flex-1 bg-vibrant-yellow text-black font-semibold py-3 rounded-xl">
            + Invite Friends
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 px-4 pb-4">
        {posts.map((post, index) => (
          <div key={index} className="aspect-square">
            <img
              src={post}
              alt={`Post ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
