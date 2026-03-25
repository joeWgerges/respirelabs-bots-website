import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../../theme';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const SleepTrends = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sleep Trends</Text>
        <Text style={styles.subtitle}>Consistency is key to results</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.trendGrid}>
          {days.map((day, i) => (
            <View key={i} style={styles.dayColumn}>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { height: `${40 + i * 8}%` }]} />
              </View>
              <Text style={styles.dayLabel}>{day}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>82%</Text>
            <Text style={styles.statLabel}>Avg Nasal Ratio</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>7.4h</Text>
            <Text style={styles.statLabel}>Avg Duration</Text>
          </View>
        </View>

        <View style={styles.achievements}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeScroll}>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>🔥</Text>
              <Text style={styles.badgeTitle}>5-Day Streak</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>👃</Text>
              <Text style={styles.badgeTitle}>100% Nasal</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>⭐</Text>
              <Text style={styles.badgeTitle}>Focus Pro</Text>
            </View>
          </ScrollView>
        </View>
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
  content: {
    padding: theme.spacing.lg,
  },
  trendGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barBackground: {
    width: 12,
    height: 120,
    backgroundColor: theme.colors.border,
    borderRadius: 6,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barFill: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
  },
  dayLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 10,
    color: theme.colors.textSecondary,
  },
  statRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  statItem: {
    flex: 1,
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  statVal: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h2,
    color: theme.colors.textPrimaryLight,
  },
  statLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  achievements: {
    marginTop: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.lg,
  },
  badgeScroll: {
    marginLeft: -theme.spacing.lg,
    paddingLeft: theme.spacing.lg,
  },
  badge: {
    backgroundColor: theme.colors.surfaceLight,
    width: 120,
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 12,
    color: theme.colors.textPrimaryLight,
    fontWeight: '600',
    textAlign: 'center',
  },
});
