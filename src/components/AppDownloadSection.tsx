import React, { useState } from 'react';
import { Check } from 'lucide-react';
import appStoreBadge from '../assets/stores/app-store.svg';
import googlePlayBadge from '../assets/stores/google-play.svg';

// Replace with the real store listings once the apps are published.
const APP_STORE_URL = '#';
const PLAY_STORE_URL = '#';

const ORDER_STEPS = [
  { label: 'Order confirmed', time: '1:21 PM', done: true },
  { label: 'Being prepared', time: '1:24 PM', done: true },
  { label: 'Rider on the way', time: '1:36 PM', done: true, current: true },
  { label: 'Delivered', time: 'Around 1:45 PM', done: false },
];

export const AppDownloadSection: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sentTo, setSentTo] = useState<string | null>(null);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length < 9) return;
    // Demo only: wire this to your SMS provider (e.g. Africa's Talking) to actually send.
    setSentTo(phoneNumber.trim());
    setPhoneNumber('');
  };

  return (
    <section id="download-app" className="bg-white border-t border-line py-16 sm:py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-ink">
            Track every order on the Bridges app
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted max-w-md">
            See your rider on the map, pay with M-Pesa in one step, and reorder your usuals. Available for
            iPhone and Android.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={APP_STORE_URL} aria-label="Download on the App Store">
              <img src={appStoreBadge} alt="Download on the App Store" className="h-12 w-auto" />
            </a>
            <a href={PLAY_STORE_URL} aria-label="Get it on Google Play">
              <img src={googlePlayBadge} alt="Get it on Google Play" className="h-12 w-auto" />
            </a>
          </div>

          <form onSubmit={handleSendLink} className="mt-8 max-w-md">
            <label htmlFor="app-sms-phone-input" className="block text-sm font-medium text-ink">
              Or get a download link by SMS
            </label>
            <div className="mt-2 flex gap-2">
              <div className="flex-1 flex items-center h-11 rounded-md border border-ink/25 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand overflow-hidden">
                <span className="px-3 text-sm text-muted border-r border-line h-full flex items-center">+254</span>
                <input
                  id="app-sms-phone-input"
                  type="tel"
                  inputMode="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setSentTo(null);
                  }}
                  placeholder="712 345 678"
                  className="w-full px-3 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-4 rounded-md bg-brand text-white text-sm font-medium hover:bg-brand-dark cursor-pointer"
              >
                Send link
              </button>
            </div>
            {sentTo && (
              <p className="mt-2 text-sm text-brand" role="status">
                Link sent to +254 {sentTo}.
              </p>
            )}
          </form>
        </div>

        {/* Static order-tracking example */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-md border border-line bg-paper p-6">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-muted uppercase tracking-wide">Order #20418</p>
                <p className="mt-1 text-base font-medium text-ink">Kilimani, Nairobi</p>
              </div>
              <p className="text-sm text-muted">KES 2,170 · M-Pesa</p>
            </div>

            <ol className="mt-6 space-y-0">
              {ORDER_STEPS.map((step, i) => (
                <li key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        step.done ? 'bg-brand border-brand text-white' : 'bg-white border-line'
                      }`}
                    >
                      {step.done && <Check className="w-3 h-3" strokeWidth={3} />}
                    </span>
                    {i < ORDER_STEPS.length - 1 && (
                      <span className={`w-px flex-1 min-h-6 ${step.done ? 'bg-brand' : 'bg-line'}`} />
                    )}
                  </div>
                  <div className="pb-5 -mt-0.5 flex-1 flex justify-between gap-4">
                    <span className={`text-sm ${step.current ? 'font-medium text-ink' : step.done ? 'text-ink' : 'text-muted'}`}>
                      {step.label}
                    </span>
                    <span className="text-sm text-muted">{step.time}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="pt-4 border-t border-line text-sm text-muted">
              Rider: Kelvin M. · Motorbike KMDX 214B
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
