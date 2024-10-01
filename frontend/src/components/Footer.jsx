import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks, socialMedia } from '../constants';

const Footer = () => (
//  Needs to be fixed I mean the styling
  <footer className="bg-background w-full text-secondaryText py-1 bottom-0 fixed flex flex-row gap-4"> 
      {/* Copyright */}
      <div className="text-center text-primaryText text-sm mt-0.5 ml-3">
        <p>Copyright Ⓒ {new Date().getFullYear()} NEXWE3.</p> {/* Should we add a link or should we make the company as codingSensai, SKULL EMOJI */}
      </div>
      
      <div className='flex flex-row gap-8 ml-auto'>
      {/* Footer Links */}
      <div className="flex flex-row gap-2 ml-auto mr ">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.route} className="">
            <ul className="">
              <li>
                <Link to={footerlink.route} className="text-secondaryText hover:text-primaryText transition">
                  {footerlink.name}
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>

    {/* Social Media Icons */}
    <div className="flex space-x-4 mt-0.5 ml-auto mr-56">
      {socialMedia.map((social) => (
        <a
          key={social.id}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondaryText hover:text-primaryText transition"
        >
          <social.icon className="w-4 h-5" />
        </a>
      ))}
    </div>
    </div>

   
  </footer>
);

export default Footer;
