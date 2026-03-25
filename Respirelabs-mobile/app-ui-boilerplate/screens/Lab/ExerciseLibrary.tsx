import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

const categories = ['All', 'Sleep', 'Focus', 'Stress Relief', 'Daily'];
const exercises = [
  { id: 1, title: '4-2-6 Rhythm', category: 'Sleep', duration: '5 min', level: 'Beginner' },
  { id: 2, title: 'Box Breathing', category: 'Focus', duration: '10 min', level: 'Intermediate' },
  { id: 3, title: 'Deep Nasal Cycle', category: 'Daily', duration: '3 min', level: 'Beginner' },
  { id: 4, title: 'Extended Exhale', category: 'Stress Relief', duration: '8 min', level: 'Beginner' },
];

export const ExerciseLibrary = () => {
  const [activeCat, setActiveCat] = React.useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Breathing Lab</Text>
        <Text style={styles.subtitle}>Exercises for every need</Text>
      </View>

      <View style={styles.categoryWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catPill, activeCat === cat && styles.catPillActive]}
              onPress={() => setActiveCat(cat)}
            >
              <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.featuredCard}>
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTag}>NEW EXERCISE</Text>
            <Text style={styles.featuredTitle}>Coherence Breathing</Text>
            <Text style={styles.featuredDesc}>Harmonize your heart and lungs in 5 minutes.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>For You</Text>
        {exercises.map((ex) => (
          <TouchableOpacity key={ex.id} style={styles.exCard}>
            <View style={styles.exIconPlaceholder}>
              <Text style={{fontSize: 24}}>🧘</Text>
            </View>
            <View style={styles.exInfo}>
              <Text style={styles.exTitle}>{ex.title}</Text>
              <Text style={styles.exMeta}>{ex.duration} • {ex.level} • {ex.category}</Text>
            </View>
            <View style={styles.playBtn}>
              <Text style={{color: '#fff', fontSize: 12}}>Play</Text>
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
    fontSize: theme.typography.sizes.h1,
    color: theme.colors.textPrimaryLight,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  categoryWrap: {
    marginBottom: theme.spacing.md,
  },
  catScroll: {
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  catPillActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  catText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  catTextActive: {
    color: theme.colors.textPrimaryDark,
  },
  content: {
    padding: theme.spacing.lg,
  },
  featuredCard: {
    height: 180,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.xxl,
  },
  featuredOverlay: {
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  featuredTag: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 10,
    color: theme.colors.accentExhale,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  featuredTitle: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h2,
    color: theme.colors.textPrimaryDark,
    marginBottom: 4,
  },
  featuredDesc: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.lg,
  },
  exCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  exIconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exInfo: {
    flex: 1,
  },
  exTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 16,
    color: theme.colors.textPrimaryLight,
    fontWeight: '700',
  },
  exMeta: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  playBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  }
});
