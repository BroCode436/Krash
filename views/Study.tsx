
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
  ExternalLink,
  GraduationCap,
  ArrowLeft
} from 'lucide-react';

interface StudyProps {
  onBack?: () => void;
}

const Study: React.FC<StudyProps> = ({ onBack }) => {
  const [view, setView] = useState<'main' | 'updates' | 'comingSoon'>('main');
  const [activeYear, setActiveYear] = useState('3rd');
  const [activeBranch, setActiveBranch] = useState('CSE');
  const [comingSoonSection, setComingSoonSection] = useState('');

  const years = ['1st', '2nd', '3rd', '4th'];
  const branches = ['CSE', 'CS', 'IT', 'CS-AI', 'CS-AIML', 'CSIT', 'ECE', 'EEE', 'ELC', 'ME'];

  const handleItemClick = (title: string) => {
    // For study sections, show Coming Soon
    if (['Syllabus', 'Study Notes', 'Question Bank', 'Previous Papers'].includes(title)) {
      setComingSoonSection(title);
      setView('comingSoon');
    } else {
      // For other items (internships, hackathons, news), keep old behavior
      console.log(`Opening ${title}...`);
      alert(`Opening ${title} for ${activeBranch} ${activeYear} Year`);
    }
  };

  const renderMain = () => (
    <div className="space-y-8 animate-fadeIn">
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
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center">
                <GraduationCap className="text-primary-dark" size={22} />
              </div>
              <h1 className="text-3xl font-display font-bold text-text-primary">Focus Mode</h1>
            </div>
            <p className="text-sm text-text-muted ml-[52px]">Deep work environment for serious study</p>
          </div>
        </div>
        <button
          onClick={() => setView('updates')}
          className="px-5 py-2.5 bg-accent-primary/10 border border-accent-primary/30 text-accent-primary rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-accent-primary/20 hover:shadow-lg hover:shadow-accent-primary/10 transition-all duration-300 active:scale-95"
        >
          <Sparkles size={14} />
          Updates
        </button>
      </div>

      {/* Year & Branch Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeInUp delay-100">
        {/* Year Selector */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-accent-primary rounded-full" />
            Select Year
          </h3>
          <div className="flex gap-2 bg-surface/60 backdrop-blur-sm p-2 rounded-xl border border-muted/30">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all duration-200 ${activeYear === y
                  ? 'bg-accent-primary text-primary-dark shadow-lg shadow-accent-primary/20'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated/50'
                  }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Branch Selector */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-accent-primary rounded-full" />
            Select Branch
          </h3>
          <div className="flex gap-2 bg-surface/60 backdrop-blur-sm p-2 rounded-xl border border-muted/30 overflow-x-auto no-scrollbar">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => setActiveBranch(b)}
                className={`min-w-[65px] py-3 px-2 rounded-lg text-xs font-bold transition-all duration-200 whitespace-nowrap ${activeBranch === b
                  ? 'bg-accent-primary text-primary-dark shadow-lg shadow-accent-primary/20'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated/50'
                  }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Resources */}
      <div className="space-y-6 mt-6">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 flex items-center gap-2">
          <span className="w-1 h-1 bg-accent-primary rounded-full" />
          Academic Resources
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleItemClick('Syllabus')}
            className="w-full bg-surface/60 backdrop-blur-sm border border-muted/30 p-6 rounded-2xl flex items-center justify-between group hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 active:scale-[0.99] animate-fadeInUp delay-200"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Layers size={24} />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors">Syllabus</h4>
                <p className="text-[10px] font-medium text-text-muted uppercase tracking-wide">Official {activeBranch} {activeYear} Year Docs</p>
              </div>
            </div>
            <ChevronRight className="text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all" size={22} />
          </button>

          <button
            onClick={() => handleItemClick('Study Notes')}
            className="w-full bg-surface/60 backdrop-blur-sm border border-muted/30 p-6 rounded-2xl flex items-center justify-between group hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 active:scale-[0.99] animate-fadeInUp delay-300"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-purple-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                <BookOpen size={24} />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors">Study Notes</h4>
                <p className="text-[10px] font-medium text-text-muted uppercase tracking-wide">Handwritten & Digital Archive</p>
              </div>
            </div>
            <ChevronRight className="text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all" size={22} />
          </button>
        </div>
      </div>

      {/* Exam Practice */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 flex items-center gap-2">
          <span className="w-1 h-1 bg-accent-primary rounded-full" />
          Exam Practice
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleItemClick('Question Bank')}
            className="bg-surface/60 backdrop-blur-sm border border-muted/30 p-6 rounded-2xl flex flex-col gap-4 group hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 text-left active:scale-[0.99] animate-fadeInUp delay-100"
          >
            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 group-hover:rotate-6 transition-transform duration-300">
              <ClipboardList size={22} />
            </div>
            <div>
              <h4 className="text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors">Question Bank</h4>
              <p className="text-[9px] font-medium text-text-muted uppercase tracking-wide mt-1">Topic-wise problems</p>
            </div>
          </button>

          <button
            onClick={() => handleItemClick('Previous Papers')}
            className="bg-surface/60 backdrop-blur-sm border border-muted/30 p-6 rounded-2xl flex flex-col gap-4 group hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 text-left active:scale-[0.99] animate-fadeInUp delay-200"
          >
            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 group-hover:rotate-6 transition-transform duration-300">
              <Files size={22} />
            </div>
            <div>
              <h4 className="text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors">Previous Papers</h4>
              <p className="text-[9px] font-medium text-text-muted uppercase tracking-wide mt-1">Last 10 Years PYQs</p>
            </div>
          </button>
        </div>
      </div>

      {/* Career & Growth */}
      <div className="space-y-8 mt-8">
        {/* Internships */}
        <div className="space-y-6 animate-fadeInUp delay-300">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 flex items-center gap-2">
            <Briefcase size={12} className="text-blue-400" />
            Internships
          </h3>
          <button
            onClick={() => handleItemClick('Vercel Internship')}
            className="w-full bg-surface/60 backdrop-blur-sm border border-muted/30 p-6 rounded-2xl flex flex-col gap-3 group hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 text-left relative overflow-hidden active:scale-[0.99]"
          >
            {/* Removed glow effect */}
            <div className="flex items-center justify-between w-full relative z-10">
              <span className="text-[9px] font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full uppercase border border-blue-400/20">Remote</span>
              <ExternalLink size={16} className="text-text-muted group-hover:text-accent-primary transition-colors" />
            </div>
            <h4 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors relative z-10">Frontend Intern at Vercel</h4>
            <p className="text-xs text-text-muted relative z-10">Apply by Jan 15 • 3 Months Duration</p>
          </button>
        </div>

        {/* Hackathons */}
        <div className="space-y-6 animate-fadeInUp delay-400">
          <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 flex items-center gap-2">
            <Trophy size={12} className="text-orange-400" />
            Hackathons
          </h3>
          <button
            onClick={() => handleItemClick('Google HashCode')}
            className="w-full bg-surface/60 backdrop-blur-sm border border-muted/30 p-6 rounded-2xl flex flex-col gap-3 group hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 text-left relative overflow-hidden active:scale-[0.99]"
          >
            {/* Removed glow effect */}
            <div className="flex items-center justify-between w-full relative z-10">
              <span className="text-[9px] font-bold text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full uppercase border border-orange-400/20">Global</span>
              <ExternalLink size={16} className="text-text-muted group-hover:text-accent-primary transition-colors" />
            </div>
            <h4 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors relative z-10">Google HashCode 2025</h4>
            <p className="text-xs text-text-muted relative z-10">Registration closing soon • Team Event</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderUpdates = () => (
    <div className="space-y-8 animate-fadeInUp">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setView('main')}
          className="w-12 h-12 rounded-xl bg-surface/60 backdrop-blur-sm border border-muted/30 flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-300 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-2xl font-display font-bold text-text-primary">Campus Updates</h1>
      </div>

      {/* Updates List */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2 flex items-center gap-2">
          <span className="w-1 h-1 bg-accent-primary rounded-full" />
          Recent News
        </h3>
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
              className="w-full bg-surface/60 backdrop-blur-sm border border-muted/30 p-5 rounded-xl flex items-center gap-4 hover:border-accent-primary/40 hover:shadow-lg hover:shadow-accent-primary/5 transition-all duration-300 text-left group animate-fadeInUp"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-2 h-2 bg-accent-primary rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" />
              <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">{news}</p>
              <ChevronRight size={16} className="ml-auto text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  const renderComingSoon = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setView('main')}
          className="w-12 h-12 rounded-xl bg-surface/60 backdrop-blur-sm border border-muted/30 flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-300 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-2xl font-display font-bold text-text-primary">{comingSoonSection}</h1>
      </div>

      {/* Coming Soon Message */}
      <div className="flex flex-col items-center justify-center py-20 animate-fadeInUp">
        <div className="w-24 h-24 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
          <Sparkles className="text-accent-primary" size={40} />
        </div>
        <h2 className="text-3xl font-display font-bold text-text-primary mb-3">Coming Soon</h2>
        <p className="text-text-muted text-center max-w-md">
          We're working hard to bring you {comingSoonSection} for {activeBranch} {activeYear} Year. Stay tuned!
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto pb-10">
      {view === 'main' && renderMain()}
      {view === 'updates' && renderUpdates()}
      {view === 'comingSoon' && renderComingSoon()}
    </div>
  );
};


export default Study;
