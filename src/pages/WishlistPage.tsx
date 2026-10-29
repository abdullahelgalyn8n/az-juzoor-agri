import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { buildWhatsAppWishlistUrl } from '../utils/storeLogic';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, addToCart, clearWishlist } = useStore();
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const whatsappWishlistUrl = buildWhatsAppWishlistUrl(wishlistedProducts);

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((product) => addToCart(product, 1));
  };

  return (
    <div className="bg-[#f6f6f4] min-h-[70vh] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c2819]">
              قائمة المفضلة ({wishlistedProducts.length})
            </h1>
            <p className="text-xs sm:text-sm text-[#54634c] mt-1">
              احتفظ بمنتجاتك الزراعية المفضلة واطلبها في أي وقت عبر السلة أو مباشرة عبر واتساب.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={whatsappWishlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1f8b4c] hover:bg-[#18723d] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>اطلب المفضلة عبر واتساب</span>
              </a>
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="inline-flex items-center gap-2 bg-[#65893a] hover:bg-[#54742f] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>إضافة الكل للسلة</span>
              </button>
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center gap-1.5 border border-[#d6ddd0] bg-white hover:bg-red-50 text-[#5c6b53] hover:text-red-600 font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>مسح القائمة</span>
              </button>
            </div>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e2e6dc] p-10 sm:p-12 text-center">
            <Heart className="w-12 h-12 text-[#6b7b3e] mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#1c2819] mb-2">
              قائمة المفضلة فارغة حالياً
            </h2>
            <p className="text-sm text-[#54634c] mb-6">
              يمكنك حفظ المنتجات الزراعية المفضلة لديك للرجوع إليها لاحقاً بسهولة أو طلبها عبر واتساب.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-[#65893a] hover:bg-[#54742f] text-white font-bold text-sm px-7 py-3 rounded-md transition-colors"
            >
              تصفح المتجر
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
