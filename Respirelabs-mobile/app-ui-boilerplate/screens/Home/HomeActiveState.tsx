import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

// STATE 2: Active User with Data
export const HomeActiveState = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning, Alex</Text>
        <View style={styles.statusPill}>
          <View style={styles.dotGreen} />
          <Text style={styles.statusText}>Tape Connected</Text>
        </View>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.cardSubtitle}>LAST SESSION</Text>
        
        {/* Simulated Circular Progress Ring */}
        <View style={styles.ringContainer}>
          <Text style={styles.heroMetric}>88%</Text>
          <Text style={styles.metricLabel}>Nasal Breathing</Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8,560</Text>
            <Text style={styles.statLabel}>Total Breaths</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>7.2h</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
        </View>
      </View>

      <View style={styles.gridRow}>
        <View style={styles.smallCard}>
          <Text style={styles.smallCardTitle}>Sleep Quality</Text>
          <Text style={styles.smallCardValue}>76/100</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.smallCardTitle}>Daily Streak</Text>
          <Text style={styles.smallCardValue}>🔥 5 Days</Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <Button label="Start Night Session" variant="primary" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  greeting: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.textPrimaryLight,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dotGreen: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e', marginRight: 6,
  },
  statusText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
  },
  heroCard: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardSubtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    letterSpacing: 1,
    marginBottom: theme.spacing.lg,
  },
  ringContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  heroMetric: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.hero,
    color: theme.colors.textPrimaryLight,
  },
  metricLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body2,
    color: theme.colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing.md,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border,
  },
  statValue: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.textPrimaryLight,
  },
  statLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  gridRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  smallCard: {
    flex: 1,
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  smallCardTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  smallCardValue: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.textPrimaryLight,
  },
  bottomNav: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.xl,
  }
});
