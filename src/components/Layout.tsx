import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Home,
  Store,
  BookOpen,
  MessageCircle,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Sprout,
  FlaskConical,
  ShieldAlert,
  Layers,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORY_LABELS, ProductCategory } from '../data/products';
import { formatPriceEGP } from '../utils/storeLogic';
import { JuzoorLogoCrest, ProductPackageVisual } from './BrandVisuals';
import { CartDrawer } from './CartDrawer';
import { WishlistDrawer } from './WishlistDrawer';

const NAV_ITEMS = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/shop', label: 'المتجر الزراعي', end: false },
  { to: '/articles', label: 'المقالات الزراعية', end: false },
  { to: '/about', label: 'من نحن', end: false },
  { to: '/contact', label: 'اتصل بنا', end: false },
];

const QUICK_CATEGORIES: {
  key: ProductCategory;
  label: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    key: 'fertilizers',
    label: 'الأسمدة والمخصبات',
    desc: 'كلسيومال، مانجو زنك، جوكر، كومبليكس فول',
    icon: <FlaskConical className="w-4 h-4 text-[#8eb842]" />,
  },
  {
    key: 'soil_enhancers',
    label: 'محسنات التربة والملوحة',
    desc: 'ماجيك ميكس توب، ماجيك سال، هيوميك توب',
    icon: <Layers className="w-4 h-4 text-[#8eb842]" />,
  },
  {
    key: 'seeds',
    label: 'البذور المعتمدة',
    desc: 'مجموعة بذور نبتة (8 أصناف)، طماطم هجين أورا',
    icon: <Sprout className="w-4 h-4 text-[#8eb842]" />,
  },
  {
    key: 'pesticides',
    label: 'المبيدات والوقاية',
    desc: 'بايو شيلد الحشري، فانجي جارد الفطري',
    icon: <ShieldAlert className="w-4 h-4 text-[#8eb842]" />,
  },
];

