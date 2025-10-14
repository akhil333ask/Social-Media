import { Bell, CheckCircle2 } from 'lucide-react';

export default function GlobalChannelScreen() {
  const posts = [
    {
      title: 'A New Dawn: Embracing Spiritual Growth',
      description: 'Brothers and sisters, we are thrilled to announce new initiatives aimed at deepening our collective spiritual',
      image: 'https://images.pexels.com/photos/355312/pexels-photo-355312.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '2 hours ago',
    },
    {
      title: 'Community Outreach: Spreading the Word',
      description: 'Our latest outreach program has successfully connected with over 500 new souls in underserved communities.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '1 day ago',
    },
    {
      title: 'Referral System Updates: Earn More Blessings',
      description: 'We\'ve made significant enhancements to our referral system! Now, inviting friends not only helps them discover',
      image: 'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '3 days ago',
    },
    {
      title: 'Deep Dive: Understanding Ancient Scriptures',
      description: 'Our new series of online seminars will explore the profound meanings behind ancient biblical texts. Led by renowned',
      image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=600',
      time: '5 days ago',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-dark-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-white text-xl font-bold">Global Channel</h1>
        <div className="flex items-center gap-3">
          <Bell className="text-white" size={24} />
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-dark-card rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-darker-card">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Kairos Team"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white font-semibold">Kairos Team</span>
              <CheckCircle2 className="text-vibrant-yellow" size={16} fill="#FFD60A" />
            </div>

            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-video object-cover"
            />

            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-light-gray text-sm mb-3">{post.description}</p>
              <span className="text-light-gray text-xs">{post.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
