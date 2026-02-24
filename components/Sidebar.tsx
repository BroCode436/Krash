
import React from 'react';
import { Section } from '../types';
import { NAV_ITEMS } from '../constants';
import { Plus, ShieldCheck, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  return (
    <div className="flex flex-col h-full p-6 relative">
      {/* Logo Section with Glow */}
      <div className="flex items-center gap-3 mb-12 px-2 group cursor-pointer animate-fadeInDown">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center text-primary-dark shadow-md transition-all duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7">
              <path d="M11 2a10 10 0 0 1 10 10v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a10 10 0 0 1 10-10z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 11h.01M12 15h.01M8 13h.01M16 13h.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Removed glow effect */}
        </div>
        <div>
          <span className="text-xl font-display font-bold tracking-tight text-text-primary">MATTER</span>
          <div className="flex items-center gap-1 text-[10px] text-accent-primary font-medium">
            <Sparkles size={10} />
            <span>Anonymous</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1.5 flex-1">
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Section)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative animate-slideInLeft overflow-hidden ${isActive
                ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30 shadow-lg shadow-accent-primary/10'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface/30'
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary rounded-r-full" />
              )}

              {/* Icon with animation */}
              <span className={`transition-all duration-300 ${isActive ? 'text-accent-primary scale-110' : 'group-hover:text-accent-primary group-hover:scale-125'
                }`}>
                {item.icon}
              </span>

              {/* Label */}
              <span className="font-medium text-[15px]">{item.label}</span>

              {/* Hover glow effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Privacy Badge */}
      <div className="mt-6 animate-fadeInUp delay-500">
        <div className="bg-surface/40 backdrop-blur-sm border border-accent-primary/20 p-5 rounded-2xl relative overflow-hidden group hover:border-accent-primary/40 transition-all duration-300">
          {/* Removed glow effect */}

          <div className="flex items-center gap-2 text-[10px] font-bold text-accent-primary mb-2 tracking-widest uppercase relative z-10">
            <ShieldCheck size={14} className="animate-pulse" />
            Zero Tracking
          </div>
          <p className="text-xs text-text-secondary leading-relaxed relative z-10">
            Encrypted and anonymous by design. We never store your real identity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
