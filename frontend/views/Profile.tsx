
import React, { useState } from 'react';
import { 
  Heart, 
  ArrowBigDown, 
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
  Info,
  LifeBuoy,
  ChevronLeft,
  Check,
  Bell,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Globe,
  Smartphone,
  Database,
  AtSign
} from 'lucide-react';
import { Post } from '../types';
import PostCard from '../components/PostCard';

interface ProfileProps {
  posts: Post[];
  onUpdatePost: (post: Post) => void;
}

type ProfileDetail = 'Posts' | 'Liked' | 'Saved' | 'Downloads' | 'Settings' | null;

const Profile: React.FC<ProfileProps> = ({ posts, onUpdatePost }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeDetail, setActiveDetail] = useState<ProfileDetail>(null);
  
  const [userData, setUserData] = useState({
    username: 'Jade_Stalker_7',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=JadeStalker',
    bio: 'Just another ghost in the machine. 👻',
    level: 48,
    rank: 'Legendary Ghost'
  });

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
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
      <div className="max-w-md mx-auto py-10 space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-jade-600/20 rounded-[2rem] flex items-center justify-center text-jade-500 mb-2">
            <Shield size={40} />
          </div>
          <h1 className="text-3xl font-bold">Join the Shadows</h1>
          <p className="text-sm text-gray-500 max-w-xs">Log in to track stats and stay anonymous.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-jade-500 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="ghost@college.edu"
                className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-jade-900/40 transition-all text-off-white"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-jade-500 transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-jade-900/40 transition-all text-off-white"
                required
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full bg-jade-600 hover:bg-jade-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-jade-900/20 transition-all active:scale-95"
          >
            Login to Feed
          </button>
        </form>

        <div className="relative flex items-center justify-center py-2">
          <div className="w-full h-px bg-white/5"></div>
          <span className="absolute px-4 bg-background text-[10px] font-bold text-gray-700 uppercase">OR</span>
        </div>
        
        <button 
          onClick={() => handleLogin()}
          className="w-full flex items-center justify-center gap-4 bg-surface border border-white/5 text-off-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-white/5 active:scale-95"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Login with Google
        </button>
        
        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest text-center">Secured by KIET.Matters Encryption</p>
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
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-end">
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="p-2 text-gray-600 hover:text-red-400 transition-colors"
          title="Log Out"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <div className="absolute -inset-2 bg-jade-600/20 rounded-[3rem] blur-2xl animate-pulse" />
          <div className="relative p-1.5 rounded-[3rem] border-2 border-jade-600 transition-transform duration-1000 ease-in-out hover:scale-105">
            <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden bg-jade-900/20 relative">
              <img src={userData.avatar} alt="Profile Avatar" className="w-full h-full p-2" />
              <div className="absolute bottom-1 right-1 bg-jade-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">LVL {userData.level}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{userData.username}</h1>
          <p className="text-[9px] font-bold text-jade-500 uppercase tracking-widest flex items-center justify-center gap-2">
            <Award size={10} /> {userData.rank}
          </p>
        </div>

        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-jade-400 transition-all"
        >
          <Edit3 size={14} /> Update Profile
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Achievements</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface border border-white/5 p-5 rounded-3xl flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Award size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase">Badges</p>
              <p className="text-sm font-bold">1% Elite</p>
            </div>
          </div>
          <div className="bg-surface border border-white/5 p-5 rounded-3xl flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Ghost size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase">Streaks</p>
              <p className="text-sm font-bold">14 Days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-white/5 rounded-[2.5rem] overflow-hidden p-2 space-y-1">
        {[
          { id: 'Posts', icon: <User size={20} />, color: 'text-jade-500' },
          { id: 'Liked', icon: <Heart size={20} />, color: 'text-red-500' },
          { id: 'Saved', icon: <Bookmark size={20} />, color: 'text-blue-500' },
          { id: 'Downloads', icon: <Download size={20} />, color: 'text-purple-500' },
          { id: 'Settings', icon: <Settings size={20} />, color: 'text-gray-500' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveDetail(item.id as ProfileDetail)}
            className="w-full flex items-center justify-between p-5 rounded-[1.75rem] hover:bg-white/5 transition-all group active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-off-white">{item.id}</span>
            </div>
            <ChevronRight className="text-gray-800 group-hover:text-jade-500 transition-colors" size={20} />
          </button>
        ))}
      </div>

      <footer className="pt-10 pb-6 border-t border-white/5 space-y-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <button className="text-[10px] font-bold text-gray-600 hover:text-jade-500 uppercase tracking-widest">About Us</button>
          <button className="text-[10px] font-bold text-gray-600 hover:text-jade-500 uppercase tracking-widest">Privacy</button>
          <button className="text-[10px] font-bold text-gray-600 hover:text-jade-500 uppercase tracking-widest">Support</button>
          <button className="text-[10px] font-bold text-gray-600 hover:text-jade-500 uppercase tracking-widest">Guidelines</button>
        </div>
        <div className="text-center space-y-2 opacity-40">
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">© 2025 KIET.MATTERS • ALL RIGHTS RESERVED • ENCRYPTED CAMPUS</p>
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
            <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Account Preferences</h3>
            <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <AtSign className="text-gray-600" size={18} />
                  <div>
                    <p className="text-sm font-bold">Ghost Handle</p>
                    <p className="text-[10px] text-gray-600 uppercase">Change your unique ID</p>
                  </div>
                </div>
                <button className="text-jade-500 font-bold text-xs">EDIT</button>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Mail className="text-gray-600" size={18} />
                  <div>
                    <p className="text-sm font-bold">Primary Email</p>
                    <p className="text-[10px] text-gray-600 uppercase">Verified student email</p>
                  </div>
                </div>
                <span className="text-gray-700 text-xs">edu.ghost@uni.ac</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Interface & Safety</h3>
            <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Moon className="text-gray-600" size={18} />
                  <p className="text-sm font-bold">Dark Mode</p>
                </div>
                <div className="w-12 h-6 bg-jade-600 rounded-full flex items-center justify-end px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Globe className="text-gray-600" size={18} />
                  <p className="text-sm font-bold">Language</p>
                </div>
                <span className="text-gray-700 text-xs">English (US)</span>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Shield className="text-gray-600" size={18} />
                  <p className="text-sm font-bold">Incognito Feed</p>
                </div>
                <div className="w-12 h-6 bg-white/10 rounded-full flex items-center justify-start px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">System</h3>
            <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Database className="text-gray-600" size={18} />
                  <p className="text-sm font-bold">Cache Data</p>
                </div>
                <button className="text-red-400 text-xs font-bold">CLEAR</button>
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <Smartphone className="text-gray-600" size={18} />
                  <p className="text-sm font-bold">App Version</p>
                </div>
                <span className="text-gray-800 text-xs">2.5.0-Release</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (title === 'Downloads') {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-700 opacity-50 text-center">
          <Download size={48} className="mb-4" />
          <h4 className="text-lg font-bold">Nothing here yet</h4>
          <p className="text-xs uppercase tracking-widest mt-1">Download resources in Focus Mode to see them here.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(p => <PostCard key={p.id} post={p} onUpdate={onUpdatePost} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-700 opacity-50">
            <Ghost size={40} className="mb-3" />
            <p className="text-xs font-bold uppercase tracking-widest">Empty Archive</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-jade-500 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
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
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <button onClick={onCancel} className="w-12 h-12 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-gray-400 hover:text-jade-500 transition-all">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Update Profile</h1>
      </div>

      <div className="bg-surface border border-white/5 rounded-[2.5rem] p-8 space-y-8">
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2 flex items-center gap-2">
            <Camera size={12} /> Choose Avatar
          </h3>
          <div className="flex flex-wrap gap-4 justify-center py-4">
            {generatedAvatars.map((url, i) => (
              <button 
                key={i}
                onClick={() => setAvatar(url)}
                className={`relative w-16 h-16 rounded-2xl overflow-hidden transition-all p-1 ${
                  avatar === url ? 'bg-jade-500 shadow-lg scale-110' : 'bg-white/5'
                }`}
              >
                <img src={url} className="w-full h-full" alt="avatar" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Ghost Alias</h3>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-jade-900/40 transition-all text-off-white"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-700 uppercase tracking-widest px-2">Bio</h3>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-jade-900/40 transition-all text-off-white h-24 resize-none"
          />
        </div>

        <button 
          onClick={() => onSave(username, avatar, bio)}
          className="w-full bg-jade-600 hover:bg-jade-700 text-white py-4 rounded-2xl font-bold transition-all active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
