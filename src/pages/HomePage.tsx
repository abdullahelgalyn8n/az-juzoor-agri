import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  ArrowLeft,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
} from 'lucide-react';
import {
  PRODUCTS,
  SERVICES_LIST,
  VALUE_PROPS,
  STATS_ITEMS,
} from '../data/products';
import { ARTICLES } from '../data/articles';
import { ProductCard } from '../components/ProductCard';
import {
  HeroLeafEmblem,
  ServiceCustomIcon,
  JUZOOR_HERO_BG_PATH,
  JUZOOR_ABOUT_COLLAGE_PATH,
} from '../components/BrandVisuals';

export const HomePage: React.FC = () => {
  // Exact 6 flagship products showcased on the Juzoor homepage reference
  const featuredProducts = PRODUCTS.slice(0, 6);
  const latestArticles = ARTICLES.slice(0, 3);

  const renderTrustIcon = (icon: 'truck' | 'shield' | 'refresh' | 'headset') => {
    switch (icon) {
      case 'truck':
        return <Truck className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[1.75]" />;
      case 'shield':
        return <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[1.75]" />;
      case 'refresh':
        return <RefreshCw className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[1.75]" />;
      case 'headset':
        return <Headphones className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[1.75]" />;
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION — Matches Juzoor dark moody botanical leaf hero with gold sprout icon & olive CTA */}
      <section className="relative min-h-[420px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#07150a]">
        <img
          src={JUZOOR_HERO_BG_PATH}
          alt="أزرع مستقبلك مع Juzoor"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90 scale-102"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(10, 28, 14, 0.35) 0%, rgba(5, 16, 8, 0.72) 100%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center py-12 sm:py-16 flex flex-col items-center">
          <HeroLeafEmblem className="w-14 h-14 sm:w-20 sm:h-20 mb-3 sm:mb-4 drop-shadow" />
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight mb-3 leading-tight">
            أزرع مستقبلك مع Juzoor
          </h1>
          <p className="text-[#e3eadc] text-sm sm:text-lg font-medium max-w-xl mx-auto mb-6 sm:mb-7 leading-relaxed">
            أفضل البذور، الأسمدة، والمستلزمات الزراعية لتزدهر حديقتك بكل سهولة
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/shop"
              className="inline-block bg-[#798943] hover:bg-[#687738] text-white font-bold text-sm sm:text-base px-7 sm:px-8 py-2.5 sm:py-3 rounded-md shadow-md transition-colors"
            >
              تسوق الآن
            </Link>
            <a
              href="https://wa.me/201008459920?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%81%D8%B1%D9%8A%D9%82%20%D8%AC%D8%B0%D9%88%D8%B1%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B2%D8%B1%D8%A7%D8%B9%D9%8A%D8%A9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-xs text-white border border-white/25 font-bold text-sm sm:text-base px-5 py-2.5 sm:py-3 rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#7be382]" />
              <span>اطلب عبر واتساب</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. ABOUT JUZOOR SECTION — Uses the uploaded 3-photo collage on one side and structured Arabic narrative on the other */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Right column in RTL: Text content */}
            <div className="lg:col-span-6 text-right order-2 lg:order-1">
              <span className="text-[#78923b] font-extrabold text-base sm:text-lg block mb-2">
                عن Juzoor
              </span>
              <p className="text-[#1e291b] font-bold text-sm sm:text-[17px] leading-relaxed mb-5">
                منذ عام 1999 ونحن ندعم المزارعين بحلول زراعية موثوقة تجمع بين الخبرة وجودة المنتجات. نوفر لك كل ما يحتاجه نباتك من بذور وأسمدة ومبيدات واستشارات... في مكان واحد.
              </p>

              <h3 className="text-[#78923b] font-extrabold text-lg sm:text-xl mb-3">
                لماذا يثق بنا المزارعون؟
              </h3>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1b2419] mb-5">
                توفير منتجات زراعية مُختبرة وموثوقة.
              </h2>

              <ul className="space-y-3 text-[#2f3b2b] text-xs sm:text-[15px] font-medium mb-7">
                <li className="pb-2.5 border-b border-[#ecefe8]">
                  دعم فني مستمر لضمان أفضل نتائج للمحاصيل.
                </li>
                <li className="pb-2.5 border-b border-[#ecefe8]">
                  حلول متكاملة تبدأ من البذرة وتنتهي بحصاد وفير.
                </li>
                <li className="pb-2.5 border-b border-[#ecefe8]">
                  شراكات طويلة مع مزارع كبرى ومؤسسات زراعية في مختلف المحافظات.
                </li>
                <li className="pb-1">
                  فريق متخصص يساعدك في اختيار المنتج المناسب لكل مرحلة من مراحل الزراعة.
                </li>
              </ul>

              <Link
                to="/about"
                className="inline-block bg-[#6d7f38] hover:bg-[#5b6b2e] text-white font-bold text-sm px-7 py-2.5 rounded-md transition-colors"
              >
                عرض المزيد
              </Link>
            </div>

            {/* Left column in RTL: Uploaded 3-Image Collage with Juzoor circular emblem */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
              <img
                src={JUZOOR_ABOUT_COLLAGE_PATH}
                alt="عن جذور - شتلات وبذور نبتة وحقول زراعية"
                className="w-full max-w-[460px] h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION ("خدماتنا") — 2x2 Olive Green Cards */}
      <section className="py-12 sm:py-20 bg-[#e6e7e2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e281a] mb-3">
              خدماتنا
            </h2>
            <p className="text-[#2c3827] text-xs sm:text-base font-semibold leading-relaxed">
              في Juzoor نوفر حلولاً زراعية متكاملة تدعم نجاح محصولك في كل مرحلة من مراحل النمو. نقدم لك منتجات موثوقة وخبرة تمتد لأكثر من 25 عاماً لضمان أفضل نتائج لمزارعك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {SERVICES_LIST.map((srv) => (
              <Link
                key={srv.id}
                to={`/shop?category=${encodeURIComponent(srv.categoryFilter)}`}
                className="bg-[#6b7b3e] hover:bg-[#5e6d35] text-white rounded-xl p-5 sm:p-7 flex items-center justify-between gap-4 sm:gap-5 shadow-sm transition-all duration-200 group"
              >
                <div className="flex-1 text-right">
                  <h3 className="text-base sm:text-xl font-extrabold mb-1.5 sm:mb-2 text-white group-hover:text-[#eef5d8] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-[#e8eedc] text-xs sm:text-sm leading-relaxed font-normal">
                    {srv.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <ServiceCustomIcon type={srv.iconType} className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AGRICULTURAL PRODUCTS SECTION ("منتجاتنا الزراعية") */}
      <section className="py-12 sm:py-20 bg-[#f6f6f4]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e281a] mb-2">
              منتجاتنا الزراعية
            </h2>
            <p className="text-[#384632] text-xs sm:text-base font-semibold">
              نوفر لك مجموعة متنوعة من البذور والأسمدة والمبيدات المعتمدة لتلبية جميع احتياجات المزرعة.
            </p>
          </div>

          {/* Responsive Grid: 2 columns on mobile for easy thumb browsing, 4 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/shop"
              className="inline-block bg-[#65893a] hover:bg-[#54742f] text-white font-bold text-xs sm:text-sm px-7 sm:px-8 py-3 rounded-md shadow-xs transition-colors"
            >
              تصفح جميع المنتجات ({PRODUCTS.length} منتج)
            </Link>
          </div>
        </div>
      </section>

      {/* 5. STATS SECTION ("كل رقم هنا يروي قصة نجاح مع مزارعين مثلك") */}
      <section className="py-12 sm:py-20 bg-[#b6c27b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg sm:text-2xl font-extrabold text-[#192616] mb-8 sm:mb-10">
            كل رقم هنا يروي قصة نجاح مع مزارعين مثلك
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {STATS_ITEMS.map((stat) => (
              <div
                key={stat.id}
                className={`rounded-xl py-7 sm:py-10 px-4 sm:px-6 text-center shadow-sm transition-transform hover:-translate-y-0.5 ${
                  stat.isPrimaryDark
                    ? 'bg-[#091e12] text-white'
                    : 'bg-[#66733b] text-white'
                }`}
              >
                <div className="text-xl sm:text-3xl font-extrabold mb-1 tracking-tight" dir="ltr">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-xl font-bold text-white">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AGRICULTURAL ARTICLES & GUIDES SECTION ("المقالات والإرشادات الزراعية") */}
      <section className="py-12 sm:py-20 bg-white border-t border-[#e8ece2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#65893a] bg-[#eff4e8] px-3 py-1 rounded-md mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                دليل المزارع الذكي
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e281a]">
                المقالات والإرشادات الزراعية
              </h2>
              <p className="text-[#4a5842] text-xs sm:text-base mt-1">
                نصائح علمية وبرامج تسميد مجربة من مهندسي جذور لزيادة الإنتاجية وحماية المحاصيل.
              </p>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#4c6b28] hover:text-[#16281a] bg-[#eff4e8] hover:bg-[#e1ecd3] px-4 py-2.5 rounded-lg transition-colors self-start sm:self-auto"
            >
              <span>تصفح جميع المقالات ({ARTICLES.length})</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {latestArticles.map((article) => (
              <article
                key={article.id}
                className="bg-[#f9faf7] rounded-xl border border-[#dce2d3] overflow-hidden flex flex-col hover:shadow-md hover:border-[#b7c89e] transition-all group"
              >
                <Link
                  to={`/articles/${article.slug}`}
                  className="relative h-44 sm:h-48 bg-[#16281a] overflow-hidden block"
                >
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#16281a]/90 text-[#d7ebb8] text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {article.categoryLabel}
                  </span>
                </Link>
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[11px] text-[#5c6b53] mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#6b7b3e]" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="text-sm sm:text-base font-extrabold text-[#1c2819] group-hover:text-[#65893a] transition-colors leading-snug mb-2 line-clamp-2"
                  >
                    {article.title}
                  </Link>
                  <p className="text-xs text-[#4a5842] leading-relaxed mb-4 line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#4c6b28] hover:text-[#16281a] pt-3 border-t border-[#e4e9dc]"
                  >
                    <span>اقرأ البرنامج والتوصيات</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRUST & DELIVERY FEATURES SECTION — 4 Olive Cards */}
      <section className="py-12 sm:py-20 bg-[#e6e7e2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1e281a] mb-3">
              مزايا التسوق مع جذور
            </h2>
            <p className="text-[#2c3827] text-xs sm:text-base font-semibold leading-relaxed">
              في Juzoor نوفر حلولاً زراعية متكاملة تدعم نجاح محصولك في كل مرحلة من مراحل النمو. نقدم لك منتجات موثوقة وخبرة تمتد لأكثر من 25 عاماً لضمان أفضل نتائج لمزارعك.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {VALUE_PROPS.map((feat) => (
              <div
                key={feat.id}
                className="bg-[#6b7b3e] text-white rounded-xl p-5 sm:p-6 flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex-1 text-right">
                  <h3 className="text-base sm:text-lg font-extrabold mb-1.5 text-white">
                    {feat.title}
                  </h3>
                  <p className="text-[#e8eedc] text-xs leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="shrink-0">
                  {renderTrustIcon(feat.icon)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
