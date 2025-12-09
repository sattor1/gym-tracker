import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { presetTemplates } from '@/app/data/templates';

export default function DayExercisesScreen() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const router = useRouter();
  const dayLabel = dayLabels[day as keyof typeof dayLabels] ?? 'День';

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="title">{dayLabel}</ThemedText>
        <ThemedText style={styles.sub}>Выбери упражнения/шаблон на этот день</ThemedText>

        {presetTemplates.map((tpl) => (
          <Card key={tpl.id}>
            <View style={styles.row}>
              <ThemedText style={styles.name}>{tpl.name}</ThemedText>
              <Chip label={tpl.focus.toUpperCase()} />
            </View>
            <ThemedText style={styles.desc}>{tpl.description}</ThemedText>
            <ThemedText style={styles.meta}>
              {tpl.exercises.length} упражнений • {tpl.exercises.slice(0, 3).map((e) => e.name).join(', ')}
              {tpl.exercises.length > 3 ? '…' : ''}
            </ThemedText>
            <ThemedButton size="small" onPress={() => router.push('/session')}>
              Открыть сессию
            </ThemedButton>
          </Card>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const dayLabels = {
  mon: 'Понедельник',
  tue: 'Вторник',
  wed: 'Среда',
  thu: 'Четверг',
  fri: 'Пятница',
  sat: 'Суббота',
  sun: 'Воскресенье',
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  sub: { opacity: 0.8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '700' },
  desc: { opacity: 0.85 },
  meta: { opacity: 0.65, fontSize: 13 },
});

