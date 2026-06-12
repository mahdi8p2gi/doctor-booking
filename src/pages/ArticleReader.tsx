import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Article } from '../App';

interface ArticleReaderProps {
  selectedArticle: Article;
  setSelectedArticle: (article: Article | null) => void;
  articleFeedback: 'yes' | 'no' | null;
  setArticleFeedback: (feedback: 'yes' | 'no' | null) => void;
  addToast: (title: string, desc: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  selectedArticle,
  setSelectedArticle,
  articleFeedback,
  setArticleFeedback,
  addToast
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Back button */}
      <button
        onClick={() => setSelectedArticle(null)}
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-950 font-bold transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-premium"
      >
        <ArrowRight className="w-4 h-4" />
        <span>بازگشت به مجله سلامت</span>
      </button>

      {/* Main Article Card */}
      <motion.article 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-stone-100 shadow-luxury overflow-hidden text-right"
      >
        
        {/* Cover Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-50">
          <img 
            src={selectedArticle.imageUrl} 
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-6 right-6 px-4 py-1 rounded-2xl bg-white/95 backdrop-blur-md text-xs font-bold text-stone-900 shadow-md">
            {selectedArticle.category}
          </span>
        </div>

        {/* Article Content */}
        <div className="p-8 sm:p-10 space-y-6">
          
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                {selectedArticle.author.charAt(0)}
              </div>
              <div>
                <span className="block text-xs font-bold text-stone-900">نویسنده: {selectedArticle.author}</span>
                <span className="block text-[9px] text-stone-400 font-light">پزشک تاییدشده دکترینو</span>
              </div>
            </div>

            <div className="flex gap-4 text-xs text-stone-400 font-light">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{selectedArticle.readTime}</span>
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{selectedArticle.views} بازدید</span>
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-black text-stone-950 leading-snug">
            {selectedArticle.title}
          </h1>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-light font-sans">
            {selectedArticle.content.map((paragraph, index) => (
              <p key={index} className="indent-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Feedback */}
          <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs font-semibold text-stone-700">آیا این مقاله برای شما مفید بود؟</span>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setArticleFeedback('yes');
                  addToast('سپاس از بازخورد شما', 'نظر شما با موفقیت ثبت گردید.', 'success');
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  articleFeedback === 'yes'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>بله، مفید بود</span>
              </button>

              <button
                onClick={() => {
                  setArticleFeedback('no');
                  addToast('سپاس از بازخورد شما', 'تلاش می‌کنیم مطالب بهتری تولید کنیم.', 'info');
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  articleFeedback === 'no'
                    ? 'bg-rose-50 border-rose-300 text-rose-700'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-600'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>خیر، نیاز به بهبود دارد</span>
              </button>
            </div>
          </div>

        </div>

      </motion.article>

    </div>
  );
};
