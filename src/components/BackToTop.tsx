import React from 'react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  showBackToTop: boolean;
  scrollToTop: () => void;
}

export const BackToTop: React.FC<BackToTopProps> = ({ showBackToTop, scrollToTop }) => {
  if (!showBackToTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-stone-950 hover:bg-emerald-600 text-white shadow-luxury hover:shadow-emerald-950/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-stone-800/80"
      title="بازگشت به بالای صفحه"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
