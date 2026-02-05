
import React, { useState, useEffect } from 'react';
import { Section, Post } from './types';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import TrendingSidebar from './components/TrendingSidebar';
import HomeView from './views/Home';
import FunsView from './views/Funs';
import StudyView from './views/Study';
import AlertsView from './views/Alerts';
import ProfileView from './views/Profile';
import CreatePostView from './views/CreatePost';
import { MOCK_POSTS, MOCK_FUNS_POSTS } from './constants';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isMobile, setIsMobile] = useState(false);
  
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS.map(p => ({
    ...p,
    comments: [
      { 
        id: 'c1', 
        author: 'Anon_User', 
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=anon1', 
        text: 'This is actually so true lol.', 
        timestamp: '1h ago',
        likes: 12,
        dislikes: 1,
        replies: [
          {
            id: 'r1',
            author: 'Ghost_99',
            avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ghost99',
            text: 'I know right? Happens every time.',
            timestamp: '30m ago',
            likes: 4,
            dislikes: 0
          }
        ]
      }
    ]
  })));

  const [funsPosts, setFunsPosts] = useState<Post[]>(MOCK_FUNS_POSTS.map(p => ({
    ...p,
    comments: []
  })));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
    setFunsPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const renderContent = () => {
    const combinedPosts = [...posts, ...funsPosts];
    switch (currentSection) {
      case 'home': return <HomeView posts={posts} onUpdatePost={handleUpdatePost} onPostPrompt={() => setCurrentSection('create')} onNavigate={setCurrentSection} />;
      case 'funs': return <FunsView posts={funsPosts} onUpdatePost={handleUpdatePost} />;
      case 'study': return <StudyView />;
      case 'alerts': return <AlertsView />;
      case 'profile': return <ProfileView posts={combinedPosts} onUpdatePost={handleUpdatePost} />;
      case 'create': return <CreatePostView onBack={() => setCurrentSection('home')} />;
      default: return <HomeView posts={posts} onUpdatePost={handleUpdatePost} onPostPrompt={() => setCurrentSection('create')} onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-off-white flex flex-col lg:flex-row">
      {!isMobile && (
        <div className="w-72 fixed h-screen left-0 top-0 border-r border-jade-900/10 z-50">
          <Sidebar 
            activeSection={currentSection} 
            onNavigate={setCurrentSection} 
          />
        </div>
      )}

      <main className={`flex-1 overflow-y-auto pb-24 lg:pb-0 ${!isMobile ? 'lg:ml-72 lg:mr-[320px]' : ''}`}>
        <div className="max-w-2xl mx-auto w-full px-4 lg:px-6 py-6 lg:py-10">
          {renderContent()}
        </div>
      </main>

      {!isMobile && currentSection !== 'create' && currentSection !== 'profile' && (
        <div className="w-[320px] fixed h-screen right-0 top-0 border-l border-jade-900/10 p-6 z-40 overflow-y-auto">
          <TrendingSidebar />
        </div>
      )}

      {isMobile && <BottomNav activeSection={currentSection} onNavigate={setCurrentSection} />}
    </div>
  );
};

export default App;
