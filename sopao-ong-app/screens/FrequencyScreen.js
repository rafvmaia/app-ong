import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FrequencyScreen() {
  return (
    <View style={styles.container}>
      <Text>Calendário de Frequência (a ser implementado com react-native-calendars)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});