import { defineType, defineField } from 'sanity';

export const statsBar = defineType({
  name: 'statsBar',
  title: 'Stats Bar',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "40%", "2.5x", "10K+"' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'style',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Dark', value: 'dark' },
          { title: 'Brand Blue', value: 'blue' },
        ],
      },
      initialValue: 'dark',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Stats Bar', subtitle: 'Statistics' };
    },
  },
});
