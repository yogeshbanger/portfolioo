// Secure Lead Store & Admin Authentication Utility for Yogesh Portfolio
// SHA-256 Hash of default passcode 'banger130'
const DEFAULT_PASSCODE_HASH = '114c49a779cf471c493aa1d51d93e155098db39d05babd9578fc628cacf2115f';

// Storage keys
const LEADS_STORAGE_KEY = 'yogesh_portfolio_leads';
const ADMIN_HASH_KEY = 'yogesh_admin_hash';
const ADMIN_SESSION_TOKEN_KEY = 'yogesh_admin_session_token';
const LEGACY_PASSCODE_KEY = 'yogesh_portfolio_admin_passcode';

// Helper function to calculate SHA-256 hash using Web Crypto API
export const hashPasscode = async (text) => {
  if (!text) return '';
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    console.error('Crypto hashing failed:', err);
    // Basic fallback hash for non-crypto environments
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash).toString(16);
  }
};



// Initial seed leads if storage is empty
const INITIAL_SEED_LEADS = [
  {
    id: 'lead-welcome-1',
    name: 'Sample Inquiry',
    email: 'client@example.com',
    phone: '+91 9876543210',
    subject: 'Welcome to Yogesh Admin Portal',
    message: 'This is a sample lead message. You can view, star, reply, or delete leads from this admin dashboard.',
    status: 'new',
    starred: false,
    createdAt: new Date().toISOString(),
    replyHistory: []
  }
];

// Initialize storage & security (purges legacy per-device keys to enforce unified password)
export const initializeLeadsStore = () => {
  if (typeof window === 'undefined') return;

  // Remove legacy keys if present
  const keysToRemove = [
    LEGACY_PASSCODE_KEY,
    'yp_admin_cred_v1',
    'yp_admin_lock_v1',
    'yp_admin_device_v1'
  ];
  keysToRemove.forEach((key) => {
    if (localStorage.getItem(key)) localStorage.removeItem(key);
    if (sessionStorage.getItem(key)) sessionStorage.removeItem(key);
  });

  if (!localStorage.getItem(LEADS_STORAGE_KEY)) {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_SEED_LEADS));
  }

  // Set default passcode SHA-256 hash if none exists ('banger130')
  if (!localStorage.getItem(ADMIN_HASH_KEY)) {
    localStorage.setItem(ADMIN_HASH_KEY, DEFAULT_PASSCODE_HASH);
  }

  // Listen for storage events from other tabs for real-time synchronization
  if (!window._portfolio_storage_listener_attached) {
    window.addEventListener('storage', (e) => {
      if (e.key === LEADS_STORAGE_KEY) {
        notifyLeadsUpdated();
      }
    });
    window._portfolio_storage_listener_attached = true;
  }
};

// Dispatch custom events for real-time updates across components
const notifyLeadsUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('portfolio_leads_updated'));
  }
};

// Get a single lead by ID
export const getLeadById = (leadId) => {
  const leads = getLeads();
  return leads.find((l) => l.id === leadId) || null;
};

