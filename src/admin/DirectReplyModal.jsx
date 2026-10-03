import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addLeadReply } from '../utils/leadStore';
import { 
  RiCloseLine, 
  RiMailSendLine, 
  RiGoogleFill, 
  RiMailLine, 
  RiCheckDoubleLine,
  RiFileTextLine,
  RiUser3Line,
  RiTimeLine,
  RiHistoryLine,
  RiFileCopyLine,
  RiPhoneLine,
  RiWhatsappLine
} from 'react-icons/ri';

const QUICK_TEMPLATES = [
  {
    label: "Custom Response",
    subject: "",
    body: ""
  },
  {
    label: "Thank You & Availability",
    subject: "Thank you for reaching out! - Yogesh Banger",
    body: `Hi {name},

Thank you for reaching out through my portfolio! I reviewed your message regarding "{subject}".

I am currently available for new projects/opportunities and would love to discuss how I can help build your application using the MERN stack.

When would be a good time for us to connect over a brief call or email exchange?

Best regards,
Yogesh Banger
MERN Stack Developer
Phone: +91 9992540404
Email: yogeshbanger111@gmail.com`
  },
  {
    label: "Schedule Call Request",
    subject: "Let's Schedule a Quick Call - Yogesh Banger",
    body: `Hi {name},

Thanks for getting in touch! Your project sounds very interesting.

I would love to schedule a 15-minute introductory call to understand your requirements in detail. Please let me know your preferred dates and times.

Looking forward to speaking with you!

Best regards,
Yogesh Banger
Phone: +91 9992540404`
  },
  {
    label: "Project Quote & Proposal",
    subject: "Project Details & Proposal - Yogesh Banger",
    body: `Hi {name},

Thank you for your inquiry regarding "{subject}".

Based on your message, I can assist you with full-stack MERN development, responsive UI design, secure REST APIs, and SEO optimization.

Could you share any wireframes, reference links, or detailed scope documents so I can provide an accurate timeline and estimate?

Best regards,
Yogesh Banger`
  }
];

export default function DirectReplyModal({ lead, onClose, onReplySuccess }) {
  const [subject, setSubject] = useState(`Re: ${lead.subject || 'Portfolio Inquiry'}`);
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Custom Response');
  const [notification, setNotification] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (templateLabel) => {
    setSelectedTemplate(templateLabel);
    const tmpl = QUICK_TEMPLATES.find((t) => t.label === templateLabel);
    if (tmpl && tmpl.body) {
      const formattedSubject = tmpl.subject
        ? tmpl.subject.replace('{subject}', lead.subject || '')
        : `Re: ${lead.subject || 'Portfolio Inquiry'}`;
      const formattedBody = tmpl.body
        .replace(/{name}/g, lead.name || 'Customer')
        .replace(/{subject}/g, lead.subject || 'your project');
      
      setSubject(formattedSubject);
      setMessage(formattedBody);
    }
  };

  const handleCopyMessage = () => {
    if (!message.trim()) return;
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${message}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunchGmail = () => {
    if (!message.trim()) {
      alert('Please compose a reply message before launching email.');
      return;
    }
    addLeadReply(lead.id, { subject, message });
    if (onReplySuccess) onReplySuccess();

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(gmailUrl, '_blank');
    setNotification('Reply launched via Gmail & logged into lead history!');
  };

  const handleLaunchMailto = () => {
    if (!message.trim()) {
      alert('Please compose a reply message before launching email.');
      return;
    }
    addLeadReply(lead.id, { subject, message });
    if (onReplySuccess) onReplySuccess();

    const mailtoUrl = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    setNotification('Reply launched in default email app & logged into lead history!');
  };

  const handleSaveOnly = () => {
    if (!message.trim()) {
      alert('Please enter a message to save.');
      return;
    }
    addLeadReply(lead.id, { subject, message });
    if (onReplySuccess) onReplySuccess();
    setNotification('Reply logged directly to customer lead history!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg shadow-cyan-500/20">
                <RiMailSendLine />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Direct Reply to Customer</h2>
                <p className="text-xs text-slate-400">Send an immediate response to <strong className="text-cyan-300">{lead.name}</strong></p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close reply modal"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          </div>

          {notification && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <RiCheckDoubleLine className="text-base" /> {notification}
            </div>
          )}

          <div className="flex-1 overflow-y-auto py-6 space-y-6">
            {/* Customer Original Message Context Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2.5 gap-2">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <RiUser3Line className="text-cyan-400" /> {lead.name} ({lead.email})
                </span>
                <div className="flex items-center gap-3">
                  {lead.phone && (
                    <>
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-purple-400 hover:underline">
                        <RiPhoneLine /> Call {lead.phone}
                      </a>
                      <a 
                        href={`https://wa.me/${cleanPhone}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-emerald-400 hover:underline"
                      >
                        <RiWhatsappLine /> WhatsApp
                      </a>
                    </>
                  )}
                  <span className="flex items-center gap-1 text-slate-500">
                    <RiTimeLine className="text-slate-400" /> {new Date(lead.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 font-semibold pt-1">Subject: {lead.subject}</p>
              <p className="text-slate-400 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-slate-800/50">
                &quot;{lead.message}&quot;
              </p>
            </div>

            {/* Quick Template Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <RiFileTextLine className="text-cyan-400 text-base" /> Quick Reply Templates
              </label>
              <div className="flex flex-wrap gap-2">
                {QUICK_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => handleSelectTemplate(tmpl.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedTemplate === tmpl.label
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reply Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Reply Email Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Reply Message Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Reply Message Text
                </label>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <RiFileCopyLine /> {copied ? 'Copied to Clipboard!' : 'Copy Text'}
                </button>
              </div>
              <textarea
                rows="7"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your response to the customer here..."
                className="w-full p-4 bg-slate-950/80 border border-slate-700/80 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none font-sans"
              ></textarea>
            </div>

            {/* Reply History section if available */}
            {lead.replyHistory && lead.replyHistory.length > 0 && (
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <RiHistoryLine className="text-purple-400" /> Previous Replies Sent ({lead.replyHistory.length})
                </h4>
                <div className="space-y-3">
                  {lead.replyHistory.map((rep, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs">
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span className="font-semibold text-cyan-300">{rep.subject}</span>
                        <span className="text-[10px] text-slate-500">{new Date(rep.sentAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-300 whitespace-pre-line leading-relaxed">{rep.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Send Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleSaveOnly}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
            >
              Log Reply History Only
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleLaunchMailto}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
              >
                <RiMailLine className="text-base" /> Default Mail App
              </button>

              <button
                type="button"
                onClick={handleLaunchGmail}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
              >
                <RiGoogleFill className="text-base text-rose-300" /> Send via Gmail Web <RiMailSendLine />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
