import React from 'react';

/** Square mark: a bridge deck resting on two piers. */
export const BridgesMark: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <rect width="32" height="32" rx="6" className="fill-brand" />
    <path d="M6 11h20v3H6z" fill="#fff" />
    <path d="M9 14h3v11H9zM20 14h3v11h-3z" fill="#fff" />
    <path d="M12 21.5c1.2-1.9 2.5-2.8 4-2.8s2.8.9 4 2.8" fill="none" stroke="#fff" strokeWidth="2" />
  </svg>
);

interface BridgesLogoProps {
  className?: string;
  /** Use on dark backgrounds. */
  inverted?: boolean;
}

export const BridgesLogo: React.FC<BridgesLogoProps> = ({ className = '', inverted = false }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <BridgesMark className="w-8 h-8 flex-shrink-0" />
    <span
      className={`text-[22px] font-semibold tracking-[-0.02em] leading-none ${
        inverted ? 'text-white' : 'text-ink'
      }`}
    >
      Bridges
    </span>
  </span>
);
