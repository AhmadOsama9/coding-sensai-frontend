import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks, socialMedia } from '../constants';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-4 mt-auto border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo and Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-lg font-semibold text-purple-400">CodingSensai</span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <p className="text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} NEXWE3
          </p>
        </div>
        
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((footerlink) => (
            <Link
              key={footerlink.route}
              to={footerlink.route}
              className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
            >
              {footerlink.name}
            </Link>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center space-x-4">
          {socialMedia.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label={social.id}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;