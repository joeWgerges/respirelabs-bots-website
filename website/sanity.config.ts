import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { schemaTypes } from './src/sanity/schemas';
import { deskStructure } from './src/sanity/desk/structure';

export default defineConfig({
  name: 'respirelabs',
  title: 'RespireLabs CMS',

  projectId: 'i4ekourx',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'de', title: 'Deutsch' },
        { id: 'pl', title: 'Polski' },
      ],
      schemaTypes: ['page', 'blogPost', 'faqItem'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
