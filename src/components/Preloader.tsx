import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse } from 'lucide-react';

interface PreloaderProps {
  isPreloading: boolean;
  preloaderProgress: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ isPreloading, preloaderProgress }) => {
  return (
    <AnimatePresence>
      {isPreloading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-stone-950 z-55 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Elegant glowing background aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl opacity-60 pointer-events-none" />
          
          {/* Interactive floating particles */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                  scale: Math.random() * 0.6 + 0.4,
                  opacity: Math.random() * 0.5 + 0.2
                }}
                animate={{ 
                  y: -50,
                  x: `calc(50% + ${(Math.random() - 0.5) * 300}px)`
                }}
                transition={{ 
                  duration: Math.random() * 4 + 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 0.2
                }}
                className="absolute w-2 h-2 rounded-full bg-emerald-400 blur-[1px]"
              />
            ))}
          </div>

          <div className="space-y-8 text-center max-w-sm w-full px-8 relative z-10">
            
            {/* Circular Glowing Ring Container */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              {/* Outer rotating glow ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30"
              />
              
              {/* Glow ring reflecting progress */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="rgba(255, 255, 255, 0.03)"
                  strokeWidth="4"
                  fill="transparent"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#10b981"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={351.8}
                  strokeDashoffset={351.8 - (351.8 * preloaderProgress) / 100}
                  transition={{ ease: "easeInOut" }}
                />
              </svg>

              {/* Pulsing heart logo in center */}
              <motion.div 
                animate={{ 
                  scale: [0.95, 1.1, 0.95],
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.2)",
                    "0 0 35px rgba(16, 185, 129, 0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.2)"
                  ]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center text-white z-10"
              >
                <HeartPulse className="w-9 h-9" />
              </motion.div>
            </div>

            {/* Text Transitions */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h2 className="text-2xl font-black text-white tracking-wide flex items-center justify-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-teal-300">دکترینو</span>
                <span className="text-stone-300 font-medium text-lg">VIP</span>
              </h2>
              
              <p className="text-xs text-stone-400 font-light h-4">
                {preloaderProgress < 30 && "در حال احراز هویت سرورهای درمانی..."}
                {preloaderProgress >= 30 && preloaderProgress < 70 && "بارگذاری لیست پزشکان فوق‌تخصص کشور..."}
                {preloaderProgress >= 70 && preloaderProgress < 95 && "ایجاد بستر رمزنگاری‌شده مشاوره آنلاین..."}
                {preloaderProgress >= 95 && "خوش آمدید..."}
              </p>
            </motion.div>

            {/* Interactive ECG Heartbeat SVG path */}
            <div className="w-32 mx-auto pt-2">
              <svg className="w-full h-8 text-emerald-500/50" viewBox="0 0 100 30" fill="none">
                <motion.path
                  d="M0 15 H30 L35 5 L40 25 L45 15 H100"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
