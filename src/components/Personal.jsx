import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, MessageSquare, Send, Users, CheckCircle2, Loader2 } from 'lucide-react';

const PersonalDetails = () => {
  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState({
    name: '', father: '', email: '', phone: '', address: '', message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const inputFields = [
    { id: "name", label: "Your Name", icon: <User size={18} />, type: "text", placeholder: "enter your name" },
    { id: "father", label: "Father's Name", icon: <Users size={18} />, type: "text", placeholder: "enter your father name" },
    { id: "email", label: "Email Address", icon: <Mail size={18} />, type: "email", placeholder: "enter a email id" },
    { id: "phone", label: "Phone Number", icon: <Phone size={18} />, type: "tel", placeholder: "+91 00000-00000" },
    { id: "address", label: "Address", icon: <MapPin size={18} />, type: "text", placeholder: "Kaithal, Haryana" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    // ==========================================
    // EMAIL INTEGRATION POINT
    // ==========================================
    // This is where you would send the data to your Node.js/Nodemailer backend.
    // Example:
    // axios.post('/api/send-welcome-email', { email: formData.email, name: formData.name })
    //   .then(() => setStatus('success'))
    
    // Simulating a network request for the UI demonstration:
    setTimeout(() => {
      setStatus('success');
      // Reset form after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', father: '', email: '', phone: '', address: '', message: '' });
      }, 4000);
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-20 px-6 flex items-center justify-center font-sans overflow-hidden relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Main Glassmorphism Card */}
        <div className="bg-[#0f0f0f]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group/form">
          
          {/* Subtle Hover Glow on Card Edge */}
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 to-fuchsia-600/20 opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 blur-xl -z-10" />

          {/* Header Section */}
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">PERSONAL </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                DETAILS
              </span>
            </h2>
            <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">
              Secure Transmission Protocol
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field, index) => (
                <div key={field.id} className="relative">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2 mb-2 block">
                    {field.label}
                  </label>
                  <div className={`
                    flex items-center bg-[#151515] border rounded-2xl px-4 py-3.5 transition-all duration-300
                    ${focused === field.id 
                      ? index % 2 === 0 
                        ? "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                        : "border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.15)]"
                      : "border-gray-800 hover:border-gray-700"}
                  `}>
                    <span className={`
                      transition-colors mr-3
                      ${focused === field.id 
                        ? index % 2 === 0 ? "text-cyan-400" : "text-fuchsia-400" 
                        : "text-gray-600"}
                    `}>
                      {field.icon}
                    </span>
                    <input
                      id={field.id}
                      type={field.type}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused("")}
                      required
                      disabled={status !== 'idle'}
                      className="bg-transparent w-full outline-none text-white font-medium placeholder:text-gray-700 disabled:opacity-50"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Message Area */}
            <div className="relative">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2 mb-2 block">
                Message
              </label>
              <div className={`
                flex items-start bg-[#151515] border rounded-2xl px-4 py-3.5 transition-all duration-300
                ${focused === "message" ? "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "border-gray-800 hover:border-gray-700"}
              `}>
                <span className={`${focused === "message" ? "text-cyan-400" : "text-gray-600"} transition-colors mr-3 mt-1`}>
                  <MessageSquare size={18} />
                </span>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  required
                  disabled={status !== 'idle'}
                  className="bg-transparent w-full outline-none text-white font-medium placeholder:text-gray-700 resize-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit Button & Status Indicator */}
            <div className="pt-4 relative h-16">
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.button
                    key="submit-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="absolute inset-0 w-full bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_20px_rgba(217,70,239,0.3)] flex items-center justify-center gap-3 transition-all group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Contact
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    {/* Button Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-full group-hover:-translate-y-full transition-transform duration-[800ms] ease-in-out z-0" />
                  </motion.button>
                )}

                {status === 'submitting' && (
                  <motion.div
                    key="loading-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 w-full bg-[#1a1a1a] border border-gray-700 text-cyan-400 font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 cursor-not-allowed"
                  >
                    <Loader2 size={20} className="animate-spin" />
                    Transmitting...
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    key="success-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 w-full bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  >
                    <CheckCircle2 size={22} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    Transmission Successful
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default PersonalDetails;