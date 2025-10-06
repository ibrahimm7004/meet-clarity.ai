// Clarity API Client - Connects to Lovable Cloud backend

const API_BASE_URL = 'https://xilbxhenrooyftlyjbhn.supabase.co/functions/v1';

class ClarityAPI {
  async generateAnswer(question, context = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/ai-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, context })
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error generating answer:', error);
      throw error;
    }
  }

  async generateEmail(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error generating email:', error);
      throw error;
    }
  }

  async categorizeNotes(notes) {
    try {
      const response = await fetch(`${API_BASE_URL}/categorize-notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error categorizing notes:', error);
      throw error;
    }
  }

  async generateReport(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }
}

// Export singleton instance
window.clarityAPI = new ClarityAPI();
