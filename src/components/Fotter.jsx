import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaLaptopCode } from 'react-icons/fa';

export default function Footer() {
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    window.location.href = `mailto:yogeshbanger111@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(message)}`;
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16 px-6 mt-10 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left Section: Portfolio Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <FaLaptopCode className="text-blue-500 text-4xl" />
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Portfolio
            </h2>
          </div>
          <p className="leading-relaxed text-gray-400 mt-2">
            Full Stack Developer passionate about creating amazing web experiences 
            and solving complex problems through code. Let's build something extraordinary together.
          </p>
        </div>

        {/* Middle Section: Contact Details */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2 inline-block">
            Get In Touch
          </h3>
          <div className="flex flex-col gap-4">
            <a href="mailto:yogeshbanger111@gmail.com" className="flex items-center gap-4 group cursor-pointer w-fit">
              <div className="p-2.5 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                <FaEnvelope className="text-blue-400 group-hover:text-white transition-colors duration-300 text-lg" />
              </div>
              <span className="group-hover:text-blue-400 transition-colors duration-300 font-medium">
                yogeshbanger111@gmail.com
              </span>
            </a>
            
            <a href="tel:+919992540404" className="flex items-center gap-4 group cursor-pointer w-fit">
              <div className="p-2.5 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                <FaPhoneAlt className="text-blue-400 group-hover:text-white transition-colors duration-300 text-lg" />
              </div>
              <span className="group-hover:text-blue-400 transition-colors duration-300 font-medium">
                +91 9992540404
              </span>
            </a>

            <div className="flex items-center gap-4 group w-fit">
              <div className="p-2.5 bg-gray-800 rounded-lg">
                <FaMapMarkerAlt className="text-blue-400 text-lg" />
              </div>
              <span className="font-medium text-gray-300">
                Kaithal, Haryana
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Messaging/Subscribe */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2 inline-block">
            Stay Updated
          </h3>
          <p className="mb-5 text-gray-400">
            Send me a direct message for project inquiries or just to say hi!
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <textarea 
                name="message"
                placeholder="Write your message here..." 
                required
                rows="3"
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 shadow-inner"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 w-full shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
            >
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>

      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Yogesh Banger. All rights reserved.</p>
        <div className="mt-4 md:mt-0 space-x-4">
          <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}