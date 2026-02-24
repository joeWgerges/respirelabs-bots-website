import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface FAQItem {
  question: string;
  answer: string; // plain text or HTML string (from Sanity rich text or static content)
  category: string;
}

interface FAQCategory {
  category: string;
  items: { question: string; answer: string }[];
}

interface FAQAccordionProps {
  /** Flat list of FAQ items (preferred). */
  items?: FAQItem[];
  /** Grouped list — legacy format from existing pages. Converted internally. */
  faqs?: FAQCategory[];
  /** Category labels for tabs. Auto-derived from items if omitted. */
  categories?: { value: string; label: string }[];
  /** UI language. */
  lang?: 'en' | 'de' | 'pl';
  /** Pre-selected category value. */
  initialCategory?: string;
}

/* ------------------------------------------------------------------ */
/* Translations                                                        */
/* ------------------------------------------------------------------ */

const translations: Record<string, { all: string; search: string; noResults: string }> = {
  en: { all: 'All', search: 'Search FAQ...', noResults: 'No matching questions found.' },
  de: { all: 'Alle', search: 'FAQ durchsuchen...', noResults: 'Keine passenden Fragen gefunden.' },
  pl: { all: 'Wszystkie', search: 'Szukaj w FAQ...', noResults: 'Nie znaleziono pasujących pytań.' },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Normalise grouped (legacy) data into a flat FAQItem list. */
function normaliseFaqs(faqs?: FAQCategory[], items?: FAQItem[]): FAQItem[] {
  if (items && items.length > 0) return items;
  if (!faqs) return [];
  return faqs.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category })),
  );
}

/** Derive unique category tabs from the flat item list. */
function deriveCategories(
  items: FAQItem[],
  explicit?: { value: string; label: string }[],
): { value: string; label: string }[] {
  if (explicit && explicit.length > 0) return explicit;
  const seen = new Set<string>();
  const result: { value: string; label: string }[] = [];
  for (const item of items) {
    if (!seen.has(item.category)) {
      seen.add(item.category);
      result.push({ value: item.category, label: item.category });
    }
  }
  return result;
}

