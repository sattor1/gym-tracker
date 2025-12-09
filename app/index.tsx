import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { ThemedButton } from '@/components/themed-button';
import { ThemedInput } from '@/components/themed-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!login || !password) {
      Alert.alert('Введите данные', 'Нужны логин и пароль');
      return;
    }
    setLoading(true);
    // Заглушка под реальный запрос авторизации
    setTimeout(() => {
      setLoading(false);
      router.replace('/day-select');
    }, 400);
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.form}
      >
        <View style={styles.header}>
          <ThemedText type="subtitle">Добро пожаловать</ThemedText>
          <ThemedText type="title">Gym Tracker</ThemedText>
        </View>

        <ThemedInput
          label="Логин"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="email или ник"
        />
        <ThemedInput
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="пароль"
        />

        <ThemedButton fullWidth loading={loading} onPress={onSubmit}>
          Войти
        </ThemedButton>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  form: { flex: 1, justifyContent: 'center', gap: 16 },
  header: { gap: 4, marginBottom: 8 },
});
