import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  /** Tailwind max-width class, e.g. "max-w-md". */
  width?: string;
  children: React.ReactNode;
  /** Hide the default close button (when the content draws its own). */
  hideClose?: boolean;
}

/** Plain dialog shell: dim backdrop, white panel, Escape to close. No animation. */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  label,
  width = 'max-w-md',
  children,
  hideClose = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`relative w-full ${width} max-h-[90vh] flex flex-col bg-white rounded-lg border border-line shadow-xl overflow-hidden`}
      >
        {!hideClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-md text-muted hover:text-ink hover:bg-paper cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
