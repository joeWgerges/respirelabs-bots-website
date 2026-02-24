import type { StructureBuilder } from 'sanity/structure';

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      S.divider(),

      // Pages grouped by language
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(
          S.list()
            .title('Pages by Language')
            .items([
              S.listItem()
                .title('English')
                .child(
                  S.documentList()
                    .title('English Pages')
                    .filter('_type == "page" && language == "en"'),
                ),
              S.listItem()
                .title('Deutsch')
                .child(
                  S.documentList()
                    .title('Deutsche Seiten')
                    .filter('_type == "page" && language == "de"'),
                ),
              S.listItem()
                .title('Polski')
                .child(
                  S.documentList()
                    .title('Polskie strony')
                    .filter('_type == "page" && language == "pl"'),
                ),
            ]),
        ),

      // Blog Posts grouped by language
      S.listItem()
        .title('Blog Posts')
        .icon(() => '✍️')
        .child(
          S.list()
            .title('Blog Posts by Language')
            .items([
              S.listItem()
                .title('English')
                .child(
                  S.documentList()
                    .title('English Posts')
                    .filter('_type == "blogPost" && language == "en"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Deutsch')
                .child(
                  S.documentList()
                    .title('Deutsche Beiträge')
                    .filter('_type == "blogPost" && language == "de"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
              S.listItem()
                .title('Polski')
                .child(
                  S.documentList()
                    .title('Polskie posty')
                    .filter('_type == "blogPost" && language == "pl"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
            ]),
        ),

      // FAQ Items grouped by language
      S.listItem()
        .title('FAQ')
        .icon(() => '❓')
        .child(
          S.list()
            .title('FAQ by Language')
            .items([
              S.listItem()
                .title('English')
                .child(
                  S.documentList()
                    .title('English FAQ')
                    .filter('_type == "faqItem" && language == "en"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Deutsch')
                .child(
                  S.documentList()
                    .title('Deutsche FAQ')
                    .filter('_type == "faqItem" && language == "de"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Polski')
                .child(
                  S.documentList()
                    .title('Polskie FAQ')
                    .filter('_type == "faqItem" && language == "pl"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
            ]),
        ),

      S.divider(),

      // Features
      S.listItem()
        .title('Features')
        .icon(() => '✨')
        .child(
          S.documentList()
            .title('Features')
            .filter('_type == "feature"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
    ]);
