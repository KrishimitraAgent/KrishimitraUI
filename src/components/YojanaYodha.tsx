import React, { useState } from 'react';
import { ArrowLeft, Search, FileText, ExternalLink, Users, DollarSign, Shield } from 'lucide-react';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';

interface YojanaYodhaProps {
  onBack: () => void;
  language: Language;
}

const YojanaYodha: React.FC<YojanaYodhaProps> = ({ onBack, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);

  const schemes = [
    {
      id: 1,
      title: {
        hindi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
        kannada: 'ಪ್ರಧಾನಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ ಯೋಜನೆ',
        tamil: 'பிரதமர் கிசான் சம்மான் நிதி திட்டம்',
        english: 'PM Kisan Samman Nidhi Scheme'
      },
      description: {
        hindi: 'छोटे और सीमांत किसानों को वित्तीय सहायता',
        kannada: 'ಸಣ್ಣ ಮತ್ತು ಸೀಮಾಂತ ರೈತರಿಗೆ ಹಣಕಾಸು ಸಹಾಯ',
        tamil: 'சிறிய மற்றும் விளிம்பு நில விவசாயிகளுக்கு நிதி உதவி',
        english: 'Financial assistance to small and marginal farmers'
      },
      amount: '₹6,000/year',
      category: 'direct_benefit',
      eligibility: {
        hindi: ['छोटे और सीमांत किसान', '2 हेक्टेयर तक की भूमि', 'आधार कार्ड आवश्यक'],
        kannada: ['ಸಣ್ಣ ಮತ್ತು ಸೀಮಾಂತ ರೈತರು', '2 ಹೆಕ್ಟೇರ್ ವರೆಗೆ ಭೂಮಿ', 'ಆಧಾರ್ ಕಾರ್ಡ್ ಅಗತ್ಯ'],
        tamil: ['சிறிய மற்றும் விளிம்பு நில விவசாயிகள்', '2 ஹெக்டேர் வரை நிலம்', 'ஆதார் கார்டு தேவை'],
        english: ['Small and marginal farmers', 'Land up to 2 hectares', 'Aadhar card required']
      }
    },
    {
      id: 2,
      title: {
        hindi: 'प्रधानमंत्री फसल बीमा योजना',
        kannada: 'ಪ್ರಧಾನಮಂತ್ರಿ ಫಸಲ್ ಬೀಮಾ ಯೋಜನೆ',
        tamil: 'பிரதமர் பசல் பீமா திட்டம்',
        english: 'PM Fasal Bima Yojana'
      },
      description: {
        hindi: 'फसल नुकसान के लिए बीमा कवरेज',
        kannada: 'ಬೆಳೆ ನಷ್ಟಕ್ಕಾಗಿ ವಿಮಾ ರಕ್ಷಣೆ',
        tamil: 'பயிர் இழப்புக்கான காப்பீடு',
        english: 'Insurance coverage for crop losses'
      },
      amount: 'Up to ₹2 lakh',
      category: 'insurance',
      eligibility: {
        hindi: ['सभी किसान', 'अधिसूचित फसलें', 'समय पर आवेदन'],
        kannada: ['ಎಲ್ಲಾ ರೈತರು', 'ಅಧಿಸೂಚಿತ ಬೆಳೆಗಳು', 'ಸಮಯಕ್ಕೆ ಅರ್ಜಿ'],
        tamil: ['அனைத்து விவசாயிகள்', 'அறிவிக்கப்பட்ட பயிர்கள்', 'சரியான நேரத்தில் விண்ணப்பம்'],
        english: ['All farmers', 'Notified crops', 'Timely application']
      }
    },
    {
      id: 3,
      title: {
        hindi: 'किसान क्रेडिट कार्ड योजना',
        kannada: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಯೋಜನೆ',
        tamil: 'கிசான் கிரெடிட் கார்டு திட்டம்',
        english: 'Kisan Credit Card Scheme'
      },
      description: {
        hindi: 'कृषि गतिविधियों के लिए आसान ऋण',
        kannada: 'ಕೃಷಿ ಚಟುವಟಿಕೆಗಳಿಗೆ ಸುಲಭ ಸಾಲ',
        tamil: 'வேளாண் செயல்பாடுகளுக்கு எளிதான கடன்',
        english: 'Easy credit for agricultural activities'
      },
      amount: 'Up to ₹3 lakh',
      category: 'credit',
      eligibility: {
        hindi: ['खेती करने वाले किसान', 'भूमि दस्तावेज', 'आधार कार्ड'],
        kannada: ['ವೇಳಾಗಿರುವ ರೈತರು', 'ಭೂಮಿ ದಾಖಲೆಗಳು', 'ಆಧಾರ್ ಕಾರ್ಡ್'],
        tamil: ['விவசாயம் செய்யும் விவசாயிகள்', 'நில ஆவணங்கள்', 'ஆதார் கார்டு'],
        english: ['Practicing farmers', 'Land documents', 'Aadhar card']
      }
    }
  ];

  const filteredSchemes = schemes.filter(scheme =>
    scheme.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description[language].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const titles = {
    hindi: 'योजना योधा - सरकारी योजना गाइड',
    kannada: 'ಯೋಜನಾ ಯೋಧ - ಸರಕಾರಿ ಯೋಜನೆ ಮಾರ್ಗದರ್ಶಿ',
    tamil: 'யோஜனா யோதா - அரசாங்க திட்ட வழிகாட்டி',
    english: 'Scheme Guide - Government Schemes'
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'direct_benefit': return 'bg-primary-100 text-primary-800';
      case 'insurance': return 'bg-blue-100 text-blue-800';
      case 'credit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'direct_benefit': return DollarSign;
      case 'insurance': return Shield;
      case 'credit': return FileText;
      default: return FileText;
    }
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
          <h1 className="text-3xl font-bold text-purple-700 mb-2">
            {titles[language]}
          </h1>
          <p className="text-gray-600">
            {language === 'hindi' ? 'सरकारी योजनाओं की जानकारी और आवेदन प्रक्रिया' :
             language === 'kannada' ? 'ಸರಕಾರಿ ಯೋಜನೆಗಳ ಮಾಹಿತಿ ಮತ್ತು ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ' :
             language === 'tamil' ? 'அரசாங்க திட்டங்களின் தகவல் மற்றும் விண்ணப்ப செயல்முறை' :
             'Government schemes information and application process'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'hindi' ? 'योजना खोजें...' :
                        language === 'kannada' ? 'ಯೋಜನೆ ಹುಡುಕಿ...' :
                        language === 'tamil' ? 'திட்டத்தைத் தேடுங்கள்...' :
                        'Search schemes...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Schemes List */}
        <div className="space-y-4">
          {filteredSchemes.map((scheme) => {
            const CategoryIcon = getCategoryIcon(scheme.category);
            return (
              <div
                key={scheme.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedScheme(scheme)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CategoryIcon className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-semibold text-gray-800">
                        {scheme.title[language]}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {scheme.description[language]}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(scheme.category)}`}>
                        {scheme.category === 'direct_benefit' 
                          ? (language === 'hindi' ? 'प्रत्यक्ष लाभ' : 
                             language === 'kannada' ? 'ನೇರ ಪ್ರಯೋಜನ' :
                             language === 'tamil' ? 'நேரடி நன்மை' : 'Direct Benefit')
                          : scheme.category === 'insurance' 
                          ? (language === 'hindi' ? 'बीमा' : 
                             language === 'kannada' ? 'ವಿಮೆ' :
                             language === 'tamil' ? 'காப்பீடு' : 'Insurance')
                          : (language === 'hindi' ? 'ऋण' : 
                             language === 'kannada' ? 'ಸಾಲ' :
                             language === 'tamil' ? 'கடன்' : 'Credit')}
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {scheme.amount}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Scheme Details Modal */}
        {selectedScheme && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedScheme.title[language]}
                </h2>
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === 'hindi' ? 'योजना विवरण' :
                     language === 'kannada' ? 'ಯೋಜನೆ ವಿವರಗಳು' :
                     language === 'tamil' ? 'திட்ட விவரங்கள்' :
                     'Scheme Details'}
                  </h3>
                  <p className="text-gray-600">
                    {selectedScheme.description[language]}
                  </p>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-green-600">
                      {selectedScheme.amount}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === 'hindi' ? 'पात्रता' :
                     language === 'kannada' ? 'ಅರ್ಹತೆ' :
                     language === 'tamil' ? 'தகுதி' :
                     'Eligibility'}
                  </h3>
                  <ul className="space-y-2">
                    {selectedScheme.eligibility[language].map((criteria: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === 'hindi' ? 'आवेदन प्रक्रिया' :
                     language === 'kannada' ? 'ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ' :
                     language === 'tamil' ? 'விண்ணப்ப செயல்முறை' :
                     'Application Process'}
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        hindi: '1. आधिकारिक वेबसाइट पर जाएं',
                        kannada: '1. ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿ',
                        tamil: '1. அதிகாரப்பூர்வ வலைத்தளத்தைப் பார்வையிடவும்',
                        english: '1. Visit the official website'
                      },
                      {
                        hindi: '2. ऑनलाइन आवेदन फॉर्म भरें',
                        kannada: '2. ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ',
                        tamil: '2. ஆன்லைன் விண்ணப்ப படிவத்தை நிரப்பவும்',
                        english: '2. Fill online application form'
                      },
                      {
                        hindi: '3. आवश्यक दस्तावेज अपलोड करें',
                        kannada: '3. ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
                        tamil: '3. தேவையான ஆவணங்களை பதிவேற்றவும்',
                        english: '3. Upload required documents'
                      },
                      {
                        hindi: '4. आवेदन जमा करें',
                        kannada: '4. ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
                        tamil: '4. விண்ணப்பத்தை சமர்ப்பிக்கவும்',
                        english: '4. Submit application'
                      }
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step[language]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors">
                    {language === 'hindi' ? 'आवेदन करें' :
                     language === 'kannada' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' :
                     language === 'tamil' ? 'விண்ணப்பிக்கவும்' :
                     'Apply Now'}
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                    {language === 'hindi' ? 'अधिक जानकारी' :
                     language === 'kannada' ? 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ' :
                     language === 'tamil' ? 'மேலும் தகவல்' :
                     'More Info'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YojanaYodha;