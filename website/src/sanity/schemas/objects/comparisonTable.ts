import { defineType, defineField } from 'sanity';

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'columns',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Feature", "RespireLabs", "Generic Tape", "No Tape"',
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'feature', title: 'Feature Name', type: 'string' }),
            defineField({
              name: 'values',
              title: 'Values',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'One value per column. Use "true", "false", or text.',
            }),
          ],
          preview: {
            select: { title: 'feature' },
          },
        },
      ],
    }),
    defineField({
      name: 'highlightColumn',
      title: 'Highlighted Column Index',
      type: 'number',
      description: '0-based index of the column to highlight (usually yours)',
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Comparison Table', subtitle: 'Comparison' };
    },
  },
});
