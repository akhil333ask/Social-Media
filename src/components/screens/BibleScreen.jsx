import { useState } from 'react';
import { ChevronDown, Share2, Bell } from 'lucide-react';

export default function BibleScreen() {
  const [book, setBook] = useState('Genesis');
  const [chapter, setChapter] = useState('1');
  const [language, setLanguage] = useState('English');

  const verses = [
    { number: 1, text: 'In the beginning God created the heavens and the earth.' },
    { number: 2, text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.' },
    { number: 3, text: 'And God said, "Let there be light," and there was light.' },
    { number: 4, text: 'God saw that the light was good, and he separated the light from the darkness.' },
    { number: 5, text: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.' },
    { number: 6, text: 'And God said, "Let there be a vault between the waters to separate water from water."' },
    { number: 7, text: 'So God made the vault and separated the water under the vault from the water above it. And it was so.' },
    { number: 8, text: 'God called the vault "sky." And there was evening, and there was morning—the second day.' },
    { number: 9, text: 'And God said, "Let the water under the sky be gathered to one place, and let dry ground appear." And it was so.' },
    { number: 10, text: 'God called the dry ground "land," and the gathered waters he called "seas." And God saw that it was good.' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-black border-b border-dark-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <h1 className="text-white text-xl font-bold">Bible</h1>
        <div className="flex items-center gap-3">
          <Bell className="text-white" size={24} />
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="px-4 py-4 flex gap-3">
        <div className="flex-1 bg-dark-card rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-white">{book}</span>
          <ChevronDown className="text-light-gray" size={20} />
        </div>

        <div className="w-20 bg-dark-card rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-white">{chapter}</span>
          <ChevronDown className="text-light-gray" size={20} />
        </div>

        <div className="flex-1 bg-dark-card rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-white">{language}</span>
          <ChevronDown className="text-light-gray" size={20} />
        </div>
      </div>

      <div className="px-6 py-4 space-y-4">
        {verses.map((verse) => (
          <p key={verse.number} className="text-white leading-relaxed">
            <span className="text-vibrant-yellow font-bold mr-1">{verse.number}.</span>
            {verse.text}
          </p>
        ))}
      </div>

      <button className="fixed bottom-24 right-6 bg-vibrant-yellow p-4 rounded-full shadow-lg">
        <Share2 className="text-black" size={24} />
      </button>
    </div>
  );
}
