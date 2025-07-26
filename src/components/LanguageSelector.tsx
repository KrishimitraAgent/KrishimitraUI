import React from 'react';
import { X, Check } from 'lucide-react';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  onClose,
}) => {
  const languages = [
    { 
      code: 'hindi', 
      name: 'हिंदी', 
      englishName: 'Hindi',
      flag: '🇮🇳',
      gradient: 'from-orange-400 to-red-500'
    },
    { 
      code: 'kannada', 
      name: 'ಕನ್ನಡ', 
      englishName: 'Kannada',
      flag: '🇮🇳',
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      code: 'tamil', 
      name: 'தமிழ்', 
      englishName: 'Tamil',
      flag: '🇮🇳',
      gradient: 'from-red-400 to-pink-500'
    },
    { 
      code: 'english', 
      name: 'English', 
      englishName: 'English',
      flag: '🇬🇧',
      gradient: 'from-blue-400 to-indigo-500'
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {currentLanguage === 'hindi' ? 'भाषा चुनें' :
               currentLanguage === 'kannada' ? 'ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ' :
               currentLanguage === 'tamil' ? 'மொழியைத் தேர்ந்தெடுக்கவும்' :
               'Select Language'}
            </h2>
            <p className="text-gray-600 mt-1">
              {currentLanguage === 'hindi' ? 'अपनी पसंदीदा भाषा चुनें' :
               currentLanguage === 'kannada' ? 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ' :
               currentLanguage === 'tamil' ? 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்' :
               'Choose your preferred language'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code as Language);
                onClose();
              }}
              className={`group w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                currentLanguage === language.code
                  ? 'bg-gradient-to-r ' + language.gradient + ' text-white shadow-xl scale-105'
                  : 'hover:bg-gray-50 border-2 border-gray-100 hover:border-gray-200 bg-white hover:shadow-lg text-gray-700'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
                currentLanguage === language.code 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'bg-gradient-to-r ' + language.gradient
              }`}>
                <span className={currentLanguage === language.code ? 'text-white' : 'text-white'}>
                  {language.flag}
                </span>
              </div>
              
              <div className="flex-1 text-left">
                <div className={`font-bold text-lg ${
                  currentLanguage === language.code ? 'text-white' : 'text-gray-800'
                }`}>
                  {language.name}
                </div>
                <div className={`text-sm ${
                  currentLanguage === language.code ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {language.englishName}
                </div>
              </div>
              
              {currentLanguage === language.code && (
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {currentLanguage === 'hindi' ? 'आप बाद में भी भाषा बदल सकते हैं' :
             currentLanguage === 'kannada' ? 'ನೀವು ನಂತರ ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಬಹುದು' :
             currentLanguage === 'tamil' ? 'நீங்கள் பின்னர் மொழியை மாற்றலாம்' :
             'You can change language later anytime'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;