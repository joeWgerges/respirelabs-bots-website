import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

// STATE 1: Actively playing breathing exercise (Inhale state)
export const SessionPlaying = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button label="Quit" variant="ghost" onPress={() => {}} />
        <Text style={styles.headerTitle}>4-2-6 Rhythm</Text>
        <Button label="Pause" variant="ghost" onPress={() => {}} />
      </View>

      <View style={styles.mainContent}>
        {/* The Breathing Ring (Active/Expanded State) */}
        <View style={[styles.breathingRing, styles.ringInhale]}>
          <Text style={styles.instruction}>Inhale</Text>
          <Text style={styles.timer}>0:04</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.cycleText}>Cycle 4 of 10</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark, // Dark mode forced for focus
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textPrimaryDark,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingRing: {
    width: 280,
    height: 280,
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    // Note: In an actual app, this ring size and color is animated via Reanimated/Moti
  },
  ringInhale: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(32, 111, 247, 0.1)', // Subtle blue glow
    transform: [{ scale: 1.1 }], // Simulating expanded state
  },
  instruction: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h1,
    color: theme.colors.textPrimaryDark,
    marginBottom: theme.spacing.sm,
  },
  timer: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.h3,
    color: theme.colors.textSecondary,
  },
  footer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  cycleText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textSecondary,
  }
});
