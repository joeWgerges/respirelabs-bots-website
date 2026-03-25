import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

// STATE 1: First time user / No data yet
export const HomeEmptyState = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Evening, Alex</Text>
        <View style={styles.statusPill}>
          <View style={styles.dotRed} />
          <Text style={styles.statusText}>Tape Disconnected</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardSubtitle}>TONIGHT'S GOAL</Text>
        <Text style={styles.heroMetric}>Establish Baseline</Text>
        <Text style={styles.cardBody}>
          Connect your Smart Mouth Tape and start your first session to see your breathing insights.
        </Text>
      </View>

      <View style={styles.bottomNav}>
        <Button label="Pair Smart Tape" variant="primary" onPress={() => {}} />
        <View style={{height: 16}} />
        <Button label="Learn How It Works" variant="secondary" onPress={() => {}} />
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
  dotRed: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: 'red', marginRight: 6,
  },
  statusText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
  },
  card: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    alignItems: 'center',
  },
  cardSubtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  heroMetric: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  cardBody: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body2,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomNav: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.xl,
  }
});
