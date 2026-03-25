import React from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { theme } from '../../theme';

export const SplashScreen = () => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        {/* Placeholder for Logo Symbol */}
        <View style={styles.logoCircle}>
          <View style={styles.logoLungs} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.textPrimaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLungs: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.primary,
    borderRadius: 10, // Abstract lungs
  },
});
