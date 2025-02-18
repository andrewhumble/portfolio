import React from 'react';
import Link from 'next/link';
import { IconBrandLinkedin, IconBrandGithub, IconBrandMedium, IconMail } from '@tabler/icons-react'; // Import Tabler icons

interface FooterProps {
  className?: string; // Accepts an optional className prop
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`text-white pt-12 ${className}`}>
      <div className="flex justify-center space-x-6">
        <Link href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
          <IconBrandLinkedin size={36} className="hover:text-gray-400 transition-colors duration-300" />
        </Link>
        <Link href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <IconBrandGithub size={36} className="hover:text-gray-400 transition-colors duration-300" />
        </Link>
        <Link href="https://medium.com/@yourprofile" target="_blank" rel="noopener noreferrer">
          <IconBrandMedium size={36} className="hover:text-gray-400 transition-colors duration-300" />
        </Link>
        <Link href="mailto:youremail@example.com">
          <IconMail size={36} className="hover:text-gray-400 transition-colors duration-300" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
