
import React, { useState } from 'react';
import {
  Heart,
  Bookmark,
  Award,
  Settings,
  User,
  Download,
  Edit3,
  Shield,
  LogOut,
  ChevronRight,
  Camera,
  Ghost,
  ChevronLeft,
  Mail,
  Lock,
  Moon,
  Globe,
  Smartphone,
  Database,
  AtSign,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react';
import { Post } from '../types';
import PostCard from '../components/PostCard';
import CountUp from '../components/CountUp';

interface ProfileProps {
  posts: Post[];
  onUpdatePost: (post: Post) => void;
}

type ProfileDetail = 'Posts' | 'Liked' | 'Saved' | 'Downloads' | 'Settings' | null;

const Profile: React.FC<ProfileProps> = ({ posts, onUpdatePost }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeDetail, setActiveDetail] = useState<ProfileDetail>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    username: 'Jade_Stalker_7',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=JadeStalker',
    bio: 'Just another ghost in the machine. 👻',
    level: 48,
    rank: 'Legendary Ghost'
  });

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsLoggedIn(true);
  };

  const handleUpdateProfile = (newUsername: string, newAvatar: string, newBio: string) => {
    setUserData(prev => ({
      ...prev,
      username: newUsername,
      avatar: newAvatar,
      bio: newBio
    }));
    setIsEditing(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-lg mx-auto py-12 px-6">
        {/* Animated intro */}
        <div className="text-center space-y-6 mb-12 animate-fadeInDown">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-3xl flex items-center justify-center text-primary-dark mb-4 shadow-xl transform transition-all duration-700 hover:scale-105 hover:rotate-3">
              <Shield size={40} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-text-primary mb-3">Welcome to MATTER</h1>
            <p className="text-base text-text-secondary max-w-sm mx-auto leading-relaxed">
              Your anonymous voice in the campus community
            </p>
          </div>
        </div>

        {/* Modern Animated Login Form */}
        <form onSubmit={handleLogin} className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {/* Floating Email Input */}
          <div className="relative group">
            <Mail
              className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted transition-all duration-300 group-focus-within:text-accent-primary group-focus-within:scale-110"
              size={20}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-surface/80 backdrop-blur-sm border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 text-base focus:outline-none focus:border-accent-primary focus:bg-surface transition-all duration-300 text-text-primary placeholder:text-text-muted transform hover:scale-[1.01]"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/0 via-accent-primary/5 to-accent-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Floating Password Input */}
          <div className="relative group">
            <Lock
              className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted transition-all duration-300 group-focus-within:text-accent-primary group-focus-within:scale-110"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full bg-surface/80 backdrop-blur-sm border-2 border-transparent rounded-2xl py-4 pl-14 pr-14 text-base focus:outline-none focus:border-accent-primary focus:bg-surface transition-all duration-300 text-text-primary placeholder:text-text-muted transform hover:scale-[1.01]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent-primary transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/0 via-accent-primary/5 to-accent-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Animated Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-accent-primary to-accent-secondary text-primary-dark py-5 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Enter Campus
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-4">
            <div className="w-full h-px bg-muted/30"></div>
            <span className="absolute px-4 bg-primary-dark text-xs font-bold text-text-muted uppercase tracking-wider">
              OR
            </span>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-4 bg-surface/80 backdrop-blur-sm border-2 border-muted/30 text-text-primary px-8 py-4 rounded-2xl font-semibold transition-all hover:border-accent-primary/50 hover:bg-surface active:scale-[0.98]"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Security Note */}
        <p className="text-xs text-text-muted font-medium uppercase tracking-wider text-center mt-8 opacity-60">
          Secured by MATTER Encryption
        </p>
      </div>
    );
  }

  if (isEditing) {
    return <EditProfileView
      currentUsername={userData.username}
      currentAvatar={userData.avatar}
      currentBio={userData.bio}
      onSave={handleUpdateProfile}
      onCancel={() => setIsEditing(false)}
    />;
  }

  if (activeDetail) {
    return (
      <DetailView
        title={activeDetail}
        onBack={() => setActiveDetail(null)}
        posts={posts}
        userData={userData}
        onUpdatePost={onUpdatePost}
      />
    );
  }

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsLoggedIn(false)}
          className="p-3 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          title="Log Out"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Profile Header - Animated Reveal */}
      <div className="flex flex-col items-center text-center space-y-6 animate-fadeInUp">
        <div className="relative group">
          {/* Avatar Container */}
          <div className="relative p-2 rounded-3xl border-2 border-accent-primary/40 transition-all duration-500 hover:border-accent-primary/70 hover:scale-105">
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-surface/60 backdrop-blur-sm relative shadow-lg">
              <img src={userData.avatar} alt="Profile Avatar" className="w-full h-full p-3" />
              {/* Level Badge */}
              <div className="absolute bottom-2 right-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-primary-dark text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                LVL {userData.level}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-3 animate-fadeInUp delay-100">
          <h1 className="text-3xl font-display font-bold text-text-primary">{userData.username}</h1>
          <p className="text-base text-text-secondary max-w-md">{userData.bio}</p>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-accent-primary uppercase tracking-wider bg-accent-primary/10 px-4 py-2 rounded-full border border-accent-primary/20">
            <Award size={14} />
            {userData.rank}
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-surface/70 backdrop-blur-sm border border-muted/40 px-6 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300"
        >
          <Edit3 size={16} />
          Edit Profile
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-5 animate-fadeInUp delay-200">
        <div className="bg-gradient-to-br from-orange-500/15 to-orange-500/5 border border-orange-500/30 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-orange-500/50">
          <div className="w-14 h-14 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase">Badges</p>
            <p className="text-xl font-bold text-text-primary">1% Elite</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/15 to-blue-500/5 border border-blue-500/30 p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-blue-500/50">
          <div className="w-14 h-14 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase">Streaks</p>
            <p className="text-xl font-bold text-text-primary">
              <CountUp end={14} suffix=" Days" className="" />
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-surface/70 backdrop-blur-sm border border-muted/40 rounded-2xl overflow-hidden p-2 space-y-2 animate-fadeInUp delay-300">
        {[
          { id: 'Posts', icon: <User size={20} />, color: 'text-accent-primary' },
          { id: 'Liked', icon: <Heart size={20} />, color: 'text-red-400' },
          { id: 'Saved', icon: <Bookmark size={20} />, color: 'text-blue-400' },
          { id: 'Downloads', icon: <Download size={20} />, color: 'text-purple-400' },
          { id: 'Settings', icon: <Settings size={20} />, color: 'text-text-muted' }
        ].map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveDetail(item.id as ProfileDetail)}
            className="w-full flex items-center justify-between p-5 rounded-xl hover:bg-surface-elevated/40 transition-all duration-200 group active:scale-[0.99]"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-surface-elevated/50 flex items-center justify-center ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                {item.icon}
              </div>
              <span className="text-sm font-bold uppercase tracking-wide text-text-secondary group-hover:text-text-primary transition-colors">{item.id}</span>
            </div>
            <ChevronRight className="text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all" size={20} />
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="pt-10 pb-6 border-t border-muted/20 space-y-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <button className="text-xs font-semibold text-text-muted hover:text-accent-primary uppercase tracking-wide transition-colors">About</button>
          <button className="text-xs font-semibold text-text-muted hover:text-accent-primary uppercase tracking-wide transition-colors">Privacy</button>
          <button className="text-xs font-semibold text-text-muted hover:text-accent-primary uppercase tracking-wide transition-colors">Support</button>
          <button className="text-xs font-semibold text-text-muted hover:text-accent-primary uppercase tracking-wide transition-colors">Guidelines</button>
        </div>
        <div className="text-center opacity-50">
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wider">© 2025 MATTER • ALL RIGHTS RESERVED • ENCRYPTED CAMPUS</p>
        </div>
      </footer>
    </div>
  );
};

