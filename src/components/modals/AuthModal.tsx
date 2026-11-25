import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { GoogleLogo } from '../icons/BrandIcons';
import { BridgesMark } from '../icons/BridgesLogo';
import { Modal } from '../ui/Modal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const inputClass =
  'w-full h-11 px-3 rounded-md border border-ink/25 bg-white text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setCodeSent(false);
    }
  }, [isOpen, initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only: connect to your auth/OTP provider here.
    setCodeSent(true);
  };

  const isLogin = mode === 'login';

  return (
    <Modal isOpen={isOpen} onClose={onClose} label={isLogin ? 'Log in' : 'Create account'}>
      <div className="p-6 sm:p-8 overflow-y-auto">
        <BridgesMark className="w-9 h-9" />
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-ink">
          {isLogin ? 'Log in to Bridges' : 'Create your account'}
        </h2>
        <p className="mt-1 text-[15px] text-muted">
          {isLogin ? 'Use the phone number on your account.' : 'It takes less than a minute.'}
        </p>

        {codeSent ? (
          <div className="mt-6 rounded-md bg-brand-tint p-4 text-[15px] text-brand-dark" role="status">
            We sent a 6-digit code by SMS to +254 {phone}. Enter it on the next screen to continue.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="signup-name-input" className="block text-sm font-medium text-ink mb-1.5">
                    Full name
                  </label>
                  <input
                    id="signup-name-input"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}

              <div>
                <label htmlFor="auth-phone-input" className="block text-sm font-medium text-ink mb-1.5">
                  Phone number
                </label>
                <div className="flex items-center h-11 rounded-md border border-ink/25 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand overflow-hidden">
                  <span className="px-3 h-full flex items-center text-[15px] text-muted border-r border-line">+254</span>
                  <input
                    id="auth-phone-input"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="712 345 678"
                    className="w-full px-3 bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted">We will text you a one-time code.</p>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-md bg-brand text-white text-[15px] font-medium hover:bg-brand-dark cursor-pointer"
              >
                {isLogin ? 'Continue' : 'Create account'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted">
              <span className="flex-1 h-px bg-line" />
              or
              <span className="flex-1 h-px bg-line" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="h-11 inline-flex items-center justify-center gap-2 rounded-md border border-line text-sm font-medium text-ink hover:bg-paper cursor-pointer"
              >
                <GoogleLogo className="w-4 h-4" /> Google
              </button>
              <button
                type="button"
                className="h-11 inline-flex items-center justify-center gap-2 rounded-md border border-line text-sm font-medium text-ink hover:bg-paper cursor-pointer"
              >
                <Mail className="w-4 h-4" /> Email
              </button>
            </div>

            <p className="mt-6 text-sm text-muted">
              {isLogin ? 'New to Bridges? ' : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setMode(isLogin ? 'signup' : 'login')}
                className="font-medium text-brand hover:underline cursor-pointer"
              >
                {isLogin ? 'Create an account' : 'Log in'}
              </button>
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};
