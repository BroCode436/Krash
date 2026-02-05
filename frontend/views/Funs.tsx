
import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  Flame, 
  Smile, 
  MessageSquare 
} from 'lucide-react';
import { Post } from '../types';
import PostCard from '../components/PostCard';

interface FunsProps {
  posts: Post[];
  onUpdatePost: (post: Post) => void;
}

const Funs: React.FC<FunsProps> = ({ posts, onUpdatePost }) => {
  const [activeChip, setActiveChip] = useState('Memes');
  const categories = [
    { label: 'Trending', icon: <TrendingUp size={18} /> },
    { label: 'Hot', icon: <Flame size={18} /> },
    { label: 'Memes', icon: <Smile size={18} /> },
    { label: 'Gossip', icon: <MessageSquare size={18} /> },
  ];

  const activeIndex = categories.findIndex(c => c.label === activeChip);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-jade-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search Funs"
          className="w-full bg-surface border border-white/5 rounded-[2rem] py-4 pl-14 pr-6 text-[15px] focus:outline-none focus:border-jade-900/40 transition-all placeholder:text-gray-700 shadow-xl shadow-black/20"
        />
      </div>

      {/* Icon Categories */}
      <div className="relative">
        <div className="flex items-center justify-between px-2 overflow-x-auto no-scrollbar pb-3">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveChip(cat.label)}
              className={`flex flex-col items-center gap-2 group transition-all min-w-[70px] ${
                activeChip === cat.label ? 'text-jade-500' : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              <div className={`p-3 rounded-2xl transition-all duration-300 ${
                activeChip === cat.label 
                  ? 'bg-jade-900/20 shadow-lg shadow-jade-900/10 scale-110' 
                  : 'bg-white/5 group-active:scale-95'
              }`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">{cat.label}</span>
            </button>
          ))}
        </div>
        {/* Sliding Indicator */}
        <div className="hidden lg:block absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
          <div 
            className="absolute h-[2px] bg-jade-500 rounded-full transition-all duration-500"
            style={{ 
              width: '70px', 
              left: `${activeIndex * (100 / (categories.length - 1))}%`,
              transform: `translateX(calc(-${activeIndex * 10}px + 2px))`
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Funs Center</h1>
        <p className="text-sm text-gray-500 font-medium">Infinite campus humor. Scroll at your own risk.</p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            onUpdate={onUpdatePost}
          />
        ))}
      </div>

      <div className="flex justify-center py-10 opacity-20">
        <div className="w-6 h-6 border-2 border-jade-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Funs;
