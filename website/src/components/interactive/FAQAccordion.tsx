import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

interface FAQAccordionProps {
  faqs: FAQCategory[];
  lang: 'en' | 'de' | 'pl';
}

export default function FAQAccordion({ faqs, lang }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const allLabels: Record<string, string> = { en: 'All', de: 'Alle', pl: 'Wszystkie' };
  const allLabel = allLabels[lang] || allLabels.en;
  const categories = [allLabel, ...faqs.map((c) => c.category)];

  const filteredFaqs =
    activeCategory && activeCategory !== allLabel
      ? faqs.filter((c) => c.category === activeCategory)
      : faqs;

  const toggleItem = (key: string) => {
    setOpenItem((prev) => (prev === key ? null : key));
  };

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === allLabel ? null : cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              (cat === allLabel && !activeCategory) || cat === activeCategory
                ? 'bg-brand-dark text-white shadow-md'
                : 'bg-white text-brand-grey hover:bg-brand-light/50 border border-brand-light/60'
            }`}
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      {filteredFaqs.map((category, catIndex) => (
        <div key={category.category} className="mb-12">
          <h2
            className="text-2xl font-bold mb-6 pl-4 border-l-4 border-[#206FF7]"
            style={{ fontFamily: 'var(--font-oddval)' }}
          >
            {category.category}
          </h2>

          <div className="space-y-4">
            {category.items.map((item, itemIndex) => {
              const key = `${catIndex}-${itemIndex}`;
              const isOpen = openItem === key;

              return (
                <div
                  key={key}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen ? 'shadow-md border-brand-light/80' : 'shadow-sm border-brand-light/60'
                  }`}
                >
                  <button
                    id={`faq-btn-${catIndex}-${itemIndex}`}
                    onClick={() => toggleItem(key)}
                    className="flex justify-between items-center w-full p-6 text-left cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${catIndex}-${itemIndex}`}
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    <span className="pr-6 font-semibold text-[#0A0A0B]">{item.question}</span>
                    <span
                      className={`transition-transform duration-300 flex-shrink-0 text-[#206FF7] bg-[#206FF7]/10 rounded-full p-1 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <svg
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${catIndex}-${itemIndex}`}
                    role="region"
                    aria-labelledby={`faq-btn-${catIndex}-${itemIndex}`}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? '2000px' : '0' }}
                  >
                    <div
                      className="px-6 pb-6 pt-0 text-[#6B7280] text-lg leading-relaxed border-t border-brand-light/30 bg-brand-light/5"
                      style={{ fontFamily: 'var(--font-garamond)' }}
                    >
                      <div className="pt-4">{item.answer}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
