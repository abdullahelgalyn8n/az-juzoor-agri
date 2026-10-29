import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import {
  PRODUCTS,
  ProductCategory,
  CATEGORY_LABELS,
} from '../data/products';
import { filterAndSortProducts, SortOption } from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = (searchParams.get('category') as ProductCategory) || 'all';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = (searchParams.get('sort') as SortOption) || 'default';
  const onlyDiscounts = searchParams.get('discounts') === '1';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'default' || value === '0') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(PRODUCTS, {
        category: activeCategory,
        searchQuery,
        sortBy,
        onlyDiscounts,
      }),
    [activeCategory, searchQuery, sortBy, onlyDiscounts]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      all: PRODUCTS.length,
      fertilizers: 0,
      soil_enhancers: 0,
      seeds: 0,
      pesticides: 0,
    };
    for (const p of PRODUCTS) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="bg-[#FAFBF8] min-h-screen pb-20">
      {/* Page Banner */}
      <div className="bg-[#0F261A] text-white py-8 sm:py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs font-medium text-[#B8D261] mb-3 flex items-center gap-2">
            <Link to="/" className="hover:underline">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-white">المتجر الزراعي (Shop)</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            متجر المنتجات الزراعية ({PRODUCTS.length} منتج)
          </h1>
          <p className="mt-2 text-xs sm:text-base text-white/85 max-w-2xl">
            تصفح كافة المخصبات، الأسمدة السائلة، معالجات الملوحة، البذور المعتمدة، والمبيدات الآمنة
            مع إمكانية الطلب المباشر عبر السلة أو واتساب.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Top Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-[#DCE5DC] p-4 sm:p-5 shadow-xs mb-6 sm:mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <label htmlFor="shop-search" className="sr-only">
                ابحث عن منتج زراعي أو محصول
              </label>
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#526358] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="shop-search"
                type="search"
                value={searchQuery}
                onChange={(e) => updateParam('q', e.target.value)}
                placeholder="ابحث باسم المنتج (مثل: كلسيومال، جوكر، مانجو زنك) أو المحصول..."
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#FAFBF8] border border-[#CBD5CD] text-xs sm:text-sm text-[#111C15] placeholder:text-[#64746B] focus:outline-none focus:border-[#4E8422] focus:bg-white transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="md:col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#37473D] shrink-0" />
              <label htmlFor="shop-sort" className="text-xs font-bold text-[#37473D] shrink-0">
                الترتيب:
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#FAFBF8] border border-[#CBD5CD] text-xs sm:text-sm font-semibold text-[#111C15] focus:outline-none focus:border-[#4E8422]"
              >
                <option value="default">الترتيب الافتراضي</option>
                <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
                <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
                <option value="discounts">العروض والخصومات أولاً</option>
              </select>
            </div>

            {/* Discounts Toggle */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={() => updateParam('discounts', onlyDiscounts ? '0' : '1')}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  onlyDiscounts
                    ? 'bg-[#4E8422] text-white border-[#4E8422]'
                    : 'bg-[#FAFBF8] text-[#1E3B27] border-[#CBD5CD] hover:bg-[#EEF2EB]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>العروض الخاصة</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#EEF2ED] min-w-0">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1.5 sm:pb-0 no-scrollbar">
              {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => updateParam('category', cat)}
                  className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#0F261A] text-white'
                      : 'bg-[#F3F6F1] text-[#1E3B27] hover:bg-[#E4ECE0]'
                  }`}
                >
                  <span>{CATEGORY_LABELS[cat]}</span>
                  <span className="mr-1.5 text-xs opacity-75 tabular-nums">
                    ({categoryCounts[cat]})
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-[#37473D]">
              <span className="tabular-nums">
                عرض {filteredProducts.length} من أصل {PRODUCTS.length} منتج
              </span>
              {(activeCategory !== 'all' || searchQuery || onlyDiscounts || sortBy !== 'default') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[#B91C1C] hover:underline cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>إعادة ضبط الفلاتر</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#DCE5DC] p-12 text-center max-w-lg mx-auto my-8">
            <h2 className="text-xl font-extrabold text-[#111C15] mb-2">
              لا توجد منتجات مطابقة لبحثك
            </h2>
            <p className="text-sm text-[#526358] mb-6">
              جرب البحث بكلمة أخرى أو تصفح جميع الأقسام الزراعية المتاحة في متجر جذور.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#4E8422] hover:bg-[#3D6B19] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              عرض جميع المنتجات ({PRODUCTS.length})
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