/** Simple debounce hook. */
function useDebounce(value: string, delay: number): string {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 rounded-full p-1 transition-transform duration-300 ${
        open
          ? 'rotate-180 bg-[#206FF7]/15 text-[#206FF7] dark:bg-[#206FF7]/25 dark:text-[#5B9BFF]'
          : 'bg-[#206FF7]/10 text-[#206FF7] dark:bg-[#206FF7]/20 dark:text-[#5B9BFF]'
      }`}
      aria-hidden="true"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] dark:text-[#6B7280] pointer-events-none"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Accordion Item                                                      */
/* ------------------------------------------------------------------ */

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, index, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, item.answer]);

  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-btn-${index}`;

  // Detect if the answer contains HTML tags
  const isHtml = /<[a-z][\s\S]*>/i.test(item.answer);

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'shadow-md border-[#E5E7EB]/80 bg-white dark:border-white/10 dark:bg-[var(--surface-card)]'
          : 'shadow-sm border-[#E5E7EB]/60 bg-white hover:shadow-md dark:border-white/10 dark:bg-[var(--surface-card)] dark:hover:border-white/20'
      }`}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        className="flex justify-between items-center w-full px-6 py-5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#206FF7] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[var(--surface-card)]"
        aria-expanded={isOpen}
        aria-controls={panelId}
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        <span
          className={`pr-6 font-semibold text-base md:text-lg transition-colors duration-200 ${
            isOpen ? 'text-[#206FF7] dark:text-[#5B9BFF]' : 'text-[#0A0A0B] group-hover:text-[#206FF7] dark:text-[#F9FAFB] dark:group-hover:text-[#5B9BFF]'
          }`}
        >
          {item.question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${height + 40}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="px-6 pb-6 pt-0 border-t border-[#E5E7EB]/30 dark:border-white/10">
          {isHtml ? (
            <div
              className="pt-4 prose prose-sm md:prose-base dark:prose-invert max-w-none text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed"
              style={{ fontFamily: 'var(--font-montserrat)' }}
              // Note: Content comes from trusted sources (static Astro pages or authenticated
              // Sanity CMS). When integrating untrusted user content, add DOMPurify sanitization.
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          ) : (
            <p
              className="pt-4 text-[#6B7280] dark:text-[#9CA3AF] text-base md:text-lg leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {item.answer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function FAQAccordion({
  items: rawItems,
  faqs,
  categories: explicitCategories,
  lang = 'en',
  initialCategory,
}: FAQAccordionProps) {
  const t = translations[lang] || translations.en;

  /* Normalise data */
  const allItems = useMemo(() => normaliseFaqs(faqs, rawItems), [faqs, rawItems]);
  const categoryTabs = useMemo(
    () => deriveCategories(allItems, explicitCategories),
    [allItems, explicitCategories],
  );

  /* State */
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory ?? null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchRaw, setSearchRaw] = useState('');
  const searchQuery = useDebounce(searchRaw, 300);
  const [filterVisible, setFilterVisible] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  /* Filter logic */
  const filteredItems = useMemo(() => {
    let result = allItems;

    // Category filter
    if (activeCategory) {
      result = result.filter((item) => item.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q),
      );
    }

    return result;
  }, [allItems, activeCategory, searchQuery]);

  /* Group filtered items by category for display */
  const groupedFiltered = useMemo(() => {
    const groups: { category: string; items: FAQItem[] }[] = [];
    const map = new Map<string, FAQItem[]>();
    for (const item of filteredItems) {
      const existing = map.get(item.category);
      if (existing) {
        existing.push(item);
      } else {
        const arr = [item];
        map.set(item.category, arr);
        groups.push({ category: item.category, items: arr });
      }
    }
    return groups;
  }, [filteredItems]);

  /* Compute global index for each item (for unique open state) */
  const globalIndexOf = useCallback(
    (item: FAQItem) => allItems.indexOf(item),
    [allItems],
  );

  /* Category switch with fade animation */
  const handleCategoryChange = useCallback(
    (category: string | null) => {
      setFilterVisible(false);
      setOpenIndex(null);
      setTimeout(() => {
        setActiveCategory(category);
        setFilterVisible(true);
      }, 150);
    },
    [],
  );

  /* Toggle accordion item */
  const handleToggle = useCallback((globalIdx: number) => {
    setOpenIndex((prev) => (prev === globalIdx ? null : globalIdx));
  }, []);

  return (
    <div role="region" aria-label={lang === 'de' ? 'Häufig gestellte Fragen' : lang === 'pl' ? 'Często zadawane pytania' : 'Frequently Asked Questions'}>
      {/* Search input */}
      <div className="mb-6">
        <div className="relative">
          <SearchIcon />
          <input
            type="search"
            value={searchRaw}
            onChange={(e) => {
              setSearchRaw(e.target.value);
              setOpenIndex(null);
            }}
            placeholder={t.search}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#0A0A0B] placeholder:text-[#9CA3AF] text-sm font-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#206FF7] focus:border-[#206FF7] dark:border-white/10 dark:bg-[var(--surface-card)] dark:text-[#F9FAFB] dark:placeholder:text-[#6B7280] dark:focus:ring-[#5B9BFF] dark:focus:border-[#5B9BFF]"
            style={{ fontFamily: 'var(--font-montserrat)' }}
            aria-label={t.search}
          />
          {searchRaw && (
            <button
              type="button"
              onClick={() => {
                setSearchRaw('');
                setOpenIndex(null);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0B] dark:text-[#6B7280] dark:hover:text-[#F9FAFB] transition-colors cursor-pointer"
              aria-label={lang === 'de' ? 'Suche löschen' : lang === 'pl' ? 'Wyczyść wyszukiwanie' : 'Clear search'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category filter pills */}
      <div
        className="flex flex-wrap gap-2 sm:gap-3 mb-10 justify-center"
        role="tablist"
        aria-label={lang === 'de' ? 'FAQ-Kategorien' : lang === 'pl' ? 'Kategorie FAQ' : 'FAQ categories'}
      >
        {/* "All" tab */}
        <button
          type="button"
          role="tab"
          aria-selected={!activeCategory}
          onClick={() => handleCategoryChange(null)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#206FF7] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg-primary)] ${
            !activeCategory
              ? 'bg-[#206FF7] text-white shadow-md dark:bg-[#206FF7] dark:text-white'
              : 'bg-[#F5F5F7] text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#0A0A0B] dark:bg-white/[0.08] dark:text-[#9CA3AF] dark:hover:bg-white/[0.15] dark:hover:text-[#F9FAFB]'
          }`}
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          {t.all}
        </button>

        {/* Category tabs */}
        {categoryTabs.map((cat) => (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#206FF7] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg-primary)] ${
              activeCategory === cat.value
                ? 'bg-[#206FF7] text-white shadow-md dark:bg-[#206FF7] dark:text-white'
                : 'bg-[#F5F5F7] text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#0A0A0B] dark:bg-white/[0.08] dark:text-[#9CA3AF] dark:hover:bg-white/[0.15] dark:hover:text-[#F9FAFB]'
            }`}
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ items list */}
      <div
        ref={listRef}
        className={`transition-opacity duration-150 ease-in-out ${filterVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-live="polite"
      >
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F5F7] dark:bg-white/[0.08] mb-4">
              <svg className="text-[#9CA3AF] dark:text-[#6B7280]" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <p
              className="text-[#6B7280] dark:text-[#9CA3AF] text-lg font-light"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {t.noResults}
            </p>
          </div>
        ) : (
          groupedFiltered.map((group) => (
            <div key={group.category} className="mb-10">
              <h2
                className="text-xl md:text-2xl font-bold mb-5 pl-4 border-l-4 border-[#206FF7] text-[var(--text-primary)]"
                style={{ fontFamily: 'var(--font-oddval)' }}
              >
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => {
                  const gIdx = globalIndexOf(item);
                  return (
                    <AccordionItem
                      key={gIdx}
                      item={item}
                      index={gIdx}
                      isOpen={openIndex === gIdx}
                      onToggle={() => handleToggle(gIdx)}
                    />
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
