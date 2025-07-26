# KrishiMitra - AI-Powered Agricultural Assistant

## Project Overview
Create a stunning React + Tailwind CSS application for **KrishiMitra**, a multi-agent AI-powered voice and chat assistant designed specifically for India's small-scale farmers. The application should provide localized, intelligent agricultural support through natural conversation and multimodal inputs.

## Core Value Proposition
Empower farmers to make informed decisions through:
- 🔬 **Instant crop disease diagnosis** via image uploads
- 📊 **Real-time market insights** with actionable sell/wait guidance  
- 🏛️ **Government scheme navigation** with simplified explanations
- 🛡️ **Wildlife threat protection** using GPS and community data
- 🗣️ **Native language support** for voice and chat interactions

## Feature Requirements

### 🤖 **Centralized AI Chat Assistant (Primary Feature)**
**Functionality**: Unified conversational interface for all agricultural needs

#### Core Chat Capabilities
- **Universal Query Handling**: Single interface to access all KrishiMitra features through natural conversation
- **Intelligent Routing**: Automatically detects user intent and routes to appropriate feature (RogiRakho, BazaarBolo, YojanaYodha, or Rakshak)
- **Context Awareness**: Maintains conversation history and understands follow-up questions
- **Multi-Modal Input**: Supports text, voice, and image inputs within the same chat flow

#### Smart Query Examples
```
👨‍🌾 "मेरी फसल में पीले दाग हैं" → Routes to RogiRakho (Crop Doctor)
👨‍🌾 "टमाटर का भाव क्या है?" → Routes to BazaarBolo (Market Guru)  
👨‍🌾 "किसान योजना के बारे में बताओ" → Routes to YojanaYodha (Scheme Guide)
👨‍🌾 "जंगली सुअर की समस्या है" → Routes to Rakshak (Wildlife Alert)
👨‍🌾 "आज कैसा मौसम है और क्या करूं?" → Multi-feature response
```

#### Advanced Chat Features
- **Quick Actions**: Pre-defined buttons for common tasks ("Take Photo", "Check Prices", "Find Schemes")
- **Smart Suggestions**: Context-aware follow-up questions and recommendations
- **Session Memory**: Remembers farmer's crops, location, and preferences within conversation
- **Rich Responses**: Cards, images, charts, and interactive elements embedded in chat
- **Conversation Branching**: Ability to switch between topics while maintaining context

#### Voice Integration
- **Push-to-Talk**: Long press for voice input with visual feedback
- **Continuous Listening**: "Hey KrishiMitra" wake word activation
- **Voice Response**: AI speaks back responses in farmer's preferred language
- **Background Listening**: Passive monitoring for emergency keywords (wildlife threats)

#### UI/UX Design Requirements

##### Chat Interface Layout
```
┌─────────────────────────────────┐
│ 🌾 KrishiMitra      [🔔] [⚙️]   │ ← Header with notifications & settings
├─────────────────────────────────┤
│                                 │
│  🤖 नमस्ते! मैं आपका कृषि       │ ← AI message bubble (left-aligned)
│     सहायक हूं। कैसे मदद करूं?   │   
│                                 │
│           आज टमाटर का भाव   🧑‍🌾 │ ← User message bubble (right-aligned)
│           क्या है?              │
│                                 │
│  🤖 [📊 Market Card]            │ ← Rich response with embedded card
│     टमाटर: ₹25/किलो             │
│     📈 कल से 5% ऊपर             │ 
│     💡 सुझाव: 2-3 दिन और इंतज़ार │
│                                 │
│     [📸 फोटो] [💰 भाव] [🏛️ योजना] │ ← Quick action buttons
├─────────────────────────────────┤
│ [🎤]  Type your message... [📷] │ ← Input area with voice & camera
└─────────────────────────────────┘
```

##### Visual Design Elements
- **Message Bubbles**: Rounded corners with farmer-friendly colors (AI: light green, User: earth brown)
- **Rich Cards**: Embedded interactive cards for disease diagnosis, price charts, scheme details
- **Typing Indicators**: Animated dots showing AI is thinking/processing
- **Voice Visualization**: Waveform animation during voice input/output
- **Quick Actions**: Contextual suggestion chips that appear based on conversation

##### Responsive Behavior
- **Auto-scroll**: Always scroll to latest message
- **Message Grouping**: Group consecutive messages from same sender
- **Timestamp**: Show relative time ("2 मिनट पहले") on message hover
- **Read Receipts**: Show message delivery and read status

#### Feature Integration Flows

