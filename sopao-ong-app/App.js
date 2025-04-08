import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import RegisterScreen from './screens/RegisterScreen';
import UserListScreen from './screens/UserListScreen';
import EditUserScreen from './screens/EditUserScreen';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('./assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/ong-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Ionicons name="person-add" size={40} color="white" />
            <Text style={styles.buttonText}>Cadastro de Usuários</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('List')}
          >
            <Ionicons name="list" size={40} color="white" />
            <Text style={styles.buttonText}>Lista de Usuários</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footer}>Desenvolvido por Rafael</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'PoppinsRegular': require('./assets/fonts/Poppins-Regular.ttf'),
        'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
        'PoppinsBlack': require('./assets/fonts/Poppins-Black.ttf'),
      });
      console.log('Fontes Poppins carregadas com sucesso!');
    } catch (error) {
      console.log('Erro ao carregar fontes:', error);
    }
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => {
          console.log('AppLoading: Fontes finalizadas!');
          setFontLoaded(true);
        }}
        onError={(error) => console.log('AppLoading: Erro ao carregar fontes:', error)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="List" component={UserListScreen} />
        <Stack.Screen name="EditUser" component={EditUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(254, 241, 233, 1)',
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 50,
  },
  title: {
    fontSize: 36,
    fontFamily: 'PoppinsBold',
    color: '#0099DD',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0099DD',
    width: 180,
    height: 100,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footer: {
    fontFamily: 'PoppinsRegular',
    fontSize: 14,
    color: '#166534',
    letterSpacing: 1.3,
  },
});