import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { theme } from '../../theme';
import { Button } from '../../components/Button';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: "Breathe. Sleep.",
    description: "Train your body to breathe through your nose for deeper sleep and more energy.",
    color: theme.colors.primary,
  },
  {
    title: "AI Analysis.",
    description: "Our advanced algorithms detect mouth breathing patterns in real-time.",
    color: "#6366f1",
  },
  {
    title: "Smart Tape.",
    description: "Enhance your results with our integrated wearable sensor.",
    color: "#0f172a",
  }
];

export const ValuePropCarousel = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slideContent}>
        <View style={[styles.visualPlaceholder, { backgroundColor: slides[activeSlide].color }]} />
        
        <View style={styles.textBlock}>
          <Text style={styles.title}>{slides[activeSlide].title}</Text>
          <Text style={styles.description}>{slides[activeSlide].description}</Text>
        </View>

        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                activeSlide === i && styles.activeDot
              ]} 
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          label={activeSlide === slides.length - 1 ? "Get Started" : "Next"} 
          onPress={() => {
            if (activeSlide < slides.length - 1) setActiveSlide(activeSlide + 1);
          }} 
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
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualPlaceholder: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 40,
    marginBottom: theme.spacing.xxl,
  },
  textBlock: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: theme.typography.sizes.h1,
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  description: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: theme.spacing.xxl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
    width: 20,
  },
  footer: {
    paddingBottom: theme.spacing.xl,
  },
});
