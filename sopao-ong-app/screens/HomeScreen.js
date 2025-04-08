import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sopão ONG</Text>
      <Button title="Cadastrar Usuário" onPress={() => navigation.navigate('Register')} />
      <Button title="Listar Usuários" onPress={() => navigation.navigate('UserList')} />
      <Button title="Frequência" onPress={() => navigation.navigate('Frequency')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 241, 233, 1)', // Verde escuro (mesma cor usada no menu de UserListScreen)
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#FFFFFF', // Texto branco para contrastar com o fundo verde
    fontFamily: 'PoppinsBold', // Usando a fonte PoppinsBold, se disponível
  },
});