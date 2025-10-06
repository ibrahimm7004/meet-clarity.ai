# Clarity Interview Assistant - Chrome Extension

## AI-Powered Interview Assistant

Clarity uses a secure AI gateway (powered by Google Gemini) to provide real-time interview assistance with enterprise-grade features.

## Features

### 🚀 Real-Time AI Answers (0.3s Response)

Get instant, contextual answers to interview questions powered by Google Gemini 2.5 Flash. The AI analyzes your question and provides concise, professional responses in under a second.

### 📝 Smart Note-Taking

Automatic categorization of your interview notes:

- Technical Questions
- Behavioral Questions
- Company Culture
- Role Details
- Next Steps

### ✉️ Follow-Up Email Generation

AI generates personalized, professional follow-up emails based on your interview notes and conversation context.

### 📊 Performance Insights & Interview Reports

Get detailed performance analysis including:

- Overall performance score (0-100)
- Strengths and areas for improvement
- Key insights and observations
- Actionable recommendations

### 🎨 Zero Distraction Design

Translucent overlay with glassmorphism design that stays visible but doesn't interfere with your video call.

## Installation Instructions

### For Developers (Local Testing)

1. **Download the Extension**

   - Download and unzip `clarity-extension.zip`

2. **Load in Chrome**

   - Open `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the unzipped `clarity-extension` folder

3. **Start Using**
   - Visit Zoom, Google Meet, or Microsoft Teams
   - Click the Clarity extension icon or use `Cmd+Shift+C` (Mac) / `Ctrl+Shift+C` (Windows)

## Supported Platforms

- ✅ Zoom (web client)
- ✅ Google Meet
- ✅ Microsoft Teams

## Backend Integration

This extension connects to a secure backend for all AI features:

- **Real-time AI answer generation** via Gemini 2.5 Flash
- **Smart note categorization** with AI analysis
- **Email generation** with professional templates
- **Performance analysis** and scoring

All AI processing happens securely in our backend - no API keys required from users.

## Privacy & Security

- 🔒 No audio data stored permanently
- ✅ Secure backend API processing
- 🚫 No third-party data sharing
- 🛡️ Local-first approach for user data

## Coming Soon

- 📱 Chrome Web Store publication
- 🌐 Additional platform support
- 🎯 Enhanced AI features
- 📱 Mobile companion app

## Support

For issues or questions: https://clarity-interview.lovable.app/#contact

## Technology

Built with:

- **Frontend**: Chrome Extension Manifest V3
- **Backend**: Supabase Edge Functions
- **AI**: Gemini 2.5 Flash
- **Design**: Glassmorphism with translucent overlay
