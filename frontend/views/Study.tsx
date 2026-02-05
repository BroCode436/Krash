
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  FileText, 
  Files, 
  ClipboardList, 
  Sparkles,
  Trophy,
  Briefcase,
  Layers,
  Search,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const Study: React.FC = () => {
  const [view, setView] = useState<'main' | 'updates'>('main');
  const [activeYear, setActiveYear] = useState('3rd');
  const [activeBranch, setActiveBranch] = useState('CS');

  const years = ['1st', '2nd', '3rd', '4th'];
  const branches = ['CS', 'IT', 'EC', 'ME', 'CE'];

  const handleItemClick = (title: string) => {
    console.log(`Opening ${title}...`);
    // Simulated opening logic
    alert(`Opening ${title} for ${activeBranch} ${activeYear} Year`);
  };

  const renderMain = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Focus Mode</h1>
          <p className="text-sm text-gray-500 font-medium">Deep work environment.</p>
        </div>
        <button 
          onClick={() => setView('updates')}
          className="px-5 py-2.5 bg-jade-900/10 border border-jade-900/20 text-jade-500 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-jade-900/20 transition-all active:scale-95"
        >
          <Sparkles size={14} />
          Updates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Year Selector */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Select Year</h3>
          <div className="flex gap-2 bg-surface p-1.5 rounded-3xl border border-white/5">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={`flex-1 py-3 rounded-[1.25rem] text-xs font-bold transition-all ${
                  activeYear === y 
                    ? 'bg-jade-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Branch Selector */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Select Branch</h3>
          <div className="flex gap-2 bg-surface p-1.5 rounded-3xl border border-white/5 overflow-x-auto no-scrollbar">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => setActiveBranch(b)}
                className={`min-w-[60px] py-3 rounded-[1.25rem] text-xs font-bold transition-all ${
                  activeBranch === b 
                    ? 'bg-jade-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-12 mt-4">
        {/* Curriculum Section */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Academic Resources</h3>
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => handleItemClick('Syllabus')}
              className="w-full bg-surface border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between group hover:border-jade-900/30 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-off-white group-hover:text-jade-400 transition-colors">Syllabus</h4>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Official {activeBranch} {activeYear} Year Docs</p>
                </div>
              </div>
              <ChevronRight className="text-gray-700 group-hover:text-jade-500" size={24} />
            </button>

            <button 
              onClick={() => handleItemClick('Study Notes')}
              className="w-full bg-surface border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between group hover:border-jade-900/30 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-off-white group-hover:text-jade-400 transition-colors">Study Notes</h4>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Handwritten & Digital Archive</p>
                </div>
              </div>
              <ChevronRight className="text-gray-700 group-hover:text-jade-500" size={24} />
            </button>
          </div>
        </div>

        {/* Practice Section */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Exam Practice</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleItemClick('Question Bank')}
              className="bg-surface border border-white/5 p-6 rounded-[2.5rem] flex flex-col gap-4 group hover:border-jade-900/30 transition-all text-left active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 group-hover:rotate-12 transition-transform">
                <ClipboardList size={22} />
              </div>
              <div>
                <h4 className="text-base font-bold text-off-white group-hover:text-jade-400 transition-colors">Question Bank</h4>
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">Topic-wise problems</p>
              </div>
            </button>
            <button 
              onClick={() => handleItemClick('Previous Papers')}
              className="bg-surface border border-white/5 p-6 rounded-[2.5rem] flex flex-col gap-4 group hover:border-jade-900/30 transition-all text-left active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-500 group-hover:rotate-12 transition-transform">
                <Files size={22} />
              </div>
              <div>
                <h4 className="text-base font-bold text-off-white group-hover:text-jade-400 transition-colors">Previous Papers</h4>
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">Last 10 Years PYQs</p>
              </div>
            </button>
          </div>
        </div>

        {/* Career/Growth Internal Sections */}
        <div className="space-y-12">
          {/* Internships Section */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2 flex items-center gap-2">
              <Briefcase size={12} className="text-blue-500" /> Internships
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => handleItemClick('Vercel Internship')}
                className="w-full bg-surface border border-white/5 p-6 rounded-[2.5rem] flex flex-col gap-3 group hover:border-jade-900/30 transition-all text-left relative overflow-hidden active:scale-[0.98]"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
                <div className="flex items-center justify-between w-full">
                  <span className="text-[9px] font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full uppercase">Remote</span>
                  <ExternalLink size={14} className="text-gray-700 group-hover:text-jade-500 transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-off-white group-hover:text-jade-400">Frontend Intern at Vercel</h4>
                <p className="text-xs text-gray-500">Apply by Jan 15 • 3 Months Duration</p>
              </button>
            </div>
          </div>

          {/* Hackathons Section */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2 flex items-center gap-2">
              <Trophy size={12} className="text-orange-500" /> Hackathons
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => handleItemClick('Google HashCode')}
                className="w-full bg-surface border border-white/5 p-6 rounded-[2.5rem] flex flex-col gap-3 group hover:border-jade-900/30 transition-all text-left relative overflow-hidden active:scale-[0.98]"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
                <div className="flex items-center justify-between w-full">
                  <span className="text-[9px] font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full uppercase">Global</span>
                  <ExternalLink size={14} className="text-gray-700 group-hover:text-jade-500 transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-off-white group-hover:text-jade-400">Google HashCode 2025</h4>
                <p className="text-xs text-gray-500">Registration closing soon • Team Event</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpdates = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('main')}
          className="w-12 h-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-jade-500 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Campus Updates</h1>
      </div>

      {/* General Updates */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Recent News</h3>
        <div className="space-y-3">
          {[
            "Campus WiFi upgrade scheduled for next Sunday.",
            "New elective courses added to CS curriculum.",
            "Winter fest auditions begin tomorrow at 4 PM.",
            "The library will be open 24/7 during final exams week.",
            "Guest lecture by Industry Expert on Quantum Computing this Friday."
          ].map((news, i) => (
            <button 
              key={i} 
              onClick={() => handleItemClick('News Item')}
              className="w-full bg-surface/50 border border-white/5 p-5 rounded-3xl flex items-center gap-4 hover:border-jade-900/20 transition-all text-left"
            >
              <div className="w-1.5 h-1.5 bg-jade-500 rounded-full flex-shrink-0" />
              <p className="text-xs text-gray-400 leading-relaxed">{news}</p>
              <ChevronRight size={14} className="ml-auto text-gray-800" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto pb-10">
      {view === 'main' ? renderMain() : renderUpdates()}
    </div>
  );
};

export default Study;
