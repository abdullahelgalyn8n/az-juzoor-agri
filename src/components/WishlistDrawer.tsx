import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Heart,
  ShoppingCart,
  Trash2,
  MessageCircle,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPriceEGP, buildWhatsAppWishlistUrl } from '../utils/storeLogic';
import { ProductPackageVisual } from './BrandVisuals';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlistIds,
    isWishlistDrawerOpen,
    closeWishlistDrawer,
    toggleWishlist,
    addToCart,
    clearWishlist,
  } = useStore();
  const navigate = useNavigate();

  if (!isWishlistDrawerOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const whatsappWishlistUrl = buildWhatsAppWishlistUrl(wishlistedProducts);

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, 1, false);
    });
    closeWishlistDrawer();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="قائمة المفضلة"
    >
      <div className="fixed inset-0" onClick={closeWishlistDrawer} />

      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#0C2218] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#C4CE9B] fill-current" />
            <h2 className="text-lg font-extrabold">المفضلة ({wishlistedProducts.length})</h2>
          </div>
          <button
            type="button"
            onClick={closeWishlistDrawer}
            aria-label="إغلاق قائمة المفضلة"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#F3F6F1] flex items-center justify-center text-[#6F7B44] mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-[#111C15] mb-1">
                قائمة المفضلة فارغة
              </h3>
              <p className="text-sm text-[#526358] max-w-xs mb-6">
                اضغط على علامة القلب بجانب أي منتج لحفظه في مفضلتك والرجوع إليه في أي وقت.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeWishlistDrawer();
                  navigate('/shop');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#6F7B44] hover:bg-[#5E6938] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                استكشف المنتجات
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3.5 rounded-xl bg-[#FAFBF8] border border-[#DCE5DC] items-center"
              >
                <Link
                  to={`/product/${product.slug}`}
                  onClick={closeWishlistDrawer}
                  className="bg-white rounded-lg p-1.5 border border-[#EEF2ED] shrink-0 flex items-center justify-center"
                >
                  <ProductPackageVisual product={product} size="sm" />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={closeWishlistDrawer}
                      className="text-sm font-extrabold text-[#111C15] hover:text-[#556B2F] line-clamp-1"
                    >
                      {product.shortTitle}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={`إزالة ${product.shortTitle} من المفضلة`}
                      className="text-[#64746B] hover:text-[#B91C1C] p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#526358] mt-0.5">
                    <span>{product.volume}</span>
                    <span>·</span>
                    <span className="font-extrabold text-[#1E3B27] tabular-nums">
                      {formatPriceEGP(product.price)}
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1, true)}
                      className="w-full py-1.5 px-3 rounded-lg bg-[#689F38] hover:bg-[#558B2F] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>نقل إلى السلة</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-5 bg-[#FAFBF8] border-t border-[#DCE5DC] space-y-2.5">
            <button
              type="button"
              onClick={handleMoveAllToCart}
              className="w-full py-3 px-4 rounded-xl bg-[#6F7B44] hover:bg-[#5E6938] text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>إضافة الكل إلى السلة ({wishlistedProducts.length})</span>
            </button>

            <a
              href={whatsappWishlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>اطلب قائمة المفضلة عبر واتساب</span>
            </a>

            <div className="flex items-center justify-between pt-1">
              <Link
                to="/wishlist"
                onClick={closeWishlistDrawer}
                className="text-xs font-bold text-[#0C2218] hover:underline"
              >
                فتح صفحة المفضلة الكاملة
              </Link>
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs font-bold text-[#B91C1C] hover:underline cursor-pointer"
              >
                مسح القائمة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
