import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { presetTemplates } from '@/app/data/templates';

export default function TemplatesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText type="title">Шаблоны тренировок</ThemedText>
        <ThemedText style={styles.sub}>Выбирай готовый сет или создай свой.</ThemedText>

        {presetTemplates.map((tpl) => (
          <Card key={tpl.id}>
            <View style={styles.row}>
              <ThemedText style={styles.name}>{tpl.name}</ThemedText>
              <Chip label={tpl.focus.toUpperCase()} />
            </View>
            <ThemedText style={styles.desc}>{tpl.description}</ThemedText>
            <View style={styles.tags}>
              {tpl.tags?.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </View>
            <ThemedText style={styles.meta}>
              {tpl.exercises.length} упражнений • основные: {tpl.exercises.slice(0, 3).map((e) => e.name).join(', ')}
              {tpl.exercises.length > 3 ? '…' : ''}
            </ThemedText>
            <View style={styles.actions}>
              <ThemedButton size="small" type="secondary" onPress={() => {}}>
                Детали
              </ThemedButton>
              <ThemedButton size="small" onPress={() => {}}>
                Начать
              </ThemedButton>
            </View>
          </Card>
        ))}

        <Card>
          <ThemedText type="subtitle">Своя программа</ThemedText>
          <ThemedText style={styles.desc}>Создай кастомный сплит, добавь упражнения и сохрани.</ThemedText>
          <ThemedButton fullWidth type="outline" onPress={() => {}}>
            Создать шаблон
          </ThemedButton>
        </Card>
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
  desc: { opacity: 0.85 },
  meta: { opacity: 0.65, fontSize: 13 },
  tags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  actions: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
});