##### 🌾 RogiRakho Integration
```
User: "मेरी फसल बीमार लग रही है"
AI: "मैं आपकी मदद कर सकता हूं! कृपया फसल की फोटो भेजें"
[📸 फोटो लें] button appears
User: *uploads image*
AI: "यह जड़ सड़न की समस्या है। इलाज के तरीके..."
[🔍 और जानकारी] [💊 दवा की जानकारी] buttons
```

##### 📈 BazaarBolo Integration  
```
User: "प्याज़ बेचूं या इंतज़ार करूं?"
AI: "आपका location कहां है?"
User: "पुणे"
AI: [📊 Price Chart] "पुणे मंडी: ₹18/किलो, सुझाव: 1 सप्ताह इंतज़ार"
[📈 ट्रेंड देखें] [🔔 अलर्ट सेट करें] buttons
```

##### 🏛️ YojanaYodha Integration
```
User: "ड्रिप इरिगेशन के लिए कोई योजना है?"
AI: "हां! प्रधानमंत्री कृषि सिंचाई योजना उपलब्ध है"
[📋 Scheme Card] with eligibility, documents, application link
[🔖 सेव करें] [📞 संपर्क करें] buttons
```

##### 🐘 Rakshak Integration
```
AI: "⚠️ अलर्ट: आपके क्षेत्र में हाथी देखे गए हैं"
[🚨 Safety Card] with immediate precautions
User: "क्या करूं?"
AI: "तुरंत सुरक्षित जगह जाएं। ये तरीके अपनाएं..."
[📞 Emergency Contact] [📍 Safe Zones] buttons
```

#### Technical Implementation

##### State Management
```typescript
interface ChatState {
  messages: Message[]
  currentContext: 'general' | 'crop' | 'market' | 'scheme' | 'wildlife'
  userProfile: {
    language: 'hi' | 'kn' | 'ta' | 'en'
    location: string
    crops: string[]
    preferences: object
  }
  activeSession: {
    sessionId: string
    startTime: Date
    lastActivity: Date
  }
}
```

##### Message Types
```typescript
interface Message {
  id: string
  type: 'text' | 'voice' | 'image' | 'card' | 'action'
  sender: 'user' | 'ai'
  content: string | RichCard | ActionButtons
  timestamp: Date
  language: string
  metadata?: {
    feature: 'rogirakho' | 'bazaarbolo' | 'yojanayodha' | 'rakshak'
    confidence: number
    context: object
  }
}
```

##### AI Intent Recognition
```typescript
interface IntentClassification {
  primary_intent: 'disease' | 'market' | 'scheme' | 'wildlife' | 'general'
  confidence: number
  entities: {
    crop?: string
    location?: string
    scheme_type?: string
    disease_symptoms?: string[]
  }
  suggested_actions: QuickAction[]
}
```

#### Conversation Flows & Examples

##### Multi-Turn Conversation
```
👨‍🌾 "मेरी खेती में समस्या है"
🤖 "मैं आपकी मदद करूंगा। क्या समस्या है - फसल की बीमारी, बाज़ार का भाव, या कुछ और?"

👨‍🌾 "फसल में कीड़े लग गए हैं"  
🤖 "फसल की फोटो भेजें ताकि मैं बेहतर सलाह दे सकूं"
[📸 फोटो लें]

👨‍🌾 *uploads image*
🤖 "यह माहू कीट है। स्प्रे करें: नीम ऑयल 5ml/लीटर पानी में मिलाकर"
[💊 दवा का नाम] [🛒 कहां मिलेगी] [⏰ कब स्प्रे करें]

👨‍🌾 "इसके बाद क्या करूं?"
🤖 "3 दिन बाद दोबारा चेक करें। अगर कीड़े अभी भी हैं तो chemical spray करें।"
[🔔 3 दिन का रिमाइंडर सेट करें]

👨‍🌾 "ठीक है। अब बताओ टमाटर का भाव क्या है?"
🤖 "आपके क्षेत्र (पुणे) में आज टमाटर ₹22/किलो है। कल से ₹3 ज्यादा।"
[📊 1 हफ्ते का चार्ट देखें] [💰 बेचने का सही समय]
```

#### Performance & Optimization
- **Response Time**: <2 seconds for text responses, <5 seconds for complex analysis
- **Offline Mode**: Cache common responses and allow offline query queuing
- **Data Usage**: Optimize for low-bandwidth with progressive image loading
- **Voice Processing**: Local speech-to-text for privacy and speed

