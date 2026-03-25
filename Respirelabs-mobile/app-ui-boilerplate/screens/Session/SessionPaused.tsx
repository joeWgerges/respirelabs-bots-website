import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

// STATE 2: Session Paused
export const SessionPaused = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{width: 60}} /> {/* Spacer */}
        <Text style={styles.headerTitle}>Paused</Text>
        <View style={{width: 60}} />
      </View>

      <View style={styles.mainContent}>
        <View style={[styles.breathingRing, styles.ringPaused]}>
          <Text style={styles.instruction}>Paused</Text>
          <Text style={styles.timer}>Cycle 4/10</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Resume Session" variant="primary" onPress={() => {}} />
        <View style={{height: 16}} />
        <Button label="End Session" variant="ghost" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark, 
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
    borderWidth: 2,
  },
  ringPaused: {
    borderColor: theme.colors.textSecondary,
    transform: [{ scale: 0.9 }], // Simulating contracted/resting state
  },
  instruction: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h2,
    color: theme.colors.textPrimaryDark,
    marginBottom: theme.spacing.sm,
  },
  timer: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textSecondary,
  },
  footer: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
});
