
import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  Send,
  Image as ImageIcon,
  Video,
  Smile,
  Hash,
  ShieldCheck,
  Paperclip,
  Play,
  Layers,
  Sparkles,
  X
} from 'lucide-react';

interface CreatePostProps {
  onBack: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onBack }) => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<{ name: string, type: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentAccept, setCurrentAccept] = useState('');

  const availableTags = ['Meme', 'Gossip', 'Confession', 'Exam', 'Campus', 'Hot', 'Anonymous'];

  const handleTriggerFile = (accept: string) => {
    setCurrentAccept(accept);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(f => ({ name: f.name, type: f.type }));
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePost = () => {
    const hasMedia = attachments.length > 0;
    const postData = {
      content,
      attachments,
      tags: selectedTags,
      hasMedia,
      // Visibility logic:
      // Text-only posts (hasMedia: false) → Home only
      // Posts with media (hasMedia: true) → Home + Funs + tagged categories
      visibleIn: hasMedia ? ['home', 'funs'] : ['home']
    };

    console.log('Creating post:', postData);
    console.log('Visibility:', hasMedia ? 'Home + Funs' : 'Home only');

    // Here you would actually create the post
    // For now, just log and go back
    onBack();
  };

  const attachmentOptions = [
    { id: 'image', label: 'Photo', icon: <ImageIcon size={20} />, color: 'text-blue-400', accept: 'image/*' },
    { id: 'video', label: 'Video', icon: <Play size={20} />, color: 'text-purple-400', accept: 'video/*' },
    { id: 'gif', label: 'GIF', icon: <Layers size={20} />, color: 'text-yellow-400', accept: 'image/gif' },
    { id: 'sticker', label: 'Sticker', icon: <Smile size={20} />, color: 'text-pink-400', accept: 'image/png,image/webp' },
  ];

  const charCount = content.length;
  const maxChars = 500;
  const charPercentage = (charCount / maxChars) * 100;

  return (
    <div className="space-y-6 animate-fadeIn">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={currentAccept}
        onChange={handleFileChange}
        multiple
      />

      {/* Header */}
      <div className="flex items-center justify-between animate-fadeInDown">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-xl bg-surface/60 backdrop-blur-sm border border-muted/30 flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-300 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-xl font-display font-bold text-text-primary">Create Post</h1>
        <button
          onClick={handlePost}
          disabled={!content.trim() && attachments.length === 0}
          className={`px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300 active:scale-95 ${(content.trim() || attachments.length > 0)
            ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-primary-dark shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40'
            : 'bg-surface/40 border border-muted/30 text-text-muted cursor-not-allowed'
            }`}
        >
          POST
          <Send size={16} />
        </button>
      </div>

      {/* Main Form */}
      <div className="bg-surface/60 backdrop-blur-sm border border-muted/30 rounded-2xl p-6 space-y-6 relative overflow-hidden shadow-xl hover:border-accent-primary/30 transition-all duration-300 animate-fadeInUp delay-100">
        {/* Content Input */}
        <div className="relative z-10">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's the tea? No one will know it's you..."
            maxLength={maxChars}
            className="w-full h-48 bg-transparent resize-none text-lg font-medium focus:outline-none placeholder:text-text-muted text-text-primary"
          />

          {/* Character Counter */}
          {content.length > 0 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <div className="relative w-10 h-10">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-surface-elevated" />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${2 * Math.PI * 18}`}
                    strokeDashoffset={`${2 * Math.PI * 18 * (1 - charPercentage / 100)}`}
                    className={`transition-all duration-300 ${charPercentage > 90 ? 'text-red-400' : 'text-accent-primary'}`}
                  />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${charPercentage > 90 ? 'text-red-400' : 'text-accent-primary'}`}>
                  {maxChars - charCount}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Tag Selection */}
        <div className="border-t border-muted/20 pt-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Hash size={14} className="text-text-muted" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Select Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-primary-dark border-2 border-accent-primary shadow-lg shadow-accent-primary/20'
                    : 'bg-surface-elevated/40 border border-muted/20 text-text-muted hover:text-text-primary hover:border-accent-primary/30'
                  }`}
              >
                #{tag}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <div className="mt-3 text-xs text-text-muted">
              <span className="font-bold">Selected: </span>
              {selectedTags.join(', ')}
            </div>
          )}
        </div>

        {/* Attachments Section */}
        <div className="border-t border-muted/20 pt-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Paperclip size={14} className="text-text-muted" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Add Media</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {attachmentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleTriggerFile(opt.accept)}
                className="flex items-center gap-2.5 px-4 py-3 bg-surface-elevated/40 backdrop-blur-sm border border-muted/20 rounded-xl hover:bg-surface-elevated/60 hover:border-accent-primary/30 transition-all duration-200 group"
              >
                <span className={`${opt.color} group-hover:scale-110 transition-transform`}>{opt.icon}</span>
                <span className="text-xs font-bold text-text-secondary group-hover:text-text-primary transition-colors">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Attachment List */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {attachments.map((at, i) => (
                <div key={i} className="px-3 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-lg text-[10px] font-bold text-accent-primary uppercase flex items-center gap-2 animate-scaleIn">
                  <span className="truncate max-w-[120px]">{at.name}</span>
                  <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visibility Info */}
        <div className="flex items-center gap-3 relative z-10 pt-4 border-t border-muted/20">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-accent-primary/10 border border-accent-primary/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-accent-primary">
            <ShieldCheck size={14} />
            Metadata Clean
          </div>
          {attachments.length > 0 && (
            <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-400 animate-fadeIn">
              <Sparkles size={14} />
              Will appear in Funs
            </div>
          )}
        </div>
      </div>

      {/* Privacy Info */}
      <div className="bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 rounded-2xl p-6 flex items-center gap-6 group hover:border-accent-primary/40 transition-all duration-300 animate-fadeInUp delay-200">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-primary-dark flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-accent-primary/20">
          <ShieldCheck size={32} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-text-primary">Anonymous Post Shield</h3>
            <Sparkles className="text-accent-primary animate-pulse" size={16} />
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Your location, IP, and device info are stripped before your post reaches the feed. Stay anonymous, stay safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
