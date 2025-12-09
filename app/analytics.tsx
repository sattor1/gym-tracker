import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/Card';
import { StatRow } from '@/components/StatRow';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const weeklyStats = {
  sessions: 3,
  volume: 21450,
  bestLift: 'Жим лёжа 100 x 5',
  pr: 'Становая 170 x 3',
  muscleSplit: [
    { group: 'грудь', volume: 5200 },
    { group: 'спина', volume: 6400 },
    { group: 'ноги', volume: 8200 },
  ],
};

export default function AnalyticsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="title">Аналитика</ThemedText>
        <ThemedText style={styles.sub}>Краткая сводка по неделе.</ThemedText>

        <Card>
          <StatRow label="Сессий" value={weeklyStats.sessions} />
          <StatRow label="Тоннаж" value={`${weeklyStats.volume.toLocaleString('ru-RU')} кг`} />
          <StatRow label="Лучший подход" value={weeklyStats.bestLift} />
          <StatRow label="Новый PR" value={weeklyStats.pr} />
        </Card>

        <Card>
          <ThemedText type="subtitle">Объём по группам</ThemedText>
          {weeklyStats.muscleSplit.map(item => (
            <View key={item.group} style={styles.splitRow}>
              <ThemedText style={styles.group}>{item.group}</ThemedText>
              <View style={styles.bar}>
                <View style={[styles.barFill, { width: `${Math.min(item.volume / 90, 100)}%` }]} />
              </View>
              <ThemedText style={styles.value}>{item.volume.toLocaleString('ru-RU')} кг</ThemedText>
            </View>
          ))}
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  sub: { opacity: 0.8 },
  splitRow: { gap: 6 },
  group: { fontWeight: '700', fontSize: 14 },
  bar: {
    height: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1f2937',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#0A84FF',
  },
  value: { opacity: 0.8, fontSize: 12 },
});
