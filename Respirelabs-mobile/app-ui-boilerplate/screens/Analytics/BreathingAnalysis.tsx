import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

export const BreathingAnalysis = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Breathing Analysis</Text>
        <Text style={styles.subtitle}>Real-time pattern monitoring</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.chartCard}>
          <Text style={styles.cardHeader}>Nose vs. Mouth Breathing</Text>
          
          <View style={styles.barContainer}>
            <View style={[styles.bar, styles.noseBar, { width: '80%' }]} />
            <View style={[styles.bar, styles.mouthBar, { width: '20%' }]} />
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, styles.noseDot]} />
              <Text style={styles.legendText}>80% Nose</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, styles.mouthDot]} />
              <Text style={styles.legendText}>20% Mouth</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.cardHeader}>Audio Spectrum History</Text>
          {/* Mock Chart Area */}
          <View style={styles.chartArea}>
            {[20, 45, 30, 80, 50, 65, 40, 90, 30].map((h, i) => (
              <View key={i} style={[styles.chartBar, { height: h }]} />
            ))}
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Coach's Note</Text>
          <Text style={styles.summaryText}>
            You showed significant improvement in the 3rd hour of sleep. Try to use the Smart Tape for even better results.
          </Text>
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
  chartCard: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  cardHeader: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textPrimaryLight,
    fontWeight: '600',
    marginBottom: theme.spacing.xl,
  },
  barContainer: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: theme.colors.border,
  },
  bar: {
    height: '100%',
  },
  noseBar: {
    backgroundColor: theme.colors.primary,
  },
  mouthBar: {
    backgroundColor: theme.colors.accentExhale,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  noseDot: {
    backgroundColor: theme.colors.primary,
  },
  mouthDot: {
    backgroundColor: theme.colors.accentExhale,
  },
  legendText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.textSecondary,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    marginTop: theme.spacing.md,
  },
  chartBar: {
    width: 15,
    backgroundColor: 'rgba(32, 111, 247, 0.4)',
    borderRadius: 7.5,
  },
  summaryCard: {
    padding: theme.spacing.xl,
    backgroundColor: 'rgba(32, 111, 247, 0.05)',
    borderRadius: theme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  summaryTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.primary,
    fontWeight: '700',
    marginBottom: 8,
  },
  summaryText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body2,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});
