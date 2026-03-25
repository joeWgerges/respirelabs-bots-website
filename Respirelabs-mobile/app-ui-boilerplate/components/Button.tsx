import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', onPress, disabled }) => {
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isPrimary ? styles.primary : isGhost ? styles.ghost : styles.secondary,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.text, 
        isPrimary ? styles.textLight : styles.textDark,
        isGhost && styles.textGhost
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.sizes.body1,
    fontWeight: '600',
  },
  textLight: {
    color: theme.colors.textPrimaryDark,
  },
  textDark: {
    color: theme.colors.textPrimaryLight,
  },
  textGhost: {
    color: theme.colors.textSecondary,
  }
});