const POPULAR_SEARCHES = ['كلسيومال', 'ماجيك ميكس', 'جوكر', 'مانجو زنك', 'بذور نبتة'];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    totals,
    wishlistIds,
    openCartDrawer,
    openWishlistDrawer,
    toastMessage,
    dismissToast,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setCategoriesMenuOpen(false);
  }, [location.pathname, location.search]);

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(e.target as Node)
      ) {
        setCategoriesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Instant live search suggestions
  const searchResults = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.nameAr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.shortTitle.toLowerCase().includes(q) ||
        p.fullTitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchInput]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchOpen(false);
      setSearchInput('');
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#f6f6f4] text-[#1c2819]"
    >
      {/* Unified Sticky Header — Balanced 3-Column RTL Architecture */}
      <header className="sticky top-0 z-40 bg-[#112316]/98 backdrop-blur-md text-white border-b border-[#28422e] shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* 1. RIGHT ZONE (RTL): Mobile Menu Trigger + Official Juzoor Brand Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="فتح القائمة"
              className="lg:hidden p-2 rounded-xl text-white/90 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="جذور الصفحة الرئيسية"
            >
              <div className="bg-[#183020] group-hover:bg-[#1f3d29] border border-[#325239] rounded-xl px-2.5 py-1 transition-colors flex items-center justify-center">
                <JuzoorLogoCrest className="h-8 sm:h-11 w-auto" />
              </div>
              <div className="hidden 2xl:flex flex-col text-right">
                <span className="text-sm font-extrabold text-white tracking-tight leading-tight">
                  جذور الزراعية
                </span>
                <span className="text-[11px] text-[#a9c487] font-semibold">
                  بذور • أسمدة • وقاية
                </span>
              </div>
            </Link>
          </div>

          {/* 2. CENTER ZONE (RTL): Organized Navigation Pill Bar + Categories Mega Dropdown */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center gap-1 bg-[#182e1e] border border-[#2b4732] rounded-2xl p-1.5"
          >
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#6f8838] text-white shadow-xs'
                      : 'text-[#dce6d5] hover:text-white hover:bg-white/8'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Agricultural Categories Dropdown */}
            <div className="relative" ref={categoriesDropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesMenuOpen((prev) => !prev)}
                aria-expanded={categoriesMenuOpen}
                className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  categoriesMenuOpen
                    ? 'bg-white/15 text-[#b6db65]'
                    : 'text-[#dce6d5] hover:text-white hover:bg-white/8'
                }`}
              >
                <span>الأقسام الزراعية</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    categoriesMenuOpen ? 'rotate-180 text-[#b6db65]' : ''
                  }`}
                />
              </button>

              {categoriesMenuOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white text-[#1c2819] rounded-2xl shadow-2xl border border-[#dce2d3] p-3 z-50">
                  <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#eef2eb]">
                    <span className="text-xs font-extrabold text-[#4c6b28]">
                      تصفح حسب القسم الزراعي
                    </span>
                    <Link
                      to="/shop"
                      onClick={() => setCategoriesMenuOpen(false)}
                      className="text-[11px] font-bold text-[#16281a] hover:text-[#65893a] flex items-center gap-1"
                    >
                      <span>كل المنتجات ({PRODUCTS.length})</span>
                      <ArrowLeft className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="space-y-1">
                    {QUICK_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.key}
                        to={`/shop?category=${cat.key}`}
                        onClick={() => setCategoriesMenuOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f4f7f0] transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#16281a] flex items-center justify-center shrink-0 mt-0.5">
                          {cat.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-extrabold text-[#1c2819] group-hover:text-[#55752c]">
                            {cat.label}
                          </p>
                          <p className="text-[11px] text-[#5c6b53] truncate mt-0.5">{cat.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {NAV_ITEMS.slice(2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#6f8838] text-white shadow-xs'
                      : 'text-[#dce6d5] hover:text-white hover:bg-white/8'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* 3. LEFT ZONE (RTL): Search + Wishlist + Cart Pill + WhatsApp Quick Action */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Toggle Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="بحث عن منتج"
              className={`h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                searchOpen
                  ? 'bg-[#6f8838] border-[#88a647] text-white'
                  : 'bg-[#182e1e] hover:bg-[#223e29] border-[#2d4a34] text-[#e0ead9]'
              }`}
            >
              <Search className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">ابحث...</span>
            </button>

            {/* Wishlist Drawer Button */}
            <button
              type="button"
              onClick={openWishlistDrawer}
              aria-label="قائمة المفضلة"
              title="قائمة المفضلة"
              className="relative h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl bg-[#182e1e] hover:bg-[#223e29] border border-[#2d4a34] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlistIds.length > 0 ? 'text-[#f87171] fill-[#f87171]' : 'text-[#e0ead9]'
                }`}
              />
              {wishlistIds.length > 0 && (
                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#dc2626] text-white text-[10px] font-extrabold flex items-center justify-center tabular-nums">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Button with Live Count & Subtotal */}
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label="سلة التسوق"
              title="سلة التسوق"
              className="relative h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-xl bg-[#6f8838] hover:bg-[#5e742e] text-white flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <div className="relative flex items-center">
                <ShoppingCart className="w-4 h-4" />
                {totals.totalItemsCount > 0 && (
                  <span className="mr-1.5 px-1.5 py-0.2 rounded-full bg-[#112316] text-[#c7e576] text-[10px] font-extrabold tabular-nums">
                    {totals.totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-extrabold border-r border-white/25 pr-2 tabular-nums">
                {totals.totalItemsCount > 0 ? formatPriceEGP(totals.subtotal) : 'السلة'}
              </span>
            </button>

            {/* Direct WhatsApp Support CTA (Desktop) */}
            <a
              href="https://wa.me/201008459920?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D8%AA%D8%AC%D8%B1%20%D8%AC%D8%B0%D9%88%D8%B1%D8%8C%20%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%A9%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B7%D9%84%D8%A8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تواصل عبر واتساب"
              className="hidden 2xl:inline-flex h-10 px-3.5 rounded-xl bg-[#1f8b4c] hover:bg-[#19733e] text-white text-xs font-extrabold items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب مباشر</span>
            </a>
          </div>
        </div>

        {/* Expandable Instant Search Panel with Live Product Suggestions & Quick Tags */}
        {searchOpen && (
          <div className="bg-[#162b1c] border-t border-[#2b4732] px-4 py-4 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#5e6e54] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="ابحث باسم السماد، البذور، المخصب أو المحصول (مثل: كلسيومال، جوكر، مانجو زنك)..."
                    className="w-full bg-white text-[#1c2819] placeholder-[#687860] text-xs sm:text-sm rounded-xl pr-10 pl-9 py-3 focus:outline-none focus:ring-2 focus:ring-[#8eb842]"
                    autoFocus
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => setSearchInput('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#687860] hover:text-[#1c2819] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-[#6f8838] hover:bg-[#5e742e] text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  بحث
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="إغلاق البحث"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              {/* Popular Search Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[11px] text-[#a9c487] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  الأكثر بحثاً:
                </span>
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      navigate(`/shop?q=${encodeURIComponent(term)}`);
                      setSearchOpen(false);
                      setSearchInput('');
                    }}
                    className="text-[11px] font-bold bg-white/10 hover:bg-[#6f8838] text-white px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Instant Live Results Preview */}
              {searchResults.length > 0 && (
                <div className="mt-3 bg-white rounded-xl border border-[#dce2d3] divide-y divide-[#eef2eb] overflow-hidden shadow-lg">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchInput('');
                      }}
                      className="flex items-center justify-between gap-3 p-2.5 hover:bg-[#f4f7f0] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-lg bg-[#fafbf8] border border-[#e5ebe2] p-1 flex items-center justify-center shrink-0">
                          <ProductPackageVisual product={product} size="sm" />
                        </div>
                        <div className="min-w-0 text-right">
                          <p className="text-xs sm:text-sm font-extrabold text-[#1c2819] truncate">
                            {product.shortTitle}
                          </p>
                          <p className="text-[11px] text-[#5e6e54] truncate">
                            {product.categoryLabel} • {product.volume}
                          </p>
                        </div>
                      </div>
                      <span
                        dir="ltr"
                        className="text-xs font-extrabold text-[#4c6b28] shrink-0 tabular-nums"
                      >
                        {formatPriceEGP(product.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Organized Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#15291b] border-t border-[#2b4732] px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Primary Links */}
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-[#a9c487] px-2 mb-1.5">صفحات الموقع</p>
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-[#6f8838] text-white'
                        : 'text-white/90 hover:bg-white/10'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <ArrowLeft className="w-4 h-4 opacity-70" />
                </NavLink>
              ))}
            </div>

            {/* Quick Category Pills in Mobile Menu */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-[11px] font-bold text-[#a9c487] px-2 mb-2">
                تصفح الأقسام الزراعية
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(CATEGORY_LABELS) as ProductCategory[])
                  .filter((k) => k !== 'all')
                  .map((cat) => (
                    <Link
                      key={cat}
                      to={`/shop?category=${cat}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white text-center transition-colors"
                    >
                      {CATEGORY_LABELS[cat]}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Direct WhatsApp CTA inside Mobile Menu */}
            <div className="pt-2 border-t border-white/10">
              <a
                href="https://wa.me/201008459920?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D8%AA%D8%AC%D8%B1%20%D8%AC%D8%B0%D9%88%D8%B1%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%A3%D9%88%20%D8%B7%D9%84%D8%A8%20%D9%85%D9%86%D8%AA%D8%AC"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#1f8b4c] text-white text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل مباشر عبر واتساب (+201008459920)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Dynamic Toast Notification Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 md:bottom-6 left-4 z-50 max-w-sm bg-[#112316] text-white border border-[#6f8838] px-4 py-3 rounded-xl shadow-xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-4 h-4 text-[#a3d96b] shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
          <button
            type="button"
            onClick={dismissToast}
            aria-label="إغلاق الإشعار"
            className="text-white/70 hover:text-white mr-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer — Dark Forest Green matching Juzoor brand */}
      <footer className="bg-[#122216] text-[#d5ded0] border-t border-white/10 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <JuzoorLogoCrest className="h-14 w-auto mb-3" />
            <p className="text-sm text-[#b9c7b3] leading-relaxed">
              منذ عام 1999 ونحن ندعم المزارعين بحلول زراعية موثوقة تجمع بين الخبرة وجودة المنتجات من بذور وأسمدة ومبيدات واستشارات فنية.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-4">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  جميع المنتجات (Shop)
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-white transition-colors">
                  المقالات والإرشادات الزراعية
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-4">الأقسام الزراعية</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/shop?category=fertilizers"
                  className="hover:text-white transition-colors"
                >
                  الأسمدة والمخصبات
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=soil_enhancers"
                  className="hover:text-white transition-colors"
                >
                  محسنات التربة والملوحة
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=seeds"
                  className="hover:text-white transition-colors"
                >
                  البذور المعتمدة
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=pesticides"
                  className="hover:text-white transition-colors"
                >
                  المبيدات والوقاية
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-[#c4d1be]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#93b748] shrink-0" />
                <a
                  href="https://wa.me/201008459920"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="hover:text-white transition-colors"
                >
                  +20 100 845 9920
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#93b748] shrink-0" />
                <span>info@juzoor.shop</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#93b748] shrink-0" />
                <span>جمهورية مصر العربية - توصيل سريع لكافة المحافظات</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 text-center text-xs text-[#9cb095]">
          <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline">جميع الحقوق محفوظة. A.Z Agency 2026 ©</a>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar — Thumb-friendly Phone UI (56px height, total sticky with top bar = 112px <= 15% of 844px) */}
      <nav
        aria-label="التنقل السريع للهاتف"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-white border-t border-[#dce2d3] shadow-lg grid grid-cols-5 items-center px-1"
      >
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 text-[10px] font-bold transition-colors ${
            location.pathname === '/' ? 'text-[#65893a]' : 'text-[#54634c]'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>الرئيسية</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center py-1 text-[10px] font-bold transition-colors ${
            location.pathname.startsWith('/shop') ? 'text-[#65893a]' : 'text-[#54634c]'
          }`}
        >
          <Store className="w-4 h-4 mb-0.5" />
          <span>المتجر</span>
        </Link>

        <Link
          to="/articles"
          className={`flex flex-col items-center justify-center py-1 text-[10px] font-bold transition-colors ${
            location.pathname.startsWith('/articles') ? 'text-[#65893a]' : 'text-[#54634c]'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>المقالات</span>
        </Link>

        <button
          type="button"
          onClick={openWishlistDrawer}
          className="relative flex flex-col items-center justify-center py-1 text-[10px] font-bold text-[#54634c] hover:text-[#c83e3e] cursor-pointer"
        >
          <div className="relative">
            <Heart className="w-4 h-4 mb-0.5" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[#c83e3e] text-white text-[9px] font-extrabold flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </div>
          <span>المفضلة</span>
        </button>

        <button
          type="button"
          onClick={openCartDrawer}
          className="relative flex flex-col items-center justify-center py-1 text-[10px] font-bold text-[#54634c] hover:text-[#65893a] cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4 mb-0.5" />
            {totals.totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[#65893a] text-white text-[9px] font-extrabold flex items-center justify-center">
                {totals.totalItemsCount}
              </span>
            )}
          </div>
          <span>السلة</span>
        </button>
      </nav>

      {/* Dynamic Slide-over Drawers */}
      <CartDrawer />
      <WishlistDrawer />
    </div>
  );
};
