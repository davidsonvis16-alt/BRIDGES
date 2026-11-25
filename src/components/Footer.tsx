import React from 'react';
import { BridgesLogo } from './icons/BridgesLogo';
import { PaymentLogos } from './icons/PaymentLogos';
import { scrollToId } from '../utils/scroll';

interface FooterProps {
  onOpenPartner: (type: 'courier' | 'restaurant') => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenCookies: () => void;
  currentLang: string;
  onToggleLang: () => void;
}

type FooterLink = { label: string; href?: string; onClick?: () => void };

export const Footer: React.FC<FooterProps> = ({
  onOpenPartner,
  onOpenAuth,
  onOpenCookies,
  currentLang,
  onToggleLang,
}) => {
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: 'Order',
      links: [
        { label: 'Restaurants & shops', onClick: () => scrollToId('restaurants-section') },
        { label: 'Where we deliver', onClick: () => scrollToId('coverage-section') },
        { label: 'Get the app', onClick: () => scrollToId('download-app') },
        { label: 'Your account', onClick: () => onOpenAuth('login') },
      ],
    },
    {
      title: 'Partners',
      links: [
        { label: 'Ride with Bridges', onClick: () => onOpenPartner('courier') },
        { label: 'Sell on Bridges', onClick: () => onOpenPartner('restaurant') },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of service', href: '#' },
        { label: 'Privacy policy', href: '#' },
        { label: 'Cookie settings', onClick: onOpenCookies },
      ],
    },
  ];

  const linkClass = 'text-sm text-white/70 hover:text-white cursor-pointer text-left';

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <BridgesLogo inverted />
            <p className="mt-4 text-sm text-white/60 max-w-xs">
              Food, groceries and everyday essentials, delivered across Kenya.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.onClick ? (
                      <button type="button" onClick={link.onClick} className={linkClass}>
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} Bridges · Nairobi, Kenya · Photos from{' '}
            <a href="https://www.pexels.com" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
              Pexels
            </a>
          </p>
          <PaymentLogos />
          <button type="button" onClick={onToggleLang} className="text-left hover:text-white cursor-pointer">
            {currentLang === 'en' ? 'English · Badilisha kwa Kiswahili' : 'Kiswahili · Switch to English'}
          </button>
        </div>
      </div>
    </footer>
  );
};
