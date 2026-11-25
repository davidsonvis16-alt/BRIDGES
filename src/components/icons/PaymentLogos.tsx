import React from 'react';
import mpesa from '../../assets/payments/mpesa.svg';
import visa from '../../assets/payments/visa.svg';
import mastercard from '../../assets/payments/mastercard.svg';

const LOGOS = [
  { src: mpesa, alt: 'M-PESA', h: 'h-6' },
  { src: visa, alt: 'Visa', h: 'h-3.5' },
  { src: mastercard, alt: 'Mastercard', h: 'h-6' },
];

/** Official payment-method logos, each on a white tile so they read on any background. */
export const PaymentLogos: React.FC<{ className?: string }> = ({ className = '' }) => (
  <ul className={`flex items-center gap-2 ${className}`} aria-label="Accepted payment methods">
    {LOGOS.map((l) => (
      <li key={l.alt} className="h-9 px-3 rounded bg-white flex items-center">
        <img src={l.src} alt={l.alt} className={`${l.h} w-auto`} />
      </li>
    ))}
    <li className="h-9 px-3 rounded bg-white flex items-center text-xs font-medium text-ink">Cash</li>
  </ul>
);
