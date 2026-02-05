
import React, { useState } from 'react';
import { 
  ArrowBigUp, 
  ArrowBigDown, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  TrendingUp, 
  Bookmark,
  Flag,
  UserPlus,
  Send,
  Trash2,
  Reply,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';
import { Post, Comment } from '../types';

interface PostCardProps {
  post: Post;
  onUpdate: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isReporting, setIsReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<{ id: string; author: string } | null>(null);

  const reportReasons = [
    'Sexual content', 'Vulgar language', 'Violence', 'Harassment', 'Spam', 'Misinformation', 'Other'
  ];

  const handleVote = (val: number) => {
    let newPost = { ...post };
    if (val === 1) {
      if (post.liked) {
        newPost.liked = false;
        newPost.score -= 1;
      } else {
        if (post.disliked) {
          newPost.disliked = false;
          newPost.score += 1;
        }
        newPost.liked = true;
        newPost.score += 1;
      }
    } else {
      if (post.disliked) {
        newPost.disliked = false;
        newPost.score += 1;
      } else {
        if (post.liked) {
          newPost.liked = false;
          newPost.score -= 1;
        }
        newPost.disliked = true;
        newPost.score -= 1;
      }
    }
    onUpdate(newPost);
  };

  const handleCommentVote = (commentId: string, val: number, isReply: boolean = false, parentId?: string) => {
    let newComments = [...(post.comments || [])];
    const updateTarget = (list: Comment[]) => {
      return list.map(c => {
        if (c.id === commentId) {
          let updated = { ...c };
          if (val === 1) {
            if (updated.liked) { updated.liked = false; updated.likes -= 1; }
            else {
              if (updated.disliked) { updated.disliked = false; updated.dislikes -= 1; }
              updated.liked = true; updated.likes += 1;
            }
          } else {
            if (updated.disliked) { updated.disliked = false; updated.dislikes -= 1; }
            else {
              if (updated.liked) { updated.liked = false; updated.likes -= 1; }
              updated.disliked = true; updated.dislikes += 1;
            }
          }
          return updated;
        }
        if (c.replies) return { ...c, replies: updateTarget(c.replies) };
        return c;
      });
    };
    onUpdate({ ...post, comments: updateTarget(newComments) });
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You (Anon)',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=you',
      text: replyingTo ? `@${replyingTo.author} ${commentText}` : commentText,
      timestamp: 'Just now',
      likes: 0,
      dislikes: 0,
      replies: []
    };

    let newPost = { ...post };
    if (replyingTo) {
      newPost.comments = newPost.comments?.map(c => {
        if (c.id === replyingTo.id) {
          return { ...c, replies: [...(c.replies || []), newComment] };
        }
        return c;
      });
    } else {
      newPost.comments = [...(newPost.comments || []), newComment];
    }
    
    newPost.commentsCount = (newPost.commentsCount || 0) + 1;
    onUpdate(newPost);
    setCommentText('');
    setReplyingTo(null);
  };

  const handleDeleteComment = (commentId: string) => {
    const filterList = (list: Comment[]): Comment[] => {
      return list.filter(c => c.id !== commentId).map(c => ({
        ...c,
        replies: c.replies ? filterList(c.replies) : []
      }));
    };
    onUpdate({
      ...post,
      comments: filterList(post.comments || []),
      commentsCount: Math.max(0, post.commentsCount - 1)
    });
  };

  const renderComment = (c: Comment, isReply = false) => (
    <div key={c.id} className={`flex gap-3 group/comment relative ${isReply ? 'ml-8 mt-4' : ''}`}>
      <img src={c.avatar} className="w-8 h-8 rounded-xl bg-jade-900/10 mt-1" alt={c.author} />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-off-white">{c.author}</span>
            <span className="text-[9px] font-bold text-gray-700 uppercase">{c.timestamp}</span>
          </div>
          {c.author.includes('You') && (
            <button 
              onClick={() => handleDeleteComment(c.id)}
              className="opacity-0 group-hover/comment:opacity-100 text-gray-700 hover:text-red-500 transition-all p-1"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 leading-relaxed mb-2">{c.text}</p>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleCommentVote(c.id, 1)}
              className={`transition-colors ${c.liked ? 'text-jade-500' : 'text-gray-600 hover:text-jade-500'}`}
            >
              <ArrowBigUp size={16} fill={c.liked ? 'currentColor' : 'none'} />
            </button>
            <span className={`text-[10px] font-bold ${c.liked ? 'text-jade-500' : c.disliked ? 'text-red-400' : 'text-gray-700'}`}>
              {c.likes - c.dislikes}
            </span>
            <button 
              onClick={() => handleCommentVote(c.id, -1)}
              className={`transition-colors ${c.disliked ? 'text-red-400' : 'text-gray-600 hover:text-red-400'}`}
            >
              <ArrowBigDown size={16} fill={c.disliked ? 'currentColor' : 'none'} />
            </button>
          </div>
          {!isReply && (
            <button 
              onClick={() => setReplyingTo({ id: c.id, author: c.author })}
              className="flex items-center gap-1.5 text-gray-600 hover:text-jade-500 transition-colors"
            >
              <Reply size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Reply</span>
            </button>
          )}
        </div>
        
        {c.replies?.map(r => renderComment(r, true))}
      </div>
    </div>
  );

  return (
    <article className="bg-surface border border-white/5 rounded-[2rem] p-5 mb-6 hover:border-jade-900/30 transition-all duration-300 group relative">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={post.avatar} className="w-10 h-10 rounded-2xl bg-jade-900/10" alt={post.author} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-off-white">{post.author}</span>
              {post.isTrending && (
                <span className="flex items-center gap-1 bg-jade-900/10 text-jade-500 text-[9px] font-bold px-2 py-0.5 rounded-full">
                  <TrendingUp size={10} />
                  Trending
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase">
              <span>{post.timestamp}</span> • <span>{post.type}</span>
            </div>
          </div>
        </div>
        {/* Post Menu */}
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-gray-600 p-1 hover:text-gray-400">
            <MoreHorizontal size={20} />
          </button>
          {showMenu && !isReporting && (
            <div className="absolute right-0 mt-2 w-48 bg-surface border border-white/10 rounded-2xl shadow-2xl py-2 z-20">
              <button onClick={() => setIsReporting(true)} className="w-full flex items-center gap-3 px-4 py-3 text-xs text-gray-400 hover:text-red-400 hover:bg-white/5">
                <Flag size={14} /> Report post
              </button>
              <button onClick={() => setShowMenu(false)} className="w-full flex items-center gap-3 px-4 py-3 text-xs text-gray-400 hover:text-jade-400 hover:bg-white/5">
                <UserPlus size={14} /> Follow account
              </button>
            </div>
          )}
          {/* Report Flow (same as before) */}
          {isReporting && (
            <div className="fixed inset-0 lg:absolute lg:inset-auto lg:right-0 lg:mt-2 w-full lg:w-64 bg-background lg:bg-surface border border-white/10 rounded-none lg:rounded-2xl shadow-2xl p-4 z-50">
               <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                  <button onClick={() => setIsReporting(false)} className="text-gray-500"><ChevronLeft size={18} /></button>
                  <h4 className="text-xs font-bold uppercase text-off-white">Report Reason</h4>
                </div>
                <div className="space-y-1">
                  {reportReasons.map(r => (
                    <button key={r} onClick={() => setSelectedReason(r)} className={`w-full text-left px-3 py-2 text-xs rounded-xl ${selectedReason === r ? 'bg-jade-600/20 text-jade-400' : 'text-gray-400 hover:bg-white/5'}`}>{r}</button>
                  ))}
                </div>
                <button 
                  disabled={!selectedReason}
                  onClick={() => { setReportSuccess(true); setTimeout(() => { setIsReporting(false); setReportSuccess(false); setShowMenu(false); }, 1500); }}
                  className={`w-full mt-4 py-3 rounded-xl text-xs font-bold uppercase transition-all ${selectedReason ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-700'}`}
                >
                  {reportSuccess ? 'Submitted' : 'Submit Report'}
                </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-[15px] leading-relaxed text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>
      {post.mediaUrl && (
        <div className={`rounded-3xl overflow-hidden mb-5 border border-white/5 ${post.type === 'sticker' ? 'max-w-[120px] mx-auto border-none shadow-none' : 'shadow-2xl shadow-black/40'}`}>
          <img src={post.mediaUrl} className="w-full h-auto object-cover max-h-[500px]" alt="" />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 rounded-full p-1 gap-1">
            <button onClick={() => handleVote(1)} className={`p-1 ${post.liked ? 'text-jade-500' : 'text-gray-500 hover:text-jade-400'}`}>
              <ArrowBigUp size={22} fill={post.liked ? 'currentColor' : 'none'} />
            </button>
            <span className={`text-xs font-bold ${post.liked ? 'text-jade-500' : post.disliked ? 'text-red-400' : 'text-gray-400'}`}>{post.score}</span>
            <button onClick={() => handleVote(-1)} className={`p-1 ${post.disliked ? 'text-red-400' : 'text-gray-500 hover:text-red-300'}`}>
              <ArrowBigDown size={22} fill={post.disliked ? 'currentColor' : 'none'} />
            </button>
          </div>
          <button onClick={() => setShowComments(!showComments)} className={`flex items-center gap-2 ${showComments ? 'text-jade-500' : 'text-gray-500 hover:text-jade-400'}`}>
            <MessageCircle size={18} /> <span className="text-xs font-bold">{post.commentsCount}</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onUpdate({ ...post, saved: !post.saved })} className={`${post.saved ? 'text-jade-500' : 'text-gray-500 hover:text-jade-400'}`}>
            <Bookmark size={18} fill={post.saved ? 'currentColor' : 'none'} />
          </button>
          <button className="text-gray-500 hover:text-jade-400"><Share2 size={18} /></button>
        </div>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-5 pt-5 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-6 mb-6">
            {post.comments?.map(c => renderComment(c))}
          </div>
          <div className="relative">
            {replyingTo && (
              <div className="flex items-center justify-between bg-jade-900/10 px-4 py-1 rounded-t-xl text-[10px] font-bold text-jade-400">
                Replying to @{replyingTo.author}
                <button onClick={() => setReplyingTo(null)} className="text-gray-500">✕</button>
              </div>
            )}
            <input 
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
              className={`w-full bg-white/5 border border-white/5 py-3.5 pl-4 pr-12 text-xs focus:outline-none focus:border-jade-900/40 transition-all placeholder:text-gray-700 ${replyingTo ? 'rounded-b-2xl' : 'rounded-2xl'}`}
            />
            <button onClick={handleAddComment} className="absolute right-3 bottom-2 text-jade-500 hover:text-jade-400 p-1">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default PostCard;
