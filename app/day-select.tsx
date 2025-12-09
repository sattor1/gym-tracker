import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

const weekDays = [
  { id: 'mon', label: 'Понедельник' },
  { id: 'tue', label: 'Вторник' },
  { id: 'wed', label: 'Среда' },
  { id: 'thu', label: 'Четверг' },
  { id: 'fri', label: 'Пятница' },
  { id: 'sat', label: 'Суббота' },
  { id: 'sun', label: 'Воскресенье' },
];

export default function DaySelectScreen() {
  const router = useRouter();

  const onSelect = (day: string) => {
    router.push(`/day/${day}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="title">Выбери день</ThemedText>
        <ThemedText style={styles.sub}>Фиксируем упражнения в выбранный день</ThemedText>

        <Card>
          <ThemedText type="subtitle">Неделя</ThemedText>
          <View style={styles.list}>
            {weekDays.map((day) => (
              <TouchableOpacity key={day.id} style={styles.item} onPress={() => onSelect(day.id)}>
                <ThemedText style={styles.itemText}>{day.label}</ThemedText>
                <Chip label="Перейти" />
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  sub: { opacity: 0.8 },
  list: { gap: 10, marginTop: 8 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: { fontSize: 16, fontWeight: '600' },
});

