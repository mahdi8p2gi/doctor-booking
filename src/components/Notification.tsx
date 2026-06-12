import React from 'react';
import { CheckCircle2, AlertTriangle, X, Info, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
}

interface NotificationProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        // Customize color and icons based on type
        const config = {
          success: {
            bg: 'bg-white/95 border-emerald-500/30 shadow-emerald-500/5',
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
            accent: 'bg-emerald-600',
          },
          info: {
            bg: 'bg-white/95 border-blue-500/30 shadow-blue-500/5',
            icon: <Info className="w-5 h-5 text-blue-600" />,
            accent: 'bg-blue-600',
          },
          warning: {
            bg: 'bg-white/95 border-amber-500/30 shadow-amber-500/5',
            icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
            accent: 'bg-amber-600',
          },
          error: {
            bg: 'bg-white/95 border-rose-500/30 shadow-rose-500/5',
            icon: <AlertCircle className="w-5 h-5 text-rose-600" />,
            accent: 'bg-rose-600',
          },
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-stretch rounded-2xl border ${config.bg} shadow-luxury overflow-hidden transition-all duration-500 transform translate-x-0 animate-in slide-in-from-bottom-5`}
            role="alert"
          >
            {/* Left accent bar (RTL is left/right) */}
            <div className={`w-1.5 ${config.accent}`} />
            
            <div className="p-4 flex gap-3 flex-1 items-start">
              <div className="mt-0.5">{config.icon}</div>
              <div className="flex-1 text-right">
                <h4 className="font-semibold text-sm text-stone-900 leading-none mb-1">
                  {toast.title}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  {toast.description}
                </p>
              </div>
              <button
                onClick={() => onClose(toast.id)}
                className="text-stone-400 hover:text-stone-700 transition-colors p-0.5 rounded-lg hover:bg-stone-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
