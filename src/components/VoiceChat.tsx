import React, { useState } from 'react';
import { X, Mic, MicOff, Send, Volume2 } from 'lucide-react';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';

interface VoiceChatProps {
  language: Language;
  isVoiceActive: boolean;
  onClose: () => void;
}

const VoiceChat: React.FC<VoiceChatProps> = ({
  language,
  isVoiceActive,
  onClose,
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: {
        hindi: 'नमस्ते! मैं आपका Krishimitra हूं। मैं आपकी खेती से संबंधित सभी समस्याओं में मदद कर सकता हूं।',
        kannada: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ Krishimitra. ನಾನು ನಿಮ್ಮ ಕೃಷಿಗೆ ಸಂಬಂಧಿಸಿದ ಎಲ್ಲಾ ಸಮಸ್ಯೆಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು.',
        tamil: 'வணக்கம்! நான் உங்கள் Krishimitra. உங்கள் விவசாயம் தொடர்பான அனைத்து பிரச்சனைகளிலும் நான் உதவ முடியும்.',
        english: 'Hello! I am your Krishimitra. I can help you with all your farming-related problems.'
      }
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: {
          hindi: inputMessage,
          kannada: inputMessage,
          tamil: inputMessage,
          english: inputMessage
        }
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          content: {
            hindi: 'मैं आपकी समस्या समझ गया हूं। क्या आप मुझे अपनी फसल की तस्वीर दिखा सकते हैं?',
            kannada: 'ನಾನು ನಿಮ್ಮ ಸಮಸ್ಯೆ ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ. ನೀವು ನನಗೆ ನಿಮ್ಮ ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ತೋರಿಸಬಹುದೇ?',
            tamil: 'உங்கள் பிரச்சனையை நான் புரிந்துகொண்டேன். உங்கள் பயிரின் படத்தை எனக்குக் காட்ட முடியுமா?',
            english: 'I understand your problem. Can you show me a picture of your crop?'
          }
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const toggleVoiceListening = () => {
    setIsListening(!isListening);
  };

  const placeholderText = {
    hindi: 'अपना सवाल टाइप करें...',
    kannada: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ...',
    tamil: 'உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள்...',
    english: 'Type your question...'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🌾</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Krishimitra</h3>
              <p className="text-sm text-gray-500">
                {language === 'hindi' ? 'आपका व्यक्तिगत कृषि सहायक' :
                 language === 'kannada' ? 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕೃಷಿ ಸಹಾಯಕ' :
                 language === 'tamil' ? 'உங்கள் தனிப்பட்ட வேளாண் உதவியாளர்' :
                 'Your personal agriculture assistant'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.content[language]}</p>
                {message.type === 'ai' && (
                  <button className="mt-2 text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
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
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={placeholderText[language]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={toggleVoiceListening}
              className={`p-3 rounded-lg transition-colors ${
                isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;