
import React, { useState } from 'react';
import { Grid3X3, List, Filter, ArrowLeft } from 'lucide-react';
import PostCard from '../components/PostCard';
import { Post } from '../types';

interface FunsProps {
  posts: Post[];
  onUpdatePost: (post: Post) => void;
  onBack?: () => void;
}

const Funs: React.FC<FunsProps> = ({ posts, onUpdatePost, onBack }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Memes', 'Gossip', 'Confessions', 'Photos'];

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between animate-fadeInDown">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-surface/50 rounded-lg transition-all duration-200 group"
            >
              <ArrowLeft size={24} className="text-text-secondary group-hover:text-accent-primary transition-colors" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-display font-bold text-text-primary mb-2">
              Funs 🎉
            </h1>
            <p className="text-sm text-text-muted">
              Memes, gossip, confessions & more
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-surface/60 backdrop-blur-sm border border-muted/30 p-1.5 rounded-xl">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === 'list'
              ? 'bg-accent-primary text-primary-dark shadow-lg'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated/50'
              }`}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode === 'grid'
              ? 'bg-accent-primary text-primary-dark shadow-lg'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated/50'
              }`}
          >
            <Grid3X3 size={18} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 animate-fadeInUp delay-100">
        <div className="flex items-center gap-2 text-text-muted bg-surface/40 px-3 py-2 rounded-lg">
          <Filter size={16} />
          <span className="text-xs font-bold uppercase tracking-wide">Filter:</span>
        </div>
        {filters.map((filter, index) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 whitespace-nowrap animate-scaleIn ${activeFilter === filter
              ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-primary-dark shadow-lg shadow-accent-primary/20'
              : 'bg-surface/40 text-text-muted hover:text-text-primary hover:bg-surface/60'
              }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Posts Display */}
      {viewMode === 'list' ? (
        <div className="space-y-5 mt-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <PostCard post={post} onUpdate={onUpdatePost} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="animate-scaleIn"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="bg-surface border border-muted/30 rounded-2xl overflow-hidden group hover:border-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/5 transition-all duration-300 cursor-pointer">
                {post.mediaUrl && (
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.mediaUrl}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={post.avatar} className="w-7 h-7 rounded-lg" alt={post.author} />
                    <span className="text-xs font-bold text-text-primary">{post.author}</span>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="font-bold">{post.score} votes</span>
                    <span>{post.commentsCount} comments</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {posts.length > 0 && (
        <div className="flex justify-center py-8">
          <button className="px-6 py-3 bg-surface/60 backdrop-blur-sm border border-muted/30 text-text-primary font-bold rounded-xl hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/10 transition-all">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Funs;
