import React, { useState } from 'react';
import { X, Bike, Store, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'courier' | 'restaurant';
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const [partnerType, setPartnerType] = useState<'courier' | 'restaurant'>(type);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Nairobi',
    businessName: '',
    vehicleType: 'Motorbike / Boda Boda',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            id="partner-modal-close-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Toggle Type */}
          <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded-2xl mb-6 max-w-xs mx-auto border dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setPartnerType('courier')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                partnerType === 'courier'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Deliver as Courier</span>
            </button>
            <button
              type="button"
              onClick={() => setPartnerType('restaurant')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                partnerType === 'restaurant'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Partner Store</span>
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {partnerType === 'courier'
                ? 'Earn on your terms with Bridges'
                : 'Grow your restaurant with Bridges'}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {partnerType === 'courier'
                ? 'Join 2,500+ riders across Kenya. Flexible hours, instant M-Pesa payouts.'
                : 'Reach 100,000+ hungry customers in Nairobi, Mombasa, Kisumu & more.'}
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Application Received!</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Our onboarding team in Nairobi will contact you via WhatsApp / SMS within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Full Contact Name
                </label>
                <input
                  id="partner-name-input"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Kamau"
                  className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#FFC244] text-sm bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />
              </div>

              {partnerType === 'restaurant' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Restaurant / Store Name
                  </label>
                  <input
                    id="partner-business-input"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Nairobi Kitchen & Grill"
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#FFC244] text-sm bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Phone (M-Pesa registered)
                  </label>
                  <input
                    id="partner-phone-input"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 7..."
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#FFC244] text-sm bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    City / Region
                  </label>
                  <select
                    id="partner-city-select"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#FFC244] text-sm bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kisumu">Kisumu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Eldoret">Eldoret</option>
                    <option value="Diani">Diani</option>
                    <option value="Thika">Thika</option>
                  </select>
                </div>
              </div>

              {partnerType === 'courier' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                    Vehicle Type
                  </label>
                  <select
                    id="partner-vehicle-select"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#FFC244] text-sm bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Motorbike / Boda Boda">Motorbike / Boda Boda</option>
                    <option value="Bicycle">Bicycle / E-Bike</option>
                    <option value="Car / Small Van">Car / Small Van</option>
                    <option value="Foot Courier">Foot / Public Transit Courier</option>
                  </select>
                </div>
              )}

              <button
                id="partner-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#FFC244] hover:bg-[#ffb71a] text-zinc-950 font-bold text-sm tracking-wide shadow-[0_3px_0_0_#D49E00] active:translate-y-0.5 active:shadow-[0_1px_0_0_#D49E00] transition-all duration-150 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center flex items-center justify-center gap-1 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 inline" />
                Verified onboarding with Kenyan National ID & valid insurance.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
