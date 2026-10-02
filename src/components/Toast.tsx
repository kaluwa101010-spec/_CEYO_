import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClear, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-primary text-on-primary px-5 py-3.5 border border-primary-container shadow-2xl flex items-center space-x-3 text-xs md:text-sm font-label-caps uppercase tracking-wider">
        <span className="material-symbols-outlined text-[18px]">verified</span>
        <span>{message}</span>
        <button onClick={onClear} className="text-surface-variant hover:text-on-primary ml-2 p-1">
          <span className="material-symbols-outlined text-xs">close</span>
        </button>
      </div>
    </div>
  );
};
