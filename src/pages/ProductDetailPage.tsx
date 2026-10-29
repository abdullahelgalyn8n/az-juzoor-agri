import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  MessageCircle,
  BookOpen,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/articles';
import { useStore } from '../context/StoreContext';
import { formatPriceEGP, buildWhatsAppSingleProductUrl } from '../utils/storeLogic';
import { ProductPackageVisual } from '../components/BrandVisuals';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, toggleWishlist, isInWishlist, getCartQuantity } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-[#1c2819] mb-3">
          المنتج غير موجود
        </h1>
        <p className="text-[#4a5842] mb-6">
          عذراً، لم نتمكن من العثور على المنتج المطلوب.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-[#65893a] text-white font-bold px-6 py-3 rounded-md"
        >
          العودة إلى المتجر
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const inCartQty = getCartQuantity(product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  const relatedArticles = ARTICLES.filter((a) =>
    a.relatedProductSlugs.includes(product.slug)
  );
  const whatsappDirectUrl = buildWhatsAppSingleProductUrl(product, quantity);

  return (
    <div className="bg-[#f6f6f4] min-h-screen py-6 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#4a5842] mb-6">
          <Link to="/" className="hover:text-[#1c2819] font-medium">
            الصفحة الرئيسية
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#1c2819] font-medium">
            المتجر
          </Link>
          <span>/</span>
          <span className="text-[#1c2819] font-bold line-clamp-1">{product.shortTitle}</span>
        </nav>

        {/* Product Detail Box */}
        <div className="bg-white rounded-2xl border border-[#e2e6dc] p-5 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image Column */}
            <div className="lg:col-span-5 bg-[#fafaf9] rounded-xl border border-[#ecefe8] p-6 flex items-center justify-center min-h-[280px] sm:min-h-[360px] relative">
              {product.badgeText && (
                <span className="absolute top-4 right-4 bg-[#65893a] text-white text-xs font-bold px-3 py-1 rounded">
                  {product.badgeText}
                </span>
              )}
              <ProductPackageVisual product={product} size="lg" />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-block text-xs font-bold text-[#65893a] bg-[#eff4e8] px-3 py-1 rounded-md">
                  {product.categoryLabel}
                </span>
                {inCartQty > 0 && (
                  <span className="inline-block text-xs font-bold text-[#1f8b4c] bg-[#e6f6ec] px-3 py-1 rounded-md">
                    موجود في سلتك ({inCartQty} عبوة)
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1c2819] leading-snug mb-4">
                {product.fullTitle}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5" dir="ltr">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#2b3a24]">
                  {formatPriceEGP(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#7c8776] line-through">
                    {formatPriceEGP(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-[#2f3b2b] text-sm sm:text-base leading-relaxed mb-6">
                {product.summary}
              </p>

              {/* Technical Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#f6f7f3] p-4 rounded-xl border border-[#e4e8de] mb-6 text-xs sm:text-sm">
                <div>
                  <span className="text-[#5e6e54] block text-xs mb-0.5">حجم العبوة:</span>
                  <strong className="text-[#1c2819]">{product.volume}</strong>
                </div>
                <div>
                  <span className="text-[#5e6e54] block text-xs mb-0.5">معدل الاستخدام:</span>
                  <strong className="text-[#1c2819]">{product.dosage}</strong>
                </div>
                <div>
                  <span className="text-[#5e6e54] block text-xs mb-0.5">المنشأ / التقنية:</span>
                  <strong className="text-[#1c2819]">{product.origin}</strong>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-7">
                <h3 className="text-sm font-extrabold text-[#1c2819] mb-2.5">
                  أهم الفوائد والمميزات الزراعية:
                </h3>
                <ul className="space-y-2">
                  {product.highlights.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs sm:text-sm text-[#2f3b2b] font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#65893a] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity + Add to Cart + Direct WhatsApp Order + Wishlist */}
              <div className="space-y-3 pt-4 border-t border-[#ecefe8]">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center border border-[#d0d7c8] rounded-md bg-[#fafaf9]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="تقليل الكمية"
                      className="p-2.5 text-[#2f3b2b] hover:bg-[#ecefe8] cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-sm text-[#1c2819]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="زيادة الكمية"
                      className="p-2.5 text-[#2f3b2b] hover:bg-[#ecefe8] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 min-w-[160px] bg-[#65893a] hover:bg-[#54742f] text-white font-bold text-sm py-3 px-5 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>إضافة إلى السلة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="إضافة للمفضلة"
                    className={`py-3 px-4 rounded-md border text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                      wishlisted
                        ? 'border-[#c83e3e] bg-[#fdf2f2] text-[#c83e3e]'
                        : 'border-[#d0d7c8] text-[#2f3b2b] hover:border-[#65893a]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#c83e3e]' : ''}`} />
                    <span className="hidden sm:inline">
                      {wishlisted ? 'في المفضلة' : 'أضف للمفضلة'}
                    </span>
                  </button>
                </div>

                {/* Direct WhatsApp Order Button */}
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1f8b4c] hover:bg-[#18723d] text-white font-bold text-sm py-3.5 px-6 rounded-md flex items-center justify-center gap-2.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    اطلب هذا المنتج مباشرة عبر واتساب ({quantity} عبوة -{' '}
                    {formatPriceEGP(product.price * quantity)})
                  </span>
                </a>
              </div>

              {/* Trust Strip */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-[#ecefe8] text-xs text-[#4a5842] font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#65893a] shrink-0" />
                  <span>منتج أصلي ومضمون 100% من جذور</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#65893a] shrink-0" />
                  <span>شحن سريع لجميع محافظات مصر</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Agricultural Articles for this Product */}
        {relatedArticles.length > 0 && (
          <div className="mt-10 bg-[#eff4e8] rounded-2xl border border-[#cde0b4] p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-extrabold text-[#1c2819] mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#65893a]" />
              مقالات وبرامج زراعية تشرح استخدام {product.shortTitle}:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  to={`/articles/${art.slug}`}
                  className="bg-white rounded-xl p-4 border border-[#dce2d3] hover:border-[#65893a] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#4c6b28] bg-[#eff4e8] px-2.5 py-0.5 rounded">
                      {art.categoryLabel}
                    </span>
                    <h4 className="font-extrabold text-sm text-[#1c2819] mt-2 mb-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#54634c] line-clamp-2">{art.excerpt}</p>
                  </div>
                  <span className="text-xs font-bold text-[#65893a] mt-3 inline-block">
                    اقرأ المقال الإرشادي ←
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-extrabold text-[#1c2819] mb-6">
              منتجات مشابهة في {product.categoryLabel}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
