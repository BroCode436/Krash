
import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  MessageSquare,
  Hash
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const hashtags = [
    '#Trending',
    '#Hot',
    '#Exam',
    '#Memes',
    '#Gossip',
    '#Confessions',
    '#Campus',
    '#Anonymous'
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleHashtagSelect = (hashtag: string) => {
    setSelectedHashtag(hashtag);
    setSearchQuery(hashtag);
    setShowSuggestions(false);
    // Here you would implement the actual filtering logic
    console.log('Filtering posts by:', hashtag);
  };

  const filteredPosts = selectedHashtag
    ? posts // In a real app, filter posts based on selectedHashtag
    : posts;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Search Bar & Notifications */}
      <div className="flex items-center gap-3 animate-fadeInDown">
        <div ref={searchRef} className="relative group flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-primary transition-colors duration-300 z-10" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            placeholder="Search posts, topics, or users..."
            className="w-full bg-surface/60 backdrop-blur-sm border border-muted/30 rounded-full py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-accent-primary/50 focus:shadow-lg focus:shadow-accent-primary/10 transition-all placeholder:text-text-muted hover:bg-surface/80"
          />
        </div>
        <button
          onClick={() => onNavigate('alerts')}
          className="w-12 h-12 rounded-full bg-surface/60 backdrop-blur-sm border border-muted/30 flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-accent-primary/50 hover:bg-surface/80 transition-all shadow-lg hover:shadow-accent-primary/10 active:scale-95 group relative"
          title="Notifications"
        >
          <Bell size={20} className="group-hover:animate-bounce" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent-primary rounded-full border-2 border-primary-dark animate-pulse" />
        </button>
      </div>

      {/* Hashtag Suggestions Dropdown - Now pushes content instead of overlapping */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: showSuggestions ? '320px' : '0',
          opacity: showSuggestions ? 1 : 0,
          marginTop: showSuggestions ? '0' : '-1.5rem',
          marginBottom: showSuggestions ? '1rem' : '0'
        }}
      >
        <div className="bg-surface/95 backdrop-blur-sm border border-muted/30 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-3 border-b border-muted/20">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
              <Hash size={12} />
              Popular Tags
            </p>
          </div>
          <div className="p-2 max-h-64 overflow-y-auto">
            {hashtags.map((tag, index) => (
              <button
                key={tag}
                onClick={() => handleHashtagSelect(tag)}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-surface-elevated/50 transition-all duration-200 group animate-fadeInUp"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary/20 transition-colors">
                    <Hash size={14} />
                  </div>
                  <span className="text-sm font-bold text-text-secondary group-hover:text-accent-primary transition-colors">
                    {tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Feed - moves down smoothly when suggestions appear */}
      <div className="space-y-5 transition-all duration-300">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <PostCard
                post={post}
                onUpdate={onUpdatePost}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-24 h-24 mx-auto mb-6 bg-surface/40 rounded-full flex items-center justify-center">
              <MessageSquare className="text-text-muted" size={40} />
            </div>
            <h3 className="text-xl font-display font-bold text-text-primary mb-2">
              No posts yet
            </h3>
            <p className="text-sm text-text-muted mb-6">
              Be the first to share something with the community!
            </p>
            <button
              onClick={onPostPrompt}
              className="px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-primary-dark font-bold rounded-xl hover:shadow-lg hover:shadow-accent-primary/30 transition-all"
            >
              Create Post
            </button>
          </div>
        )}
      </div>

      {/* Infinite Scroll Loader */}
      {filteredPosts.length > 0 && (
        <div className="flex justify-center py-10 opacity-30 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
