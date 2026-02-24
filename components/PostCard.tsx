
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
  ChevronLeft,
  Flame
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

  const handleCommentVote = (commentId: string, val: number) => {
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
    <div key={c.id} className={`flex gap-3 group/comment relative animate-fadeInUp ${isReply ? 'ml-8 mt-4' : ''}`}>
      <div className="relative">
        <img src={c.avatar} className="w-9 h-9 rounded-xl bg-surface/60 border border-muted/30" alt={c.author} />
        <div className="absolute -inset-0.5 rounded-xl bg-accent-primary/20 blur opacity-0 group-hover/comment:opacity-100 transition-opacity duration-300 -z-10" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-primary">{c.author}</span>
            <span className="text-[9px] font-medium text-text-muted uppercase tracking-wide">{c.timestamp}</span>
          </div>
          {c.author.includes('You') && (
            <button
              onClick={() => handleDeleteComment(c.id)}
              className="opacity-0 group-hover/comment:opacity-100 text-text-muted hover:text-red-400 transition-all p-1.5 hover:bg-surface/50 rounded-lg"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
        <p className="text-[13px] text-text-secondary leading-relaxed mb-2.5">{c.text}</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-surface/40 rounded-full px-2 py-1">
            <button
              onClick={() => handleCommentVote(c.id, 1)}
              className={`transition-all duration-200 ${c.liked ? 'text-accent-primary scale-110' : 'text-text-muted hover:text-accent-primary'}`}
            >
              <ArrowBigUp size={15} fill={c.liked ? 'currentColor' : 'none'} />
            </button>
            <span className={`text-[11px] font-bold min-w-[20px] text-center ${c.liked ? 'text-accent-primary' : c.disliked ? 'text-red-400' : 'text-text-muted'}`}>
              {c.likes - c.dislikes}
            </span>
            <button
              onClick={() => handleCommentVote(c.id, -1)}
              className={`transition-all duration-200 ${c.disliked ? 'text-red-400 scale-110' : 'text-text-muted hover:text-red-400'}`}
            >
              <ArrowBigDown size={15} fill={c.disliked ? 'currentColor' : 'none'} />
            </button>
          </div>
          {!isReply && (
            <button
              onClick={() => setReplyingTo({ id: c.id, author: c.author })}
              className="flex items-center gap-1.5 text-text-muted hover:text-accent-primary transition-colors px-2 py-1 hover:bg-surface/40 rounded-full"
            >
              <Reply size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Reply</span>
            </button>
          )}
        </div>

        {c.replies?.map(r => renderComment(r, true))}
      </div>
    </div>
  );

  return (
    <article className="group/card bg-surface border border-muted/30 rounded-2xl p-6 mb-5 relative overflow-hidden transition-all duration-300 hover:border-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/5 hover:-translate-y-1 animate-fadeInUp">
      {/* Subtle Background Glow */}
      {/* Removed glow effect */}

      {/* Post Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={post.avatar} className="w-11 h-11 rounded-xl bg-surface-elevated border border-muted/40" alt={post.author} />
            {post.isTrending && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-primary rounded-full flex items-center justify-center animate-pulse">
                <Flame size={12} className="text-primary-dark" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-text-primary">{post.author}</span>
              {post.isTrending && (
                <span className="flex items-center gap-1 bg-accent-primary/10 text-accent-primary text-[9px] font-bold px-2 py-0.5 rounded-full border border-accent-primary/20">
                  <TrendingUp size={9} />
                  Trending
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium text-text-muted uppercase tracking-wide">
              <span>{post.timestamp}</span> <span>•</span> <span>{post.type}</span>
            </div>
          </div>
        </div>

        {/* Post Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-text-muted hover:text-text-primary p-2 hover:bg-surface-elevated rounded-lg transition-all"
          >
            <MoreHorizontal size={18} />
          </button>
          {showMenu && !isReporting && (
            <div className="absolute right-0 mt-2 w-52 bg-surface-elevated/95 backdrop-blur-sm border border-muted/30 rounded-xl shadow-xl py-2 z-20 animate-fadeInDown">
              <button
                onClick={() => setIsReporting(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-text-secondary hover:text-red-400 hover:bg-muted/10 transition-all"
              >
                <Flag size={14} /> Report post
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-text-secondary hover:text-accent-primary hover:bg-muted/10 transition-all"
              >
                <UserPlus size={14} /> Follow account
              </button>
            </div>
          )}
          {isReporting && (
            <div className="fixed inset-0 lg:absolute lg:inset-auto lg:right-0 lg:mt-2 w-full lg:w-64 bg-primary-dark lg:bg-surface-elevated/95 lg:backdrop-blur-sm border border-muted/30 rounded-none lg:rounded-xl shadow-xl p-5 z-50 animate-scaleIn">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-muted/30">
                <button onClick={() => setIsReporting(false)} className="text-text-muted hover:text-text-primary transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <h4 className="text-xs font-bold uppercase text-text-primary tracking-wider">Report Reason</h4>
              </div>
              <div className="space-y-1.5 mb-4">
                {reportReasons.map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedReason(r)}
                    className={`w-full text-left px-3 py-2.5 text-xs rounded-lg transition-all duration-200 ${selectedReason === r
                      ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                      : 'text-text-secondary hover:bg-surface/50 border border-transparent'
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button
                disabled={!selectedReason}
                onClick={() => {
                  setReportSuccess(true);
                  setTimeout(() => {
                    setIsReporting(false);
                    setReportSuccess(false);
                    setShowMenu(false);
                  }, 1500);
                }}
                className={`w-full py-3 rounded-lg text-xs font-bold uppercase transition-all duration-300 ${selectedReason
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                  : 'bg-muted/20 text-text-muted cursor-not-allowed'
                  }`}
              >
                {reportSuccess ? <div className="flex items-center justify-center gap-2"><CheckCircle2 size={16} /> Submitted</div> : 'Submit Report'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <p className="text-[15px] leading-relaxed text-text-secondary mb-4 whitespace-pre-wrap relative z-10">{post.content}</p>

      {/* Post Media */}
      {post.mediaUrl && (
        <div className={`rounded-xl overflow-hidden mb-5 border border-muted/20 relative z-10 ${post.type === 'sticker' ? 'max-w-[140px] mx-auto border-none' : 'shadow-xl shadow-black/40'
          }`}>
          <img src={post.mediaUrl} className="w-full h-auto object-cover max-h-[500px]" alt="" loading="lazy" />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-muted/20 relative z-10">
        <div className="flex items-center gap-3">
          {/* Vote Buttons */}
          <div className="flex items-center bg-surface-elevated/60 rounded-full px-2 py-1.5 gap-1.5">
            <button
              onClick={() => handleVote(1)}
              className={`p-1.5 transition-all duration-200 ${post.liked ? 'text-accent-primary scale-110' : 'text-text-muted hover:text-accent-primary hover:scale-110'
                }`}
            >
              <ArrowBigUp size={20} fill={post.liked ? 'currentColor' : 'none'} />
            </button>
            <span className={`text-xs font-bold min-w-[28px] text-center ${post.liked ? 'text-accent-primary' : post.disliked ? 'text-red-400' : 'text-text-secondary'
              }`}>
              {post.score}
            </span>
            <button
              onClick={() => handleVote(-1)}
              className={`p-1.5 transition-all duration-200 ${post.disliked ? 'text-red-400 scale-110' : 'text-text-muted hover:text-red-400 hover:scale-110'
                }`}
            >
              <ArrowBigDown size={20} fill={post.disliked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Comments */}
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${showComments
              ? 'text-accent-primary bg-accent-primary/10'
              : 'text-text-muted hover:text-accent-primary hover:bg-surface-elevated/60'
              }`}
          >
            <MessageCircle size={17} />
            <span className="text-xs font-bold">{post.commentsCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <button
            onClick={() => onUpdate({ ...post, saved: !post.saved })}
            className={`p-2 rounded-full transition-all duration-200 ${post.saved
              ? 'text-accent-primary bg-accent-primary/10'
              : 'text-text-muted hover:text-accent-primary hover:bg-surface-elevated/60'
              }`}
          >
            <Bookmark size={17} fill={post.saved ? 'currentColor' : 'none'} />
          </button>

          {/* Share */}
          <button className="p-2 rounded-full text-text-muted hover:text-accent-primary hover:bg-surface-elevated/60 transition-all duration-200">
            <Share2 size={17} />
          </button>
        </div>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-5 pt-5 border-t border-muted/20 animate-fadeInUp relative z-10">
          <div className="space-y-5 mb-6">
            {post.comments?.map(c => renderComment(c))}
            {(!post.comments || post.comments.length === 0) && (
              <p className="text-center text-text-muted text-sm py-8">No comments yet. Be the first to comment!</p>
            )}
          </div>

          {/* Comment Input */}
          <div className="relative">
            {replyingTo && (
              <div className="flex items-center justify-between bg-accent-primary/10 px-4 py-2 rounded-t-xl text-[11px] font-bold text-accent-primary border border-accent-primary/20 border-b-0">
                <span>Replying to @{replyingTo.author}</span>
                <button onClick={() => setReplyingTo(null)} className="text-text-muted hover:text-text-primary">✕</button>
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
                className={`w-full bg-surface-elevated/60 border border-muted/30 py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:border-accent-primary/50 focus:shadow-lg focus:shadow-accent-primary/10 transition-all placeholder:text-text-muted ${replyingTo ? 'rounded-b-xl rounded-t-none' : 'rounded-xl'
                  }`}
              />
              <button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${commentText.trim()
                  ? 'text-accent-primary hover:bg-accent-primary/10'
                  : 'text-text-muted/50 cursor-not-allowed'
                  }`}
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default PostCard;
