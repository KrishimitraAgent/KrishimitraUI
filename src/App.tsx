import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, Mic, MicOff, Globe, Sun, Cloud, Moon } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import Home from './components/Home';
import RogiRakho from './components/RogiRakho';
import BazaarBolo from './components/BazaarBolo';
import YojanaYodha from './components/YojanaYodha';
import Rakshak from './components/Rakshak';
import Chat from './components/Chat';
import LanguageSelector from './components/LanguageSelector';
import VoiceChat from './components/VoiceChat';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';

function App() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState<Language>('hindi');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-screen bg-neutral-50 dark:bg-dark-50 relative transition-colors duration-300 flex flex-col">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-300/20 dark:bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-60 right-16 w-32 h-32 bg-secondary-300/20 dark:bg-secondary-500/8 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-accent-300/15 dark:bg-accent-500/8 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute bottom-60 right-1/3 w-36 h-36 bg-success-300/20 dark:bg-success-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-warning-300/15 dark:bg-warning-500/8 rounded-full blur-xl animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Modern Header with Glass Morphism */}
      <header className="relative z-10 glass-morphism border-b border-white/20 dark:border-white/10 shadow-large flex-shrink-0">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center shadow-colored-primary hover-lift">
                  <span className="text-3xl">🌾</span>
                </div>
                <div className="absolute -inset-1 bg-primary-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold font-display gradient-text">
                  Krishimitra
                </h1>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  {language === 'hindi' ? '🌱 खेती का साथी' :
                   language === 'kannada' ? '🌱 ಕೃಷಿಯ ಸಹಾಯಕ' :
                   language === 'tamil' ? '🌱 விவசாய துணை' :
                   '🌱 Your Farm Companion'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Enhanced Weather Widget */}
              <div className="hidden md:flex items-center space-x-3 glass-morphism px-4 py-3 rounded-xl border border-white/30 dark:border-white/10">
                <div className="flex items-center space-x-2">
                  <Sun className="w-5 h-5 text-warning-500" />
                  <span className="text-sm font-semibold text-neutral-700 dark:text-dark-700">28°C</span>
                </div>
                <div className="w-px h-4 bg-neutral-300 dark:bg-dark-300"></div>
                <Cloud className="w-4 h-4 text-secondary-400" />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn-base glass-morphism border border-white/30 dark:border-white/10 text-neutral-700 dark:text-dark-700 hover:bg-white/60 dark:hover:bg-white/10 hover-lift"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* Modern Language Selector */}
              <button
                onClick={() => setShowLanguageSelector(true)}
                className="btn-base bg-secondary-500 text-white hover:bg-secondary-600 shadow-colored-secondary hover-lift"
              >
                <Globe className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">
                  {language === 'hindi' ? 'हिंदी' : 
                   language === 'kannada' ? 'ಕನ್ನಡ' : 
                   language === 'tamil' ? 'தமிழ்' : 'English'}
                </span>
              </button>

              {/* Enhanced Voice Toggle */}
              <button
                onClick={() => setIsVoiceActive(!isVoiceActive)}
                className={`btn-base hover-lift shadow-large ${
                  isVoiceActive 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Modern Chat Toggle */}
              <button
                onClick={() => navigate('/chat')}
                className="btn-base bg-accent-500 text-white hover:bg-accent-600 shadow-colored-accent hover-lift"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Enhanced Spacing */}
      <main className="relative z-10 w-full flex-1">
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Home onNavigate={handleNavigate} language={language} />} />
            <Route path="/rogirakho" element={<RogiRakho onBack={() => navigate('/')} language={language} />} />
            <Route path="/bazaarbolo" element={<BazaarBolo onBack={() => navigate('/')} language={language} />} />
            <Route path="/yojanayodha" element={<YojanaYodha onBack={() => navigate('/')} language={language} />} />
            <Route path="/rakshak" element={<Rakshak onBack={() => navigate('/')} language={language} />} />
            <Route path="/chat" element={<Chat onBack={() => navigate('/')} language={language} />} />
            <Route path="/chat/:sessionId" element={<Chat onBack={() => navigate('/')} language={language} />} />
          </Routes>
        </div>
      </main>

      {/* Modals with Enhanced Styling */}
      {showLanguageSelector && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm" onClick={() => setShowLanguageSelector(false)}></div>
            <div className="relative">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
                onClose={() => setShowLanguageSelector(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showVoiceChat && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm" onClick={() => setShowVoiceChat(false)}></div>
            <div className="relative">
              <VoiceChat
                language={language}
                isVoiceActive={isVoiceActive}
                onClose={() => setShowVoiceChat(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;