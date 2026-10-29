import { Product, ProductCategory } from '../data/products';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'discounts';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  governorate: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod' | 'wallet';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  status: 'قيد التجهيز' | 'تم التأكيد';
}

export const FREE_SHIPPING_THRESHOLD = 1000;
export const STANDARD_SHIPPING_FEE = 60;
export const JUZOOR_WHATSAPP_NUMBER = '201008459920';

export function filterAndSortProducts(
  products: Product[],
  options: {
    category?: ProductCategory;
    searchQuery?: string;
    sortBy?: SortOption;
    onlyDiscounts?: boolean;
  }
): Product[] {
  const {
    category = 'all',
    searchQuery = '',
    sortBy = 'default',
    onlyDiscounts = false,
  } = options;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (category !== 'all' && product.category !== category) {
      return false;
    }

    if (onlyDiscounts && (!product.originalPrice || product.originalPrice <= product.price)) {
      return false;
    }

    if (normalizedQuery) {
      const searchableText = [
        product.nameAr,
        product.nameEn,
        product.shortTitle,
        product.fullTitle,
        product.summary,
        product.categoryLabel,
        product.targetCrops,
      ]
        .join(' ')
        .toLowerCase();

      if (!searchableText.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered];

  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'discounts') {
    sorted.sort((a, b) => {
      const discA = a.originalPrice ? a.originalPrice - a.price : 0;
      const discB = b.originalPrice ? b.originalPrice - b.price : 0;
      return discB - discA;
    });
  }

  return sorted;
}

export function addCartItem(items: CartItem[], product: Product, quantity: number = 1): CartItem[] {
  if (quantity <= 0) return items;
  const existingIndex = items.findIndex((item) => item.product.id === product.id);
  if (existingIndex > -1) {
    return items.map((item, idx) =>
      idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
    );
  }
  return [...items, { product, quantity }];
}

export function updateCartItemQuantity(
  items: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return items.filter((item) => item.product.id !== productId);
  }
  return items.map((item) =>
    item.product.id === productId ? { ...item, quantity } : item
  );
}

export function removeCartItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((item) => item.product.id !== productId);
}

export function toggleWishlistId(wishlistIds: string[], productId: string): string[] {
  if (wishlistIds.includes(productId)) {
    return wishlistIds.filter((id) => id !== productId);
  }
  return [...wishlistIds, productId];
}

export function calculateCartTotals(items: CartItem[]): {
  totalItemsCount: number;
  subtotal: number;
  totalSavings: number;
  shippingFee: number;
  freeShippingRemaining: number;
  total: number;
} {
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalSavings = items.reduce((sum, item) => {
    const discount =
      item.product.originalPrice && item.product.originalPrice > item.product.price
        ? item.product.originalPrice - item.product.price
        : 0;
    return sum + discount * item.quantity;
  }, 0);

  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const total = subtotal + shippingFee;

  return {
    totalItemsCount,
    subtotal,
    totalSavings,
    shippingFee,
    freeShippingRemaining,
    total,
  };
}

export function formatPriceEGP(amount: number): string {
  return `${amount.toLocaleString('en-US')}.00 EGP`;
}

export interface CheckoutFormInput {
  customerName: string;
  phone: string;
  governorate: string;
  address: string;
}

