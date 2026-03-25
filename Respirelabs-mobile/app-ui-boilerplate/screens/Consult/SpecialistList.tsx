import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

const specialists = [
  { id: 1, name: 'Dr. Louise Oliver', role: 'GP & Functional Breathing Practitioner', rating: '4.9', tags: ['Nose breathing', 'Rhinitis'] },
  { id: 2, name: 'Roel Wilbers', role: 'Sleep Coach & Breathwork Expert', rating: '4.8', tags: ['Sleep Hygiene', 'Stress'] },
];

export const SpecialistList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Teleconsultation</Text>
        <Text style={styles.subtitle}>Connect with certified specialists</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.appointmentCard}>
          <Text style={styles.sectionLabel}>UPCOMING APPOINTMENT</Text>
          <View style={styles.appntInfo}>
            <View style={styles.avatarPlaceholder} />
            <View style={styles.appntTexts}>
              <Text style={styles.doctorName}>Dr. Louise Oliver</Text>
              <Text style={styles.appntDate}>🗓️ 2024-03-25 at 10:00 AM</Text>
            </View>
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.btn, styles.btnSecondary]}>
              <Text style={styles.btnTextSecondary}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]}>
              <Text style={styles.btnTextPrimary}>Join Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Specialists</Text>
        {specialists.map((spec) => (
          <TouchableOpacity key={spec.id} style={styles.specCard}>
            <View style={styles.specHeader}>
              <View style={styles.avatarLarge} />
              <View style={styles.specBasicInfo}>
                <Text style={styles.specName}>{spec.name}</Text>
                <Text style={styles.specRole}>{spec.role}</Text>
                <Text style={styles.specRating}>⭐ {spec.rating}</Text>
              </View>
            </View>
            <View style={styles.tagContainer}>
              {spec.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <Button label="Book Consultation" variant="secondary" onPress={() => {}} />
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
  appointmentCard: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.xl,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 10,
    color: theme.colors.primary,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 16,
  },
  appntInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.border,
    marginRight: 16,
  },
  appntTexts: {
    flex: 1,
  },
  doctorName: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 18,
    color: theme.colors.textPrimaryLight,
    fontWeight: '700',
  },
  appntDate: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: theme.colors.primary,
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  btnTextPrimary: {
    color: '#fff',
    fontWeight: '600',
  },
  btnTextSecondary: {
    color: theme.colors.textPrimaryLight,
    fontWeight: '600',
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: 20,
    color: theme.colors.textPrimaryLight,
    marginBottom: 16,
  },
  specCard: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.lg,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  specHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: theme.colors.border,
    marginRight: 16,
  },
  specBasicInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  specName: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 17,
    color: theme.colors.textPrimaryLight,
    fontWeight: '700',
  },
  specRole: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  specRating: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 13,
    color: theme.colors.textPrimaryLight,
    fontWeight: '600',
    marginTop: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: theme.colors.backgroundLight,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
});
