// Clarity Interview Assistant - Enhanced Background Service Worker

const SUPABASE_URL = 'https://xilbxhenrooyftlyjbhn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGJ4aGVucm9veWZ0bHlqYmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzkwOTEsImV4cCI6MjA3NDc1NTA5MX0.wDgyvbUODXbFNbsscSjC1UXa5iJIlK90wpMwYjySyuE';

let isOverlayVisible = false;

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Clarity Interview Assistant installed');
  
  // Set default settings
  chrome.storage.sync.set({
    aiEnabled: true,
    autoNotes: true,
    responseSpeed: 'fast',
    voiceEnabled: false
  });
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-overlay') {
    toggleOverlay();
  }
});

// Toggle overlay visibility
async function toggleOverlay() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab || !tab.id) return;
  
  isOverlayVisible = !isOverlayVisible;
  
  chrome.tabs.sendMessage(tab.id, {
    action: 'toggleOverlay',
    visible: isOverlayVisible
  });
}

// Get current session
async function getSession() {
  const { session } = await chrome.storage.local.get('session');
  
  if (!session || !session.access_token || Date.now() > session.expires_at) {
    return null;
  }
  
  return session;
}

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(null, (settings) => {
      sendResponse(settings);
    });
    return true;
  }
  
  if (request.action === 'getSession') {
    getSession().then(session => {
      sendResponse({ session });
    });
    return true;
  }
  
  if (request.action === 'saveNote') {
    saveNote(request.data).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'generateAnswer') {
    generateAnswer(request.question, request.context).then((answer) => {
      sendResponse({ answer });
    }).catch(error => {
      sendResponse({ error: error.message });
    });
    return true;
  }
  
  if (request.action === 'checkUsage') {
    checkUsage(request.featureType).then((result) => {
      sendResponse(result);
    }).catch(error => {
      sendResponse({ error: error.message });
    });
    return true;
  }
  
  if (request.action === 'trackUsage') {
    trackUsage(request.featureType, request.metadata).then((result) => {
      sendResponse(result);
    }).catch(error => {
      sendResponse({ error: error.message });
    });
    return true;
  }
});

// Save note to storage
async function saveNote(note) {
  const { notes = [] } = await chrome.storage.local.get('notes');
  notes.push({
    ...note,
    timestamp: Date.now(),
    id: crypto.randomUUID()
  });
  await chrome.storage.local.set({ notes });
}

// Check usage limits
async function checkUsage(featureType) {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Please sign in to use this feature');
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/check-usage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ featureType })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to check usage');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking usage:', error);
    throw error;
  }
}

// Track usage
async function trackUsage(featureType, metadata = {}) {
  const session = await getSession();
  
  if (!session) {
    return { success: false, error: 'Not authenticated' };
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/track-usage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ featureType, metadata })
    });

    if (!response.ok) {
      throw new Error('Failed to track usage');
    }

    return await response.json();
  } catch (error) {
    console.error('Error tracking usage:', error);
    return { success: false, error: error.message };
  }
}

// Generate AI answer using Lovable Cloud
async function generateAnswer(question, context = '') {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Please sign in to use AI features');
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ question, context })
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      if (response.status === 403 && errorData.upgrade) {
        throw new Error('UPGRADE_REQUIRED');
      }
      
      throw new Error(errorData.error || 'Failed to generate answer');
    }

    const data = await response.json();
    
    // Track usage
    await trackUsage('ai_answer', { question: question.substring(0, 50) });
    
    return {
      text: data.answer,
      confidence: data.confidence,
      sources: [],
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error('Error generating answer:', error);
    
    if (error.message === 'UPGRADE_REQUIRED') {
      return {
        text: 'Upgrade to Pro to unlock real-time AI answers with 0.3s response time!',
        confidence: 0,
        sources: [],
        upgrade: true
      };
    }
    
    return {
      text: 'Unable to generate answer. Please try again.',
      confidence: 0,
      sources: [],
      error: error.message
    };
  }
}

// Monitor video conferencing platforms
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isVideoCall = tab.url.includes('zoom.us') || 
                        tab.url.includes('meet.google.com') || 
                        tab.url.includes('teams.microsoft.com');
    
    if (isVideoCall) {
      chrome.tabs.sendMessage(tabId, { action: 'initializeOverlay' });
    }
  }
});
