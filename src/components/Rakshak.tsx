import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, AlertTriangle, MapPin, Clock, Users, Phone } from 'lucide-react';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';

interface RakshakProps {
  onBack: () => void;
  language: Language;
}

const Rakshak: React.FC<RakshakProps> = ({ onBack, language }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Simulate getting location
    setTimeout(() => {
      setLocation({ lat: 12.9716, lng: 77.5946 }); // Bangalore coordinates
      setAlerts([
        {
          id: 1,
          type: 'elephant',
          severity: 'high',
          location: 'Kanakapura Road',
          distance: '2.5 km',
          time: '30 minutes ago',
          description: 'Elephant herd spotted moving towards crop fields'
        },
        {
          id: 2,
          type: 'wild_boar',
          severity: 'medium',
          location: 'Bannerghatta',
          distance: '5 km',
          time: '2 hours ago',
          description: 'Wild boar activity reported in nearby farms'
        }
      ]);
    }, 1000);
  }, []);

  const titles = {
    hindi: 'रक्षक - वन्यजीव सुरक्षा',
    kannada: 'ರಕ್ಷಕ - ವನ್ಯಜೀವಿ ಸುರಕ್ಷತೆ',
    tamil: 'ரக்ஷக் - வனவிலங்கு பாதுகாப்பு',
    english: 'Rakshak - Wildlife Protection'
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getAnimalIcon = (type: string) => {
    switch (type) {
      case 'elephant': return '🐘';
      case 'wild_boar': return '🐗';
      case 'leopard': return '🐆';
      default: return '🐾';
    }
  };

  const preventionTips = {
    hindi: [
      'खेत के चारों ओर बाड़ लगाएं',
      'रात में रोशनी का इस्तेमाल करें',
      'समुदाय के साथ संपर्क बनाए रखें',
      'आपातकालीन नंबर सेव करें'
    ],
    kannada: [
      'ಹೊಲದ ಸುತ್ತಲೂ ಬೇಲಿ ಹಾಕಿ',
      'ರಾತ್ರಿಯಲ್ಲಿ ದೀಪ ಬಳಸಿ',
      'ಸಮುದಾಯದೊಂದಿಗೆ ಸಂಪರ್ಕ ಇಟ್ಟುಕೊಳ್ಳಿ',
      'ತುರ್ತು ಸಂಖ್ಯೆಗಳನ್ನು ಉಳಿಸಿ'
    ],
    tamil: [
      'வயலைச் சுற்றி வேலி அமைக்கவும்',
      'இரவில் விளக்கைப் பயன்படுத்தவும்',
      'சமுதாயத்துடன் தொடர்பு வைத்துக்கொள்ளுங்கள்',
      'அவசர எண்களை சேமிக்கவும்'
    ],
    english: [
      'Install fencing around farm',
      'Use lights during night',
      'Stay connected with community',
      'Save emergency numbers'
    ]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-700 mb-2">
            {titles[language]}
          </h1>
          <p className="text-gray-600">
            {language === 'hindi' ? 'वन्यजीव खतरों से बचाव और सुरक्षा सुझाव' :
             language === 'kannada' ? 'ವನ್ಯಜೀವಿ ಅಪಾಯಗಳಿಂದ ರಕ್ಷಣೆ ಮತ್ತು ಸುರಕ್ಷತಾ ಸಲಹೆಗಳು' :
             language === 'tamil' ? 'வனவிலங்கு அபாயங்களிலிருந்து பாதுகாப்பு மற்றும் பாதுகாப்பு ஆலோசனைகள்' :
             'Wildlife threat protection and safety tips'}
          </p>
        </div>

        {/* Risk Assessment */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800">
              {language === 'hindi' ? 'स्थान की सुरक्षा' :
               language === 'kannada' ? 'ಸ್ಥಳದ ಸುರಕ್ಷತೆ' :
               language === 'tamil' ? 'இடத்தின் பாதுகாப்பு' :
               'Location Safety'}
            </h3>
            <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(riskLevel)}`}>
              {riskLevel === 'high' 
                ? (language === 'hindi' ? 'उच्च जोखिम' :
                   language === 'kannada' ? 'ಹೆಚ್ಚಿನ ಅಪಾಯ' :
                   language === 'tamil' ? 'அதிக ஆபத்து' : 'High Risk')
                : riskLevel === 'medium'
                ? (language === 'hindi' ? 'मध्यम जोखिम' :
                   language === 'kannada' ? 'ಮಧ್ಯಮ ಅಪಾಯ' :
                   language === 'tamil' ? 'மிதமான ஆபத்து' : 'Medium Risk')
                : (language === 'hindi' ? 'कम जोखिम' :
                   language === 'kannada' ? 'ಕಡಿಮೆ ಅಪಾಯ' :
                   language === 'tamil' ? 'குறைந்த ஆபத்து' : 'Low Risk')}
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">
              {language === 'hindi' ? 'आपका स्थान' :
               language === 'kannada' ? 'ನಿಮ್ಮ ಸ್ಥಳ' :
               language === 'tamil' ? 'உங்கள் இடம்' :
               'Your Location'}
            </h3>
            <p className="text-gray-600 mt-2">
              {location ? 'Kanakapura Road, Bangalore' : 'Detecting...'}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">
              {language === 'hindi' ? 'सक्रिय सदस्य' :
               language === 'kannada' ? 'ಸಕ್ರಿಯ ಸದಸ್ಯರು' :
               language === 'tamil' ? 'செயலில் உள்ள உறுப்பினர்கள்' :
               'Active Members'}
            </h3>
            <p className="text-gray-600 mt-2">247 nearby</p>
          </div>
        </div>

        {/* Current Alerts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'hindi' ? 'वर्तमान चेतावनी' :
             language === 'kannada' ? 'ಪ್ರಸ್ತುತ ಎಚ್ಚರಿಕೆಗಳು' :
             language === 'tamil' ? 'தற்போதைய எச்சரிக்கைகள்' :
             'Current Alerts'}
          </h2>
          
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getAlertColor(alert.severity)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{getAnimalIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {alert.type === 'elephant' 
                          ? (language === 'hindi' ? 'हाथी चेतावनी' :
                             language === 'kannada' ? 'ಆನೆ ಎಚ್ಚರಿಕೆ' :
                             language === 'tamil' ? 'யானை எச்சரிக்கை' : 'Elephant Alert')
                          : (language === 'hindi' ? 'जंगली सूअर चेतावनी' :
                             language === 'kannada' ? 'ಕಾಡುಹಂದಿ ಎಚ್ಚರಿಕೆ' :
                             language === 'tamil' ? 'காட்டுப்பன்றி எச்சரிக்கை' : 'Wild Boar Alert')}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {alert.type === 'elephant' 
                        ? (language === 'hindi' ? 'हाथियों का झुंड फसल के खेतों की ओर बढ़ रहा है' :
                           language === 'kannada' ? 'ಆನೆಗಳ ಹಿಂಡು ಬೆಳೆ ಹೊಲಗಳ ಕಡೆಗೆ ಸಾಗುತ್ತಿದೆ' :
                           language === 'tamil' ? 'யானைகளின் கூட்டம் பயிர் வயல்களை நோக்கி நகர்கிறது' : 
                           'Elephant herd spotted moving towards crop fields')
                        : (language === 'hindi' ? 'आसपास के खेतों में जंगली सूअर की गतिविधि की सूचना' :
                           language === 'kannada' ? 'ಹತ್ತಿರದ ಹೊಲಗಳಲ್ಲಿ ಕಾಡುಹಂದಿ ಚಟುವಟಿಕೆ ವರದಿ' :
                           language === 'tamil' ? 'அருகிலுள்ள பண்ணைகளில் காட்டுப்பன்றி செயல்பாடு அறிக்கை' :
                           'Wild boar activity reported in nearby farms')}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{alert.location}</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span>{alert.distance}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600">
                      {language === 'hindi' ? 'सूचना दें' :
                       language === 'kannada' ? 'ಮಾಹಿತಿ ನೀಡಿ' :
                       language === 'tamil' ? 'தகவல் கொடுக்கவும்' :
                       'Report'}
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      {language === 'hindi' ? 'साझा करें' :
                       language === 'kannada' ? 'ಹಂಚಿಕೊಳ್ಳಿ' :
                       language === 'tamil' ? 'பகிர்ந்து கொள்ள' :
                       'Share'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'hindi' ? 'सुरक्षा सुझाव' :
             language === 'kannada' ? 'ಸುರಕ್ಷತಾ ಸಲಹೆಗಳು' :
             language === 'tamil' ? 'பாதுகாப்பு ஆலோசனைகள்' :
             'Safety Tips'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {preventionTips[language].map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-4">
            {language === 'hindi' ? 'आपातकालीन संपर्क' :
             language === 'kannada' ? 'ತುರ್ತು ಸಂಪರ್ಕಗಳು' :
             language === 'tamil' ? 'அவசர தொடர்புகள்' :
             'Emergency Contacts'}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-red-600" />
              <div>
                <div className="font-medium text-red-800">
                  {language === 'hindi' ? 'वन विभाग' :
                   language === 'kannada' ? 'ಅರಣ್ಯ ಇಲಾಖೆ' :
                   language === 'tamil' ? 'வன துறை' :
                   'Forest Department'}
                </div>
                <div className="text-sm text-red-600">1926</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-red-600" />
              <div>
                <div className="font-medium text-red-800">
                  {language === 'hindi' ? 'पुलिस' :
                   language === 'kannada' ? 'ಪೊಲೀಸ್' :
                   language === 'tamil' ? 'காவல்துறை' :
                   'Police'}
                </div>
                <div className="text-sm text-red-600">100</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-red-600" />
              <div>
                <div className="font-medium text-red-800">
                  {language === 'hindi' ? 'आपातकाल' :
                   language === 'kannada' ? 'ತುರ್ತು' :
                   language === 'tamil' ? 'அவசரநிலை' :
                   'Emergency'}
                </div>
                <div className="text-sm text-red-600">112</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rakshak;