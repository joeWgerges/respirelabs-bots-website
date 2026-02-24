import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'i4ekourx',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: import.meta.env.SANITY_API_TOKEN,
});

// ---------------------------------------------------------------------------
// Page queries
// ---------------------------------------------------------------------------

export async function getPage(slug: string, lang: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug && language == $lang][0]{
      ...,
      hero { ... },
      seo { ..., "ogImageUrl": ogImage.asset->url },
      sections[]{ ... }
    }`,
    { slug, lang },
  );
}

export async function getAllPages(lang: string) {
  return sanityClient.fetch(
    `*[_type == "page" && language == $lang]{
      title,
      "slug": slug.current,
      language
    }`,
    { lang },
  );
}

// ---------------------------------------------------------------------------
// Blog queries
// ---------------------------------------------------------------------------

export async function getBlogPosts(lang: string, limit = 10) {
  return sanityClient.fetch(
    `*[_type == "blogPost" && language == $lang] | order(publishedAt desc) [0...$limit]{
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      tags,
      "featuredImageUrl": featuredImage.asset->url,
      "featuredImageAlt": featuredImage.alt
    }`,
    { lang, limit },
  );
}

export async function getBlogPost(slug: string, lang: string) {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug && language == $lang][0]{
      ...,
      body[]{ ... },
      seo { ..., "ogImageUrl": ogImage.asset->url },
      "featuredImageUrl": featuredImage.asset->url,
      "featuredImageAlt": featuredImage.alt,
      relatedPosts[]->{
        title,
        "slug": slug.current,
        publishedAt,
        excerpt,
        "featuredImageUrl": featuredImage.asset->url,
        "featuredImageAlt": featuredImage.alt
      }
    }`,
    { slug, lang },
  );
}

// ---------------------------------------------------------------------------
// FAQ queries
// ---------------------------------------------------------------------------

export async function getFaqItems(lang: string, category?: string) {
  const filter = category
    ? `_type == "faqItem" && language == $lang && category == $category`
    : `_type == "faqItem" && language == $lang`;

  return sanityClient.fetch(
    `*[${filter}] | order(order asc){
      question,
      answer,
      category,
      order
    }`,
    { lang, category },
  );
}

// ---------------------------------------------------------------------------
// Features queries
// ---------------------------------------------------------------------------

export async function getFeatures(category?: string) {
  const filter = category
    ? `_type == "feature" && category == $category`
    : `_type == "feature"`;

  return sanityClient.fetch(
    `*[${filter}] | order(order asc){
      title,
      description,
      icon,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      category,
      order
    }`,
    { category },
  );
}

// ---------------------------------------------------------------------------
// Site Settings (singleton)
// ---------------------------------------------------------------------------

export async function getSiteSettings() {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      companyName,
      supportEmail,
      pressEmail,
      partnershipEmail,
      socialLinks,
      footerDisclaimerEN,
      footerDisclaimerDE,
      footerDisclaimerPL
    }`,
  );
}
