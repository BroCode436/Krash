
import React from 'react';
import { Section } from '../types';
import { NAV_ITEMS } from '../constants';
import { Plus, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-background p-6">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-jade-600 rounded-xl flex items-center justify-center text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
            <path d="M11 2a10 10 0 0 1 10 10v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a10 10 0 0 1 10-10z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11h.01M12 15h.01M8 13h.01M16 13h.01" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight">KIET.Matters</span>
      </div>

      <nav className="space-y-2 flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Section)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
              activeSection === item.id 
                ? 'bg-jade-900/10 text-jade-500 border border-jade-900/20' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <span className={activeSection === item.id ? 'text-jade-500' : 'group-hover:text-jade-400 transition-colors'}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}

        <button 
          onClick={() => onNavigate('create')}
          className="w-full mt-10 flex items-center justify-center gap-2 bg-jade-600 hover:bg-jade-700 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-jade-900/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          Post Something
        </button>
      </nav>

      <div className="mt-auto">
        <div className="bg-surface border border-jade-900/20 p-5 rounded-3xl">
          <div className="flex items-center gap-2 text-[10px] font-bold text-jade-500 mb-2 tracking-widest uppercase">
            <ShieldCheck size={12} />
            Zero Tracking
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Encrypted and anonymous by design. We never store your real identity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
