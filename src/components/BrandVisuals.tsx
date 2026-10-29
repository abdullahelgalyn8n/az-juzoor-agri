import React, { useState } from 'react';
import { Product } from '../data/products';

export const JUZOOR_LOGO_PATH = '/assets/aistudio/juzoor-SVG_20053265.svg';
export const JUZOOR_HERO_BG_PATH = '/assets/aistudio/image_332179cf.png';
export const JUZOOR_ABOUT_COLLAGE_PATH =
  '/assets/aistudio/____-____-__-___-1024x1024_c8761927.webp';

/**
 * Official Juzoor Brand Logo from user-uploaded SVG (`/assets/aistudio/juzoor-SVG_20053265.svg`)
 * Includes the teardrop seedling shield and Arabic "جذور" wordmark.
 */
export const JuzoorLogoCrest: React.FC<{
  className?: string;
  showArabicWordmark?: boolean;
}> = ({ className = 'h-14 w-auto' }) => (
  <div className="inline-flex items-center justify-center select-none shrink-0">
    <img
      src={JUZOOR_LOGO_PATH}
      alt="جذور Juzoor"
      className={`object-contain ${className}`}
    />
  </div>
);

/**
 * Large Golden-Olive Leaf Emblem from the Hero section of juzoor.shop
 */
export const HeroLeafEmblem: React.FC<{ className?: string }> = ({
  className = 'w-20 h-20',
}) => (
  <svg
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M48 14C40 26 40 38 48 48C56 38 56 26 48 14Z"
      stroke="#8FA83B"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 30C26 43 35 49 48 48C45 36 37 29 24 30Z"
      stroke="#8FA83B"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M72 30C70 43 61 49 48 48C51 36 59 29 72 30Z"
      stroke="#8FA83B"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 56C32 60 42 56 48 48C37 46 27 49 20 56Z"
      stroke="#8FA83B"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M76 56C64 60 54 56 48 48C59 46 69 49 76 56Z"
      stroke="#8FA83B"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48 48C42 60 42 72 48 82C54 72 54 60 48 48Z"
      stroke="#8FA83B"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Exact Line-Art Service Icons matching juzoor.shop "خدماتنا" section
 */
export const ServiceCustomIcon: React.FC<{
  type: 'seedling' | 'fertilizer' | 'insecticide' | 'fungicide';
  className?: string;
}> = ({ type, className = 'w-14 h-14' }) => {
  if (type === 'seedling') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
        <circle cx="32" cy="32" r="28" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="32" cy="32" r="24" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
        <path
          d="M32 48V28M32 34C24 34 20 28 20 22C26 22 32 26 32 34ZM32 31C40 31 44 25 44 19C38 19 32 23 32 31Z"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M22 48H42" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'fertilizer') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
        {/* Agricultural Jerrycan with leaf */}
        <path
          d="M22 14H30V18H22V14ZM18 22C18 19.7909 19.7909 18 22 18H42C45.3137 18 48 20.6863 48 24V48C48 51.3137 45.3137 54 42 54H22C18.6863 54 16 51.3137 16 48V24C16 22.8954 16.8954 22 18 22Z"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="35" y="23" width="8" height="6" rx="2" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="32" cy="39" r="9" stroke="#FFFFFF" strokeWidth="1.8" />
        <path
          d="M32 44V35M32 38C28 38 27 34 27 34C27 34 31 34 32 38ZM32 38C36 38 37 34 37 34C37 34 33 34 32 38Z"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === 'insecticide') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
        {/* Sprayer nozzle & bottle with leaf protection */}
        <path
          d="M24 14H40M32 14V20M26 20H38L42 28V50C42 52.2091 40.2091 54 38 54H26C23.7909 54 22 52.2091 22 50V28L26 20Z"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M40 16L46 19M16 16H22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="39" r="7" stroke="#FFFFFF" strokeWidth="1.8" />
        <path d="M29 39L31 41L35 37" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* Fungicide specialist bottle */}
      <rect x="26" y="12" width="12" height="6" rx="1.5" stroke="#FFFFFF" strokeWidth="2" />
      <path
        d="M24 22C24 19.7909 25.7909 18 28 18H36C38.2091 18 40 19.7909 40 22V50C40 52.2091 38.2091 54 36 54H28C25.7909 54 24 52.2091 24 50V22Z"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <circle cx="32" cy="36" r="6" stroke="#FFFFFF" strokeWidth="1.8" />
      <path
        d="M32 32V40M28 36H36"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Resilient Product Visual Renderer
 */
