import React, { useState } from 'react';
import {
  Smartphone,
  QrCode,
  CheckCircle,
  Bike,
  Clock,
  Navigation
} from 'lucide-react';
import { motion } from 'motion/react';
import { AppleLogo, GooglePlayLogo } from './icons/BrandIcons';

export const AppDownloadSection: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 4000);
    }, 700);
  };

  return (
    <section id="download-app" className="py-16 sm:py-24 bg-white dark:bg-zinc-900 transition-colors duration-200 overflow-hidden scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-[#FFC244] rounded-[36px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl border border-black/5">
          {/* Subtle background circles */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-amber-300/60 pointer-events-none blur-2xl" />
          <div className="absolute top-10 right-1/3 w-64 h-64 rounded-full bg-yellow-200/50 pointer-events-none blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content (Cols 7) */}
            <div className="lg:col-span-7 space-y-6 text-zinc-950">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#FFC244] text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Bridges Mobile App</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
                Get the Bridges app for faster orders & live tracking
              </h2>

              <p className="text-base sm:text-lg text-zinc-900 font-medium max-w-xl leading-relaxed">
                Enjoy exclusive mobile deals, real-time live GPS courier tracking, M-Pesa 1-tap checkout, and instant support wherever you are in Kenya.
              </p>

              {/* App Store & Google Play Badges with Real Icons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {/* App Store Badge */}
                <button
                  id="app-store-btn"
                  onClick={() => alert('Redirecting to Apple App Store for Bridges Kenya...')}
                  className="flex items-center gap-3.5 bg-zinc-950 hover:bg-zinc-900 text-white px-6 py-3 rounded-2xl shadow-[0_3px_0_0_#000000] active:translate-y-0.5 active:shadow-[0_1px_0_0_#000000] transition-all cursor-pointer group"
                >
                  <AppleLogo className="w-7 h-7 text-white group-hover:scale-105 transition-transform" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                      Download on the
                    </div>
                    <div className="text-sm font-extrabold text-white leading-tight">
                      App Store
                    </div>
                  </div>
                </button>

                {/* Google Play Badge */}
                <button
                  id="google-play-btn"
                  onClick={() => alert('Redirecting to Google Play Store for Bridges Kenya...')}
                  className="flex items-center gap-3.5 bg-zinc-950 hover:bg-zinc-900 text-white px-6 py-3 rounded-2xl shadow-[0_3px_0_0_#000000] active:translate-y-0.5 active:shadow-[0_1px_0_0_#000000] transition-all cursor-pointer group"
                >
                  <GooglePlayLogo className="w-6 h-6 group-hover:scale-105 transition-transform flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                      GET IT ON
                    </div>
                    <div className="text-sm font-extrabold text-white leading-tight">
                      Google Play
                    </div>
                  </div>
                </button>
              </div>

              {/* QR Code & SMS Link widget */}
              <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* QR Code Box */}
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-black/5">
                  <div className="w-12 h-12 bg-black text-[#FFC244] rounded-xl flex items-center justify-center font-bold">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <div className="text-xs">
                    <div className="font-extrabold text-zinc-900">Scan to download</div>
                    <div className="text-zinc-600 font-medium">iOS & Android supported</div>
                  </div>
                </div>

                {/* SMS Link Form */}
                <div className="flex-1 w-full max-w-sm">
                  <form onSubmit={handleSendLink} className="flex gap-2">
                    <div className="flex flex-1 rounded-2xl bg-white border border-black/10 overflow-hidden shadow-sm">
                      <span className="px-2.5 py-2 bg-zinc-100 text-zinc-600 text-xs font-bold border-r border-zinc-200 flex items-center select-none">
                        +254
                      </span>
                      <input
                        id="app-sms-phone-input"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="712 345 678"
                        className="w-full px-3 py-2 text-xs font-semibold text-zinc-900 bg-transparent focus:outline-none placeholder:text-zinc-400"
                      />
                    </div>
                    <button
                      id="app-sms-submit-btn"
                      type="submit"
                      disabled={isSending}
                      className="px-4 py-2 bg-black hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {isSending ? 'Sending...' : 'Send Link'}
                    </button>
                  </form>

                  {isSent && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-950 font-bold mt-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-800" />
                      <span>Link sent to +254 {phoneNumber}! Check your SMS.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Phone Mockup (Cols 5) */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Phone Device Shell */}
              <div className="relative w-[280px] sm:w-[320px] bg-zinc-950 rounded-[44px] p-3.5 shadow-2xl border-4 border-zinc-800 dark:border-zinc-700">
                {/* Speaker notch / Dynamic Island */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700" />
                </div>

                {/* Inner Screen Content */}
                <div className="bg-[#FAFAFA] dark:bg-zinc-950 rounded-[34px] overflow-hidden pt-7 pb-4 px-4 text-zinc-900 dark:text-zinc-100 h-[540px] flex flex-col justify-between relative shadow-inner transition-colors duration-200">
                  {/* Top Bar inside app */}
                  <div className="flex items-center justify-between pt-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-lg bg-[#FFC244] text-black font-black text-xs flex items-center justify-center">
                        B
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-zinc-400">Delivering to</div>
                        <div className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">Kilimani, Nairobi</div>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold">
                      🇰🇪
                    </div>
                  </div>

                  {/* Simulated Map View with Live Rider Pin */}
                  <div className="relative bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-3 my-2 border border-emerald-200/60 dark:border-emerald-800/40 overflow-hidden flex-1 flex flex-col justify-between">
                    {/* Abstract map lines */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:12px_12px]" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                        <Navigation className="w-3 h-3 text-white flex-shrink-0" />
                        <span>Live Courier GPS</span>
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-900 dark:text-emerald-300 bg-white/80 dark:bg-zinc-900/80 px-2 py-0.5 rounded-md">
                        ETA 14 Mins
                      </span>
                    </div>

                    {/* Rider Marker & Route */}
                    <div className="relative z-10 my-auto flex items-center justify-center">
                      <div className="relative flex flex-col items-center">
                        <div className="w-10 h-10 rounded-2xl bg-black text-[#FFC244] flex items-center justify-center shadow-lg border-2 border-[#FFC244] animate-bounce">
                          <Bike className="w-5 h-5" />
                        </div>
                        <div className="mt-1 px-2 py-0.5 rounded-md bg-black text-white text-[9px] font-bold shadow-md whitespace-nowrap">
                          Rider Kelvin • On Way
                        </div>
                      </div>
                    </div>

                    {/* Delivery destination pin */}
                    <div className="relative z-10 flex items-center justify-between text-[10px] text-zinc-600 dark:text-zinc-300 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>Arriving at 1:45 PM</span>
                      </div>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">On Schedule</span>
                    </div>
                  </div>

                  {/* Active Order Card */}
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl p-3 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                          CJ
                        </div>
                        <div>
                          <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">CJ's Nairobi</div>
                          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            <span>2 Items</span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-0.5 font-bold text-[#00A651]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00A651]" />
                              M-PESA Paid
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-zinc-900 dark:text-zinc-100">KES 2,170</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#FFC244] h-full rounded-full w-3/4" />
                    </div>
                  </div>

                  {/* App Bottom Navigation Bar */}
                  <div className="pt-2 flex items-center justify-around text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-bold">
                    <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                      Home
                    </span>
                    <span>Search</span>
                    <span className="text-amber-700 dark:text-amber-400 font-bold">Orders (1)</span>
                    <span>Profile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
