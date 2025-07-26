import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MessageCircle, Mic, MicOff, Send, Volume2, Search, MoreVertical, Edit3, Trash2, Archive } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: Record<Language, string>;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: Record<Language, string>;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
  isArchived?: boolean;
}

interface ChatProps {
  onBack: () => void;
  language: Language;
}

const Chat: React.FC<ChatProps> = ({ onBack, language }) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSessionOptions, setShowSessionOptions] = useState<string | null>(null);
  
  // Speech recognition hook
  const {
    isListening,
    transcript,
    error: speechError,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition(language);

  // Local storage keys
  const STORAGE_KEY = 'agrisaarthi-chat-sessions';
  const SELECTED_SESSION_KEY = 'agrisaarthi-selected-session';

  // Helper functions for localStorage
  const saveChatSessions = (sessions: ChatSession[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save chat sessions to localStorage:', error);
    }
  };

  const loadChatSessions = (): ChatSession[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const sessions = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        return sessions.map((session: any) => ({
          ...session,
          timestamp: new Date(session.timestamp),
          messages: session.messages.map((message: any) => ({
            ...message,
            timestamp: new Date(message.timestamp)
          }))
        }));
      }
    } catch (error) {
      console.error('Failed to load chat sessions from localStorage:', error);
    }
    return getDefaultSessions();
  };

  const saveSelectedSession = (sessionId: string | null) => {
    try {
      if (sessionId) {
        localStorage.setItem(SELECTED_SESSION_KEY, sessionId);
      } else {
        localStorage.removeItem(SELECTED_SESSION_KEY);
      }
    } catch (error) {
      console.error('Failed to save selected session to localStorage:', error);
    }
  };

  const loadSelectedSession = (): string | null => {
    try {
      return localStorage.getItem(SELECTED_SESSION_KEY);
    } catch (error) {
      console.error('Failed to load selected session from localStorage:', error);
      return null;
    }
  };

  // Default sessions data
  const getDefaultSessions = (): ChatSession[] => [
    {
      id: 'session-1',
      title: {
        hindi: 'गेहूं की बीमारी के बारे में',
        kannada: 'ಗೋಧಿ ರೋಗದ ಬಗ್ಗೆ',
        tamil: 'கோதுமை நோய் பற்றி',
        english: 'About Wheat Disease'
      },
      lastMessage: 'Thank you for the detailed explanation about wheat rust disease.',
      timestamp: new Date('2024-01-15T10:30:00'),
      messages: [
        {
          id: 1,
          type: 'ai',
          content: {
            hindi: 'नमस्ते! मैं आपका Krishimitra हूं। मैं आपकी खेती से संबंधित सभी समस्याओं में मदद कर सकता हूं।',
            kannada: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ Krishimitra. ನಾನು ನಿಮ್ಮ ಕೃಷಿಗೆ ಸಂಬಂಧಿಸಿದ ಎಲ್ಲಾ ಸಮಸ್ಯೆಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು.',
            tamil: 'வணக்கம்! நான் உங்கள் Krishimitra. உங்கள் விவசாயம் தொடர்பான அனைத்து பிரச்சனைகளிலும் நான் உதவ முடியும்.',
            english: 'Hello! I am your Krishimitra. I can help you with all your farming-related problems.'
          },
          timestamp: new Date('2024-01-15T10:25:00')
        }
      ]
    },
    {
      id: 'session-2',
      title: {
        hindi: 'मक्का की फसल की सिंचाई',
        kannada: 'ಮೆಕ್ಕೆ ಜೋಳದ ನೀರಾವರಿ',
        tamil: 'சோள பயிர் நீர்ப்பாசனம்',
        english: 'Corn Crop Irrigation'
      },
      lastMessage: 'When should I water my corn crop during the flowering stage?',
      timestamp: new Date('2024-01-14T15:45:00'),
      messages: [
        {
          id: 1,
          type: 'ai',
          content: {
            hindi: 'मक्का की सिंचाई के बारे में आपका स्वागत है। मैं आपकी मदद करूंगा।',
            kannada: 'ಮೆಕ್ಕೆ ಜೋಳದ ನೀರಾವರಿ ಬಗ್ಗೆ ನಿಮಗೆ ಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.',
            tamil: 'சோள நீர்ப்பாசனம் பற்றி உங்களுக்கு வரவேற்பு. நான் உங்களுக்கு உதவுவேன்.',
            english: 'Welcome to corn irrigation guidance. I will help you.'
          },
          timestamp: new Date('2024-01-14T15:40:00')
        }
      ]
    },
    {
      id: 'session-3',
      title: {
        hindi: 'टमाटर के बाजार भाव',
        kannada: 'ಟೊಮೇಟೊ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
        tamil: 'தக்காளி சந்தை விலை',
        english: 'Tomato Market Prices'
      },
      lastMessage: 'Current tomato prices are ₹25 per kg in your local market.',
      timestamp: new Date('2024-01-13T09:20:00'),
      messages: [
        {
          id: 1,
          type: 'ai',
          content: {
            hindi: 'टमाटर के बाजार भाव की जानकारी के लिए मैं यहां हूं।',
            kannada: 'ಟೊಮೇಟೊ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಯ ಮಾಹಿತಿಗಾಗಿ ನಾನು ಇಲ್ಲಿದ್ದೇನೆ.',
            tamil: 'தக்காளி சந்தை விலை தகவலுக்காக நான் இங்கே இருக்கிறேன்.',
            english: 'I am here for tomato market price information.'
          },
          timestamp: new Date('2024-01-13T09:15:00')
        }
      ]
    }
  ];

  // Initialize chat sessions from localStorage
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => loadChatSessions());

  // Handle URL-based session navigation
  useEffect(() => {
    if (sessionId) {
      // If sessionId from URL exists in our sessions, use it
      if (chatSessions.find(session => session.id === sessionId)) {
        setSelectedSession(sessionId);
      } else {
        // If sessionId doesn't exist, redirect to first session or create new one
        if (chatSessions.length > 0) {
          navigate(`/chat/${chatSessions[0].id}`, { replace: true });
        } else {
          // Create a new session if none exist
          const newSessionId = `session-${Date.now()}`;
          const newSession: ChatSession = {
            id: newSessionId,
            title: {
              hindi: 'नई चैट',
              kannada: 'ಹೊಸ ಚಾಟ್',
              tamil: 'புதிய அரட்டை',
              english: 'New Chat'
            },
            lastMessage: '',
            timestamp: new Date(),
            messages: []
          };
          setChatSessions([newSession]);
          navigate(`/chat/${newSession.id}`, { replace: true });
        }
      }
    } else {
      // If no sessionId in URL, redirect to first session or create new one
      if (chatSessions.length > 0) {
        navigate(`/chat/${chatSessions[0].id}`, { replace: true });
      } else {
        // Create a new session if none exist
        const newSessionId = `session-${Date.now()}`;
        const newSession: ChatSession = {
          id: newSessionId,
          title: {
            hindi: 'नई चैट',
            kannada: 'ಹೊಸ ಚಾಟ್',
            tamil: 'புதிய அரட்டை',
            english: 'New Chat'
          },
          lastMessage: '',
          timestamp: new Date(),
          messages: []
        };
        setChatSessions([newSession]);
        navigate(`/chat/${newSession.id}`, { replace: true });
      }
    }
  }, [sessionId, chatSessions, navigate]);

  // Update input with speech transcript
  useEffect(() => {
    if (transcript) {
      setInputMessage(transcript);
    }
  }, [transcript]);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    saveChatSessions(chatSessions);
  }, [chatSessions]);

  // Save selected session whenever it changes
  useEffect(() => {
    saveSelectedSession(selectedSession);
  }, [selectedSession]);

  const createNewSession = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: {
        hindi: 'नई चैट',
        kannada: 'ಹೊಸ ಚಾಟ್',
        tamil: 'புதிய அரட்டை',
        english: 'New Chat'
      },
      lastMessage: '',
      timestamp: new Date(),
      messages: [
        {
          id: 1,
          type: 'ai',
          content: {
            hindi: 'नमस्ते! मैं आपका Krishimitra हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
            kannada: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ Krishimitra. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
            tamil: 'வணக்கம்! நான் உங்கள் Krishimitra. இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
            english: 'Hello! I am your Krishimitra. How can I help you today?'
          },
          timestamp: new Date()
        }
      ]
    };
    
    setChatSessions(prev => {
      const updatedSessions = [newSession, ...prev];
      return updatedSessions;
    });
    // Navigate to the new session
    navigate(`/chat/${newSessionId}`);
  };

  const toggleSpeechRecognition = () => {
    if (!isSpeechSupported) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedSession) return;
    
    // Stop speech recognition if it's active
    if (isListening) {
      stopListening();
    }
    
    // Reset transcript for next use
    resetTranscript();

    const currentSession = chatSessions.find(s => s.id === selectedSession);
    if (!currentSession) return;

    const newMessage: Message = {
      id: currentSession.messages.length + 1,
      type: 'user',
      content: {
        hindi: inputMessage,
        kannada: inputMessage,
        tamil: inputMessage,
        english: inputMessage
      },
      timestamp: new Date()
    };

    const updatedSessions = chatSessions.map(session => {
      if (session.id === selectedSession) {
        return {
          ...session,
          messages: [...session.messages, newMessage],
          lastMessage: inputMessage,
          timestamp: new Date()
        };
      }
      return session;
    });

    setChatSessions(updatedSessions);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: currentSession.messages.length + 2,
        type: 'ai',
        content: {
          hindi: 'मैं आपकी समस्या समझ गया हूं। क्या आप मुझे और विस्तार से बता सकते हैं?',
          kannada: 'ನಾನು ನಿಮ್ಮ ಸಮಸ್ಯೆ ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ. ನೀವು ನನಗೆ ಹೆಚ್ಚು ವಿವರವಾಗಿ ಹೇಳಬಹುದೇ?',
          tamil: 'உங்கள் பிரச்சனையை நான் புரிந்துகொண்டேன். நீங்கள் எனக்கு மேலும் விரிவாகச் சொல்ல முடியுமா?',
          english: 'I understand your problem. Can you tell me more details about it?'
        },
        timestamp: new Date()
      };

      setChatSessions(prev => {
        const updatedSessions = prev.map(session => {
          if (session.id === selectedSession) {
            return {
              ...session,
              messages: [...session.messages, aiResponse],
              lastMessage: aiResponse.content[language],
              timestamp: new Date()
            };
          }
          return session;
        });
        return updatedSessions;
      });
    }, 1000);
  };

  const deleteSession = (sessionId: string) => {
    setChatSessions(prev => {
      const updatedSessions = prev.filter(s => s.id !== sessionId);
      return updatedSessions;
    });
    if (selectedSession === sessionId) {
      setSelectedSession(null);
    }
    setShowSessionOptions(null);
  };

  const archiveSession = (sessionId: string) => {
    setChatSessions(prev => {
      const updatedSessions = prev.map(session => 
        session.id === sessionId 
          ? { ...session, isArchived: !session.isArchived }
          : session
      );
      return updatedSessions;
    });
    setShowSessionOptions(null);
  };

  const filteredSessions = chatSessions.filter(session =>
    !session.isArchived && 
    (session.title[language]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentSession = chatSessions.find(s => s.id === selectedSession);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return language === 'hindi' ? 'कल' :
             language === 'kannada' ? 'ನಿನ್ನೆ' :
             language === 'tamil' ? 'நேற்று' :
             'Yesterday';
    } else if (days < 7) {
      return `${days} ${language === 'hindi' ? 'दिन पहले' :
                      language === 'kannada' ? 'ದಿನಗಳ ಹಿಂದೆ' :
                      language === 'tamil' ? 'நாட்களுக்கு முன்பு' :
                      'days ago'}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const placeholderText = {
    hindi: 'अपना सवाल टाइप करें...',
    kannada: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...',
    tamil: 'உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள்...',
    english: 'Type your question...'
  };

  const titles = {
    hindi: 'Krishimitra चैट',
    kannada: 'Krishimitra ಚಾಟ್',
    tamil: 'Krishimitra அரட்டை',
    english: 'Krishimitra Chat'
  };

  return (
    <div className="h-screen bg-neutral-50 dark:bg-dark-50 flex transition-colors duration-300">
      {/* Chat Sessions Sidebar */}
      <div className="w-80 glass-morphism border-r border-white/20 dark:border-white/10 flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex-shrink-0 p-6 border-b border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-dark-600" />
            </button>
            <h1 className="text-xl font-bold font-display gradient-text">
              {titles[language]}
            </h1>
                          <button
                onClick={createNewSession}
                className="p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 shadow-colored-primary hover-lift"
              >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-dark-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hindi' ? 'चैट खोजें...' :
                          language === 'kannada' ? 'ಚಾಟ್ ಹುಡುಕಿ...' :
                          language === 'tamil' ? 'அரட்டை தேடுங்கள்...' :
                          'Search chats...'}
              className="w-full pl-10 pr-4 py-3 glass-morphism border border-white/30 dark:border-white/10 rounded-xl focus-ring text-sm text-neutral-800 dark:text-dark-800 placeholder-neutral-500 dark:placeholder-dark-500"
            />
          </div>
        </div>

        {/* Chat Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className={`relative group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedSession === session.id
                  ? 'bg-gradient-to-r from-primary-100 to-success-100 border-2 border-primary-300'
                  : 'glass-morphism hover:bg-white/60 border border-white/30'
              }`}
                                    onClick={() => navigate(`/chat/${session.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-colored-primary flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                  <div className="flex-1 min-w-0">
                                      <h3 className="font-semibold text-neutral-800 dark:text-dark-800 truncate">
                    {session.title[language]}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-dark-600 truncate">
                    {session.lastMessage}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-dark-500 mt-1">
                    {formatTime(session.timestamp)}
                  </p>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSessionOptions(showSessionOptions === session.id ? null : session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded-lg transition-all duration-200"
                >
                  <MoreVertical className="w-4 h-4 text-neutral-600 dark:text-dark-600" />
                </button>
              </div>

              {/* Session Options Menu */}
              {showSessionOptions === session.id && (
                <div className="absolute right-2 top-2 z-10 glass-morphism border border-white/30 rounded-xl shadow-large overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit functionality would be implemented here
                      setShowSessionOptions(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-white/20 flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>{language === 'hindi' ? 'संपादित करें' :
                           language === 'kannada' ? 'ಸಂಪಾದಿಸಿ' :
                           language === 'tamil' ? 'திருத்து' :
                           'Edit'}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveSession(session.id);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-white/20 flex items-center space-x-2"
                  >
                    <Archive className="w-4 h-4" />
                    <span>{language === 'hindi' ? 'संग्रहीत करें' :
                           language === 'kannada' ? 'ಆರ್ಕೈವ್ ಮಾಡಿ' :
                           language === 'tamil' ? 'காப்பகப்படுத்து' :
                           'Archive'}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{language === 'hindi' ? 'हटाएं' :
                           language === 'kannada' ? 'ಅಳಿಸಿ' :
                           language === 'tamil' ? 'நீக்கு' :
                           'Delete'}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedSession && currentSession ? (
          <>
            {/* Chat Header - Fixed */}
            <div className="flex-shrink-0 p-6 glass-morphism border-b border-white/20 dark:border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-colored-primary">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-neutral-800 dark:text-dark-800">
                    {currentSession.title[language]}
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-dark-600">
                    {language === 'hindi' ? 'आपका व्यक्तिगत कृषि सहायक' :
                     language === 'kannada' ? 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕೃಷಿ ಸಹಾಯಕ' :
                     language === 'tamil' ? 'உங்கள் தனிப்பட்ட வேளாண் உதவியாளர்' :
                     'Your personal agriculture assistant'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages - Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0 max-h-full">
              {currentSession.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end space-x-3 max-w-[70%]">
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">🤖</span>
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-2xl shadow-medium ${
                        message.type === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'glass-morphism border border-white/30 dark:border-white/10 text-neutral-800 dark:text-dark-800'
                      }`}
                    >
                      <p className="leading-relaxed">{message.content[language]}</p>
                      {message.type === 'ai' && (
                        <button className="mt-3 text-sm text-neutral-500 dark:text-dark-500 hover:text-neutral-700 dark:hover:text-dark-700 flex items-center space-x-2 transition-colors">
                          <Volume2 className="w-4 h-4" />
                          <span>
                            {language === 'hindi' ? 'सुनें' :
                             language === 'kannada' ? 'ಕೇಳಿ' :
                             language === 'tamil' ? 'கேளுங்கள்' :
                             'Listen'}
                          </span>
                        </button>
                      )}
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">👤</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area - Fixed at Bottom */}
            <div className="flex-shrink-0 p-6 glass-morphism border-t border-white/20 dark:border-white/10 bg-white/80 dark:bg-dark-100/80 backdrop-blur-lg">
              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <div className="relative w-full">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder={isListening ? 
                        (language === 'hindi' ? 'बोलें...' :
                         language === 'kannada' ? 'ಮಾತನಾಡಿ...' :
                         language === 'tamil' ? 'பேசுங்கள்...' :
                         'Speak...') :
                        placeholderText[language]
                      }
                      rows={1}
                      className={`w-full p-4 glass-morphism border border-white/30 dark:border-white/10 rounded-2xl focus-ring resize-none text-neutral-800 dark:text-dark-800 placeholder-neutral-500 dark:placeholder-dark-500 ${
                        isListening ? 'ring-2 ring-red-300 dark:ring-red-600' : ''
                      }`}
                    />
                    {speechError && (
                      <div className="absolute -bottom-8 left-0 text-xs text-red-500 dark:text-red-400">
                        {speechError === 'not-allowed' ? 'Microphone access denied' :
                         speechError === 'no-speech' ? 'No speech detected' :
                         speechError === 'network' ? 'Network error' :
                         'Speech recognition error'}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={toggleSpeechRecognition}
                  disabled={!isSpeechSupported}
                  className={`p-4 rounded-2xl transition-all duration-300 hover-lift relative ${
                    isListening 
                      ? 'bg-red-500 text-white shadow-large hover:bg-red-600 animate-pulse' 
                      : 'glass-morphism border border-white/30 dark:border-white/10 text-neutral-600 dark:text-dark-600 hover:bg-white/60 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                  title={
                    !isSpeechSupported ? 'Speech recognition not supported' :
                    isListening ? 'Stop recording' : 'Start voice input'
                  }
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  {isListening && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                  )}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-4 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-colored-primary hover-lift transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center p-8 h-full">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-colored-primary">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold font-display gradient-text mb-4">
                {language === 'hindi' ? 'Krishimitra चैट में आपका स्वागत है!' :
                 language === 'kannada' ? 'Krishimitra ಚಾಟ್‌ಗೆ ಸ್ವಾಗತ!' :
                 language === 'tamil' ? 'Krishimitra அரட்டைக்கு வரவேற்கிறோம்!' :
                 'Welcome to Krishimitra Chat!'}
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                {language === 'hindi' ? 'बातचीत शुरू करने के लिए एक नई चैट बनाएं या मौजूदा चैट चुनें।' :
                 language === 'kannada' ? 'ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಲು ಹೊಸ ಚಾಟ್ ರಚಿಸಿ ಅಥವಾ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಚಾಟ್ ಆಯ್ಕೆಮಾಡಿ.' :
                 language === 'tamil' ? 'உரையாடலைத் தொடங்க புதிய அரட்டையை உருவாக்கவும் அல்லது இருக்கும் அரட்டையைத் தேர்ந்தெடுக்கவும்.' :
                 'Create a new chat or select an existing one to start a conversation.'}
              </p>
              <button
                onClick={createNewSession}
                className="btn-base bg-primary-500 text-white hover:bg-primary-600 shadow-colored-primary hover-lift"
              >
                <Plus className="w-5 h-5 mr-2" />
                {language === 'hindi' ? 'नई चैट शुरू करें' :
                 language === 'kannada' ? 'ಹೊಸ ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ' :
                 language === 'tamil' ? 'புதிய அரட்டையைத் தொடங்குங்கள்' :
                 'Start New Chat'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 