// Sub-component for detailed views
const DetailView: React.FC<{
  title: ProfileDetail;
  onBack: () => void;
  posts: Post[];
  userData: any;
  onUpdatePost: (p: Post) => void;
}> = ({ title, onBack, posts, userData, onUpdatePost }) => {
  const filteredPosts = posts.filter(p => {
    if (title === 'Posts') return p.author === userData.username || p.author.includes('You');
    if (title === 'Liked') return p.liked;
    if (title === 'Saved') return p.saved;
    return false;
  });

  const renderContent = () => {
    if (title === 'Settings') {
      return (
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider px-2">Account Preferences</h3>
            <div className="bg-surface/70 backdrop-blur-sm border border-muted/40 rounded-2xl overflow-hidden divide-y divide-muted/30">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <AtSign className="text-text-muted" size={18} />
                  <div>
                    <p className="text-sm font-bold text-text-primary">Ghost Handle</p>
                    <p className="text-xs text-text-muted">Change your unique ID</p>
                  </div>
                </div>
                <button className="text-accent-primary font-bold text-xs hover:text-accent-secondary transition-colors">EDIT</button>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Mail className="text-text-muted" size={18} />
                  <div>
                    <p className="text-sm font-bold text-text-primary">Primary Email</p>
                    <p className="text-xs text-text-muted">Verified student email</p>
                  </div>
                </div>
                <span className="text-text-muted text-xs">edu.ghost@uni.ac</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider px-2">Interface & Safety</h3>
            <div className="bg-surface/70 backdrop-blur-sm border border-muted/40 rounded-2xl overflow-hidden divide-y divide-muted/30">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Moon className="text-text-muted" size={18} />
                  <p className="text-sm font-bold text-text-primary">Dark Mode</p>
                </div>
                <div className="w-14 h-7 bg-accent-primary rounded-full flex items-center justify-end px-1 cursor-pointer transition-all">
                  <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Globe className="text-text-muted" size={18} />
                  <p className="text-sm font-bold text-text-primary">Language</p>
                </div>
                <span className="text-text-muted text-xs">English (US)</span>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Shield className="text-text-muted" size={18} />
                  <p className="text-sm font-bold text-text-primary">Incognito Feed</p>
                </div>
                <div className="w-14 h-7 bg-muted/30 rounded-full flex items-center justify-start px-1 cursor-pointer transition-all">
                  <div className="w-5 h-5 bg-text-muted rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider px-2">System</h3>
            <div className="bg-surface/70 backdrop-blur-sm border border-muted/40 rounded-2xl overflow-hidden divide-y divide-muted/30">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Database className="text-text-muted" size={18} />
                  <p className="text-sm font-bold text-text-primary">Cache Data</p>
                </div>
                <button className="text-red-400 text-xs font-bold hover:text-red-300 transition-colors">CLEAR</button>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Smartphone className="text-text-muted" size={18} />
                  <p className="text-sm font-bold text-text-primary">App Version</p>
                </div>
                <span className="text-text-muted text-xs">2.5.0-Release</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (title === 'Downloads') {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-text-muted opacity-60 text-center">
          <Download size={48} className="mb-4" />
          <h4 className="text-lg font-bold">Nothing here yet</h4>
          <p className="text-xs uppercase tracking-wide mt-1">Download resources in Focus Mode to see them here.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((p, index) => (
            <div key={p.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 50}ms` }}>
              <PostCard post={p} onUpdate={onUpdatePost} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted opacity-60">
            <Ghost size={40} className="mb-3" />
            <p className="text-xs font-bold uppercase tracking-wide">Empty Archive</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fadeInUp">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-xl bg-surface/70 backdrop-blur-sm border border-muted/40 flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300 active:scale-95">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-2xl font-display font-bold text-text-primary">{title}</h1>
      </div>
      {renderContent()}
    </div>
  );
};

const EditProfileView: React.FC<{
  currentUsername: string;
  currentAvatar: string;
  currentBio: string;
  onSave: (u: string, a: string, b: string) => void;
  onCancel: () => void;
}> = ({ currentUsername, currentAvatar, currentBio, onSave, onCancel }) => {
  const [username, setUsername] = useState(currentUsername);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [bio, setBio] = useState(currentBio);

  const avatarSeeds = ['Jade', 'Ghost', 'Stalker', 'Phantom', 'Shadow', 'Wraith', 'Specter', 'Spooky'];
  const generatedAvatars = avatarSeeds.map(s => `https://api.dicebear.com/7.x/bottts/svg?seed=${s}`);

  return (
    <div className="space-y-8 animate-fadeInUp">
      <div className="flex items-center gap-4">
        <button onClick={onCancel} className="w-12 h-12 rounded-xl bg-surface/70 backdrop-blur-sm border border-muted/40 flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-accent-primary/50 transition-all duration-300 active:scale-95">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-2xl font-display font-bold text-text-primary">Update Profile</h1>
      </div>

      <div className="bg-surface/70 backdrop-blur-sm border border-muted/40 rounded-2xl p-8 space-y-8">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wide px-2 flex items-center gap-2">
            <Camera size={12} />
            Choose Avatar
          </h3>
          <div className="flex flex-wrap gap-4 justify-center py-4">
            {generatedAvatars.map((url, i) => (
              <button
                key={i}
                onClick={() => setAvatar(url)}
                className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all p-1.5 ${avatar === url ? 'bg-accent-primary border-2 border-accent-primary shadow-lg scale-110' : 'bg-surface-elevated/40 border border-transparent hover:scale-105'
                  }`}
              >
                <img src={url} className="w-full h-full" alt="avatar" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wide px-2">Ghost Alias</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-surface-elevated/50 border border-muted/40 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-accent-primary focus:shadow-lg transition-all text-text-primary"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wide px-2">Bio</h3>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-surface-elevated/50 border border-muted/40 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-accent-primary focus:shadow-lg transition-all text-text-primary h-24 resize-none"
          />
        </div>

        <button
          onClick={() => onSave(username, avatar, bio)}
          className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-primary-dark py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
