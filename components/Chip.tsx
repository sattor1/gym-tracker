import { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type ChipProps = {
  label: string;
  icon?: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export function Chip({ label, icon, style }: ChipProps) {
  const background = useThemeColor({}, 'chip');
  const text = useThemeColor({}, 'text');

  return (
    <View style={[styles.container, { backgroundColor: background }, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});

