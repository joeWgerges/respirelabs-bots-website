import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

export const Permissions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy First.</Text>
        <Text style={styles.subtitle}>
          RespireLabs processes your data locally. We need access to the following to work effectively:
        </Text>

        <View style={styles.permissionCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🎙️</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Microphone</Text>
            <Text style={styles.cardDesc}>
              Required to detect mouth vs. nose breathing sounds. Audio is processed locally and never leaves your device.
            </Text>
          </View>
        </View>

        <View style={styles.permissionCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>❤️</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Apple Health</Text>
            <Text style={styles.cardDesc}>
              Allows us to sync your sleep data and SpO2 levels to provide comprehensive insights.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Grant Permissions" variant="primary" onPress={() => {}} />
        <View style={{ height: 12 }} />
        <Button label="Skip for now" variant="ghost" onPress={() => {}} />
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
    marginBottom: theme.spacing.xxl,
  },
  permissionCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(32, 111, 247, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textPrimaryLight,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body2,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  footer: {
    paddingBottom: theme.spacing.xl,
  },
});
