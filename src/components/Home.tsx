import React, { useState } from 'react';
import { Camera, TrendingUp, FileText, Shield, MessageCircle, Smile, Frown, Meh, Sparkles, Heart, Star } from 'lucide-react';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';
type Mood = 'neutral' | 'stressed' | 'hopeful';

interface HomeProps {
  onNavigate: (path: string) => void;
  language: Language;
}

const Home: React.FC<HomeProps> = ({ onNavigate, language }) => {
  const [selectedMood, setSelectedMood] = useState<Mood>('neutral');

  const features = [
    {
      id: 'rogirakho',
      icon: Camera,
      emoji: '🌿',
      title: {
        hindi: 'रोगी रक्षो',
        kannada: 'ರೋಗಿ ರಕ್ಷೋ',
        tamil: 'ரோகி ரக்ஷோ',
        english: 'Crop Doctor'
      },
      subtitle: {
        hindi: 'फसल की बीमारी पहचानें',
        kannada: 'ಬೆಳೆ ರೋಗವನ್ನು ಗುರುತಿಸಿ',
        tamil: 'பயிர் நோயைக் கண்டறியுங்கள்',
        english: 'Diagnose Crop Disease'
      },
      gradient: 'bg-primary-600',
      hoverGradient: 'hover:bg-primary-700',
      shadowColor: 'shadow-colored-primary'
    },
    {
      id: 'bazaarbolo',
      icon: TrendingUp,
      emoji: '📈',
      title: {
        hindi: 'बाजार बोलो',
        kannada: 'ಬಜಾರ್ ಬೋಲೋ',
        tamil: 'பஜார் போலோ',
        english: 'Market Guru'
      },
      subtitle: {
        hindi: 'मंडी की कीमत जानें',
        kannada: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ತಿಳಿಯಿರಿ',
        tamil: 'சந்தை விலையை அறியுங்கள்',
        english: 'Market Price Insights'
      },
      gradient: 'bg-secondary-600',
      hoverGradient: 'hover:bg-secondary-700',
      shadowColor: 'shadow-colored-secondary'
    },
    {
      id: 'yojanayodha',
      icon: FileText,
      emoji: '🏛️',
      title: {
        hindi: 'योजना योधा',
        kannada: 'ಯೋಜನಾ ಯೋಧ',
        tamil: 'யோஜனா யோதா',
        english: 'Scheme Guide'
      },
      subtitle: {
        hindi: 'सरकारी योजनाएं',
        kannada: 'ಸರಕಾರಿ ಯೋಜನೆಗಳು',
        tamil: 'அரசாங்க திட்டங்கள்',
        english: 'Government Schemes'
      },
      gradient: 'bg-accent-600',
      hoverGradient: 'hover:bg-accent-700',
      shadowColor: 'shadow-colored-accent'
    },
    {
      id: 'rakshak',
      icon: Shield,
      emoji: '🐘',
      title: {
        hindi: 'रक्षक',
        kannada: 'ರಕ್ಷಕ',
        tamil: 'ரக்ஷக்',
        english: 'Wildlife Alert'
      },
      subtitle: {
        hindi: 'वन्यजीव सुरक्षा',
        kannada: 'ವನ್ಯಜೀವಿ ಸುರಕ್ಷತೆ',
        tamil: 'வனவிலங்கு பாதுகாப்பு',
        english: 'Wildlife Protection'
      },
      gradient: 'bg-warning-600',
      hoverGradient: 'hover:bg-warning-700',
      shadowColor: 'shadow-medium'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      emoji: '💬',
      title: {
        hindi: 'Krishimitra चैट',
        kannada: 'Krishimitra ಚಾಟ್',
        tamil: 'Krishimitra அரட்டை',
        english: 'Krishimitra Chat'
      },
      subtitle: {
        hindi: 'व्यक्तिगत कृषि सलाहकार',
        kannada: 'ವೈಯಕ್ತಿಕ ಕೃಷಿ ಸಲಾಹಗಾರ',
        tamil: 'தனிப்பட்ட வேளாண் ஆலோசகர்',
        english: 'Personal Farm Advisor'
      },
      gradient: 'bg-indigo-600',
      hoverGradient: 'hover:bg-indigo-700',
      shadowColor: 'shadow-colored-accent'
    }
  ];

  const moodOptions = [
    { 
      id: 'neutral', 
      icon: Meh, 
      emoji: '😐',
      label: { hindi: 'सामान्य', kannada: 'ಸಾಮಾನ್ಯ', tamil: 'சாதாரண', english: 'Neutral' },
      color: 'bg-neutral-400'
    },
    { 
      id: 'stressed', 
      icon: Frown, 
      emoji: '😟',
      label: { hindi: 'चिंतित', kannada: 'ಚಿಂತಿತ', tamil: 'கவலை', english: 'Stressed' },
      color: 'bg-red-400'
    },
    { 
      id: 'hopeful', 
      icon: Smile, 
      emoji: '😊',
      label: { hindi: 'आशावान', kannada: 'ಆಶಾವಾದಿ', tamil: 'நம்பிக்கை', english: 'Hopeful' },
      color: 'bg-success-400'
    }
  ];

  const welcomeMessage = {
    hindi: 'नमस्ते किसान भाई! आज आप कैसा महसूस कर रहे हैं?',
    kannada: 'ನಮಸ್ಕಾರ ರೈತ ಸಹೋದರ! ಇಂದು ನೀವು ಹೇಗೆ ಅನಿಸುತ್ತಿದೆ?',
    tamil: 'வணக்கம் விவசாயி அண்ணா! இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?',
    english: 'Hello Farmer! How are you feeling today?'
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-12 animate-slide-up ">
      {/* Welcome Section with Glass Morphism */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-primary-100/30 dark:bg-primary-500/5 rounded-3xl blur-3xl"></div>
        <div className="relative glass-morphism rounded-3xl p-12 md:p-16 shadow-large border border-white/30 dark:border-white/10">
                      <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center shadow-colored-primary hover-glow">
                <span className="text-5xl">🌾</span>
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-warning-500 rounded-full flex items-center justify-center shadow-medium">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-2 bg-primary-500/20 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            </div>
          </div>
          <h2 className="text-5xl font-bold font-display gradient-text my-8 leading-loose">
            {welcomeMessage[language]}
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-dark-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'hindi' ? 'आपका व्यक्तिगत कृषि सहायक - फसल की देखभाल से लेकर बाजार की जानकारी तक, हम आपके साथ हैं!' :
             language === 'kannada' ? 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕೃಷಿ ಸಹಾಯಕ - ಬೆಳೆ ರಕ್ಷಣೆಯಿಂದ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯವರೆಗೆ, ನಾವು ನಿಮ್ಮೊಂದಿಗಿದ್ದೇವೆ!' :
             language === 'tamil' ? 'உங்கள் தனிப்பட்ட வேளாண் உதவியாளர் - பயிர் பராமரிப்பு முதல் சந்தை தகவல் வரை, நாங்கள் உங்களுடன் இருக்கிறோம்!' :
             'Your personal agricultural assistant - from crop care to market insights, we are with you!'}
          </p>
        </div>
      </div>

      {/* Enhanced Mood Selection */}
      <div className="glass-morphism rounded-3xl shadow-large p-8 border border-white/30 dark:border-white/10">
        <h3 className="text-2xl md:text-3xl font-bold font-display text-neutral-800 mb-8 text-center flex items-center justify-center space-x-3">
          <Heart className="w-8 h-8 text-red-500" />
          <span>
            {language === 'hindi' ? 'आज आपका मूड कैसा है?' :
             language === 'kannada' ? 'ಇಂದು ನಿಮ್ಮ ಮೂಡ್ ಹೇಗಿದೆ?' :
             language === 'tamil' ? 'இன்று உங்கள் மூட் எப்படி?' :
             'How is your mood today?'}
          </span>
        </h3>
        <div className="flex justify-center space-x-8">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id as Mood)}
                              className={`group relative flex flex-col items-center p-8 rounded-2xl border-2 transition-all duration-300 hover-lift ${
                selectedMood === mood.id
                  ? 'border-primary-400 bg-primary-50 shadow-colored-primary scale-110'
                  : 'border-neutral-200 hover:border-neutral-300 glass-morphism hover:shadow-medium'
              }`}
            >
              <div className={`w-20 h-20 rounded-full ${mood.color} flex items-center justify-center mb-4 shadow-medium group-hover:shadow-large transition-all duration-300`}>
                <span className="text-3xl">{mood.emoji}</span>
              </div>
              <span className="text-sm font-semibold text-neutral-700 dark:text-dark-700">{mood.label[language]}</span>
              {selectedMood === mood.id && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center shadow-medium">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <button
            key={feature.id}
            onClick={() => onNavigate(`/${feature.id}`)}
            className={`group relative ${feature.gradient} ${feature.hoverGradient} text-white p-8 rounded-3xl shadow-large ${feature.shadowColor} hover-lift transition-all duration-500 overflow-hidden`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-6 right-6 text-7xl">{feature.emoji}</div>
              <div className="absolute bottom-6 left-6 w-40 h-40 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-4 left-4 w-16 h-16 border border-white/5 rounded-full"></div>
            </div>
            
            <div className="relative z-10 flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 border border-white/20">
                  <feature.icon className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-bold font-display mb-3 group-hover:scale-105 transition-transform duration-300">
                  {feature.title[language]}
                </h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                  {feature.subtitle[language]}
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <span className="text-sm font-medium text-white/80">
                    {language === 'hindi' ? 'AI द्वारा संचालित' :
                     language === 'kannada' ? 'AI ನಿಂದ ನಡೆಸಲ್ಪಡುತ್ತದೆ' :
                     language === 'tamil' ? 'AI மூலம் இயக்கப்படுகிறது' :
                     'AI Powered'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Hover Effect */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      {/* Enhanced Quick Stats Dashboard */}
      <div className="glass-morphism rounded-3xl shadow-large p-8 border border-white/30 dark:border-white/10">
        <h3 className="text-2xl md:text-3xl font-bold font-display text-neutral-800 dark:text-dark-800 mb-8 text-center flex items-center justify-center space-x-3">
          <TrendingUp className="w-8 h-8 text-primary-500" />
          <span>
            {language === 'hindi' ? 'आज की महत्वपूर्ण जानकारी' :
             language === 'kannada' ? 'ಇಂದಿನ ಪ್ರಮುಖ ಮಾಹಿತಿ' :
             language === 'tamil' ? 'இன்றைய முக்கிய தகவல்' :
             'Today\'s Key Insights'}
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-primary-50 p-8 rounded-2xl border border-primary-100 hover-lift">
            <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-colored-primary">
              <span className="text-3xl">💰</span>
            </div>
            <div className="text-4xl font-bold font-display text-primary-600 mb-3">₹2,450</div>
            <div className="text-sm text-neutral-600 font-semibold mb-2">
              {language === 'hindi' ? 'धान की आज की कीमत' :
               language === 'kannada' ? 'ಇಂದಿನ ಅಕ್ಕಿ ಬೆಲೆ' :
               language === 'tamil' ? 'இன்றைய அரிசி விலை' :
               'Today\'s Rice Price'}
            </div>
            <div className="text-xs text-success-600 font-medium">↗ +2.5% from yesterday</div>
          </div>
          
          <div className="text-center bg-secondary-50 p-8 rounded-2xl border border-secondary-100 hover-lift">
            <div className="w-20 h-20 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-colored-secondary">
              <span className="text-3xl">📋</span>
            </div>
            <div className="text-4xl font-bold font-display text-secondary-600 mb-3">5</div>
            <div className="text-sm text-neutral-600 font-semibold mb-2">
              {language === 'hindi' ? 'नई सरकारी योजनाएं' :
               language === 'kannada' ? 'ಹೊಸ ಸರಕಾರಿ ಯೋಜನೆಗಳು' :
               language === 'tamil' ? 'புதிய அரசாங்க திட்டங்கள்' :
               'New Government Schemes'}
            </div>
            <div className="text-xs text-secondary-600 font-medium">Available for application</div>
          </div>
          
          <div className="text-center bg-warning-50 p-8 rounded-2xl border border-warning-100 hover-lift">
            <div className="w-20 h-20 bg-warning-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-medium">
              <span className="text-3xl">⚠️</span>
            </div>
            <div className="text-4xl font-bold font-display text-warning-600 mb-3">2</div>
            <div className="text-sm text-neutral-600 font-semibold mb-2">
              {language === 'hindi' ? 'वन्यजीव अलर्ट' :
               language === 'kannada' ? 'ವನ್ಯಜೀವಿ ಅಲರ್ಟ್' :
               language === 'tamil' ? 'வனவிலங்கு எச்சரிக்கை' :
               'Wildlife Alerts'}
            </div>
            <div className="text-xs text-warning-600 font-medium">In your area</div>
          </div>
        </div>
      </div>

      {/* Enhanced Community Section */}
      <div className="bg-accent-500/10 rounded-3xl p-10 border border-accent-200/50 glass-morphism">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-display text-neutral-800 mb-6">
            {language === 'hindi' ? '🤝 किसान समुदाय से जुड़ें' :
             language === 'kannada' ? '🤝 ರೈತ ಸಮುದಾಯದೊಂದಿಗೆ ಸೇರಿ' :
             language === 'tamil' ? '🤝 விவசாயி சமூகத்துடன் இணையுங்கள்' :
             '🤝 Connect with Farmer Community'}
          </h3>
          <p className="text-lg text-neutral-600 mb-8">
            {language === 'hindi' ? '15,000+ किसान भाई पहले से ही Krishimitra का उपयोग कर रहे हैं' :
             language === 'kannada' ? '15,000+ ರೈತ ಸಹೋದರರು ಈಗಾಗಲೇ Krishimitra ಬಳಸುತ್ತಿದ್ದಾರೆ' :
             language === 'tamil' ? '15,000+ விவசாயி சகோதரர்கள் ஏற்கனவே Krishimitra ஐ பயன்படுத்துகின்றனர்' :
             '15,000+ farmer brothers are already using Krishimitra'}
          </p>
          <div className="flex justify-center items-center space-x-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-12 h-12 bg-primary-500 rounded-full border-3 border-white flex items-center justify-center shadow-medium hover-lift">
                  <span className="text-lg">👨‍🌾</span>
                </div>
              ))}
            </div>
            <div className="text-sm text-neutral-600 font-medium">
              {language === 'hindi' ? 'और भी कई...' :
               language === 'kannada' ? 'ಮತ್ತು ಇನ್ನೂ ಅನೇಕರು...' :
               language === 'tamil' ? 'மேலும் பலர்...' :
               'and many more...'}
            </div>
          </div>
        </div>
              </div>
      </div>
    </div>
  );
};

export default Home;