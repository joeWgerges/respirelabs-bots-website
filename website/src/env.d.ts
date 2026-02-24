/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
  readonly SANITY_API_TOKEN: string;
  readonly BREVO_API_KEY: string;
  readonly BREVO_WAITLIST_LIST_ID: string;
  readonly BREVO_DOI_TEMPLATE_ID: string;
  readonly BREVO_SENDER_EMAIL: string;
  readonly BREVO_SENDER_NAME: string;
  readonly MATOMO_URL: string;
  readonly MATOMO_SITE_ID: string;
  readonly SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
