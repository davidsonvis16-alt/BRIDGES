import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'courier' | 'restaurant';
}

const CITIES = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Diani', 'Thika'];
const VEHICLES = ['Motorbike', 'Bicycle or e-bike', 'Car or small van', 'On foot'];

const fieldClass =
  'w-full h-11 px-3 rounded-md border border-ink/25 bg-white text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand';

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose, type }) => {
  const [partnerType, setPartnerType] = useState<'courier' | 'restaurant'>(type);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: 'Nairobi',
    businessName: '',
    vehicleType: VEHICLES[0],
  });

  useEffect(() => {
    if (isOpen) {
      setPartnerType(type);
      setSubmitted(false);
    }
  }, [isOpen, type]);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const isCourier = partnerType === 'courier';

  return (
    <Modal isOpen={isOpen} onClose={onClose} label={isCourier ? 'Ride with Bridges' : 'Sell on Bridges'} width="max-w-lg">
      <div className="p-6 sm:p-8 overflow-y-auto">
        <div className="inline-flex p-1 rounded-md bg-paper border border-line text-sm" role="tablist">
          {(['courier', 'restaurant'] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={partnerType === t}
              onClick={() => {
                setPartnerType(t);
                setSubmitted(false);
              }}
              className={`px-3 h-8 rounded cursor-pointer ${
                partnerType === t ? 'bg-white border border-line text-ink font-medium' : 'text-muted'
              }`}
            >
              {t === 'courier' ? 'Rider' : 'Restaurant or shop'}
            </button>
          ))}
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-ink">
          {isCourier ? 'Ride with Bridges' : 'Sell on Bridges'}
        </h2>
        <p className="mt-1 text-[15px] text-muted">
          {isCourier
            ? 'Flexible hours and weekly M-Pesa payouts. You need a national ID and, for motorbikes, a valid licence and insurance.'
            : 'Get your menu in front of customers in your city. We take care of the riders.'}
        </p>

        {submitted ? (
          <div className="mt-6 rounded-md bg-brand-tint p-4 text-[15px] text-brand-dark" role="status">
            Thanks, {form.name.split(' ')[0] || 'there'}. Our team in {form.city} will call you on +254{' '}
            {form.phone} within two working days.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Demo only: send this to your backend or CRM.
              setSubmitted(true);
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label htmlFor="partner-name" className="block text-sm font-medium text-ink mb-1.5">
                Full name
              </label>
              <input id="partner-name" required autoComplete="name" value={form.name} onChange={set('name')} className={fieldClass} />
            </div>

            {!isCourier && (
              <div>
                <label htmlFor="partner-business" className="block text-sm font-medium text-ink mb-1.5">
                  Business name
                </label>
                <input id="partner-business" required value={form.businessName} onChange={set('businessName')} className={fieldClass} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="partner-phone" className="block text-sm font-medium text-ink mb-1.5">
                  Phone (M-Pesa)
                </label>
                <input
                  id="partner-phone"
                  type="tel"
                  inputMode="tel"
                  required
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="712 345 678"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="partner-city" className="block text-sm font-medium text-ink mb-1.5">
                  City
                </label>
                <select id="partner-city" value={form.city} onChange={set('city')} className={fieldClass}>
                  {CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {isCourier && (
              <div>
                <label htmlFor="partner-vehicle" className="block text-sm font-medium text-ink mb-1.5">
                  How will you deliver?
                </label>
                <select id="partner-vehicle" value={form.vehicleType} onChange={set('vehicleType')} className={fieldClass}>
                  {VEHICLES.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 rounded-md bg-brand text-white text-[15px] font-medium hover:bg-brand-dark cursor-pointer"
            >
              Submit application
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};
