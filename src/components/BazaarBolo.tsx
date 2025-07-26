import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Calendar, AlertTriangle, Sparkles, Target, DollarSign, RefreshCw } from 'lucide-react';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';

interface BazaarBoloProps {
  onBack: () => void;
  language: Language;
}

interface MarketRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

interface ApiResponse {
  records: MarketRecord[];
  total: number;
  status: string;
}

const BazaarBolo: React.FC<BazaarBoloProps> = ({ onBack, language }) => {
  const [selectedVariety, setSelectedVariety] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [marketData, setMarketData] = useState<MarketRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Available varieties and states based on the API
  const varieties = {
    hindi: ['केला', 'चावल', 'गेहूं', 'प्याज', 'आलू', 'टमाटर', 'मिर्च'],
    kannada: ['ಬಾಳೆಹಣ್ಣು', 'ಅಕ್ಕಿ', 'ಗೋಧಿ', 'ಈರುಳ್ಳಿ', 'ಆಲೂಗಡ್ಡೆ', 'ಟೊಮೇಟೊ', 'ಮೆಣಸಿನಕಾಯಿ'],
    tamil: ['வாழைப்பழம்', 'அரிசி', 'கோதுமை', 'வெங்காயம்', 'உருளைக்கிழங்கு', 'தக்காளி', 'மிளகாய்'],
    english: ['Banana', 'Rice', 'Wheat', 'Onion', 'Potato', 'Tomato', 'Chili']
  };

  const varietyMapping: { [key: string]: string } = {
    'केला': 'Banana', 'ಬಾಳೆಹಣ್ಣು': 'Banana', 'வாழைப்பழம்': 'Banana', 'Banana': 'Banana',
    'चावल': 'Rice', 'ಅಕ್ಕಿ': 'Rice', 'அரிசி': 'Rice', 'Rice': 'Rice',
    'गेहूं': 'Wheat', 'ಗೋಧಿ': 'Wheat', 'கோதுமை': 'Wheat', 'Wheat': 'Wheat',
    'प्याज': 'Onion', 'ಈರುಳ್ಳಿ': 'Onion', 'வெங்காயம்': 'Onion', 'Onion': 'Onion',
    'आलू': 'Potato', 'ಆಲೂಗಡ್ಡೆ': 'Potato', 'உருளைக்கிழங்கு': 'Potato', 'Potato': 'Potato',
    'टमाटर': 'Tomato', 'ಟೊಮೇಟೊ': 'Tomato', 'தக்காளி': 'Tomato', 'Tomato': 'Tomato',
    'मिर्च': 'Chili', 'ಮೆಣಸಿನಕಾಯಿ': 'Chili', 'மிளகாய்': 'Chili', 'Chili': 'Chili'
  };

  const states = {
    hindi: ['केरल', 'कर्नाटक', 'तमिलनाडु', 'महाराष्ट्र', 'पंजाब', 'हरियाणा', 'उत्तर प्रदेश', 'राजस्थान'],
    kannada: ['ಕೇರಳ', 'ಕರ್ನಾಟಕ', 'ತಮಿಳುನಾಡು', 'ಮಹಾರಾಷ್ಟ್ರ', 'ಪಂಜಾಬ್', 'ಹರಿಯಾಣ', 'ಉತ್ತರ ಪ್ರದೇಶ', 'ರಾಜಸ್ಥಾನ'],
    tamil: ['கேரளா', 'கர்நாடகா', 'தமிழ்நாடு', 'மகாராஷ்டிரா', 'பஞ்சாப்', 'ஹரியானா', 'உத்தரபிரதேசம்', 'ராஜஸ்தான்'],
    english: ['Kerala', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan']
  };

  const stateMapping: { [key: string]: string } = {
    'केरल': 'Kerala', 'ಕೇರಳ': 'Kerala', 'கேரளா': 'Kerala', 'Kerala': 'Kerala',
    'कर्नाटक': 'Karnataka', 'ಕರ್ನಾಟಕ': 'Karnataka', 'கர்நாடகா': 'Karnataka', 'Karnataka': 'Karnataka',
    'तमिलनाडु': 'Tamil Nadu', 'ತಮಿಳುನಾಡು': 'Tamil Nadu', 'தமிழ்நாடு': 'Tamil Nadu', 'Tamil Nadu': 'Tamil Nadu',
    'महाराष्ट्र': 'Maharashtra', 'ಮಹಾರಾಷ್ಟ್ರ': 'Maharashtra', 'மகாராஷ்டிரா': 'Maharashtra', 'Maharashtra': 'Maharashtra',
    'पंजाब': 'Punjab', 'ಪಂಜಾಬ್': 'Punjab', 'பஞ்சாப்': 'Punjab', 'Punjab': 'Punjab',
    'हरियाणा': 'Haryana', 'ಹರಿಯಾಣ': 'Haryana', 'ஹரியானா': 'Haryana', 'Haryana': 'Haryana',
    'उत्तर प्रदेश': 'Uttar Pradesh', 'ಉತ್ತರ ಪ್ರದೇಶ': 'Uttar Pradesh', 'உத்தரபிரதேசம்': 'Uttar Pradesh', 'Uttar Pradesh': 'Uttar Pradesh',
    'राजस्थान': 'Rajasthan', 'ರಾಜಸ್ಥಾನ': 'Rajasthan', 'ராஜஸ்தான்': 'Rajasthan', 'Rajasthan': 'Rajasthan'
  };

  const fetchMarketData = async () => {
    if (!selectedVariety || !selectedState) return;

    setIsLoading(true);
    setError(null);

    try {
      const varietyParam = varietyMapping[selectedVariety];
      const stateParam = stateMapping[selectedState];
      
      const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001aba79f07780a439a665a7e0bb5f60996&format=json&filters%5Bvariety%5D=${encodeURIComponent(varietyParam)}&filters%5Bstate%5D=${encodeURIComponent(stateParam)}&limit=50`;
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.status === 'ok' && data.records) {
        setMarketData(data.records);
        setLastUpdated(new Date());
      } else {
        throw new Error('No data available for selected criteria');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
      setMarketData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAveragePrice = () => {
    if (marketData.length === 0) return 0;
    const sum = marketData.reduce((acc, record) => acc + parseFloat(record.modal_price), 0);
    return Math.round(sum / marketData.length);
  };

  const getLowestPrice = () => {
    if (marketData.length === 0) return 0;
    return Math.min(...marketData.map(record => parseFloat(record.min_price)));
  };

  const getHighestPrice = () => {
    if (marketData.length === 0) return 0;
    return Math.max(...marketData.map(record => parseFloat(record.max_price)));
  };

  const titles = {
    hindi: 'बाजार बोलो - मंडी गुरु',
    kannada: 'ಬಜಾರ್ ಬೋಲೋ - ಮಂಡಿ ಗುರು',
    tamil: 'பஜார் போலோ - மண்டி குரு',
    english: 'Market Guru - Real-time Prices'
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">
            {language === 'hindi' ? 'वापस' :
             language === 'kannada' ? 'ಹಿಂದೆ' :
             language === 'tamil' ? 'பின்னால்' :
             'Back'}
          </span>
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
        {/* Title Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl">📈</span>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {titles[language]}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'hindi' ? 'भारत सरकार के वास्तविक समय डेटा से लाइव मंडी कीमतें' :
             language === 'kannada' ? 'ಭಾರತ ಸರಕಾರದ ನೈಜ ಸಮಯ ಡೇಟಾದಿಂದ ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು' :
             language === 'tamil' ? 'இந்திய அரசின் நேரடி தரவிலிருந்து உயிரோட்டமான மண்டி விலைகள்' :
             'Live market prices from real-time Government of India data'}
          </p>
          
          {/* Feature Highlights */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="flex items-center space-x-2 text-blue-600">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === 'hindi' ? 'सरकारी डेटा' :
                 language === 'kannada' ? 'ಸರ್ಕಾರಿ ಡೇಟಾ' :
                 language === 'tamil' ? 'அரசு தரவு' :
                 'Government Data'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === 'hindi' ? 'रीयल-टाइम' :
                 language === 'kannada' ? 'ನೈಜ-ಸಮಯ' :
                 language === 'tamil' ? 'நேரடி காலம்' :
                 'Real-time'}
              </span>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700 flex items-center space-x-2">
              <span className="text-2xl">🌾</span>
              <span>
                {language === 'hindi' ? 'फसल चुनें' :
                 language === 'kannada' ? 'ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ' :
                 language === 'tamil' ? 'பயிரைத் தேர்ந்தெடுக்கவும்' :
                 'Select Crop'}
              </span>
            </label>
            <select
              value={selectedVariety}
              onChange={(e) => setSelectedVariety(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-lg"
            >
              <option value="">
                {language === 'hindi' ? 'फसल चुनें' :
                 language === 'kannada' ? 'ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ' :
                 language === 'tamil' ? 'பயிரைத் தேர்ந்தெடுக்கவும்' :
                 'Select Crop'}
              </option>
              {varieties[language].map((variety, index) => (
                <option key={index} value={variety}>{variety}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700 flex items-center space-x-2">
              <span className="text-2xl">🏛️</span>
              <span>
                {language === 'hindi' ? 'राज्य चुनें' :
                 language === 'kannada' ? 'ರಾಜ್ಯ ಆಯ್ಕೆ ಮಾಡಿ' :
                 language === 'tamil' ? 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்' :
                 'Select State'}
              </span>
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-lg"
            >
              <option value="">
                {language === 'hindi' ? 'राज्य चुनें' :
                 language === 'kannada' ? 'ರಾಜ್ಯ ಆಯ್ಕೆ ಮಾಡಿ' :
                 language === 'tamil' ? 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்' :
                 'Select State'}
              </option>
              {states[language].map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={fetchMarketData}
          disabled={!selectedVariety || !selectedState || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg font-semibold flex items-center justify-center space-x-3"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>
                {language === 'hindi' ? 'डेटा लोड हो रहा है...' :
                 language === 'kannada' ? 'ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...' :
                 language === 'tamil' ? 'தரவு ஏற்றப்படுகிறது...' :
                 'Loading Data...'}
              </span>
            </>
          ) : (
            <>
              <RefreshCw className="w-6 h-6" />
              <span>
                {language === 'hindi' ? 'लाइव कीमत देखें' :
                 language === 'kannada' ? 'ಲೈವ್ ಬೆಲೆ ನೋಡಿ' :
                 language === 'tamil' ? 'நேரடி விலையைப் பார்க்கவும்' :
                 'Get Live Prices'}
              </span>
            </>
          )}
        </button>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">
                {language === 'hindi' ? 'त्रुटि: ' :
                 language === 'kannada' ? 'ದೋಷ: ' :
                 language === 'tamil' ? 'பிழை: ' :
                 'Error: '}
                {error}
              </span>
            </div>
          </div>
        )}

        {/* Market Data Results */}
        {marketData.length > 0 && (
          <div className="mt-10 space-y-8">
            {/* Last Updated */}
            {lastUpdated && (
              <div className="text-center text-sm text-gray-500 bg-blue-50 p-3 rounded-2xl">
                <Calendar className="w-4 h-4 inline mr-2" />
                {language === 'hindi' ? 'अंतिम अपडेट: ' :
                 language === 'kannada' ? 'ಕೊನೆಯ ನವೀಕರಣ: ' :
                 language === 'tamil' ? 'கடைசி புதுப்பிப்பு: ' :
                 'Last Updated: '}
                {lastUpdated.toLocaleString()}
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-100 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">₹{calculateAveragePrice()}</div>
                <div className="text-sm text-gray-600 font-medium">
                  {language === 'hindi' ? 'औसत कीमत (प्रति क्विंटल)' :
                   language === 'kannada' ? 'ಸರಾಸರಿ ಬೆಲೆ (ಪ್ರತಿ ಕ್ವಿಂಟಲ್)' :
                   language === 'tamil' ? 'சராசரி விலை (ஒரு குவின்டலுக்கு)' :
                   'Average Price (per quintal)'}
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border-2 border-green-100 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">₹{getLowestPrice()}</div>
                <div className="text-sm text-gray-600 font-medium">
                  {language === 'hindi' ? 'न्यूनतम कीमत' :
                   language === 'kannada' ? 'ಕನಿಷ್ಠ ಬೆಲೆ' :
                   language === 'tamil' ? 'குறைந்தபட்ச விலை' :
                   'Minimum Price'}
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl border-2 border-red-100 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-red-600 mb-2">₹{getHighestPrice()}</div>
                <div className="text-sm text-gray-600 font-medium">
                  {language === 'hindi' ? 'अधिकतम कीमत' :
                   language === 'kannada' ? 'ಗರಿಷ್ಠ ಬೆಲೆ' :
                   language === 'tamil' ? 'அதிகபட்ச விலை' :
                   'Maximum Price'}
                </div>
              </div>
            </div>

            {/* Market Details */}
            <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <span className="text-3xl">🏪</span>
                <span>
                  {language === 'hindi' ? `${stateMapping[selectedState]} की मंडियों की कीमतें (${marketData.length} मंडियां)` :
                   language === 'kannada' ? `${stateMapping[selectedState]} ಮಂಡಿಗಳ ಬೆಲೆಗಳು (${marketData.length} ಮಂಡಿಗಳು)` :
                   language === 'tamil' ? `${stateMapping[selectedState]} மண்டிகளின் விலைகள் (${marketData.length} மண்டிகள்)` :
                   `${stateMapping[selectedState]} Market Prices (${marketData.length} Markets)`}
                </span>
              </h3>
              
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {marketData.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{record.market}</div>
                        <div className="text-sm text-gray-500">{record.district}, {record.state}</div>
                        <div className="text-xs text-gray-400">{record.commodity} - {record.variety}</div>
                        <div className="text-xs text-blue-600">
                          {language === 'hindi' ? 'आगमन: ' :
                           language === 'kannada' ? 'ಆಗಮನ: ' :
                           language === 'tamil' ? 'வருகை: ' :
                           'Arrival: '}
                          {record.arrival_date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">₹{record.modal_price}</div>
                      <div className="text-sm text-gray-500">
                        {language === 'hindi' ? 'मोडल प्राइस' :
                         language === 'kannada' ? 'ಮೋಡಲ್ ಬೆಲೆ' :
                         language === 'tamil' ? 'மோடல் விலை' :
                         'Modal Price'}
                      </div>
                      <div className="text-xs text-gray-400">
                        ₹{record.min_price} - ₹{record.max_price}
                      </div>
                      <div className="text-xs text-blue-600">{record.grade}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Source Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-blue-800">
                    {language === 'hindi' ? 'डेटा स्रोत' :
                     language === 'kannada' ? 'ಡೇಟಾ ಮೂಲ' :
                     language === 'tamil' ? 'தரவு மூலம்' :
                     'Data Source'}
                  </h4>
                  <p className="text-blue-700 text-sm">
                    {language === 'hindi' ? 'भारत सरकार, कृषि और किसान कल्याण मंत्रालय - data.gov.in' :
                     language === 'kannada' ? 'ಭಾರತ ಸರ್ಕಾರ, ಕೃಷಿ ಮತ್ತು ರೈತ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ - data.gov.in' :
                     language === 'tamil' ? 'இந்திய அரசு, விவசாயம் மற்றும் விவசாயிகள் நலன்புரி அமைச்சகம் - data.gov.in' :
                     'Government of India, Ministry of Agriculture and Farmers Welfare - data.gov.in'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BazaarBolo;