import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';

export const ContactPage: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cropType, setCropType] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedTickets, setSubmittedTickets] = useState<
    { id: string; name: string; cropType: string; message: string; time: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setFormError('يرجى إدخال الاسم بالكامل.');
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setFormError('يرجى إدخال رقم الهاتف أو البريد الإلكتروني للتواصل معك.');
      return;
    }
    if (message.trim().length < 5) {
      setFormError('يرجى كتابة رسالتك أو استفسارك الزراعي بوضوح.');
      return;
    }

    setFormError('');
    setSubmittedTickets((prev) => [
      {
        id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name.trim(),
        cropType: cropType.trim() || 'استفسار عام',
        message: message.trim(),
        time: 'الآن',
      },
      ...prev,
    ]);
    setName('');
    setPhone('');
    setEmail('');
    setCropType('');
    setMessage('');
  };

  return (
    <div className="bg-[#FAFBF8]">
      {/* Hero Banner matching juzoor.shop/contact-us with the uploaded botanical leaf photo */}
      <section className="relative overflow-hidden bg-[#06150D] text-white py-24 border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/assets/aistudio/image_332179cf.png"
            alt="اتصل بنا - جذور"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-sm">
            اتصل بنا
          </h1>
          <p className="mt-3 text-base text-white/90 max-w-2xl mx-auto font-medium">
            فريق الدعم الفني والمهندسين الزراعيين في جذور جاهز للرد على استفساراتك ومساعدتك في
            اختيار البرنامج السمادي الأنسب لمحصولك.
          </p>
        </div>
      </section>

      {/* Main 2-Column Split: FAQs on Right (RTL) + Contact Form on Left (RTL) matching juzoor.shop */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Right Column in RTL: Frequently Asked Questions (الأسئلة الشائعة) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-sm font-extrabold text-[#4E6822] block mb-1">
                  معلومات تهمك
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111C15]">
                  الأسئلة الشائعة
                </h2>
              </div>

              <div className="space-y-3.5">
                {FAQ_ITEMS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white rounded-2xl border border-[#DCE5DC] overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                        aria-expanded={isOpen}
                        className="w-full p-5 text-right flex items-center justify-between gap-4 hover:bg-[#F6F8F5] transition-colors cursor-pointer"
                      >
                        <h3 className="text-base sm:text-lg font-extrabold text-[#111C15]">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-[#4E8422] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-[#37473D] leading-relaxed border-t border-[#EEF2ED]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Direct Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white border border-[#DCE5DC] flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#4E8422] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-bold text-[#526358] block">
                      الخط الساخن وواتساب المبيعات
                    </span>
                    <span
                      dir="ltr"
                      className="text-sm font-extrabold text-[#111C15] tabular-nums"
                    >
                      +20 100 845 9920
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#DCE5DC] flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#4E8422] shrink-0 mt-1" />
                  <div>
                    <span className="text-xs font-bold text-[#526358] block">مواعيد العمل</span>
                    <span className="text-sm font-extrabold text-[#111C15]">
                      يومياً من 8 صباحاً حتى 10 مساءً
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column in RTL: Contact & Agricultural Consultation Form */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl border border-[#DCE5DC] p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#111C15] mb-2">
                  أرسل لنا استفسارك أو اطلب استشارة زراعية
                </h2>
                <p className="text-sm text-[#526358] mb-6">
                  املأ البيانات التالية وسيتواصل معك أحد مهندسينا الزراعيين في أسرع وقت.
                </p>

                {formError && (
                  <div className="mb-5 p-3.5 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-xs font-bold text-[#B91C1C]">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-extrabold text-[#1E2E24] mb-1.5"
                    >
                      الاسم بالكامل *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="اكتب اسمك الكريم"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFBF8] border border-[#CBD5CD] text-sm text-[#111C15] placeholder:text-[#64746B] focus:outline-none focus:border-[#4E8422] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-extrabold text-[#1E2E24] mb-1.5"
                      >
                        رقم الموبايل / واتساب *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010XXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAFBF8] border border-[#CBD5CD] text-sm text-[#111C15] placeholder:text-[#64746B] focus:outline-none focus:border-[#4E8422] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-extrabold text-[#1E2E24] mb-1.5"
                      >
                        البريد الإلكتروني
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAFBF8] border border-[#CBD5CD] text-sm text-[#111C15] placeholder:text-[#64746B] focus:outline-none focus:border-[#4E8422] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-crop"
                      className="block text-xs font-extrabold text-[#1E2E24] mb-1.5"
                    >
                      نوع المحصول أو الاستفسار
                    </label>
                    <input
                      id="contact-crop"
                      type="text"
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      placeholder="مثال: برنامج تسميد بطاطس / علاج ملوحة التربة / طلب جملة"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFBF8] border border-[#CBD5CD] text-sm text-[#111C15] placeholder:text-[#64746B] focus:outline-none focus:border-[#4E8422] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-extrabold text-[#1E2E24] mb-1.5"
                    >
                      الرسالة أو تفاصيل الاستشارة *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب رسالتك أو استفسارك بالتفصيل..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFBF8] border border-[#CBD5CD] text-sm text-[#111C15] placeholder:text-[#64746B] focus:outline-none focus:border-[#4E8422] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#5F7434] hover:bg-[#4E8422] text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال</span>
                  </button>
                </form>

                {/* Submitted Consultations Confirmation List */}
                {submittedTickets.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[#EEF2ED] space-y-3">
                    <h3 className="text-sm font-extrabold text-[#166534] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تم استلام رسالتك بنجاح</span>
                    </h3>
                    {submittedTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 rounded-xl bg-[#F3F6F1] border border-[#DCE5DC] text-xs space-y-1"
                      >
                        <div className="flex justify-between font-bold text-[#111C15]">
                          <span>
                            رقم الطلب: {ticket.id} — {ticket.name}
                          </span>
                          <span className="text-[#2E6F23]">{ticket.time}</span>
                        </div>
                        <div className="text-[#526358] font-semibold">
                          الموضوع: {ticket.cropType}
                        </div>
                        <p className="text-[#2A3B30]">{ticket.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
