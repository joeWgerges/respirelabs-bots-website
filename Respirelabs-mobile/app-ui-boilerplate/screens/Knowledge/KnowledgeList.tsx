import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

const articles = [
  { id: 1, title: 'The Science Behind Mouth Taping', time: '5 min read', category: 'Research' },
  { id: 2, title: 'Nasal Breathing & Athletic Performance', time: '8 min read', category: 'Fitness' },
  { id: 3, title: 'How to Build Better Sleeping Habits', time: '6 min read', category: 'Health' },
  { id: 4, title: 'Understanding Audio Detection', time: '4 min read', category: 'Tech' },
];

export const KnowledgeList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Knowledge Center</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput placeholder="Search articles..." style={styles.searchInput} placeholderTextColor={theme.colors.textSecondary} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.featuredArticle}>
          <View style={styles.featuredImagePlaceholder} />
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>The Science of Breathing</Text>
            <Text style={styles.featuredDesc}>Discover how nasal breathing changes your physiology and improves long-term health.</Text>
            <TouchableOpacity style={styles.readMoreBtn}>
              <Text style={styles.readMoreText}>Read Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Latest Articles</Text>
        {articles.map((art) => (
          <TouchableOpacity key={art.id} style={styles.articleCard}>
            <View style={styles.articleImageSmall} />
            <View style={styles.articleInfo}>
              <Text style={styles.articleCat}>{art.category}</Text>
              <Text style={styles.articleTitle}>{art.title}</Text>
              <Text style={styles.articleMeta}>{art.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  header: {
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  title: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: 28,
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: theme.colors.textPrimaryLight,
  },
  content: {
    padding: theme.spacing.lg,
  },
  featuredArticle: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
    marginBottom: theme.spacing.xxl,
  },
  featuredImagePlaceholder: {
    height: 180,
    backgroundColor: theme.colors.primary,
  },
  featuredContent: {
    padding: theme.spacing.lg,
  },
  featuredTitle: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: 22,
    color: theme.colors.textPrimaryLight,
    marginBottom: 8,
  },
  featuredDesc: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreBtn: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  readMoreText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: 20,
    color: theme.colors.textPrimaryLight,
    marginBottom: 16,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  articleImageSmall: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: theme.colors.border,
    marginRight: 16,
  },
  articleInfo: {
    flex: 1,
  },
  articleCat: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 10,
    color: theme.colors.primary,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  articleTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 15,
    color: theme.colors.textPrimaryLight,
    fontWeight: '700',
    marginBottom: 4,
  },
  articleMeta: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});
