import React from 'react';
import Link from 'next/link';
import { IconBrandLinkedin, IconBrandGithub, IconMail } from '@tabler/icons-react'; // IconBrandMedium

interface SocialLink {
  href: string;
  Icon: React.ComponentType<{ size: number; className: string }>;
  external?: boolean;
}

const socialLinks: SocialLink[] = [
  { href: "https://www.linkedin.com/in/andrewhumble", Icon: IconBrandLinkedin, external: true },
  { href: "https://github.com/andrewhumble", Icon: IconBrandGithub, external: true },
  // { href: "https://medium.com/@yourprofile", Icon: IconBrandMedium, external: true },
  { href: "mailto:cahumble7@gmail.com", Icon: IconMail }
];

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => (
  <footer className={`pt-12 ${className}`}>
    <div className="flex justify-center space-x-6">
      {socialLinks.map(({ href, Icon, external }) => (
        <Link
          key={href}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          <Icon
            size={36}
            className="text-gray-700 dark:text-tertiary-dark hover:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          />
        </Link>
      ))}
    </div>
  </footer>
);

export default Footer;
