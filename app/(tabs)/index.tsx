import RNDateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return ( 
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Gym tracker!</ThemedText> 
      <RNDateTimePicker value={new Date()} mode="date" locale="ru-RU" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: '100%'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
