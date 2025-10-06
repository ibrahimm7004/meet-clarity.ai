// Clarity Interview Assistant - Enhanced Content Script

const SUPABASE_URL = 'https://xilbxhenrooyftlyjbhn.supabase.co';

let overlay = null;
let isRecording = false;
let recognition = null;
let currentTranscript = '';
let currentSession = null;

// Initialize when page loads
(function initialize() {
  console.log('Clarity Interview Assistant loaded');
  
  // Wait for page to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuthAndCreateOverlay);
  } else {
    checkAuthAndCreateOverlay();
  }
  
  // Initialize speech recognition
  initializeSpeechRecognition();
})();

// Check authentication and create overlay
async function checkAuthAndCreateOverlay() {
  // Get session from storage
  const response = await chrome.runtime.sendMessage({ action: 'getSession' });
  currentSession = response?.session;
  
  createOverlay();
}

// Create floating overlay
function createOverlay() {
  if (overlay) return;
  
  overlay = document.createElement('div');
  overlay.id = 'clarity-overlay';
  
  if (!currentSession) {
    // Show auth required view
    overlay.innerHTML = `
      <div class="overlay-header">
        <div class="overlay-title">
          <span class="status-indicator"></span>
          Clarity Assistant
        </div>
        <div class="header-actions">
          <button class="header-btn" id="clarity-close">×</button>
        </div>
      </div>
      <div class="overlay-content">
        <div class="auth-required">
          <h3>✨ Welcome to Clarity</h3>
          <p>Sign in to unlock AI-powered interview assistance, smart note-taking, and performance insights.</p>
          <button class="auth-btn" id="auth-signin">Sign In / Sign Up</button>
        </div>
      </div>
    `;
  } else {
    // Show main interface
    overlay.innerHTML = `
      <div class="overlay-header">
        <div class="overlay-title">
          <span class="status-indicator"></span>
          Clarity Assistant
        </div>
        <div class="header-actions">
          <button class="header-btn" id="clarity-minimize" title="Minimize">−</button>
          <button class="header-btn" id="clarity-close" title="Close">×</button>
        </div>
      </div>
      
      <div class="usage-banner hidden" id="usage-banner">
        <span id="usage-text"></span>
        <a class="upgrade-link" id="upgrade-link">Upgrade to Pro</a>
      </div>
      
      <div class="overlay-content">
        <div class="status-message" id="status-message">
          Ready to assist in your interview
        </div>
        
        <div class="transcript-section">
          <div class="section-title">Live Transcript</div>
          <div class="transcript-box empty" id="transcript-box">
            Start listening to see your conversation here...
          </div>
        </div>
        
        <div class="answer-section" id="answer-section" style="display: none;">
          <div class="section-title">AI Answer</div>
          <div class="answer-box" id="answer-box"></div>
        </div>
      </div>
      
      <div class="overlay-footer">
        <button class="footer-btn primary" id="clarity-record">
          🎤 Start Listening
        </button>
        <button class="footer-btn" id="clarity-notes">
          📝 Notes
        </button>
        <button class="footer-btn" id="clarity-email">
          ✉️ Email
        </button>
      </div>
    `;
  }
  
  document.body.appendChild(overlay);
  attachEventListeners();
}

// Attach event listeners
function attachEventListeners() {
  const closeBtn = document.getElementById('clarity-close');
  const minimizeBtn = document.getElementById('clarity-minimize');
  const recordBtn = document.getElementById('clarity-record');
  const notesBtn = document.getElementById('clarity-notes');
  const emailBtn = document.getElementById('clarity-email');
  const authBtn = document.getElementById('auth-signin');
  const upgradeLink = document.getElementById('upgrade-link');
  
  closeBtn?.addEventListener('click', () => {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.style.display = 'none', 400);
  });
  
  minimizeBtn?.addEventListener('click', () => {
    overlay.classList.toggle('minimized');
  });
  
  recordBtn?.addEventListener('click', toggleRecording);
  notesBtn?.addEventListener('click', openNotes);
  emailBtn?.addEventListener('click', generateEmail);
  authBtn?.addEventListener('click', openAuth);
  upgradeLink?.addEventListener('click', openUpgrade);
}

// Open auth page
function openAuth() {
  chrome.runtime.sendMessage({ action: 'openAuthPage' });
  window.open(chrome.runtime.getURL('auth.html'), '_blank');
}

// Open upgrade page
function openUpgrade() {
  window.open('https://clarity-interview.lovable.app/#pricing', '_blank');
}

// Initialize speech recognition
function initializeSpeechRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    console.error('Speech recognition not supported');
    return;
  }
  
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  recognition.onresult = (event) => {
    let interim = '';
    let final = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        final += transcript + ' ';
      } else {
        interim += transcript;
      }
    }
    
    if (final) {
      currentTranscript += final;
      updateTranscript(currentTranscript);
      
      // Check if it's a question
      if (final.trim().endsWith('?')) {
        generateAnswer(final.trim());
      }
    }
    
    if (interim) {
      updateTranscript(currentTranscript + interim);
    }
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    updateStatus('Error: ' + event.error);
  };
  
  recognition.onend = () => {
    if (isRecording) {
      recognition.start(); // Restart if still recording
    }
  };
}

