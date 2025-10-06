// Clarity Interview Assistant - Popup Script

const SUPABASE_URL = 'https://xilbxhenrooyftlyjbhn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGJ4aGVucm9veWZ0bHlqYmhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzkwOTEsImV4cCI6MjA3NDc1NTA5MX0.wDgyvbUODXbFNbsscSjC1UXa5iJIlK90wpMwYjySyuE';

let currentSession = null;

document.addEventListener('DOMContentLoaded', async () => {
  await checkAuth();
  attachEventListeners();
});

async function checkAuth() {
  const { session } = await chrome.storage.local.get('session');
  
  if (!session || !session.access_token || Date.now() > session.expires_at) {
    showAuthView();
    return;
  }
  
  currentSession = session;
  await loadUserData();
  showMainView();
}

async function loadUserData() {
  try {
    // Get user profile
    const profileResponse = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${currentSession.user.id}&select=*,subscription_plan:subscription_plans(*)`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${currentSession.access_token}`
      }
    });
    
    const profiles = await profileResponse.json();
    const profile = profiles[0];
    
    if (profile) {
      document.getElementById('user-name').textContent = profile.full_name || profile.email;
      
      const planBadge = document.getElementById('user-plan');
      planBadge.textContent = profile.subscription_status === 'pro' ? 'Pro ⭐' : 'Free';
      
      if (profile.subscription_status === 'pro') {
        planBadge.classList.add('plan-pro');
        document.getElementById('upgrade-banner').classList.add('hidden');
        document.getElementById('ai-answers-stat').style.display = 'flex';
      } else {
        planBadge.classList.remove('plan-pro');
        document.getElementById('upgrade-banner').classList.remove('hidden');
        document.getElementById('ai-answers-stat').style.display = 'none';
      }
      
      // Update usage stats
      const usage = profile.usage_count || { interviews: 0, ai_answers: 0 };
      const limits = profile.subscription_plan?.limits || { interviews_per_month: 5 };
      
      const interviewsLimit = limits.interviews_per_month === -1 ? '∞' : limits.interviews_per_month;
      document.getElementById('interviews-used').textContent = `${usage.interviews || 0} / ${interviewsLimit}`;
      
      if (profile.subscription_status === 'pro') {
        document.getElementById('ai-answers-used').textContent = `${usage.ai_answers || 0} / ∞`;
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
}

function showAuthView() {
  document.getElementById('auth-view').classList.remove('hidden');
  document.getElementById('main-view').classList.add('hidden');
}

function showMainView() {
  document.getElementById('auth-view').classList.add('hidden');
  document.getElementById('main-view').classList.remove('hidden');
}

function attachEventListeners() {
  // Auth buttons
  document.getElementById('sign-in-btn')?.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('auth.html') });
  });
  
  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await chrome.storage.local.remove('session');
    currentSession = null;
    showAuthView();
  });
  
  document.getElementById('upgrade-banner')?.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://clarity-interview.lovable.app/#pricing' });
  });
  
  // Main actions
  document.getElementById('open-overlay')?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { 
        action: 'toggleOverlay', 
        visible: true 
      });
      window.close();
    });
  });
  
  document.getElementById('view-notes')?.addEventListener('click', () => {
    chrome.storage.local.get('notes', (data) => {
      const notes = data.notes || [];
      alert(`You have ${notes.length} saved notes.\n\nFull notes viewer coming soon!`);
    });
  });
  
  document.getElementById('view-history')?.addEventListener('click', () => {
    alert('Interview history feature coming soon!\n\nView your past interviews, performance metrics, and improvement trends.');
  });
  
  document.getElementById('open-settings')?.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  
  document.getElementById('start-interview')?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const isVideoCall = tab.url.includes('zoom.us') || 
                         tab.url.includes('meet.google.com') || 
                         tab.url.includes('teams.microsoft.com');
      
      if (isVideoCall) {
        chrome.tabs.sendMessage(tab.id, { action: 'initializeOverlay' });
        window.close();
      } else {
        alert('Please navigate to a video conferencing platform (Zoom, Google Meet, or Microsoft Teams) to start interview mode.');
      }
    });
  });
  
  document.getElementById('help')?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://clarity-interview.lovable.app/#features' });
  });
  
  document.getElementById('feedback')?.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://clarity-interview.lovable.app/#contact' });
  });
}
