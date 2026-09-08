// Lead Store Utility for Portfolio Admin Panel
// LocalStorage key constants
const LEADS_STORAGE_KEY = 'yogesh_portfolio_leads';
const ADMIN_PASSCODE_KEY = 'yogesh_portfolio_admin_passcode';
const DEFAULT_PASSCODE = 'admin123';


// Sample seed leads for initial view if store is empty
const INITIAL_SEED_LEADS = [
  {
    id: 'lead-1710000001',
    name: 'Rahul Sharma',
    email: 'Rahul.Sharma@example.com',
    phone: '+91 9876543210',
    subject: 'MERN Stack Web App Project Inquiry',
    message: 'Hi Yogesh, I saw your portfolio and loved your work. We are looking to build an e-commerce dashboard using React and Node.js. Are you available for freelance work next month?',
    status: 'new',
    starred: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead-1710000002',
    name: 'Priya Verma',
    email: 'Priya.Verma@techsolutions.com',
    phone: '+91 9123456789',
    subject: 'Frontend Developer Role / Internship',
    message: 'Hello Yogesh, we have an opening for a React / MERN Developer at our startup. Would you be interested in an interview call?',
    status: 'read',
    starred: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'lead-1710000003',
    name: 'Amit Kumar',
    email: 'Amit.K@digitalagency.in',
    phone: '+91 9988776655',
    subject: 'SEO & Web Optimization Consulting',
    message: 'Hey Yogesh! We need technical SEO optimization for our client website. Saw your expertise in SEO & React. Let us connect!',
    status: 'contacted',
    starred: false,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  }
];

// Initialize storage if empty
export const initializeLeadsStore = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(LEADS_STORAGE_KEY)) {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_SEED_LEADS));
  }
  if (!localStorage.getItem(ADMIN_PASSCODE_KEY)) {
    localStorage.setItem(ADMIN_PASSCODE_KEY, DEFAULT_PASSCODE);
  }
};

// Dispatch real-time update event
const notifyLeadsUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('portfolio_leads_updated'));
  }
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

// Save a new lead (submitted from contact form)
export const saveLead = (leadData) => {
  const leads = getLeads();
  const newLead = {
    id: 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    name: leadData.name.trim(),
    email: leadData.email.trim(), // preserves exact case entered by client
    phone: (leadData.phone || '').replace(/[^0-9+\s-()]/g, '').trim(),
    subject: (leadData.subject || 'Portfolio Inquiry').trim(),
    message: leadData.message.trim(),
    status: 'new',
    starred: false,
    createdAt: new Date().toISOString(),
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

// Admin authentication helpers
export const getAdminPasscode = () => {
  initializeLeadsStore();
  return localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_PASSCODE;
};

export const verifyAdminPasscode = (passcode) => {
  const currentPasscode = getAdminPasscode();
  return Boolean(passcode && passcode.trim() === currentPasscode.trim());
};

export const setAdminPasscode = (newPasscode) => {
  if (!newPasscode || newPasscode.trim().length < 4) {
    return { success: false, error: 'Passcode must be at least 4 characters.' };
  }
  localStorage.setItem(ADMIN_PASSCODE_KEY, newPasscode.trim());
  return { success: true };
};

export const resetAdminPasscode = () => {
  localStorage.setItem(ADMIN_PASSCODE_KEY, DEFAULT_PASSCODE);
  return DEFAULT_PASSCODE;
};

// Export to CSV
export const exportLeadsToCSV = (leads) => {
  if (!leads || !leads.length) return;
  const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Subject', 'Status', 'Starred', 'Message'];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleString()}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${l.subject.replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${l.starred ? 'Yes' : 'No'}"`,
    `"${l.message.replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `yogesh_portfolio_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export to JSON
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
