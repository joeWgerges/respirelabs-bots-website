// Document schemas
import { page } from './documents/page';
import { blogPost } from './documents/blogPost';
import { faqItem } from './documents/faqItem';
import { siteSettings } from './documents/siteSettings';
import { feature } from './documents/feature';

// Object schemas
import { seo } from './objects/seo';
import { hero } from './objects/hero';
import { richText } from './objects/richText';
import { ctaBlock } from './objects/ctaBlock';
import { contentSection } from './objects/contentSection';
import { featureGrid } from './objects/featureGrid';
import { comparisonTable } from './objects/comparisonTable';
import { statsBar } from './objects/statsBar';
import { splitContent } from './objects/splitContent';
import { faqSection } from './objects/faqSection';
import { blogPreviewSection } from './objects/blogPreviewSection';

export const schemaTypes = [
  // Documents
  page,
  blogPost,
  faqItem,
  siteSettings,
  feature,
  // Objects
  seo,
  hero,
  richText,
  ctaBlock,
  contentSection,
  featureGrid,
  comparisonTable,
  statsBar,
  splitContent,
  faqSection,
  blogPreviewSection,
];
