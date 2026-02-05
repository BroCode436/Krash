
import React from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { TRENDING_TOPICS } from '../constants';

const TrendingSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-jade-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search campus..."
          className="w-full bg-surface border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-jade-900/40 transition-all placeholder:text-gray-600"
        />
      </div>

      <div className="bg-surface border border-white/5 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-jade-900/20 flex items-center justify-center text-jade-500">
            <TrendingUp size={16} />
          </div>
          <h3 className="font-semibold text-off-white">Trending Topics</h3>
        </div>

        <div className="space-y-6">
          {TRENDING_TOPICS.map((topic, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-300 group-hover:text-jade-400 transition-colors">{topic.tag}</p>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mt-0.5">Rumors • Hot</p>
              </div>
              <span className="text-[11px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-md">{topic.reach}</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-8 text-center text-xs font-bold text-jade-500/80 hover:text-jade-500 transition-colors py-2 uppercase tracking-widest">
          View Global Feed
        </button>
      </div>

      <div className="bg-jade-950/20 border border-jade-900/10 rounded-3xl p-6">
        <h4 className="text-jade-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Campus Insider</h4>
        <p className="text-xs text-gray-400 leading-relaxed mb-4">
          Students are currently discussing the upcoming cultural fest guest list.
        </p>
        <button className="text-xs font-bold text-jade-500 hover:underline">Join the tea →</button>
      </div>
    </div>
  );
};

export default TrendingSidebar;
