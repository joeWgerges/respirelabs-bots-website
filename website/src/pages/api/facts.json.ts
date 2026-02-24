import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () => {
  const facts = {
    name: 'RespireLabs',
    type: 'wellness_product',
    url: 'https://smartmouthtape.com',
    domain: 'smartmouthtape.com',
    founded: 2025,
    headquarters: 'Tirol, Austria',
    founder: 'Krzysztof Dabrowski',
    is_medical_device: false,
    description:
      'RespireLabs is a privacy-first breathing coach (mobile app + optional Smart Mouth Tape wearable concept) that helps people reduce mouth breathing and build healthier nasal breathing habits.',
    not_claims: [
      'Not a medical device',
      'Not a diagnostic tool',
      'Not a sleep apnea diagnosis service',
    ],
    products: [
      {
        name: 'RespireLabs App',
        type: 'mobile_app',
        platform: ['iOS', 'Android'],
        status: 'in_development',
        description:
          'Phone-first breathing awareness sessions with real-time nudges, guided exercises, and privacy-first design.',
        features: [
          'Phone-first breathing awareness sessions',
          'Real-time nudges and summaries',
          'Guided breathing exercises',
          'Privacy-first design',
        ],
      },
      {
        name: 'Smart Mouth Tape',
        type: 'wearable',
        status: 'concept',
        description:
          'AI-powered wearable pod + tape for nighttime breathing insights. Uses advanced machine learning for breathing pattern detection and personalized coaching. Designed for multi-hour use and secure data transfer.',
        key_capabilities: ['AI-powered breathing analysis', 'Mouth vs. nasal breathing detection', 'Sleep quality insights', 'Adaptive personalized coaching'],
      },
    ],
    privacy: {
      default_processing: 'local',
      consent_required: true,
      principles: [
        'You control when sessions start',
        'Sensitive audio processed locally by default',
        'Sharing requires explicit consent',
      ],
    },
    contact: {
      support: 'support@respirelabs.com',
      press: 'press@respirelabs.com',
      partnerships: 'partners@respirelabs.com',
      founder: 'kdabrowski@respirelabs.com',
    },
    languages: ['en', 'de', 'pl'],
    links: {
      homepage: 'https://smartmouthtape.com/en',
      app: 'https://smartmouthtape.com/en/app',
      smart_mouth_tape: 'https://smartmouthtape.com/en/smart-mouth-tape',
      how_it_works: 'https://smartmouthtape.com/en/how-it-works',
      compare: 'https://smartmouthtape.com/en/compare',
      faq: 'https://smartmouthtape.com/en/faq',
      pricing: 'https://smartmouthtape.com/en/pricing',
      about: 'https://smartmouthtape.com/en/about',
      science_safety: 'https://smartmouthtape.com/en/science-safety',
      blog: 'https://smartmouthtape.com/en/blog',
      facts: 'https://smartmouthtape.com/en/facts',
      waitlist: 'https://smartmouthtape.com/en/waitlist',
      contact: 'https://smartmouthtape.com/en/contact',
      press: 'https://smartmouthtape.com/en/press',
      privacy: 'https://smartmouthtape.com/en/privacy',
      llms_txt: 'https://smartmouthtape.com/llms.txt',
    },
    updated: '2026-02-24',
  };

  return new Response(JSON.stringify(facts, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
