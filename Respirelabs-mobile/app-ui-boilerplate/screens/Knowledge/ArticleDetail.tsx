import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

export const ArticleDetail = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageHeader}>
          {/* Back Button */}
          <SafeAreaView>
            <TouchableOpacity style={styles.backBtn}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>RESEARCH • 5 MIN READ</Text>
          <Text style={styles.title}>The Science Behind Mouth Taping</Text>
          
          <View style={styles.divider} />

          <Text style={styles.paragraph}>
            Mouth breathing is more than just a habit; it’s a physiological challenge that can affect everything from your dental health to your cognitive function.
          </Text>

          <Text style={styles.sectionHeader}>Why Nasal Breathing Matters</Text>
          <Text style={styles.paragraph}>
            Your nose is more than a sensor; it's a sophisticated filtration and heating system. When you breathe through your nose, the air is warmed and humidified before it reaches your lungs.
          </Text>

          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              "Nasal breathing increases oxygen uptake by up to 20% compared to mouth breathing."
            </Text>
            <Text style={styles.quoteAuthor}>— Dr. James Nestor</Text>
          </View>

          <Text style={styles.paragraph}>
            By gently ensuring your mouth stays closed during sleep, Smart Mouth Tape helps your body default to its natural, most efficient breathing pattern.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  imageHeader: {
    height: 300,
    backgroundColor: theme.colors.primary,
    justifyContent: 'flex-start',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
  },
  content: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.backgroundLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  category: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 10,
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: 28,
    color: theme.colors.textPrimaryLight,
    lineHeight: 34,
    marginBottom: 20,
  },
  divider: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    marginBottom: 24,
  },
  paragraph: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 16,
    color: theme.colors.textPrimaryLight,
    lineHeight: 26,
    marginBottom: 24,
  },
  sectionHeader: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: 20,
    color: theme.colors.textPrimaryLight,
    marginBottom: 12,
  },
  quoteBox: {
    padding: 24,
    backgroundColor: 'rgba(32, 111, 247, 0.05)',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    marginBottom: 24,
  },
  quoteText: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 18,
    fontStyle: 'italic',
    color: theme.colors.textPrimaryLight,
    lineHeight: 28,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'right',
  },
});
