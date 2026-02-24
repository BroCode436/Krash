
import React from 'react';
import { TrendingUp, Flame, Hash, Users } from 'lucide-react';
import CountUp from './CountUp';

const TrendingSidebar: React.FC = () => {
  const trendingTopics = [
    { tag: 'CampusLife', posts: 1234, trend: '+12%' },
    { tag: 'ExamMemes', posts: 892, trend: '+8%' },
    { tag: 'CampusGossip', posts: 756, trend: '+25%' },
    { tag: 'Placements2024', posts: 543, trend: '+15%' },
    { tag: 'CafeteriaReview', posts: 421, trend: '+5%' },
  ];

  const activeMoments = [
    { text: 'Students discussing yesterday\'s exam', count: 42 },
    { text: 'New cafeteria menu revealed', count: 28 },
    { text: 'Sports meet preparations', count: 19 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Flame className="text-accent-primary" size={22} />
        <h2 className="text-lg font-display font-bold text-text-primary">What's Hot</h2>
      </div>

      {/* Trending Topics */}
      <div className="bg-surface/40 backdrop-blur-sm border border-muted/30 rounded-2xl p-5 hover:border-accent-primary/30 transition-all duration-300 group">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
          <TrendingUp size={14} className="text-accent-primary" />
          Trending Topics
        </h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <button
              key={topic.tag}
              className="w-full text-left p-3 rounded-xl hover:bg-surface-elevated/60 transition-all duration-200 group/item animate-slideInRight"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Hash size={14} className="text-accent-primary" />
                  <span className="text-sm font-bold text-text-primary group-hover/item:text-accent-primary transition-colors">
                    {topic.tag}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-full">
                  {topic.trend}
                </span>
              </div>
              <p className="text-[11px] text-text-muted pl-5">
                {topic.posts.toLocaleString()} posts
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Moments */}
      <div className="bg-surface/40 backdrop-blur-sm border border-muted/30 rounded-2xl p-5 hover:border-accent-primary/30 transition-all duration-300">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
          <Users size={14} className="text-accent-primary" />
          Active Right Now
        </h3>
        <div className="space-y-3">
          {activeMoments.map((moment, index) => (
            <button
              key={index}
              className="w-full text-left p-3 rounded-xl hover:bg-surface-elevated/60 transition-all duration-200 group/item animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-primary rounded-full mt-1.5 animate-pulse" />
                <div className="flex-1">
                  <p className="text-[13px] text-text-secondary leading-relaxed mb-1 group-hover/item:text-text-primary transition-colors">
                    {moment.text}
                  </p>
                  <p className="text-[10px] text-text-muted font-medium">
                    {moment.count} people talking
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-2xl p-5 relative overflow-hidden group hover:border-accent-primary/40 transition-all duration-300">
        {/* Background Glow */}
        {/* Removed glow effect */}

        <div className="relative z-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-accent-primary mb-3">
            Community Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary-dark/40 backdrop-blur-sm rounded-xl p-3 border border-accent-primary/10">
              <p className="text-2xl font-display font-bold text-accent-primary mb-1">
                <CountUp end={2400} suffix="" className="" />
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-wide">
                Active Users
              </p>
            </div>
            <div className="bg-primary-dark/40 backdrop-blur-sm rounded-xl p-3 border border-accent-primary/10">
              <p className="text-2xl font-display font-bold text-accent-primary mb-1">
                <CountUp end={156} suffix="" className="" />
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-wide">
                Posts Today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;
