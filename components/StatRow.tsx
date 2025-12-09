import { StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type StatRowProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export function StatRow({ label, value, hint }: StatRowProps) {
  const text = useThemeColor({}, 'text');
  const secondary = useThemeColor({}, 'muted');

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={[styles.label, { color: text }]}>{label}</Text>
        {hint ? <Text style={[styles.hint, { color: secondary }]}>{hint}</Text> : null}
      </View>
      <Text style={[styles.value, { color: text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  left: {
    gap: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  hint: {
    fontSize: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
});

