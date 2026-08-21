import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* CONTENEDOR DE TOASTS FLOTANTES */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-slideUp ${
              t.type === 'success'
                ? 'bg-[#111111]/95 border-blue-500/40 text-white shadow-blue-500/10'
                : t.type === 'error'
                ? 'bg-[#111111]/95 border-rose-500/40 text-white shadow-rose-500/10'
                : 'bg-[#111111]/95 border-neutral-700 text-white'
            }`}
          >
            <div className="flex items-start gap-3">
              {t.type === 'success' && (
                <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
              )}
              {t.type === 'error' && (
                <div className="w-6 h-6 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                </div>
              )}
              {t.type === 'info' && (
                <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-4 h-4 text-blue-400" />
                </div>
              )}

              <div className="text-xs font-semibold leading-relaxed text-neutral-200">
                {t.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser utilizado dentro de un ToastProvider');
  }
  return context;
}
