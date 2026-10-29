import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  MessageCircle,
} from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPriceEGP, buildWhatsAppSingleProductUrl } from '../utils/storeLogic';
import { ProductPackageVisual } from './BrandVisuals';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const {
    addToCart,
    updateQuantity,
    getCartQuantity,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const wishlisted = isInWishlist(product.id);
  const qtyInCart = getCartQuantity(product.id);
  const whatsappUrl = buildWhatsAppSingleProductUrl(product, Math.max(1, qtyInCart));

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, false);
  };

  return (
    <article className="group flex flex-col justify-between bg-white rounded-2xl p-2.5 sm:p-4 border border-[#E2E8E2] hover:border-[#6F7B44] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-w-0">
      {/* Top Image Stage */}
      <div>
        <div className="relative bg-[#FAFAFA] rounded-xl p-2 sm:p-3 mb-2.5 sm:mb-3.5 border border-[#EFEFEF]">
          {/* Top Bar inside Card: Badge & Dynamic Heart Button */}
          <div className="flex items-center justify-between mb-1 gap-1">
            <div className="min-w-0">
              {product.badgeText && (
                <span className="inline-block text-[10px] sm:text-[11px] font-extrabold text-[#1E3B27] bg-[#E5EFE2] px-2 py-0.5 rounded-md truncate max-w-full">
                  {product.badgeText}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                wishlisted
                  ? `إزالة ${product.shortTitle} من المفضلة`
                  : `إضافة ${product.shortTitle} إلى المفضلة`
              }
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                wishlisted
                  ? 'bg-[#FEE2E2] text-[#DC2626] scale-105'
                  : 'bg-white text-[#526358] hover:text-[#DC2626] border border-[#E2E8E2]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="flex items-center justify-center aspect-square overflow-hidden focus:outline-none"
            aria-label={`عرض تفاصيل ${product.fullTitle}`}
          >
            <ProductPackageVisual product={product} size="md" />
          </Link>
        </div>

        {/* Category & Volume */}
        <div className="flex flex-wrap items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#5A6B32] mb-1">
          <span className="truncate">{product.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{product.volume}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-xs sm:text-[15px] font-extrabold text-[#1F2421] leading-snug sm:leading-relaxed text-right group-hover:text-[#556B2F] transition-colors min-h-[2.75rem] sm:min-h-[3.75rem] line-clamp-2 sm:line-clamp-3">
          <Link to={`/product/${product.slug}`}>{product.fullTitle}</Link>
        </h3>
      </div>

      {/* Price, Dynamic Cart Controls & Direct WhatsApp Order Button */}
      <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-[#F0F3F0] flex flex-col items-stretch text-right space-y-2">
        <div
          dir="ltr"
          className="flex flex-wrap items-baseline justify-end gap-1.5 text-xs sm:text-base font-extrabold text-[#1A1A1A] tabular-nums"
        >
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <span className="font-extrabold text-[#1E3B27] underline">
                {formatPriceEGP(product.price)}
              </span>
              <del className="text-[10px] sm:text-xs font-semibold text-[#757575]">
                {formatPriceEGP(product.originalPrice)}
              </del>
            </>
          ) : (
            <span>{formatPriceEGP(product.price)}</span>
          )}
        </div>

        {/* Dynamic Add-to-Cart OR Live Quantity Stepper if already in cart */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {qtyInCart > 0 ? (
            <div className="flex-1 flex items-center justify-between h-9 sm:h-10 rounded-xl bg-[#0C2218] text-white px-1.5 sm:px-2 min-w-0">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, qtyInCart + 1)}
                aria-label={`زيادة كمية ${product.shortTitle}`}
                className="p-1 sm:p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <span className="text-[11px] sm:text-xs font-extrabold tabular-nums truncate">
                {qtyInCart}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, qtyInCart - 1)}
                aria-label={`إنقاص كمية ${product.shortTitle}`}
                className="p-1 sm:p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`إضافة ${product.shortTitle} إلى السلة`}
              className="flex-1 h-9 sm:h-10 px-2 sm:px-4 rounded-xl bg-[#689F38] hover:bg-[#558B2F] text-white text-[11px] sm:text-sm font-extrabold flex items-center justify-center gap-1 sm:gap-1.5 transition-colors whitespace-nowrap min-w-0 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">أضف للسلة</span>
            </button>
          )}

          {/* Direct WhatsApp Quick Order Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`اطلب ${product.shortTitle} عبر واتساب`}
            title="اطلب المنتج مباشرة عبر واتساب"
            className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl bg-[#E8F8EE] hover:bg-[#25D366] text-[#15803D] hover:text-white border border-[#BBF7D0] text-xs font-extrabold flex items-center justify-center gap-1 transition-colors shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">واتساب</span>
          </a>
        </div>
      </div>
    </article>
  );
};
