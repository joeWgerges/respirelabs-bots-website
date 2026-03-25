import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

export const TapeManagement = () => {
  const [isAutoSync, setIsAutoSync] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tape Management</Text>
        <Text style={styles.subtitle}>Configure your Smart Mouth Tape</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.deviceCard}>
          <View style={styles.deviceVisual}>
            <View style={styles.tapeIconPlaceholder}>
              <Text style={{fontSize: 40}}>🩹</Text>
            </View>
            <View style={styles.batteryInfo}>
              <Text style={styles.batteryText}>85% Battery</Text>
              <View style={styles.batteryBar}>
                <View style={[styles.batteryFill, { width: '85%' }]} />
              </View>
            </View>
          </View>
          
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusVal}>Connected</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTexts}>
              <Text style={styles.settingTitle}>Auto-Sync Data</Text>
              <Text style={styles.settingDesc}>Automatically sync sessions when tape is connected.</Text>
            </View>
            <Switch 
              value={isAutoSync} 
              onValueChange={setIsAutoSync}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingTexts}>
              <Text style={styles.settingTitle}>Calibration</Text>
              <Text style={styles.settingDesc}>Recalibrate sensors for better accuracy.</Text>
            </View>
            <Text style={styles.chevron}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingTexts}>
              <Text style={styles.settingTitle}>Firmware Update</Text>
              <Text style={styles.settingDesc}>Version 1.2.4 available.</Text>
            </View>
            <View style={styles.updateBadge}>
              <Text style={styles.updateText}>Update</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footerBtns}>
          <Button label="Disconnect Device" variant="secondary" onPress={() => {}} />
          <View style={{height: 12}} />
          <Button label="Forget Device" variant="ghost" onPress={() => {}} />
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
    fontSize: 26,
    color: theme.colors.textPrimaryLight,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  content: {
    padding: theme.spacing.lg,
  },
  deviceCard: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.xl,
    borderRadius: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  deviceVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  tapeIconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(32, 111, 247, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  batteryInfo: {
    flex: 1,
  },
  batteryText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 16,
    color: theme.colors.textPrimaryLight,
    fontWeight: '700',
    marginBottom: 8,
  },
  batteryBar: {
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
    backgroundColor: '#22c55e',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  statusLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  statusVal: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '700',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: 18,
    color: theme.colors.textPrimaryLight,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingTexts: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 15,
    color: theme.colors.textPrimaryLight,
    fontWeight: '600',
  },
  settingDesc: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: theme.colors.textSecondary,
  },
  updateBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  updateText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '700',
  },
  footerBtns: {
    paddingBottom: 40,
  },
});
