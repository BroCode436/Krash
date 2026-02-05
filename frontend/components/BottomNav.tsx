
import React from 'react';
import { Section } from '../types';
import { NAV_ITEMS } from '../constants';

interface BottomNavProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeSection, onNavigate }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-2xl border-t border-white/5 px-4 pb-8 pt-3 z-50 flex items-center justify-around">
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        const isPost = item.id === 'create';
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Section)}
            className={`group relative flex flex-col items-center justify-center transition-all duration-300 ${
              isActive ? 'text-jade-500' : 'text-gray-500'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all duration-300 ${
              isActive ? 'bg-jade-900/10' : 'group-hover:bg-white/5 active:scale-90'
            } ${isPost ? 'bg-jade-600 text-white shadow-lg shadow-jade-900/40 -mt-2 mb-1 p-3' : ''}`}>
              {/* Fix: Cast to React.ReactElement<any> to allow injecting 'size' prop without TS errors */}
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: isPost ? 24 : 22 })}
            </div>
            
            <span className={`text-[9px] font-bold uppercase tracking-wider transition-opacity duration-300 ${
              isActive || isPost ? 'opacity-100' : 'opacity-60'
            }`}>
              {item.label}
            </span>

            {isActive && !isPost && (
              <div className="absolute -top-1 w-1 h-1 bg-jade-500 rounded-full animate-in fade-in duration-300" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