export const ProductPackageVisual: React.FC<{
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}> = ({ product, size = 'md' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const showImg = product.imageUrl && !imgFailed;

  const containerSizeClasses =
    size === 'sm'
      ? 'h-20 w-20'
      : size === 'lg'
      ? 'h-80 w-full max-w-[320px]'
      : 'h-60 w-full';

  if (showImg) {
    return (
      <div className={`relative flex items-center justify-center ${containerSizeClasses}`}>
        <img
          src={product.imageUrl}
          alt={product.fullTitle}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center select-none ${containerSizeClasses}`}
      aria-label={product.shortTitle}
    >
      {product.packagingType === 'jerrycan' && (
        <svg viewBox="0 0 220 260" className="h-full w-auto drop-shadow-md">
          <defs>
            <linearGradient id={`body-${product.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#F1F5F2" />
              <stop offset="100%" stopColor="#DCE3DE" />
            </linearGradient>
          </defs>
          <rect x="52" y="18" width="38" height="20" rx="4" fill={product.accentColor} />
          <rect x="56" y="36" width="30" height="10" fill="#CBD5E1" />
          <path
            d="M42 46 H168 C182 46 192 58 192 72 V222 C192 236 180 246 166 246 H54 C40 246 28 236 28 222 V72 C28 58 34 46 42 46 Z"
            fill={`url(#body-${product.id})`}
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          <rect
            x="130"
            y="62"
            width="38"
            height="22"
            rx="10"
            fill="#F6F8F5"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          <rect x="44" y="96" width="132" height="122" rx="10" fill={product.accentColor} />
          <rect x="48" y="100" width="124" height="114" rx="8" fill="#FFFFFF" fillOpacity="0.94" />
          <rect x="48" y="100" width="124" height="28" rx="6" fill={product.accentColor} />
          <text x="110" y="119" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
            {product.nameEn}
          </text>
          <text x="110" y="152" textAnchor="middle" fill="#0F261A" fontSize="16" fontWeight="800">
            {product.nameAr}
          </text>
          <text x="110" y="175" textAnchor="middle" fill="#37473D" fontSize="10" fontWeight="600">
            {product.composition[0]?.element} {product.composition[0]?.percentage}
          </text>
          <rect x="75" y="188" width="70" height="18" rx="9" fill="#0F261A" />
          <text x="110" y="200" textAnchor="middle" fill="#D9E89E" fontSize="10" fontWeight="700">
            {product.volume}
          </text>
        </svg>
      )}

      {product.packagingType === 'pouch' && (
        <svg viewBox="0 0 220 260" className="h-full w-auto drop-shadow-md">
          <path
            d="M44 26 H176 L188 232 C188 240 182 246 174 246 H46 C38 246 32 240 32 232 L44 26 Z"
            fill="#143D24"
            stroke="#0F261A"
            strokeWidth="2"
          />
          <rect x="42" y="38" width="136" height="6" fill="#8FA83B" />
          <rect x="48" y="58" width="124" height="156" rx="12" fill="#FAFBF8" />
          <circle cx="110" cy="92" r="20" fill={product.accentColor} />
          <path
            d="M110 78 C104 86 104 94 110 102 C116 94 116 86 110 78 Z"
            fill="#D9E89E"
          />
          <text x="110" y="134" textAnchor="middle" fill="#0F261A" fontSize="15" fontWeight="800">
            {product.nameAr}
          </text>
          <text
            x="110"
            y="153"
            textAnchor="middle"
            fill={product.accentColor}
            fontSize="10"
            fontWeight="700"
          >
            {product.nameEn}
          </text>
          <text x="110" y="174" textAnchor="middle" fill="#37473D" fontSize="10" fontWeight="600">
            {product.composition[1]?.element}: {product.composition[1]?.percentage}
          </text>
          <rect x="65" y="186" width="90" height="18" rx="9" fill={product.accentColor} />
          <text x="110" y="198" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">
            بذور معتمدة نقية
          </text>
        </svg>
      )}

      {(product.packagingType === 'bottle' || product.packagingType === 'sprayer') && (
        <svg viewBox="0 0 220 260" className="h-full w-auto drop-shadow-md">
          <defs>
            <linearGradient id={`cyl-${product.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E5ECE7" />
              <stop offset="45%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D5DFD8" />
            </linearGradient>
          </defs>
          <rect x="82" y="16" width="56" height="24" rx="5" fill={product.accentColor} />
          <rect x="86" y="40" width="48" height="12" fill="#CBD5E1" />
          <path
            d="M86 52 L60 80 V226 C60 238 70 246 82 246 H138 C150 246 160 238 160 226 V80 L134 52 Z"
            fill={`url(#cyl-${product.id})`}
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          <rect x="64" y="92" width="92" height="128" rx="6" fill={product.accentColor} />
          <rect x="67" y="95" width="86" height="122" rx="4" fill="#FFFFFF" />
          <rect x="67" y="95" width="86" height="28" rx="4" fill={product.accentColor} />
          <text x="110" y="113" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">
            {product.nameEn}
          </text>
          <text x="110" y="148" textAnchor="middle" fill="#0F261A" fontSize="15" fontWeight="800">
            {product.nameAr}
          </text>
          <text x="110" y="168" textAnchor="middle" fill="#37473D" fontSize="9.5" fontWeight="600">
            {product.composition[0]?.element}
          </text>
          <text
            x="110"
            y="183"
            textAnchor="middle"
            fill={product.accentColor}
            fontSize="11"
            fontWeight="800"
          >
            {product.composition[0]?.percentage}
          </text>
          <rect x="80" y="194" width="60" height="16" rx="8" fill="#0F261A" />
          <text x="110" y="205" textAnchor="middle" fill="#D9E89E" fontSize="9.5" fontWeight="700">
            {product.volume}
          </text>
        </svg>
      )}
    </div>
  );
};
