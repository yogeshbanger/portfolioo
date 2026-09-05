import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaLaptopCode } from 'react-icons/fa';

export default function Footer() {
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    window.location.href = `mailto:yogeshbanger111@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(message)}`;
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16 px-6 border-t border-gray-800 font-sans" role="contentinfo">
      
      {/* Global Contact Schema for Google Rich Results */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Yogesh Banger",
            "url": "https://yogeshbanger.vercel.app/",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9992540404",
              "contactType": "freelance developer",
              "email": "yogeshbanger111@gmail.com",
              "areaServed": ["IN", "US", "UK", "CA", "AU"],
              "availableLanguage": ["English", "Hindi"]
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Section: Portfolio Info */}
        <div className="flex flex-col gap-4">
          <a href="/" aria-label="Yogesh Banger Home" className="flex items-center gap-3 w-fit focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
            <FaLaptopCode aria-hidden="true" className="text-blue-500 text-4xl" />
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Yogesh Banger
              <p className="text-blue-400 font-semibold text-base mt-1 tracking-wide">
                MERN Stack Developer
              </p>
            </div>
          </a>
          <p className="leading-relaxed text-gray-400 mt-2">
            MERN Stack Developer specializing in React.js, Node.js, Express.js, and MongoDB. 
            I architect fast, responsive, and SEO-optimized web applications and scalable REST APIs.
          </p>
        </div>

        {/* Middle Section: Contact Details (Semantic Address) */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2 inline-block">
            Get In Touch
          </h3>
          <address className="flex flex-col gap-4 not-italic">
            <a 
              href="mailto:yogeshbanger111@gmail.com" 
              aria-label="Email Yogesh Banger"
              title="Email Yogesh Banger"
              className="flex items-center gap-4 group cursor-pointer w-fit focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg pr-2"
            >
              <div className="p-2.5 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                <FaEnvelope aria-hidden="true" className="text-blue-400 group-hover:text-white transition-colors duration-300 text-lg" />
              </div>
              <span className="group-hover:text-blue-400 transition-colors duration-300 font-medium">
                yogeshbanger111@gmail.com
              </span>
            </a>

            <a 
              href="tel:+919992540404" 
              aria-label="Call Yogesh Banger"
              title="Call Yogesh Banger"
              className="flex items-center gap-4 group cursor-pointer w-fit focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg pr-2"
            >
              <div className="p-2.5 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                <FaPhoneAlt aria-hidden="true" className="text-blue-400 group-hover:text-white transition-colors duration-300 text-lg" />
              </div>
              <span className="group-hover:text-blue-400 transition-colors duration-300 font-medium">
                +91 9992540404
              </span>
            </a>

            <div className="flex items-center gap-4 group w-fit">
              <div className="p-2.5 bg-gray-800 rounded-lg">
                <FaMapMarkerAlt aria-hidden="true" className="text-blue-400 text-lg" />
              </div>
              <a
                href="https://maps.google.com/?q=Kaithal,Haryana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Kaithal, Haryana on Google Maps"
                title="Location: Kaithal, Haryana"
                className="hover:text-blue-400 transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              >
                Kaithal, Haryana
              </a>
            </div>
          </address>
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
              {/* Accessibility Label (Required for Lighthouse 100) */}
              <label htmlFor="message" className="sr-only">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                required
                rows="3"
                className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 shadow-inner"
              ></textarea>
            </div>
            <button
              type="submit"
              aria-label="Send direct message via Email client"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 w-full shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <FaPaperPlane aria-hidden="true" /> Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Yogesh Banger. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex gap-4 items-center">
          <a href="/admin" className="hover:text-cyan-400 cursor-pointer transition-colors focus:outline-none focus:underline font-bold text-slate-400">Admin Portal</a>
          <a href="#" className="hover:text-blue-400 cursor-pointer transition-colors focus:outline-none focus:underline">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 cursor-pointer transition-colors focus:outline-none focus:underline">Terms of Service</a>
        </div>
      </div>

      {/* --- HIDDEN SEO SECTION FOR CRAWLERS & SCREEN READERS --- */}
      <section className="sr-only" aria-hidden="false">
        <h2>Hire the Best MERN Stack Developer in Kaithal</h2>
        <p>
          Yogesh Banger is an elite MERN Stack Developer and IT Trainer based in Kaithal, Haryana, India. 
          Specializing in React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), Tailwind CSS, and WordPress. 
        </p>
        <p>
          With a profound understanding of Technical SEO, Cyber Security, and Digital Marketing (SMO), Yogesh 
          architects fast, responsive web applications and secure RESTful APIs tailored for business growth. 
          Currently studying BCA at RKSD College and instructing at Hartron Skill Center. 
          Available for freelance web development, full-stack projects, and technical consulting globally.
        </p>
      </section>
    </footer>
  );
}