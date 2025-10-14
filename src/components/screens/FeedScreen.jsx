import { Heart, MessageCircle, Send, Bookmark, Search, Bell } from 'lucide-react';

export default function FeedScreen() {
  const posts = [
    {
      username: 'CommunityGlow',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150',
      likes: 543,
      caption: 'Join us next Saturday for our annual Community Outreach! Spreading love and support to those in need. #KairosCares #CommunityLove #Outreach',
    },
    {
      username: 'PastorMike',
      image: 'https://images.pexels.com/photos/8468286/pexels-photo-8468286.jpeg?auto=compress&cs=tinysrgb&w=600',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      likes: 897,
      caption: 'Powerful message this Sunday on forgiveness and grace. Feeling blessed to share this journey with our incredible community. #SundayService #FaithJourney #Blessings',
    },
    {
      username: 'KairosYouth',
      image: 'https://images.pexels.com/photos/1311518/pexels-photo-1311518.jpeg?auto=compress&cs=tinysrgb&w=600',
      avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=150',
      likes: 312,
      caption: 'Last night\'s Youth Gathering was amazing! So much fun, fellowship, and faith. Can\'t wait for the next one! #KairosYouth #YouthMinistry #Fellowship',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-dark-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-white text-xl font-bold">Feed</h1>
        <Bell className="text-white" size={24} />
      </div>

      <div className="px-4 py-3 border-b border-dark-card">
        <div className="bg-dark-card rounded-xl px-4 py-3 flex items-center gap-3">
          <Search className="text-light-gray" size={20} />
          <input
            type="text"
            placeholder="Search Feed..."
            className="flex-1 bg-transparent text-white outline-none placeholder-light-gray"
          />
        </div>
      </div>

      <div className="pb-4">
        {posts.map((post, index) => (
          <div key={index} className="mb-4 border-b border-dark-card pb-4">
            <div className="flex items-center gap-3 px-4 py-3">
              <img
                src={post.avatar}
                alt={post.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-white font-semibold">{post.username}</span>
            </div>

            <img
              src={post.image}
              alt="Post"
              className="w-full aspect-square object-cover"
            />

            <div className="px-4 py-3">
              <div className="flex items-center gap-4 mb-3">
                <button>
                  <Heart className="text-white" size={24} />
                </button>
                <button>
                  <MessageCircle className="text-white" size={24} />
                </button>
                <button>
                  <Send className="text-white" size={24} />
                </button>
                <button className="ml-auto">
                  <Bookmark className="text-white" size={24} />
                </button>
              </div>

              <p className="text-white font-semibold mb-2">{post.likes} Likes</p>
              <p className="text-white">
                <span className="font-semibold mr-2">{post.username}</span>
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
