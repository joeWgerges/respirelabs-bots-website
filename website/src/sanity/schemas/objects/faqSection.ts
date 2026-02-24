import { defineType, defineField } from 'sanity';

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  description: 'Embeds FAQ items from the FAQ collection, filtered by category',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'categories',
      title: 'Filter by Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Product', value: 'product' },
          { title: 'Privacy & Data', value: 'privacy' },
          { title: 'Smart Mouth Tape', value: 'smartMouthTape' },
          { title: 'Beta & Early Access', value: 'beta' },
          { title: 'General', value: 'general' },
        ],
      },
      description: 'Leave empty to show all categories',
    }),
    defineField({
      name: 'maxItems',
      title: 'Max Items to Show',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'FAQ Section', subtitle: 'FAQ' };
    },
  },
});