export function validateCheckoutForm(input: CheckoutFormInput): {
  valid: boolean;
  errors: Partial<Record<keyof CheckoutFormInput, string>>;
} {
  const errors: Partial<Record<keyof CheckoutFormInput, string>> = {};

  if (!input.customerName || input.customerName.trim().length < 3) {
    errors.customerName = 'يرجى إدخال الاسم بالكامل (3 أحرف على الأقل)';
  }

  const cleanPhone = (input.phone || '').replace(/\s+/g, '');
  if (!/^01[0125][0-9]{8}$/.test(cleanPhone)) {
    errors.phone = 'يرجى إدخال رقم موبايل مصري صحيح مكون من 11 رقم (يبدأ بـ 01)';
  }

  if (!input.governorate || input.governorate.trim() === '') {
    errors.governorate = 'يرجى اختيار المحافظة';
  }

  if (!input.address || input.address.trim().length < 6) {
    errors.address = 'يرجى كتابة العنوان بالتفصيل (المركز / القرية / العلامة المميزة)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates a direct WhatsApp URL (`https://wa.me/201008459920?text=...`) for ordering a single product
 */
export function buildWhatsAppSingleProductUrl(product: Product, quantity: number = 1): string {
  const lineTotal = product.price * quantity;
  const message = [
    'مرحباً متجر *جذور (Juzoor)* 🌱',
    'أرغب في طلب المنتج التالي:',
    `• *المنتج:* ${product.shortTitle}`,
    `• *العبوة:* ${product.volume}`,
    `• *الكمية:* ${quantity}`,
    `• *السعر الإجمالي:* ${formatPriceEGP(lineTotal)}`,
    '',
    'يرجى تأكيد التوافر وموعد الشحن.',
  ].join('\n');

  return `https://wa.me/${JUZOOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a direct WhatsApp URL (`https://wa.me/201008459920?text=...`) for an entire cart or confirmed order
 */
export function buildWhatsAppCartOrderUrl(
  items: CartItem[],
  customer?: {
    orderNumber?: string;
    customerName?: string;
    phone?: string;
    governorate?: string;
    address?: string;
    notes?: string;
    paymentMethod?: 'cod' | 'wallet';
  }
): string {
  const totals = calculateCartTotals(items);
  const lines: string[] = ['مرحباً متجر *جذور (Juzoor)* 🌱'];

  if (customer?.orderNumber) {
    lines.push(`*طلب جديد رقم:* #${customer.orderNumber}`);
  } else {
    lines.push('أرغب في إتمام طلب سلة المشتريات التالية:');
  }

  lines.push('');
  lines.push('*المنتجات المطلوبة:*');
  items.forEach((item, idx) => {
    lines.push(
      `${idx + 1}. ${item.product.shortTitle} (${item.product.volume}) × ${item.quantity} = ${formatPriceEGP(
        item.product.price * item.quantity
      )}`
    );
  });

  lines.push('');
  lines.push(`• *المجموع الفرعي:* ${formatPriceEGP(totals.subtotal)}`);
  lines.push(
    `• *الشحن:* ${totals.shippingFee === 0 ? 'مجاني' : formatPriceEGP(totals.shippingFee)}`
  );
  lines.push(`• *الإجمالي الكلي:* ${formatPriceEGP(totals.total)}`);

  if (customer && (customer.customerName || customer.phone || customer.governorate)) {
    lines.push('');
    lines.push('*بيانات التوصيل:*');
    if (customer.customerName) lines.push(`• الاسم: ${customer.customerName}`);
    if (customer.phone) lines.push(`• الموبايل: ${customer.phone}`);
    if (customer.governorate) lines.push(`• المحافظة: ${customer.governorate}`);
    if (customer.address) lines.push(`• العنوان: ${customer.address}`);
    if (customer.paymentMethod) {
      lines.push(
        `• الدفع: ${
          customer.paymentMethod === 'cod' ? 'الدفع عند الاستلام (COD)' : 'محفظة إلكترونية'
        }`
      );
    }
    if (customer.notes) lines.push(`• ملاحظات: ${customer.notes}`);
  }

  return `https://wa.me/${JUZOOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/**
 * Generates a direct WhatsApp URL for sharing or ordering all wishlisted items
 */
export function buildWhatsAppWishlistUrl(products: Product[]): string {
  const lines: string[] = [
    'مرحباً متجر *جذور (Juzoor)* 🌱',
    'أرغب في الاستفسار أو طلب قائمة المنتجات المفضلة التالية:',
    '',
  ];

  products.forEach((p, idx) => {
    lines.push(`${idx + 1}. ${p.shortTitle} (${p.volume}) — ${formatPriceEGP(p.price)}`);
  });

  return `https://wa.me/${JUZOOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
