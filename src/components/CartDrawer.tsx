import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  formatPriceEGP,
  FREE_SHIPPING_THRESHOLD,
  buildWhatsAppCartOrderUrl,
} from '../utils/storeLogic';
import { ProductPackageVisual } from './BrandVisuals';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    totals,
  } = useStore();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const progressPercent = Math.min(
    100,
    Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const whatsappCartUrl = buildWhatsAppCartOrderUrl(cart);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="سلة التسوق"
    >
      <div className="fixed inset-0" onClick={closeCartDrawer} />

      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#0C2218] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C4CE9B]" />
            <h2 className="text-lg font-extrabold">سلة التسوق ({totals.totalItemsCount})</h2>
          </div>
          <button
            type="button"
            onClick={closeCartDrawer}
            aria-label="إغلاق سلة التسوق"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3 bg-[#F3F6F1] border-b border-[#DCE5DC]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E3B27] mb-1.5">
            <Truck className="w-4 h-4 text-[#4E8422] shrink-0" />
            {totals.freeShippingRemaining === 0 ? (
              <span>مبروك! طلبك مؤهل للشحن المجاني لجميع المحافظات</span>
            ) : (
              <span>
                أضف منتجات بقيمة{' '}
                <strong className="tabular-nums">
                  {formatPriceEGP(totals.freeShippingRemaining)}
                </strong>{' '}
                للحصول على شحن مجاني
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-[#DCE5DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#689F38] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#F3F6F1] flex items-center justify-center text-[#6F7B44] mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-[#111C15] mb-1">
                سلة التسوق فارغة حالياً
              </h3>
              <p className="text-sm text-[#526358] max-w-xs mb-6">
                تصفح مجموعتنا المختارة من البذور والأسمدة والمخصبات الزراعية المعتمدة.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  navigate('/shop');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#6F7B44] hover:bg-[#5E6938] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                تصفح المتجر الآن
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3.5 rounded-xl bg-[#FAFBF8] border border-[#DCE5DC]"
              >
                <Link
                  to={`/product/${product.slug}`}
                  onClick={closeCartDrawer}
                  className="bg-white rounded-lg p-1.5 border border-[#EEF2ED] shrink-0 flex items-center justify-center"
                >
                  <ProductPackageVisual product={product} size="sm" />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={closeCartDrawer}
                      className="text-sm font-extrabold text-[#111C15] hover:text-[#556B2F] line-clamp-1"
                    >
                      {product.shortTitle}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`حذف ${product.shortTitle} من السلة`}
                      className="text-[#64746B] hover:text-[#B91C1C] p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[#526358] mt-0.5">{product.volume}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center rounded-lg border border-[#CBD5CD] bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={`زيادة كمية ${product.shortTitle}`}
                        className="p-1.5 text-[#111C15] hover:bg-[#F3F6F1] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-extrabold text-[#111C15] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`إنقاص كمية ${product.shortTitle}`}
                        className="p-1.5 text-[#111C15] hover:bg-[#F3F6F1] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-extrabold text-[#111C15] tabular-nums">
                      {formatPriceEGP(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Direct WhatsApp Order Button */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#FAFBF8] border-t border-[#DCE5DC] space-y-3.5">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#37473D]">
                <span>المجموع الفرعي</span>
                <span className="font-bold tabular-nums">{formatPriceEGP(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#37473D]">
                <span>مصاريف الشحن</span>
                <span className="font-bold tabular-nums">
                  {totals.shippingFee === 0 ? 'مجاني' : formatPriceEGP(totals.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#111C15] pt-2 border-t border-[#DCE5DC]">
                <span>الإجمالي الكلي</span>
                <span className="tabular-nums text-[#2E6F23]">{formatPriceEGP(totals.total)}</span>
              </div>
            </div>

            {/* Direct WhatsApp Cart Checkout CTA */}
            <a
              href={whatsappCartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>اطلب السلة الآن عبر واتساب</span>
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/cart"
                onClick={closeCartDrawer}
                className="py-2.5 px-3 rounded-xl bg-[#0C2218] hover:bg-[#163828] text-white text-xs sm:text-sm font-bold text-center transition-colors whitespace-nowrap shrink-0"
              >
                إتمام الطلب بالموقع
              </Link>
              <button
                type="button"
                onClick={closeCartDrawer}
                className="py-2.5 px-3 rounded-xl border border-[#CBD5CD] text-[#222222] hover:bg-white text-xs sm:text-sm font-bold text-center transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
