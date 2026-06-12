import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import { Article } from '../App';

interface MagazineProps {
  articles: Article[];
  setSelectedArticle: (article: Article) => void;
  setArticleFeedback: (feedback: null) => void;
  addToast: (title: string, desc: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Magazine: React.FC<MagazineProps> = ({
  articles,
  setSelectedArticle,
  setArticleFeedback,
  addToast
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-right mb-10">
        <h2 className="text-2xl sm:text-4xl font-black text-stone-950">مجله سلامت دکترینو</h2>
        <p className="text-xs text-stone-500 font-light mt-1.5">
          آخرین مقالات و دستاوردهای پزشکی (جهت مطالعه کامل روی هر مقاله کلیک کنید)
        </p>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <motion.article 
            key={article.id}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => {
              setSelectedArticle(article);
              setArticleFeedback(null);
            }}
            className="group bg-white rounded-3xl border border-stone-100 shadow-premium hover:shadow-luxury transition-all duration-300 overflow-hidden flex flex-col justify-between text-right cursor-pointer"
          >
            <div className="relative h-44 w-full overflow-hidden bg-stone-50">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold">
                    {article.category}
                  </span>
                  <span className="text-stone-400 font-light flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xs font-black text-stone-950 leading-snug group-hover:text-emerald-750 transition-colors">
                  {article.title}
                </h3>

                <p className="text-[11px] text-stone-500 font-light leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-50 flex justify-between items-center">
                <span className="text-[10px] text-stone-600 font-semibold">{article.author}</span>
                <span className="text-[10px] text-stone-400 flex items-center gap-1 font-mono">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{article.views} بازدید</span>
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 p-8 sm:p-12 rounded-[40px] bg-emerald-50/40 border border-emerald-100/50 text-center space-y-5 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-emerald-600 uppercase">عضویت در خبرنامه پزشکی</span>
        <h3 className="text-lg sm:text-xl font-black text-stone-900">
          جدیدترین دانستنی‌های تاییدشده سلامتی را در ایمیل خود دریافت کنید.
        </h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto font-light">
          بدون ارسال اسپم، فقط یک ایمیل در هفته شامل جدیدترین مقالات و معرفی پزشکان برجسته دکترینو.
        </p>
        
        <div className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="email"
            placeholder="آدرس ایمیل شما..."
            className="flex-1 px-4 py-2.5 text-xs bg-white border border-stone-200 rounded-2xl focus:border-emerald-500 focus:outline-none text-left dir-ltr"
          />
          <button
            onClick={() => addToast('عضویت در خبرنامه', 'آدرس ایمیل شما با موفقیت ثبت گردید.', 'success')}
            className="px-6 py-2.5 rounded-2xl bg-stone-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer"
          >
            عضویت فوری
          </button>
        </div>
      </div>

    </div>
  );
};
