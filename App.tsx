
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
import LiveChatView from './views/LiveChat';
import OpeningScreen from './components/OpeningScreen';
import ClickSpark from './components/ClickSpark';
import { MOCK_POSTS, MOCK_FUNS_POSTS } from './constants';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOpening, setShowOpening] = useState(true);

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

  const handleNavigate = (section: Section) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(section);
      setIsTransitioning(false);
    }, 150);
  };

  const renderContent = () => {
    const combinedPosts = [...posts, ...funsPosts];
    switch (currentSection) {
      case 'home': return <HomeView posts={posts} onUpdatePost={handleUpdatePost} onPostPrompt={() => handleNavigate('create')} onNavigate={handleNavigate} />;
      case 'funs': return <FunsView posts={funsPosts} onUpdatePost={handleUpdatePost} onBack={() => handleNavigate('home')} />;
      case 'chat': return <LiveChatView onBack={() => handleNavigate('home')} />;
      case 'study': return <StudyView onBack={() => handleNavigate('home')} />;
      case 'alerts': return <AlertsView onBack={() => handleNavigate('home')} />;
      case 'profile': return <ProfileView posts={combinedPosts} onUpdatePost={handleUpdatePost} />;
      case 'create': return <CreatePostView onBack={() => handleNavigate('home')} />;
      default: return <HomeView posts={posts} onUpdatePost={handleUpdatePost} onPostPrompt={() => handleNavigate('create')} onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {/* Click Spark Effect */}
      <ClickSpark />

      {/* Opening Screen */}
      {showOpening && <OpeningScreen onComplete={() => setShowOpening(false)} />}

      {/* Main App */}
      <div className="min-h-screen bg-primary-dark text-text-primary flex flex-col lg:flex-row relative overflow-hidden">
        {/* Animated Mesh Background */}
        <div className="bg-mesh" />

        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Sidebar - Desktop */}
        {!isMobile && (
          <div className="w-72 fixed h-screen left-0 top-0 border-r border-muted/20 z-50 bg-primary-dark/80 backdrop-blur-xl">
            <Sidebar
              activeSection={currentSection}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto pb-24 lg:pb-0 relative z-10 ${!isMobile ? 'lg:ml-72 lg:mr-[320px]' : ''}`}>
          <div
            className={`max-w-2xl mx-auto w-full px-4 lg:px-6 py-6 lg:py-10 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
          >
            {renderContent()}
          </div>
        </main>

        {/* Trending Sidebar - Desktop */}
        {!isMobile && currentSection !== 'create' && currentSection !== 'profile' && (
          <div className="w-[320px] fixed h-screen right-0 top-0 border-l border-muted/20 p-6 z-40 overflow-y-auto bg-primary-dark/80 backdrop-blur-xl">
            <TrendingSidebar />
          </div>
        )}


        {/* Bottom Navigation - Mobile */}
        {isMobile && <BottomNav activeSection={currentSection} onNavigate={handleNavigate} />}
      </div>
    </>
  );
};

export default App;

