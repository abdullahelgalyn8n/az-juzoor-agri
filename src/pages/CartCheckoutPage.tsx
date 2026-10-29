import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, CheckCircle2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { EGYPT_GOVERNORATES } from '../data/products';
import {
  formatPriceEGP,
  validateCheckoutForm,
  CheckoutFormInput,
  buildWhatsAppCartOrderUrl,
} from '../utils/storeLogic';
import { ProductPackageVisual } from '../components/BrandVisuals';

export const CartCheckoutPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, placeOrder, totals } = useStore();

  const [form, setForm] = useState<
    CheckoutFormInput & { paymentMethod: 'cod' | 'wallet'; notes: string }
  >({
    customerName: '',
    phone: '',
    governorate: '',
    address: '',
    paymentMethod: 'cod',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormInput, string>>>({});
  const [orderCompleted, setOrderCompleted] = useState<{
    orderNumber: string;
    total: number;
    customerName: string;
    whatsappUrl: string;
  } | null>(null);

  const liveWhatsAppOrderUrl = buildWhatsAppCartOrderUrl(cart, {
    customerName: form.customerName,
    phone: form.phone,
    governorate: form.governorate,
    address: form.address,
    notes: form.notes,
    paymentMethod: form.paymentMethod,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const currentCartSnapshot = [...cart];
    const createdOrder = placeOrder({
      customerName: form.customerName,
      phone: form.phone,
      governorate: form.governorate,
      address: form.address,
      notes: form.notes,
      paymentMethod: form.paymentMethod,
    });

    const whatsappUrl = buildWhatsAppCartOrderUrl(currentCartSnapshot, {
      orderNumber: createdOrder.orderNumber,
      customerName: createdOrder.customerName,
      phone: createdOrder.phone,
      governorate: createdOrder.governorate,
      address: createdOrder.address,
      notes: createdOrder.notes,
      paymentMethod: createdOrder.paymentMethod,
    });

    setOrderCompleted({
      orderNumber: createdOrder.orderNumber,
      total: createdOrder.total,
      customerName: createdOrder.customerName,
      whatsappUrl,
    });
  };

  if (orderCompleted) {
    return (
      <div className="bg-[#f6f6f4] min-h-[70vh] py-12 sm:py-16 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-[#e2e6dc] p-6 sm:p-8 text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#eff4e8] text-[#65893a] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1c2819] mb-2">
            تم تسجيل طلبك بنجاح!
          </h1>
          <p className="text-[#4a5842] text-sm mb-6">
            شكراً لك يا {orderCompleted.customerName}. يمكنك الآن إرسال تفاصيل الطلب مباشرة إلى واتساب خدمة عملاء جذور لتأكيد الشحن الفوري.
          </p>
          <div className="bg-[#f6f7f3] rounded-xl p-4 mb-6 text-sm space-y-2 border border-[#e4e8de]">
            <div className="flex justify-between">
              <span className="text-[#5e6e54]">رقم الطلب:</span>
              <strong className="text-[#1c2819]" dir="ltr">
                {orderCompleted.orderNumber}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5e6e54]">إجمالي المبلغ المطلوب:</span>
              <strong className="text-[#65893a]" dir="ltr">
                {formatPriceEGP(orderCompleted.total)}
              </strong>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={orderCompleted.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#1f8b4c] hover:bg-[#18723d] text-white font-bold text-sm px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تأكيد وإرسال الطلب عبر واتساب الآن</span>
            </a>

            <Link
              to="/shop"
              className="w-full inline-block bg-[#16281a] hover:bg-[#223c28] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              العودة إلى المتجر
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f6f4] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c2819] mb-6 sm:mb-8">
          سلة التسوق وإتمام الطلب
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e2e6dc] p-10 sm:p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-[#6b7b3e] mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#1c2819] mb-2">سلة التسوق فارغة</h2>
            <p className="text-sm text-[#54634c] mb-6">
              أضف منتجاتك الزراعية المفضلة من الأسمدة والبذور والمبيدات لتبدأ الطلب.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-[#65893a] hover:bg-[#54742f] text-white font-bold text-sm px-7 py-3 rounded-md transition-colors"
            >
              تصفح المنتجات الزراعية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-[#e2e6dc] p-4 flex items-center gap-3 sm:gap-4"
                >
                  <div className="bg-[#fafaf9] rounded-lg border border-[#ecefe8] p-1.5 shrink-0">
                    <ProductPackageVisual product={product} size="sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-bold text-xs sm:text-sm text-[#1c2819] hover:text-[#65893a] line-clamp-1"
                    >
                      {product.fullTitle}
                    </Link>
                    <p className="text-xs text-[#5e6e54] mt-0.5">{product.volume}</p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#65893a] mt-1" dir="ltr">
                      {formatPriceEGP(product.price * quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 border border-[#d5dccd] rounded-md px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 text-[#2f3b2b] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold px-2">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 text-[#2f3b2b] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="حذف"
                    className="p-2 text-[#8c9684] hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Form & Summary */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-5 bg-white rounded-2xl border border-[#e2e6dc] p-5 sm:p-6 space-y-4"
            >
              <h2 className="text-lg font-extrabold text-[#1c2819] border-b border-[#ecefe8] pb-3">
                بيانات الشحن والتوصيل
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#2f3b2b] mb-1">
                  الاسم بالكامل *
                </label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  placeholder="مثال: م. أحمد محمود"
                  className="w-full rounded-lg border border-[#d2d9ca] px-3.5 py-2.5 text-sm text-[#1c2819] focus:outline-none focus:border-[#65893a]"
                />
                {errors.customerName && (
                  <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2f3b2b] mb-1">
                  رقم الهاتف (موبايل / واتساب) *
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="01012345678"
                  className="w-full rounded-lg border border-[#d2d9ca] px-3.5 py-2.5 text-sm text-right text-[#1c2819] focus:outline-none focus:border-[#65893a]"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2f3b2b] mb-1">
                  المحافظة *
                </label>
                <select
                  value={form.governorate}
                  onChange={(e) => setForm({ ...form, governorate: e.target.value })}
                  className="w-full rounded-lg border border-[#d2d9ca] px-3.5 py-2.5 text-sm text-[#1c2819] bg-white focus:outline-none focus:border-[#65893a]"
                >
                  <option value="">اختر المحافظة</option>
                  {EGYPT_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
                {errors.governorate && (
                  <p className="text-xs text-red-600 mt-1">{errors.governorate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2f3b2b] mb-1">
                  العنوان بالتفصيل *
                </label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="المركز / القرية / اسم الشارع أو المزرعة"
                  className="w-full rounded-lg border border-[#d2d9ca] px-3.5 py-2 text-sm text-[#1c2819] focus:outline-none focus:border-[#65893a]"
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-[#f6f7f3] rounded-xl p-4 space-y-2 text-sm border border-[#e4e8de]">
                <div className="flex justify-between text-[#4a5842]">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold" dir="ltr">
                    {formatPriceEGP(totals.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[#4a5842]">
                  <span>مصاريف الشحن:</span>
                  <span className="font-bold" dir="ltr">
                    {totals.shippingFee === 0 ? 'مجاني' : formatPriceEGP(totals.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#1c2819] pt-2 border-t border-[#dce2d4]">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-[#65893a]" dir="ltr">
                    {formatPriceEGP(totals.total)}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <a
                  href={liveWhatsAppOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1f8b4c] hover:bg-[#18723d] text-white font-bold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال الطلب مباشرة عبر واتساب</span>
                </a>

                <button
                  type="submit"
                  className="w-full bg-[#65893a] hover:bg-[#54742f] text-white font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  تأكيد الطلب عبر الموقع ({formatPriceEGP(totals.total)})
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
