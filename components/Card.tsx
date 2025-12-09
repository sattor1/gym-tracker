import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type CardProps = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export function Card({ children, style }: CardProps) {
  const background = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');

  return (
    <View style={[styles.card, { backgroundColor: background, borderColor: border }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
});

