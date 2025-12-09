import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { StatRow } from '@/components/StatRow';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { presetTemplates } from '@/app/data/templates';
import { WorkoutExerciseEntry, WorkoutSet } from '@/app/storage/types';

const pickTemplate = presetTemplates[0];

export default function SessionScreen() {
  const [note, setNote] = useState('');
  const [exercises, setExercises] = useState<WorkoutExerciseEntry[]>(
    pickTemplate.exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      muscleGroup: ex.muscleGroup,
      sets: Array.from({ length: ex.defaultSets }).map((_, idx) => ({
        id: `${ex.id}-set-${idx + 1}`,
        reps: ex.defaultReps,
        weight: ex.defaultWeight ?? 0,
        restSec: ex.defaultRestSec,
        completed: false,
      })),
    })),
  );

  const totals = useMemo(() => {
    let volume = 0;
    let done = 0;
    exercises.forEach((ex) =>
      ex.sets.forEach((s) => {
        volume += (s.weight || 0) * (s.reps || 0);
        if (s.completed) done += 1;
      }),
    );
    return { volume, done, total: exercises.reduce((acc, ex) => acc + ex.sets.length, 0) };
  }, [exercises]);

  const toggleSet = (exId: string, setId: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exId
          ? {
              ...ex,
              sets: ex.sets.map((s) => (s.id === setId ? { ...s, completed: !s.completed } : s)),
            }
          : ex,
      ),
    );
  };

  const updateSet = (exId: string, setId: string, next: Partial<WorkoutSet>) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === exId
          ? {
              ...ex,
              sets: ex.sets.map((s) => (s.id === setId ? { ...s, ...next } : s)),
            }
          : ex,
      ),
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <ThemedText type="subtitle">Сессия</ThemedText>
            <ThemedText type="title">{pickTemplate.name}</ThemedText>
            <ThemedText style={styles.desc}>{pickTemplate.description}</ThemedText>
          </View>
          <Chip label={pickTemplate.focus.toUpperCase()} />
        </View>

        <Card>
          <StatRow label="Подходов" value={`${totals.done}/${totals.total}`} />
          <StatRow label="Тоннаж" value={`${totals.volume.toLocaleString('ru-RU')} кг`} />
        </Card>

        {exercises.map((ex) => (
          <Card key={ex.id}>
            <View style={styles.row}>
              <ThemedText style={styles.exercise}>{ex.name}</ThemedText>
              <Chip label={ex.muscleGroup} />
            </View>
            {ex.sets.map((set) => (
              <View key={set.id} style={styles.setRow}>
                <View style={styles.setLeft}>
                  <ThemedText style={styles.setLabel}>Подход {set.id.split('-').pop()}</ThemedText>
                  <View style={styles.inputs}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={String(set.weight ?? 0)}
                      onChangeText={(text) => updateSet(ex.id, set.id, { weight: Number(text) || 0 })}
                      placeholder="Вес"
                    />
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={String(set.reps ?? 0)}
                      onChangeText={(text) => updateSet(ex.id, set.id, { reps: Number(text) || 0 })}
                      placeholder="Повторы"
                    />
                  </View>
                </View>
                <ThemedButton
                  size="small"
                  type={set.completed ? 'success' : 'secondary'}
                  onPress={() => toggleSet(ex.id, set.id)}
                >
                  {set.completed ? 'Готово' : 'Выполнить'}
                </ThemedButton>
              </View>
            ))}
          </Card>
        ))}

        <Card>
          <ThemedText type="subtitle">Заметка</ThemedText>
          <TextInput
            style={styles.note}
            placeholder="Самочувствие, техника, интенсификаторы..."
            value={note}
            onChangeText={setNote}
            multiline
          />
        </Card>

        <View style={styles.actions}>
          <ThemedButton type="outline" fullWidth onPress={() => {}}>
            Сохранить черновик
          </ThemedButton>
          <ThemedButton fullWidth onPress={() => {}}>
            Завершить и отправить
          </ThemedButton>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  desc: { opacity: 0.8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  exercise: { fontSize: 16, fontWeight: '700' },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 8,
  },
  setLeft: { flex: 1, gap: 6 },
  setLabel: { fontWeight: '600' },
  inputs: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: '#d1d5db',
  },
  note: {
    minHeight: 80,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    borderColor: '#d1d5db',
  },
  actions: { gap: 8 },
});


