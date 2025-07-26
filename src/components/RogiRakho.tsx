import React, { useState } from 'react';
import { ArrowLeft, Camera, Upload, Loader, CheckCircle, AlertCircle, Sparkles, Zap, Target } from 'lucide-react';

type Language = 'hindi' | 'kannada' | 'tamil' | 'english';

interface RogiRakhoProps {
  onBack: () => void;
  language: Language;
}

const RogiRakho: React.FC<RogiRakhoProps> = ({ onBack, language }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setTimeout(() => {
          setIsAnalyzing(true);
          setTimeout(() => {
            setIsAnalyzing(false);
            setDiagnosis({
              disease: 'Leaf Blight',
              severity: 'Moderate',
              confidence: 92,
              treatment: [
                'Remove affected leaves immediately',
                'Apply copper-based fungicide',
                'Ensure proper drainage',
                'Reduce watering frequency'
              ]
            });
          }, 3000);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const titles = {
    hindi: 'रोगी रक्षो - फसल डॉक्टर',
    kannada: 'ರೋಗಿ ರಕ್ಷೋ - ಬೆಳೆ ಡಾಕ್ಟರ್',
    tamil: 'ரோகி ரக்ஷோ - பயிர் மருத்துவர்',
    english: 'Crop Doctor - Disease Diagnosis'
  };

  const instructions = {
    hindi: 'अपनी फसल की तस्वीर अपलोड करें और तुरंत AI निदान पाएं',
    kannada: 'ನಿಮ್ಮ ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣದ AI ರೋಗನಿರ್ಣಯ ಪಡೆಯಿರಿ',
    tamil: 'உங்கள் பயிரின் படத்தை பதிவேற்றி உடனடி AI நோயறிதலைப் பெறுங்கள்',
    english: 'Upload your crop image and get instant AI diagnosis'
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
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
            <div className="relative group">
              <div className="w-24 h-24 bg-primary-500 rounded-3xl flex items-center justify-center shadow-colored-primary hover-glow">
                <span className="text-4xl">🌿</span>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-warning-500 rounded-full flex items-center justify-center shadow-medium">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-2 bg-primary-500/20 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold font-display gradient-text mb-4">
            {titles[language]}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {instructions[language]}
          </p>
          
          {/* Feature Highlights */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="flex items-center space-x-2 text-green-600">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === 'hindi' ? 'तुरंत परिणाम' :
                 language === 'kannada' ? 'ತಕ್ಷಣದ ಫಲಿತಾಂಶ' :
                 language === 'tamil' ? 'உடனடி முடிவு' :
                 'Instant Results'}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === 'hindi' ? '95% सटीकता' :
                 language === 'kannada' ? '95% ನಿಖರತೆ' :
                 language === 'tamil' ? '95% துல்லியம்' :
                 '95% Accuracy'}
              </span>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        {!uploadedImage && (
          <div className="relative">
            <div className="border-3 border-dashed border-emerald-300 rounded-3xl p-16 text-center bg-gradient-to-br from-emerald-50/50 to-green-50/50 hover:from-emerald-50 hover:to-green-50 transition-all duration-300">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Camera className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-2xl">📸</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'hindi' ? 'फसल की तस्वीर लें या अपलोड करें' :
                 language === 'kannada' ? 'ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ' :
                 language === 'tamil' ? 'பயிர் படத்தை எடுக்கவும் அல்லது பதிவேற்றவும்' :
                 'Take or Upload Crop Photo'}
              </h3>
              
              <p className="text-gray-600 mb-8 text-lg">
                {language === 'hindi' ? 'स्पष्ट तस्वीर लें जिसमें पत्तियां और तना दिखाई दे। हमारा AI तुरंत समस्या की पहचान करेगा।' :
                 language === 'kannada' ? 'ಎಲೆಗಳು ಮತ್ತು ಕಾಂಡ ಕಾಣಿಸುವ ಸ್ಪಷ್ಟ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ. ನಮ್ಮ AI ತಕ್ಷಣವೇ ಸಮಸ್ಯೆಯನ್ನು ಗುರುತಿಸುತ್ತದೆ.' :
                 language === 'tamil' ? 'இலைகள் மற்றும் தண்டு தெரியும் தெளிவான படத்தை எடுக்கவும். எங்கள் AI உடனடியாக பிரச்சனையை கண்டறியும்.' :
                 'Take clear photo showing leaves and stem. Our AI will instantly identify the problem.'}
              </p>
              
              <label className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-green-700 cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg font-semibold">
                <Upload className="w-6 h-6" />
                <span>
                  {language === 'hindi' ? 'तस्वीर अपलोड करें' :
                   language === 'kannada' ? 'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ' :
                   language === 'tamil' ? 'படத்தை பதிவேற்றவும்' :
                   'Upload Photo'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              <div className="mt-6 text-sm text-gray-500">
                {language === 'hindi' ? 'JPG, PNG या HEIC फॉर्मेट में' :
                 language === 'kannada' ? 'JPG, PNG ಅಥವಾ HEIC ಫಾರ್ಮ್ಯಾಟ್‌ನಲ್ಲಿ' :
                 language === 'tamil' ? 'JPG, PNG அல்லது HEIC வடிவத்தில்' :
                 'JPG, PNG or HEIC format'}
              </div>
            </div>
          </div>
        )}

        {/* Uploaded Image */}
        {uploadedImage && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded crop"
                  className="max-w-md rounded-3xl shadow-2xl border-4 border-white"
                />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Analysis Status */}
            {isAnalyzing && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-2xl">
                <div className="flex items-center">
                  <div className="relative">
                    <Loader className="w-8 h-8 text-blue-500 animate-spin mr-4" />
                    <div className="absolute inset-0 w-8 h-8 border-2 border-blue-200 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <span className="text-blue-700 font-semibold text-lg">
                      {language === 'hindi' ? 'AI द्वारा विश्लेषण हो रहा है...' :
                       language === 'kannada' ? 'AI ಮೂಲಕ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...' :
                       language === 'tamil' ? 'AI மூலம் பகுப்பாய்வு செய்யப்படுகிறது...' :
                       'Analyzing with AI...'}
                    </span>
                    <p className="text-blue-600 text-sm mt-1">
                      {language === 'hindi' ? 'कृपया प्रतीक्षा करें, हम आपकी फसल की जांच कर रहे हैं' :
                       language === 'kannada' ? 'ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ, ನಾವು ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಪರೀಕ್ಷಿಸುತ್ತಿದ್ದೇವೆ' :
                       language === 'tamil' ? 'தயவுசெய்து காத்திருங்கள், நாங்கள் உங்கள் பயிரை பரிசோதித்து வருகிறோம்' :
                       'Please wait, we are examining your crop'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Diagnosis Results */}
            {diagnosis && !isAnalyzing && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-2xl">
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mr-4" />
                    <div>
                      <span className="text-green-700 font-bold text-xl">
                        {language === 'hindi' ? 'निदान पूर्ण!' :
                         language === 'kannada' ? 'ರೋಗನಿರ್ಣಯ ಪೂರ್ಣ!' :
                         language === 'tamil' ? 'நோயறிதல் முடிந்தது!' :
                         'Diagnosis Complete!'}
                      </span>
                      <p className="text-green-600 text-sm mt-1">
                        {language === 'hindi' ? 'आपकी फसल की समस्या की पहचान हो गई है' :
                         language === 'kannada' ? 'ನಿಮ್ಮ ಬೆಳೆಯ ಸಮಸ್ಯೆ ಗುರುತಿಸಲಾಗಿದೆ' :
                         language === 'tamil' ? 'உங்கள் பயிரின் பிரச்சனை கண்டறியப்பட்டது' :
                         'Your crop problem has been identified'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <span>
                      {language === 'hindi' ? 'रोग की पहचान' :
                       language === 'kannada' ? 'ರೋಗ ಪತ್ತೆ' :
                       language === 'tamil' ? 'நோய் கண்டறிதல்' :
                       'Disease Identification'}
                    </span>
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-100">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-2xl">🦠</span>
                      </div>
                      <div className="font-bold text-red-700 text-lg">
                        {language === 'hindi' ? 'पत्ती धब्बा रोग' :
                         language === 'kannada' ? 'ಎಲೆ ಕಲೆ ರೋಗ' :
                         language === 'tamil' ? 'இலை புள்ளி நோய்' :
                         'Leaf Blight'}
                      </div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-2xl">⚠️</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600">
                        {language === 'hindi' ? 'मध्यम' :
                         language === 'kannada' ? 'ಮಧ್ಯಮ' :
                         language === 'tamil' ? 'மிதமான' :
                         'Moderate'}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {language === 'hindi' ? 'गंभीरता' :
                         language === 'kannada' ? 'ತೀವ್ರತೆ' :
                         language === 'tamil' ? 'தீவிரம்' :
                         'Severity'}
                      </div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <div className="text-sm text-gray-600 font-medium">
                        {language === 'hindi' ? 'सटीकता' :
                         language === 'kannada' ? 'ನಿಖರತೆ' :
                         language === 'tamil' ? 'துல்லியம்' :
                         'Accuracy'}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <span className="text-2xl">💊</span>
                    <span>
                      {language === 'hindi' ? 'उपचार की सिफारिश' :
                       language === 'kannada' ? 'ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸು' :
                       language === 'tamil' ? 'சிகிச்சை பரிந்துரை' :
                       'Treatment Recommendation'}
                    </span>
                  </h4>
                  
                  <div className="space-y-4">
                    {[
                      {
                        hindi: 'प्रभावित पत्तियों को तुरंत हटाएं और जला दें',
                        kannada: 'ಪ್ರಭಾವಿತ ಎಲೆಗಳನ್ನು ತಕ್ಷಣವೇ ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಸುಡಿ',
                        tamil: 'பாதிக்கப்பட்ட இலைகளை உடனடியாக அகற்றி எரிக்கவும்',
                        english: 'Remove affected leaves immediately and burn them'
                      },
                      {
                        hindi: 'तांबा आधारित फफूंदनाशी (कॉपर ऑक्सीक्लोराइड) का छिड़काव करें',
                        kannada: 'ತಾಮ್ರ ಆಧಾರಿತ ಶಿಲೀಂಧ್ರನಾಶಕ (ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್) ಸಿಂಪಡಿಸಿ',
                        tamil: 'தாமிர அடிப்படையிலான பூஞ்சைக் கொல்லி (காப்பர் ஆக்சிக்ளோரைடு) தெளிக்கவும்',
                        english: 'Apply copper-based fungicide (Copper Oxychloride)'
                      },
                      {
                        hindi: 'खेत में उचित जल निकासी सुनिश्चित करें',
                        kannada: 'ಹೊಲದಲ್ಲಿ ಸರಿಯಾದ ನೀರಿನ ಒಳಚರಂಡಿ ಖಚಿತಪಡಿಸಿ',
                        tamil: 'வயலில் சரியான நீர் வடிகால் உறுதிப்படுத்தவும்',
                        english: 'Ensure proper drainage in the field'
                      },
                      {
                        hindi: 'पानी देने की आवृत्ति कम करें और सुबह के समय पानी दें',
                        kannada: 'ನೀರುಹಾಕುವ ಆವರ್ತನವನ್ನು ಕಡಿಮೆ ಮಾಡಿ ಮತ್ತು ಬೆಳಿಗ್ಗೆ ನೀರು ಕೊಡಿ',
                        tamil: 'நீர் பாய்ச்சும் அதிர்வெண்ணைக் குறைத்து காலையில் நீர் கொடுங்கள்',
                        english: 'Reduce watering frequency and water in the morning'
                      }
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <div className="text-gray-700 font-medium">{step[language]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setDiagnosis(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-lg"
                  >
                    {language === 'hindi' ? 'नई तस्वीर अपलोड करें' :
                     language === 'kannada' ? 'ಹೊಸ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ' :
                     language === 'tamil' ? 'புதிய படத்தை பதிவேற்றவும்' :
                     'Upload New Photo'}
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-lg">
                    {language === 'hindi' ? 'विशेषज्ञ से बात करें' :
                     language === 'kannada' ? 'ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ' :
                     language === 'tamil' ? 'நிபுணருடன் பேசுங்கள்' :
                     'Talk to Expert'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RogiRakho;