#### Analytics & Learning
- **Query Patterns**: Track most common farmer questions to improve responses
- **Success Metrics**: Measure task completion rates for each feature integration
- **User Feedback**: In-chat thumbs up/down for response quality
- **Conversation Analytics**: Understanding farmer behavior and pain points

---

### 1. 🌾 RogiRakho (Crop Doctor)
**Functionality**: Instant crop disease diagnosis
- Photo upload interface with camera integration
- AI-powered disease identification using Gemini Vision
- Clear, step-by-step local remedy recommendations
- Visual progress tracking for treatment effectiveness

### 2. 📈 BazaarBolo (Market Guru) 
**Functionality**: Market price intelligence
- Real-time mandi price fetching and display
- Historical price trend visualization
- Clear "Sell Now" or "Wait" recommendations with reasoning
- Price alerts and notifications

### 3. 🏛️ YojanaYodha (Scheme Guide)
**Functionality**: Government scheme assistance
- Natural language scheme queries
- Simplified scheme explanations with eligibility criteria
- Direct application links and document checklists
- Bookmark favorite schemes

### 4. 🐘 Rakshak (Wildlife Alert)
**Functionality**: Wildlife threat management
- GPS-based risk zone detection
- Real-time community-sourced alerts
- Voice-delivered prevention tips and safety measures
- Emergency contact integration

### 5. 🗣️ Multilingual Voice + Chat Interface
**Functionality**: Accessible communication
- Voice recognition and synthesis in Kannada, Hindi, Tamil
- Seamless language switching
- Chat and voice mode toggle
- Offline voice processing capabilities

### 6. 🧠 Adaptive Mood-Based UX
**Functionality**: Personalized user experience
- Daily mood selection (Neutral 😐 / Stressed 😟 / Hopeful 😊)
- Tone adaptation based on farmer's emotional state
- Contextual guidance and encouragement

## Technical Specifications

### Frontend Stack
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Context API or Zustand
- **Routing**: React Router v6

### AI & Backend Integration
- **AI Platform**: Vertex AI Agent Builder with Gemini Models
- **Backend**: Firebase Studio
- **Database**: Firestore for real-time data
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage for images

### Performance & Accessibility
- **Offline Support**: Service workers with offline fallback
- **Low-Data Mode**: Optimized for rural internet connectivity
- **PWA Features**: Installable app with push notifications
- **Accessibility**: WCAG 2.1 AA compliance, voice navigation

## UI/UX Design Requirements

### Design System
- **Theme**: Agricultural-inspired color palette (greens, earth tones)
- **Typography**: High contrast, readable fonts supporting Indic scripts
- **Icons**: Custom agricultural iconography
- **Layout**: Mobile-first responsive design

### User Experience
- **Navigation**: Simple, icon-driven bottom navigation
- **Onboarding**: Interactive tutorial with voice guidance
- **Feedback**: Haptic feedback and audio confirmations
- **Loading States**: Engaging agricultural-themed animations

### Voice Interface
- **Voice Controls**: Hands-free navigation throughout the app
- **Speech Feedback**: Audio confirmations for all actions
- **Noise Handling**: Background noise filtering for rural environments

## Sample Screens to Create

1. **Home Dashboard** - Quick access to all features with weather widget
2. **Language Selection** - Initial setup with voice preview
3. **Mood Selection** - Daily check-in with emoji selection
4. **RogiRakho Camera** - Disease diagnosis with guided photo capture
5. **BazaarBolo Markets** - Price dashboard with trend charts
6. **YojanaYodha Search** - Scheme discovery with filters
7. **Rakshak Alerts** - Wildlife threat map with safety tips
8. **Voice Chat Interface** - Conversational AI with waveform visualization
9. **Profile Settings** - Language, notifications, and offline preferences

## Implementation Priorities

### Phase 1: Core Features
- Basic navigation and routing
- Language selection and switching
- Voice interface foundation
- RogiRakho image upload and basic diagnosis

### Phase 2: Enhanced Features  
- BazaarBolo market data integration
- YojanaYodha scheme database
- Rakshak GPS and alert system

### Phase 3: Advanced Features
- Mood-based UX adaptation
- Offline capabilities
- Push notifications
- Performance optimization

## Success Metrics
- **Usability**: One-handed operation for 80% of features
- **Performance**: <3 second load times on 2G networks  
- **Accessibility**: Voice navigation for all core functions
- **Localization**: Full functionality in 3 regional languages

---

**Note**: Focus on creating an intuitive, farmer-friendly interface that works reliably in challenging rural conditions with limited internet connectivity. 