// Toggle recording
async function toggleRecording() {
  if (!currentSession) {
    updateStatus('Please sign in to use this feature');
    return;
  }
  
  const recordBtn = document.getElementById('clarity-record');
  const transcriptBox = document.getElementById('transcript-box');
  
  if (!isRecording) {
    // Check usage limit before starting
    const usageCheck = await chrome.runtime.sendMessage({
      action: 'checkUsage',
      featureType: 'interview'
    });
    
    if (usageCheck.error) {
      updateStatus(usageCheck.error);
      return;
    }
    
    if (!usageCheck.canUse) {
      showUpgradePrompt('You\'ve reached your interview limit. Upgrade to Pro for unlimited interviews!');
      return;
    }
    
    // Track interview start
    await chrome.runtime.sendMessage({
      action: 'trackUsage',
      featureType: 'interview',
      metadata: { started_at: Date.now() }
    });
    
    isRecording = true;
    recognition?.start();
    recordBtn.innerHTML = '⏹️ Stop Listening';
    recordBtn.classList.add('recording');
    transcriptBox.classList.remove('empty');
    updateStatus('Listening to your interview...');
    
    // Update usage banner
    updateUsageBanner(usageCheck);
  } else {
    isRecording = false;
    recognition?.stop();
    recordBtn.innerHTML = '🎤 Start Listening';
    recordBtn.classList.remove('recording');
    updateStatus('Recording stopped');
  }
}

// Update transcript display
function updateTranscript(text) {
  const transcriptBox = document.getElementById('transcript-box');
  if (transcriptBox) {
    transcriptBox.textContent = text;
    transcriptBox.classList.remove('empty');
    transcriptBox.scrollTop = transcriptBox.scrollHeight;
  }
}

// Update status
function updateStatus(text) {
  const statusMessage = document.getElementById('status-message');
  if (statusMessage) {
    statusMessage.textContent = text;
  }
}

// Update usage banner
function updateUsageBanner(usageData) {
  const banner = document.getElementById('usage-banner');
  const usageText = document.getElementById('usage-text');
  
  if (!banner || !usageText) return;
  
  if (usageData.plan === 'free') {
    const remaining = usageData.remaining;
    usageText.textContent = `${remaining} interview${remaining !== 1 ? 's' : ''} remaining this month`;
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }
}

// Show upgrade prompt
function showUpgradePrompt(message) {
  const answerSection = document.getElementById('answer-section');
  const answerBox = document.getElementById('answer-box');
  
  if (answerSection && answerBox) {
    answerSection.style.display = 'block';
    answerBox.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 32px; margin-bottom: 16px;">🔒</div>
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Pro Feature</div>
        <div style="font-size: 14px; color: #94a3b8; margin-bottom: 20px;">${message}</div>
        <button onclick="window.open('https://clarity-interview.lovable.app/#pricing', '_blank')" 
                style="padding: 12px 24px; background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); 
                       border: none; border-radius: 10px; color: #1a1a2e; font-weight: 600; cursor: pointer;">
          Upgrade to Pro
        </button>
      </div>
    `;
  }
}

// Generate AI answer
async function generateAnswer(question) {
  if (!currentSession) {
    updateStatus('Please sign in to use AI features');
    return;
  }
  
  const answerSection = document.getElementById('answer-section');
  const answerBox = document.getElementById('answer-box');
  
  answerSection.style.display = 'block';
  updateStatus('Generating AI answer...');
  
  answerBox.innerHTML = `
    <div class="loading-dots">
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    </div>
  `;
  
  // Send to background script
  chrome.runtime.sendMessage(
    { action: 'generateAnswer', question, context: currentTranscript },
    (response) => {
      if (response?.answer) {
        if (response.answer.upgrade) {
          showUpgradePrompt(response.answer.text);
        } else {
          displayAnswer(response.answer);
        }
        updateStatus('Answer ready');
      } else if (response?.error) {
        answerBox.innerHTML = `
          <div style="text-align: center; padding: 20px; color: #ef4444;">
            ⚠️ ${response.error}
          </div>
        `;
        updateStatus('Error generating answer');
      }
    }
  );
}

// Display answer
function displayAnswer(answer) {
  const answerBox = document.getElementById('answer-box');
  
  answerBox.innerHTML = `
    <div>${answer.text}</div>
    <div class="answer-meta">
      <span class="confidence-badge">Confidence: ${Math.round(answer.confidence * 100)}%</span>
      <span>${new Date(answer.timestamp).toLocaleTimeString()}</span>
    </div>
  `;
}

// Open notes panel
function openNotes() {
  alert('Notes feature coming soon! Your interview notes will be automatically organized here.');
}

// Generate follow-up email
function generateEmail() {
  alert('Email generation coming soon! Clarity will create a professional follow-up email based on your interview.');
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleOverlay') {
    if (request.visible) {
      overlay.style.display = 'flex';
      setTimeout(() => overlay.classList.add('visible'), 10);
    } else {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.style.display = 'none', 400);
    }
  }
  
  if (request.action === 'initializeOverlay') {
    if (!overlay) {
      checkAuthAndCreateOverlay();
    }
    overlay.style.display = 'flex';
    setTimeout(() => overlay.classList.add('visible'), 10);
  }
  
  if (request.action === 'sessionUpdated') {
    // Refresh session and recreate overlay
    currentSession = request.session;
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
    createOverlay();
  }
});
