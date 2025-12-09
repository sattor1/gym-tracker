import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const mockHistory = [
  { id: 'h1', name: 'Push', date: '2025-02-02', volume: 7800, duration: 54, focus: 'push', sets: 18 },
  { id: 'h2', name: 'Pull', date: '2025-02-01', volume: 7200, duration: 52, focus: 'pull', sets: 17 },
  { id: 'h3', name: 'HIIT 20 мин', date: '2025-01-31', volume: 0, duration: 22, focus: 'hiit', sets: 15 },
];

export default function HistoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="title">История</ThemedText>
        <ThemedText style={styles.sub}>Последние завершённые тренировки.</ThemedText>

        {mockHistory.map((item) => (
          <Card key={item.id}>
            <View style={styles.row}>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <Chip label={item.focus.toUpperCase()} />
            </View>
            <ThemedText style={styles.date}>{new Date(item.date).toLocaleDateString('ru-RU')}</ThemedText>
            <View style={styles.metaRow}>
              <ThemedText style={styles.meta}>Тоннаж: {item.volume.toLocaleString('ru-RU')} кг</ThemedText>
              <ThemedText style={styles.meta}>Сеты: {item.sets}</ThemedText>
              <ThemedText style={styles.meta}>Время: {item.duration} мин</ThemedText>
            </View>
            <ThemedButton size="small" type="secondary" onPress={() => {}}>
              Детали / экспорт
            </ThemedButton>
          </Card>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  sub: { opacity: 0.8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '700' },
  date: { opacity: 0.8 },
  metaRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  meta: { opacity: 0.9, fontWeight: '600' },
});


