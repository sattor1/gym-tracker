import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { StatRow } from '@/components/StatRow';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { presetTemplates } from '@/app/data/templates';

export default function HomeScreen() {
  const router = useRouter();
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <ThemedText type="subtitle">Сегодня</ThemedText>
            <ThemedText type="title">{today}</ThemedText>
          </View>
          <Chip label="Быстрый старт" />
        </View>

        <Card>
          <ThemedText type="subtitle">Быстрые действия</ThemedText>
          <View style={styles.actions}>
            <ThemedButton size="small" onPress={() => router.push('/session')}>
              Начать пустую
            </ThemedButton>
            <ThemedButton size="small" type="secondary" onPress={() => router.push('/session')}>
              Из шаблона
            </ThemedButton>
            <ThemedButton size="small" type="outline" onPress={() => router.push('/history')}>
              История
            </ThemedButton>
          </View>
        </Card>

        <Card>
          <ThemedText type="subtitle">Рекомендованные шаблоны</ThemedText>
          <View style={styles.list}>
            {presetTemplates.slice(0, 3).map((tpl) => (
              <View key={tpl.id} style={styles.template}>
                <View style={styles.templateHeader}>
                  <ThemedText style={styles.templateTitle}>{tpl.name}</ThemedText>
                  <Chip label={tpl.focus.toUpperCase()} />
                </View>
                <ThemedText style={styles.templateDesc}>{tpl.description}</ThemedText>
                <View style={styles.tags}>
                  {tpl.tags?.map((tag) => (
                    <Chip key={tag} label={tag} />
                  ))}
                </View>
                <View style={styles.actions}>
                  <ThemedButton size="small" type="secondary" onPress={() => {}}>
                    Просмотр
                  </ThemedButton>
                  <ThemedButton size="small" onPress={() => {}}>
                    Начать
                  </ThemedButton>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <Card>
          <ThemedText type="subtitle">Статистика за неделю</ThemedText>
          <StatRow label="Сессий" value="3" hint="2 силовые, 1 HIIT" />
          <StatRow label="Тоннаж" value="21 450 кг" hint="прошлая неделя: 19 300 кг" />
          <StatRow label="Лучший лифт" value="Жим лёжа 100 кг x 5" />
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  list: {
    gap: 12,
  },
  template: {
    gap: 8,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  templateDesc: {
    opacity: 0.8,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
});
