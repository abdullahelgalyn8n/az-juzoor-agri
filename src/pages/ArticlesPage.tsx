import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Search, ArrowLeft, Sparkles, Tag, User, Calendar } from 'lucide-react';
import {
  ARTICLES,
  ArticleCategory,
  ARTICLE_CATEGORY_LABELS,
} from '../data/articles';

export const ArticlesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = ARTICLES[0];

  return (
    <div className="bg-[#f9faf7] min-h-screen pb-16 sm:pb-24">
      {/* Page Header */}
      <div className="bg-[#122618] text-white py-10 sm:py-16 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#c8d8b0] mb-3">
            <Link to="/" className="hover:text-white transition-colors">
              الصفحة الرئيسية
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">المقالات والإرشادات الزراعية</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a3d96b] bg-white/10 px-3 py-1 rounded-md mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                مكتبة جذور المعرفية للمزارع المصري
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 leading-tight">
                المقالات والإرشادات الزراعية المتخصصة
              </h1>
              <p className="text-[#d8e3cd] text-sm sm:text-base max-w-2xl">
                دليلك الفني العملي من مهندسي جذور الزراعيين حول برامج التسميد، معالجة ملوحة التربة، تحجيم الثمار، والزراعة الناجحة.
              </p>
            </div>
            <div className="text-xs sm:text-sm bg-white/10 border border-white/15 px-4 py-2.5 rounded-xl text-[#e2ecd8] font-medium self-start md:self-auto">
              إجمالي المقالات الإرشادية:{' '}
              <strong className="text-white font-extrabold">{ARTICLES.length} مقالات معتمدة</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Featured Article Banner */}
        {selectedCategory === 'all' && !searchQuery.trim() && featuredArticle && (
          <div className="mb-8 sm:mb-12 bg-white rounded-2xl border border-[#dce2d3] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative min-h-[240px] sm:min-h-[320px] bg-[#16281a]">
                <img
                  src={featuredArticle.heroImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122618]/80 via-transparent to-transparent lg:hidden" />
                <span className="absolute top-4 right-4 bg-[#65893a] text-white text-xs font-extrabold px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  مقال مميز للأسبوع
                </span>
              </div>
              <div className="lg:col-span-6 p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#54634c] font-semibold mb-3">
                  <span className="bg-[#eff4e8] text-[#4c6b28] px-2.5 py-1 rounded-md font-bold">
                    {featuredArticle.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#6b7b3e]" />
                    {featuredArticle.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#6b7b3e]" />
                    {featuredArticle.publishedAt}
                  </span>
                </div>
                <Link
                  to={`/articles/${featuredArticle.slug}`}
                  className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1c2819] hover:text-[#65893a] transition-colors leading-snug mb-3 block"
                >
                  {featuredArticle.title}
                </Link>
                <p className="text-[#4a5842] text-sm sm:text-base leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e8ece2]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#eff4e8] text-[#4c6b28] flex items-center justify-center font-extrabold text-sm">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1c2819]">{featuredArticle.author}</p>
                      <p className="text-[11px] text-[#5c6b53]">{featuredArticle.authorRole}</p>
                    </div>
                  </div>
                  <Link
                    to={`/articles/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 bg-[#16281a] hover:bg-[#65893a] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
                  >
                    <span>اقرأ الدليل الكامل</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-xl border border-[#dce2d3] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {(Object.keys(ARTICLE_CATEGORY_LABELS) as ArticleCategory[]).map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#65893a] text-white shadow-xs'
                        : 'bg-[#f4f6f0] text-[#3f4d38] hover:bg-[#e7ece0]'
                    }`}
                  >
                    {ARTICLE_CATEGORY_LABELS[category]}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-[#6d7c64] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في المقالات الزراعية..."
                className="w-full pr-10 pl-4 py-2 bg-[#f9faf7] border border-[#dce2d3] rounded-lg text-sm text-[#1c2819] placeholder-[#728269] focus:outline-none focus:border-[#65893a]"
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#dce2d3] p-12 text-center">
            <BookOpen className="w-12 h-12 text-[#739038] mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-extrabold text-[#1c2819] mb-2">
              لا توجد مقالات مطابقة لبحثك
            </h3>
            <p className="text-sm text-[#54634c] mb-5">
              جرب اختيار تصنيف آخر أو مسح كلمة البحث لاستعراض كافة الأدلة الزراعية.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-[#65893a] hover:bg-[#54742f] text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              عرض جميع المقالات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl border border-[#dce2d3] overflow-hidden flex flex-col hover:shadow-md hover:border-[#b7c89e] transition-all duration-200 group"
              >
                <Link
                  to={`/articles/${article.slug}`}
                  className="relative h-48 sm:h-52 bg-[#16281a] overflow-hidden block"
                >
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#16281a]/90 backdrop-blur-xs text-[#d7ebb8] text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#9cd35b]" />
                    {article.categoryLabel}
                  </span>
                </Link>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[11px] text-[#5c6b53] font-medium mb-2.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#6b7b3e]" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <Link
                    to={`/articles/${article.slug}`}
                    className="text-base sm:text-lg font-extrabold text-[#1c2819] group-hover:text-[#65893a] transition-colors leading-snug mb-2.5 line-clamp-2"
                  >
                    {article.title}
                  </Link>

                  <p className="text-xs sm:text-sm text-[#4a5842] leading-relaxed mb-5 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="pt-3.5 border-t border-[#ecefe6] flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#4a5842]">
                      {article.author}
                    </span>
                    <Link
                      to={`/articles/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#4c6b28] hover:text-[#16281a] transition-colors"
                    >
                      <span>قراءة المقال</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
