
import React from 'react';
import { Section } from '../types';
import { NAV_ITEMS } from '../constants';

interface BottomNavProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeSection, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fadeInUp">
      {/* Glass morphism background */}
      <div className="bg-surface/80 backdrop-blur-sm border-t border-muted/30 shadow-lg">
        <div className="flex items-center justify-around px-2 py-3 max-w-md mx-auto">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Section)}
                className="relative flex flex-col items-center gap-1 px-4 py-2 group transition-all duration-300"
              >
                {/* Removed glow effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-accent-primary/10 rounded-2xl scale-110 animate-scaleIn" />
                )}

                {/* Icon container */}
                <div className={`relative transition-all duration-300 ${isActive
                  ? 'text-accent-primary scale-110 -translate-y-1'
                  : 'text-text-muted group-hover:scale-125 group-active:scale-90'
                  }`}>
                  {item.icon}

                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-primary rounded-full animate-pulse" />
                  )}
                </div>

                {/* Label */}
                <span className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${isActive
                  ? 'text-accent-primary'
                  : 'text-text-muted'
                  }`}>
                  {item.label}
                </span>

                {/* Ripple effect on tap */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className={`absolute inset-0 bg-accent-primary/20 rounded-full scale-0 group-active:scale-150 transition-transform duration-500 opacity-0 group-active:opacity-100`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
