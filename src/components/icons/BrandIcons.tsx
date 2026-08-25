import React from 'react';

// Official Apple Logo
export const AppleLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 170 170" fill="currentColor">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.66-7.85-11.9-14.33-6.17-9.49-10.9-20.48-14.2-32.96-3.3-12.49-4.96-24.16-4.96-35.03 0-14.41 3.52-26.4 10.57-35.96 7.04-9.56 16.02-14.45 26.93-14.67 4.93 0 10.37 1.25 16.32 3.75 5.95 2.51 10.02 3.82 12.22 3.93 1.8.11 6.1-1.32 12.89-4.29 6.8-2.97 12.44-4.32 16.94-4.04 12.59.88 22.84 5.76 30.76 14.65-11.02 6.64-16.42 15.82-16.2 27.53.21 9.17 3.77 16.92 10.68 23.23 6.91 6.32 15.11 10.03 24.6 11.13-2.03 6.21-4.47 12.19-7.32 17.95zM119.22 33.16c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.96-10.42 19.98-12.09.21 1.09.32 2.18.32 3.27 0 7.39-2.73 14.4-8.19 21.03-5.46 6.63-12.29 10.56-20.5 11.78-.32-1.09-.48-2.2-.48-3.32z" />
  </svg>
);

// Official Multi-Color Google Play Triangle
export const GooglePlayLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 512 512">
    <path
      fill="#00E676"
      d="M29.2 13.9C20.6 23.1 16 36.3 16 52.4v407.2c0 16.1 4.6 29.3 13.2 38.5l1.6 1.4 233.1-233.1v-5.6L30.8 12.5l-1.6 1.4z"
    />
    <path
      fill="#FFD600"
      d="M344.4 336.8l-80.5-80.5v-5.6l80.5-80.5 1.8 1 95.4 54.2c27.2 15.4 27.2 40.8 0 56.3l-95.4 54.1-1.8 1z"
    />
    <path
      fill="#FF1744"
      d="M346.2 335.8L263.9 253.5 30.8 486.6c8.9 9.5 23.7 10.7 40.2 1.4l275.2-156.2z"
    />
    <path
      fill="#00B0FF"
      d="M346.2 176.2L71 24C54.5 14.7 39.7 15.9 30.8 25.4l233.1 233.1 82.3-82.3z"
    />
  </svg>
);

// Official M-PESA Safaricom Logo Badge
export const MPesaLogo: React.FC<{ className?: string; variant?: 'full' | 'badge' | 'icon' }> = ({
  className = 'h-6',
  variant = 'badge',
}) => {
  if (variant === 'icon') {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="22" fill="#00A651" />
        <path
          d="M22 66V34h12l16 20 16-20h12v32h-10V47.5L62 66H50L38 47.5V66H22z"
          fill="#FFFFFF"
        />
        <circle cx="78" cy="28" r="6" fill="#E60000" />
      </svg>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-[#00A651] text-white font-black px-2.5 py-1 rounded-lg select-none shadow-sm ${className}`}
      title="Safaricom M-PESA"
    >
      <div className="flex items-center tracking-tighter text-xs font-black">
        <span className="text-white text-[13px] font-black tracking-tight">M</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#E60000] mx-0.5" />
        <span className="text-white text-[13px] font-black tracking-tight">PESA</span>
      </div>
    </div>
  );
};

// Official Visa Logo
export const VisaLogo: React.FC<{ className?: string }> = ({ className = 'h-5' }) => (
  <svg className={className} viewBox="0 0 141.7 44.5" fill="none">
    <g fill="#1A1F71">
      <path d="M54.5 1.5l-11.8 28.5-1.3-6.4c-2.2-7.5-9.1-15.6-16.8-19.7l10.9 40.4h12.5l18.6-42.8H54.5z" />
      <path d="M84.2 29.8c.1-8.1-11.2-8.5-11.1-12.1 0-3.7 3.7-5.1 7.2-5.1 4.7 0 8.2 1 10.9 2.2l1.9-9.1c-2.6-1-7.2-1.9-12.8-1.9-13.6 0-23.1 7.2-23.2 17.5-.1 7.6 6.8 11.9 12 14.4 5.3 2.6 7.1 4.2 7.1 6.5 0 3.5-4.2 5.1-8.1 5.1-6.8 0-10.8-1.1-13.9-2.5l-2 9.4c3.4 1.5 9.7 2.8 16.2 2.8 14.4.1 23.8-7.1 23.8-17.2z" />
      <path d="M109.8 44.3h11.9l-10.4-42.8h-11.1c-2.5 0-4.6 1.4-5.5 3.6l-19.4 39.2h12.5l2.5-6.8h15.3l1.8 6.8h2.9zm-13-16.7l5.4-14.8 3.1 14.8h-8.5z" />
      <path d="M24.7 1.5L1.4 44.3H14l3.8-10.4h15.3l1.8 10.4h11.8L35.8 1.5H24.7zm.1 11.3l5.3 14.8h-8.5l3.2-14.8z" />
    </g>
    <path
      d="M19.2 1.5H.6L0 4.4c14.5 3.7 24.1 12.6 28.1 23.3L23.4 1.5h-4.2z"
      fill="#F7B600"
    />
  </svg>
);

// Official Mastercard Logo (Intersecting Red & Yellow/Orange Circles)
export const MastercardLogo: React.FC<{ className?: string }> = ({ className = 'h-5' }) => (
  <svg className={className} viewBox="0 0 138 106">
    <rect width="138" height="106" rx="10" fill="transparent" />
    <g>
      <circle cx="45" cy="53" r="38" fill="#EB001B" />
      <circle cx="93" cy="53" r="38" fill="#F79E1B" />
      <path
        d="M69 25.5a37.8 37.8 0 0 0-14.8 27.5c0 10.8 4.6 20.6 14.8 27.5A37.8 37.8 0 0 0 83.8 53c0-10.8-4.6-20.6-14.8-27.5z"
        fill="#FF5F00"
      />
    </g>
  </svg>
);

// Official Google G Logo
export const GoogleGLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#EA4335"
      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.3l3.7 2.9C6.2 7.3 8.8 5 12 5z"
    />
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
    />
    <path
      fill="#FBBC05"
      d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.6 7.3C.6 9.3 0 11.6 0 14s.6 4.7 1.6 6.7l3.7-2.9z"
    />
    <path
      fill="#34A853"
      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.7 7.4 23 12 23z"
    />
  </svg>
);

export const GoogleLogo = GoogleGLogo;