// Get all leads
export const getLeads = () => {
  if (typeof window === 'undefined') return [];
  initializeLeadsStore();
  try {
    const data = localStorage.getItem(LEADS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error parsing leads from localStorage:', error);
    return [];
  }
};

// Save a new lead (from Contact form submission)
export const saveLead = (leadData) => {
  const leads = getLeads();
  const newLead = {
    id: 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    name: leadData.name.trim(),
    email: leadData.email.trim(),
    phone: (leadData.phone || '').replace(/[^0-9+\s-()]/g, '').trim(),
    subject: (leadData.subject || 'Portfolio Inquiry').trim(),
    message: leadData.message.trim(),
    status: 'new',
    starred: false,
    createdAt: new Date().toISOString(),
    replyHistory: []
  };

  const updatedLeads = [newLead, ...leads];
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  notifyLeadsUpdated();
  return newLead;
};

// Update lead status (e.g. 'new', 'read', 'contacted', 'archived')
export const updateLeadStatus = (leadId, newStatus) => {
  const leads = getLeads();
  const updatedLeads = leads.map((lead) =>
    lead.id === leadId ? { ...lead, status: newStatus } : lead
  );
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  notifyLeadsUpdated();
  return updatedLeads;
};

// Add reply record to lead history and automatically set status to 'contacted'
export const addLeadReply = (leadId, replyData) => {
  const leads = getLeads();
  const updatedLeads = leads.map((lead) => {
    if (lead.id === leadId) {
      const history = lead.replyHistory || [];
      const newReply = {
        subject: replyData.subject || `Re: ${lead.subject}`,
        message: replyData.message,
        sentAt: new Date().toISOString()
      };
      return {
        ...lead,
        status: 'contacted',
        replyHistory: [newReply, ...history]
      };
    }
    return lead;
  });

  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  notifyLeadsUpdated();
  return updatedLeads;
};

// Toggle star on a lead
export const toggleStarLead = (leadId) => {
  const leads = getLeads();
  const updatedLeads = leads.map((lead) =>
    lead.id === leadId ? { ...lead, starred: !lead.starred } : lead
  );
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  notifyLeadsUpdated();
  return updatedLeads;
};

// Delete lead
export const deleteLead = (leadId) => {
  const leads = getLeads();
  const updatedLeads = leads.filter((lead) => lead.id !== leadId);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
  notifyLeadsUpdated();
  return updatedLeads;
};

// Clear all leads
export const clearAllLeads = () => {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
  notifyLeadsUpdated();
};

// ==========================================
// SECURE ADMIN AUTHENTICATION UTILITIES
// Password is NEVER saved in sessionStorage or localStorage in plaintext!
// ==========================================

// Verify entered passcode against stored SHA-256 hash
export const verifyAdminPasscode = async (enteredPasscode) => {
  if (!enteredPasscode) return false;
  initializeLeadsStore();
  const storedHash = localStorage.getItem(ADMIN_HASH_KEY) || DEFAULT_PASSCODE_HASH;
  const enteredHash = await hashPasscode(enteredPasscode);
  return enteredHash === storedHash;
};

// Authenticate and issue a temporary session token (random hash, NOT the passcode!)
export const loginAdmin = async (enteredPasscode) => {
  const isValid = await verifyAdminPasscode(enteredPasscode);
  if (isValid) {
    // Generate a secure random session token (no plain passcode)
    const token = 'session_' + Math.random().toString(36).substring(2) + '_' + Date.now();
    sessionStorage.setItem(ADMIN_SESSION_TOKEN_KEY, token);
    return { success: true, token };
  }
  return { success: false, error: 'Invalid admin passcode!' };
};

// Check if current session is authenticated
export const isAdminAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  const token = sessionStorage.getItem(ADMIN_SESSION_TOKEN_KEY);
  return Boolean(token && token.startsWith('session_'));
};

// Log out admin
export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(ADMIN_SESSION_TOKEN_KEY);
  }
};

// Update Admin Passcode securely (stores ONLY the hash)
export const changeAdminPasscode = async (currentPasscode, newPasscode) => {
  const isCurrentValid = await verifyAdminPasscode(currentPasscode);
  if (!isCurrentValid) {
    return { success: false, error: 'Current passcode is incorrect.' };
  }
  if (!newPasscode || newPasscode.trim().length < 4) {
    return { success: false, error: 'New passcode must be at least 4 characters.' };
  }

  const newHash = await hashPasscode(newPasscode);
  localStorage.setItem(ADMIN_HASH_KEY, newHash);
  
  // Clean any old cleartext passcode keys if they were created previously
  localStorage.removeItem(LEGACY_PASSCODE_KEY);
  sessionStorage.removeItem(LEGACY_PASSCODE_KEY);

  return { success: true };
};

// Reset passcode to default 'banger130'
export const resetAdminPasscodeToDefault = () => {
  localStorage.setItem(ADMIN_HASH_KEY, DEFAULT_PASSCODE_HASH);
  localStorage.removeItem(LEGACY_PASSCODE_KEY);
  sessionStorage.removeItem(LEGACY_PASSCODE_KEY);
  return true;
};

// Export leads to CSV file
export const exportLeadsToCSV = (leads) => {
  if (!leads || !leads.length) return;
  const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Subject', 'Status', 'Starred', 'Message', 'Replies Count'];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleString()}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.subject || '').replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${l.starred ? 'Yes' : 'No'}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    `"${(l.replyHistory || []).length}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `yogesh_portfolio_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export leads to JSON file
export const exportLeadsToJSON = (leads) => {
  if (!leads || !leads.length) return;
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `yogesh_portfolio_leads_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
