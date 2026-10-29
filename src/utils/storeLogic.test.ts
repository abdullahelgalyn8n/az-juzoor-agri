import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';
import {
  filterAndSortProducts,
  addCartItem,
  updateCartItemQuantity,
  calculateCartTotals,
  toggleWishlistId,
  validateCheckoutForm,
  buildWhatsAppSingleProductUrl,
  buildWhatsAppCartOrderUrl,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from './storeLogic';

test('filterAndSortProducts filters by category and search query accurately', () => {
  const fertilizers = filterAndSortProducts(PRODUCTS, { category: 'fertilizers' });
  assert.ok(fertilizers.length >= 6);
  assert.ok(fertilizers.every((p) => p.category === 'fertilizers'));

  const searchCal = filterAndSortProducts(PRODUCTS, { searchQuery: 'كلسيومال' });
  assert.equal(searchCal.length, 1);
  assert.equal(searchCal[0].slug, 'calceumal');
});

test('filterAndSortProducts sorts ascending and descending by price', () => {
  const asc = filterAndSortProducts(PRODUCTS, { sortBy: 'price-asc' });
  for (let i = 1; i < asc.length; i++) {
    assert.ok(asc[i].price >= asc[i - 1].price);
  }

  const desc = filterAndSortProducts(PRODUCTS, { sortBy: 'price-desc' });
  for (let i = 1; i < desc.length; i++) {
    assert.ok(desc[i].price <= desc[i - 1].price);
  }
});

test('cart operations and totals calculate subtotal, savings, and free shipping threshold', () => {
  const calceumal = PRODUCTS.find((p) => p.slug === 'calceumal')!;
  const complexFull = PRODUCTS.find((p) => p.slug === 'complex-full')!;

  let cart = addCartItem([], calceumal, 1);
  let totals = calculateCartTotals(cart);
  assert.equal(totals.totalItemsCount, 1);
  assert.equal(totals.subtotal, 250);
  assert.equal(totals.shippingFee, STANDARD_SHIPPING_FEE);
  assert.equal(totals.freeShippingRemaining, FREE_SHIPPING_THRESHOLD - 250);

  cart = addCartItem(cart, complexFull, 1);
  totals = calculateCartTotals(cart);
  assert.equal(totals.totalItemsCount, 2);
  assert.equal(totals.subtotal, 1049);
  assert.equal(totals.totalSavings, 100);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.total, 1049);

  cart = updateCartItemQuantity(cart, calceumal.id, 0);
  assert.equal(cart.length, 1);
});

test('toggleWishlistId adds and removes product IDs cleanly', () => {
  let list = toggleWishlistId([], 'prod-calceumal');
  assert.deepEqual(list, ['prod-calceumal']);
  list = toggleWishlistId(list, 'prod-mango-zn');
  assert.deepEqual(list, ['prod-calceumal', 'prod-mango-zn']);
  list = toggleWishlistId(list, 'prod-calceumal');
  assert.deepEqual(list, ['prod-mango-zn']);
});

test('validateCheckoutForm enforces Egyptian phone and address rules', () => {
  const invalid = validateCheckoutForm({
    customerName: 'أح',
    phone: '12345',
    governorate: '',
    address: 'قصير',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.customerName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.governorate);
  assert.ok(invalid.errors.address);

  const valid = validateCheckoutForm({
    customerName: 'مهندس محمد إبراهيم',
    phone: '01012345678',
    governorate: 'البحيرة (النوبارية / وادي النطرون)',
    address: 'الكيلو 75 طريق مصر إسكندرية الصحراوي - مزرعة النور',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('WhatsApp URL builders generate valid wa.me links with encoded product & order info', () => {
  const calceumal = PRODUCTS.find((p) => p.slug === 'calceumal')!;
  const singleUrl = buildWhatsAppSingleProductUrl(calceumal, 2);
  assert.ok(singleUrl.startsWith('https://wa.me/201008459920?text='));
  const decodedSingle = decodeURIComponent(singleUrl);
  assert.ok(decodedSingle.includes('كلسيومال'));
  assert.ok(decodedSingle.includes('500.00 EGP'));

  const cart = addCartItem([], calceumal, 3);
  const cartUrl = buildWhatsAppCartOrderUrl(cart, {
    orderNumber: 'JZ-99999',
    customerName: 'أحمد حسن',
    phone: '01012345678',
    governorate: 'المنيا',
    address: 'العدوة - طريق المزارع',
    paymentMethod: 'cod',
  });
  const decodedCart = decodeURIComponent(cartUrl);
  assert.ok(decodedCart.includes('JZ-99999'));
  assert.ok(decodedCart.includes('أحمد حسن'));
  assert.ok(decodedCart.includes('750.00 EGP'));
});
