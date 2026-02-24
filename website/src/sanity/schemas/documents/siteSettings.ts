import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'pressEmail',
      title: 'Press Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'partnershipEmail',
      title: 'Partnership Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
      ],
    }),
    defineField({
      name: 'footerDisclaimerEN',
      title: 'Footer Disclaimer (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'footerDisclaimerDE',
      title: 'Footer Disclaimer (Deutsch)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'footerDisclaimerPL',
      title: 'Footer Disclaimer (Polski)',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
