import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Sprout,
  FlaskConical,
  ShieldAlert,
  Microscope,
  Award,
  Users,
  ArrowLeft,
} from 'lucide-react';
import { SERVICES_LIST, TRUST_REASONS, STATS_ITEMS } from '../data/products';
import { JuzoorLogoCrest } from '../components/BrandVisuals';

export const AboutPage: React.FC = () => {
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'seedling':
        return <Sprout className="w-9 h-9 text-[#D9E89E]" />;
      case 'fertilizer':
        return <FlaskConical className="w-9 h-9 text-[#D9E89E]" />;
      case 'insecticide':
        return <ShieldAlert className="w-9 h-9 text-[#D9E89E]" />;
      default:
        return <Microscope className="w-9 h-9 text-[#D9E89E]" />;
    }
  };

  return (
    <div className="bg-[#FAFBF8]">
      {/* Page Hero Header */}
      <section className="bg-[#0A1F14] text-white py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs font-bold text-[#B8D261] mb-3 flex items-center gap-2">
            <Link to="/" className="hover:underline">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-white">من نحن</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">عن جذور (Juzoor)</h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed">
            أكثر من ربع قرن من الخبرة الزراعية الميدانية في خدمة المزارع المصري وتوفير أحدث
            تكنولوجيا التسميد والبذور والوقاية.
          </p>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="py-18 bg-white border-b border-[#DCE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-sm font-extrabold text-[#4E6822]">قصتنا ورسالتنا منذ 1999</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111C15] leading-snug">
                منذ عام 1999 ونحن ندعم المزارعين بحلول زراعية موثوقة تجمع بين الخبرة وجودة المنتجات.
                نوفر لك كل ما يحتاجه نباتك من بذور وأسمدة ومبيدات واستشارات… في مكان واحد.
              </h2>
              <p className="text-base text-[#37473D] leading-relaxed">
                انطلقت مؤسسة جذور (Juzoor) برؤية واضحة تهدف إلى سد الفجوة بين الأبحاث الزراعية
                العالمية واحتياجات الأراضي المصرية بمختلف طبيعتها (سواء الأراضي الطينية في الدلتا
                أو الأراضي الرملية والمستصلحة في النوبارية والإسماعيلية والصعيد).
              </p>

              <div className="pt-2">
                <h3 className="text-xl font-extrabold text-[#4E6822] mb-4">
                  لماذا يثق بنا المزارعون؟
                </h3>
                <ul className="space-y-3">
                  {TRUST_REASONS.map((reason, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-base font-bold text-[#14261B]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#4E8422] shrink-0 mt-1" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4E8422] hover:bg-[#3D6B19] text-white text-sm font-extrabold transition-colors"
                >
                  <span>تصفح منتجاتنا الزراعية</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#0F261A] text-[#0F261A] hover:bg-[#0F261A] hover:text-white text-sm font-extrabold transition-colors"
                >
                  <span>تحدث مع مهندس زراعي</span>
                </Link>
              </div>
            </div>

            {/* Right Quality & Collage Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex justify-center">
                <img
                  src="/assets/aistudio/____-____-__-___-1024x1024_c8761927.webp"
                  alt="عن جذور - شتلات وبذور نبتة وحقول زراعية"
                  className="w-full max-w-[440px] h-auto object-contain rounded-2xl"
                />
              </div>

              <div className="bg-[#0C2218] text-white rounded-3xl p-6 space-y-4 border border-[#2A4B37] shadow-md">
                <div className="flex items-center gap-3.5">
                  <Award className="w-6 h-6 text-[#C4CE9B] shrink-0" />
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      تركيبات أوروبية ومحلية مسجلة
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
                      نعتمد على أنقى الخامات المخلبة والأحماض العضوية لضمان أسرع امتصاص للنبات.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 pt-2 border-t border-white/10">
                  <Users className="w-6 h-6 text-[#C4CE9B] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-extrabold text-white">فريق دعم فني متخصص</h3>
                    <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
                      مهندسون زراعيون جاهزون لوضع برامج تسميد ووقاية مخصصة لكل محصول.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-18 bg-[#EEF2EB] border-b border-[#DCE5DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-extrabold text-[#3D521B]">خدماتنا</span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#111C15]">
              حلول زراعية متكاملة تدعم نجاح محصولك في كل مرحلة من مراحل النمو
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SERVICES_LIST.map((service) => (
              <Link
                key={service.id}
                to={`/shop?category=${service.categoryFilter}`}
                className="group bg-[#4D5E28] hover:bg-[#3F4E20] text-white rounded-2xl p-7 flex items-center justify-between gap-6 transition-all shadow-sm"
              >
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#D9E89E]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#F4F7EE] leading-relaxed">{service.description}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#0A1F14]/35 border-2 border-[#D9E89E]/50 flex items-center justify-center shrink-0">
                  {getServiceIcon(service.iconType)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Block */}
      <section className="py-18 bg-[#BBC392]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#111C15] mb-10">
            كل رقم هنا يروي قصة نجاح مع مزارعين مثلك
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS_ITEMS.map((stat) => (
              <div
                key={stat.id}
                className={`rounded-2xl p-8 text-center shadow-sm ${
                  stat.isPrimaryDark ? 'bg-[#0B1D13] text-white' : 'bg-[#5A6B32] text-white'
                }`}
              >
                <div
                  dir="ltr"
                  className="text-3xl sm:text-4xl font-extrabold tabular-nums text-[#E2F0A6] mb-2"
                >
                  {stat.number}
                </div>
                <div className="text-lg sm:text-xl font-bold text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
