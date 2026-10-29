import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Calendar,
  User,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  BookOpen,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-[#f9faf7]">
        <BookOpen className="w-14 h-14 text-[#65893a] mb-4" />
        <h1 className="text-2xl font-extrabold text-[#1c2819] mb-2">
          المقال غير موجود
        </h1>
        <p className="text-sm text-[#54634c] mb-6">
          عذراً، لم نتمكن من العثور على المقال المطلوب. يمكنك تصفح كافة المقالات الزراعية.
        </p>
        <Link
          to="/articles"
          className="bg-[#65893a] hover:bg-[#54742f] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          العودة إلى المقالات الزراعية
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter((p) =>
    article.relatedProductSlugs.includes(p.slug)
  );
  const otherArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const whatsappConsultationUrl = `https://wa.me/201008459920?text=${encodeURIComponent(
    `مرحباً فريق جذور 🌱\nقرأت مقال: "${article.title}"\nوأرغب في استشارة فنية مجانية حول تطبيق هذا البرنامج في مزرعتي.`
  )}`;

  return (
    <div className="bg-[#f9faf7] min-h-screen pb-16 sm:pb-24">
      {/* Article Hero Header */}
      <div className="bg-[#122618] text-white py-10 sm:py-16 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#c8d8b0] mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link to="/articles" className="hover:text-white transition-colors">
              المقالات الزراعية
            </Link>
            <span>/</span>
            <span className="text-white font-semibold line-clamp-1">{article.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="bg-[#65893a] text-white font-bold px-3 py-1 rounded-md">
              {article.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-[#d8e3cd]">
              <Clock className="w-3.5 h-3.5 text-[#9cd35b]" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1 text-[#d8e3cd]">
              <Calendar className="w-3.5 h-3.5 text-[#9cd35b]" />
              {article.publishedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-snug mb-3">
            {article.title}
          </h1>

          <p className="text-[#dce7d0] text-sm sm:text-lg leading-relaxed mb-6">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#65893a] text-white flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{article.author}</p>
                <p className="text-xs text-[#bfd1a8]">{article.authorRole}</p>
              </div>
            </div>

            <a
              href={whatsappConsultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1f8b4c] hover:bg-[#19733e] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>اسأل مهندس جذور عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden border-4 border-white shadow-md bg-[#16281a] h-56 sm:h-80 mb-8">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Sections */}
        <div className="bg-white rounded-2xl border border-[#dce2d3] p-5 sm:p-10 shadow-xs mb-8 space-y-8">
          {article.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg sm:text-2xl font-extrabold text-[#1c2819] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#eff4e8] text-[#4c6b28] text-xs font-extrabold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                {section.heading}
              </h2>
              <div className="space-y-3 pr-0 sm:pr-9">
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-[#364430] leading-loose">
                    {para}
                  </p>
                ))}
              </div>

              {section.tips && section.tips.length > 0 && (
                <div className="bg-[#f3f7ed] border border-[#cde0b4] rounded-xl p-4 sm:p-5 mt-4 mr-0 sm:mr-9">
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#1c2819] mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#65893a]" />
                    توصيات تطبيقية من مهندسي جذور:
                  </h3>
                  <ul className="space-y-2">
                    {section.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[#2d3a27] font-medium leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#65893a] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Direct WhatsApp Consultation Banner inside Article */}
          <div className="bg-[#16281a] text-white rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-extrabold text-base sm:text-lg mb-1">
                هل تحتاج برنامج تسميد مخصص لمحصولك؟
              </h4>
              <p className="text-xs sm:text-sm text-[#cfe0bc]">
                تواصل مع فريق الدعم الفني الزراعي في جذور مجاناً عبر واتساب للحصول على الجرعات الدقيقة.
              </p>
            </div>
            <a
              href={whatsappConsultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1f8b4c] hover:bg-[#19733e] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-lg transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>استشارة مجانية عبر واتساب</span>
            </a>
          </div>
        </div>

        {/* Related Products Used in This Program */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c2819] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#65893a]" />
                  المنتجات الموصى بها في هذا المقال
                </h2>
                <p className="text-xs sm:text-sm text-[#54634c] mt-0.5">
                  يمكنك إضافتها مباشرة إلى السلة أو طلبها فوراً عبر واتساب
                </p>
              </div>
              <Link
                to="/shop"
                className="text-xs sm:text-sm font-bold text-[#4c6b28] hover:underline"
              >
                عرض كل المنتجات
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Other Articles */}
        <div className="border-t border-[#dce2d3] pt-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1c2819]">
              مقالات زراعية أخرى قد تهمك
            </h3>
            <Link
              to="/articles"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4c6b28] hover:text-[#1c2819]"
            >
              <ArrowRight className="w-4 h-4" />
              <span>كل المقالات</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherArticles.map((other) => (
              <Link
                key={other.id}
                to={`/articles/${other.slug}`}
                className="bg-white rounded-xl border border-[#dce2d3] p-4 hover:border-[#65893a] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#4c6b28] bg-[#eff4e8] px-2 py-0.5 rounded">
                    {other.categoryLabel}
                  </span>
                  <h4 className="font-bold text-sm text-[#1c2819] mt-2 mb-2 line-clamp-2">
                    {other.title}
                  </h4>
                </div>
                <span className="text-xs text-[#6d7c64] font-medium">
                  {other.readTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
