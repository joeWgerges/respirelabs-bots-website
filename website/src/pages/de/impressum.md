---
layout: "../../layouts/MarkdownLayout.astro"
lang: "de"
title: "Impressum"
description: "Rechtliche Anbieterkennzeichnung."
---
# Impressum

{{company_name}}  
{{company_address}}  
{{company_country}}

Vertreten durch: {{managing_director}}  
E‑Mail: {{support_email}}  
Firmenbuch/Handelsregister: {{registration}}  
UID: {{vat_id}}  
Aufsichtsbehörde: {{authority}}  

Haftungsausschluss: Inhalte dienen Informationszwecken und stellen keine medizinische Beratung dar.
6) Structured data snippets (JSON‑LD)
6.1 Organization + Website (inject on all pages)
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RespireLabs",
  "url": "https://respirelabs.com",
  "logo": "https://respirelabs.com/assets/logo.png",
  "sameAs": [
    "{{youtube_url}}",
    "{{linkedin_url}}",
    "{{x_url}}"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "{{support_email}}"
  }]
}
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RespireLabs",
  "url": "https://respirelabs.com",
  "inLanguage": ["de", "en"]
}
6.2 Product schema (Smart Mouth Tape page)
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "RespireLabs Smart Mouth Tape",
  "brand": "RespireLabs",
  "description": "A sensor-powered mouth tape concept (in development) designed to support breathing habit awareness at night. Wellness-only; not diagnostic.",
  "category": "Health & Wellness",
  "isRelatedTo": [{
    "@type": "SoftwareApplication",
    "name": "RespireLabs App",
    "operatingSystem": "iOS, Android"
  }]
}
6.3 SoftwareApplication schema (App page)
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "RespireLabs",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "HealthApplication",
  "description": "A privacy-first breathing coach designed to reduce mouth breathing and support nasal breathing habit training. Not a medical device."
}
7) What this content is grounded on (your internal docs + current best practices)
Product scope & positioning
Phone-first detection + coaching; privacy-by-default; offline-capable; non-diagnostic boundary; device-ready for Smart Mouth Tape.【70:7†RespireLabs_Software_Specification_Full.docx†L1-L60】【70:4†RespireLabs_Technical_Specifications_And_Open_Questions.docx†L26-L70】
Safe vs prohibited claims and EU compliance framing (wellness positioning).【113:7†RespireLabs Strategic Market Entry.docx†L13-L66】
Smart Mouth Tape sensor expectations + design constraints (mic + airflow/pressure + SpO₂ + accelerometer; 9–10 hours; USB‑C; no visible lights; attachability; skin safety).【113:0†1. Non-rigid – requirements - Slab.md†L1-L22】【113:6†1.
RespireLabs_Software_Specificat…

RespireLabs_Technical_Specifica…
les (sleep audio apps, mouth tape brands, wearables) are taken from your marke
RespireLabs Strategic Market En…
et Entry.docx†L149-L243】【70:0†RespireLabs_Research_Appendix.docx†L28-L126】
2026 LLM visibility
llms.txt proposal and format guidance.
GEO/AEO gu
1. Non-rigid – requirements - S…

1. Non-rigid – requirements - S…
laimers & trust signals are prominent.
Mouth taping safety context (for the Science & Safety page)
Mouth taping evidence is limited and can be risky f
RespireLabs Strategic Market En…

RespireLabs_Research_Appendix
8) Internal files referenced
(links for your team)
RespireLabs basics / mission / traction:
Mouth Breathing Detection slab:
Wearable non‑rigid requirements:
Strategic Market Entry:
Jury script:
DeepTech pitch deck:
Europe plan HTML:
Research appendix:
Software spec full:
Prioritized feature list:
If you want, I can also output this same content as a ready-to-commit repository structure (folders + filenames + frontmatter) for Astro/Next, but the content above is already in copy‑pasteable markdown blocks.
