import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

const goals = [
  { id: 'sleep', title: 'Deep Sleep', icon: '🌙' },
  { id: 'energy', title: 'Better Energy', icon: '⚡' },
  { id: 'focus', title: 'Clarity & Focus', icon: '🧠' },
  { id: 'health', title: 'General Wellness', icon: '🌿' },
];

export const GoalSelection = () => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What is your main goal?</Text>
        <Text style={styles.subtitle}>We will tailor your breathing experience accordingly.</Text>

        <View style={styles.grid}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                selected === goal.id && styles.selectedCard
              ]}
              onPress={() => setSelected(goal.id)}
            >
              <Text style={styles.icon}>{goal.icon}</Text>
              <Text style={[
                styles.goalTitle,
                selected === goal.id && styles.selectedText
              ]}>
                {goal.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          label="Continue" 
          disabled={!selected} 
          onPress={() => {}} 
        />
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
  content: {
    flex: 1,
    marginTop: theme.spacing.xxl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h1,
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  goalCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(32, 111, 247, 0.05)',
  },
  icon: {
    fontSize: 40,
    marginBottom: theme.spacing.md,
  },
  goalTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textPrimaryLight,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedText: {
    color: theme.colors.primary,
  },
  footer: {
    paddingBottom: theme.spacing.xl,
  },
});
