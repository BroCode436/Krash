
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  TrendingUp, 
  Flame, 
  FileText, 
  Smile, 
  MessageSquare,
  Bell
} from 'lucide-react';
import PostCard from '../components/PostCard';
import { Post, Section } from '../types';

interface HomeProps {
  posts: Post[];
  onUpdatePost: (post: Post) => void;
  onPostPrompt: () => void;
  onNavigate: (section: Section) => void;
}

const Home: React.FC<HomeProps> = ({ posts, onUpdatePost, onPostPrompt, onNavigate }) => {
  const [activeChip, setActiveChip] = useState('Trending');
  const categories = [
    { label: 'Trending', icon: <TrendingUp size={18} /> },
    { label: 'Hot', icon: <Flame size={18} /> },
    { label: 'Exam', icon: <FileText size={18} /> },
    { label: 'Memes', icon: <Smile size={18} /> },
    { label: 'Gossip', icon: <MessageSquare size={18} /> },
  ];

  const activeIndex = categories.findIndex(c => c.label === activeChip);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Search Bar & Notifications */}
      <div className="flex items-center gap-3">
        <div className="relative group flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-jade-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search"
            className="w-full bg-surface border border-white/5 rounded-[2rem] py-4 pl-14 pr-6 text-[15px] focus:outline-none focus:border-jade-900/40 transition-all placeholder:text-gray-700 shadow-xl shadow-black/20"
          />
        </div>
        <button 
          onClick={() => onNavigate('alerts')}
          className="w-12 h-12 rounded-[1.25rem] bg-surface border border-white/5 flex items-center justify-center text-gray-500 hover:text-jade-500 hover:border-jade-900/20 transition-all shadow-lg active:scale-95 group relative"
          title="Notifications"
        >
          <Bell size={20} />
          <div className="absolute top-3.5 right-3.5 w-2 h-2 bg-jade-500 rounded-full border-2 border-background" />
        </button>
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

      {/* Post Prompt */}
      <div 
        onClick={onPostPrompt}
        className="bg-surface border border-jade-900/10 border-dashed rounded-[2.5rem] p-6 flex items-center gap-5 cursor-pointer hover:border-jade-500/30 transition-all group relative overflow-hidden"
      >
        <div className="w-12 h-12 bg-jade-900/20 rounded-2xl flex items-center justify-center text-jade-500 group-hover:bg-jade-500 group-hover:text-white transition-all">
          <Plus size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-off-white group-hover:text-jade-400 transition-colors">Spill some tea...</h3>
          <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">Post anonymously to your college feed.</p>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-jade-500/5 blur-3xl rounded-full translate-x-12 -translate-y-12" />
      </div>

      {/* Posts Section */}
      <div className="space-y-6 mt-4">
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

export default Home;
