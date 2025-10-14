import { Heart, MessageCircle, Send, MoreVertical } from 'lucide-react';

export default function ReelsScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex items-center justify-center relative">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-white font-semibold">KairosUser_123</span>
      </div>

      <div className="absolute top-4 right-4">
        <MoreVertical className="text-white" size={24} />
      </div>

      <div className="text-center">
        <div className="text-white text-2xl font-semibold mb-2">Video Player Area</div>
        <div className="text-light-gray text-sm">Swipe up for next video</div>
      </div>

      <div className="absolute right-4 bottom-24 flex flex-col gap-6">
        <button className="flex flex-col items-center">
          <div className="bg-dark-card p-3 rounded-full mb-1">
            <Heart className="text-white" size={28} />
          </div>
          <span className="text-white text-sm">1.2K</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="bg-dark-card p-3 rounded-full mb-1">
            <MessageCircle className="text-white" size={28} />
          </div>
          <span className="text-white text-sm">234</span>
        </button>

        <button className="flex flex-col items-center">
          <div className="bg-dark-card p-3 rounded-full mb-1">
            <Send className="text-white" size={28} />
          </div>
          <span className="text-white text-sm">Share</span>
        </button>
      </div>

      <div className="absolute bottom-24 left-4 right-20">
        <p className="text-white text-sm mb-2">
          Amazing worship night! The presence of God filled the room.
          #Worship #Praise #KairosWorship
        </p>
      </div>
    </div>
  );
}
