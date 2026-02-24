import { defineType, defineField } from 'sanity';

export const blogPreviewSection = defineType({
  name: 'blogPreviewSection',
  title: 'Blog Preview Section',
  type: 'object',
  description: 'Shows a grid of latest blog post cards',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Latest from the Blog',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'maxPosts',
      title: 'Number of Posts',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: 'filterByTag',
      title: 'Filter by Tag',
      type: 'string',
      description: 'Optional: only show posts with this tag',
    }),
    defineField({
      name: 'showViewAll',
      title: 'Show "View All" Link',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Blog Preview', subtitle: 'Blog Cards' };
    },
  },
});
