import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const BASE_URL = 'https://app-ong.onrender.com'; // Novo URL do Render

export default function UserListScreen({ navigation, route }) {
  const [users, setUsers] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [navigation, route.params?.refresh]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    console.log('Tentando listar usuários...');
    try {
      const response = await axios.get(`${BASE_URL}/api/users`, {
        timeout: 90000, // Aumentado para 90 segundos para lidar com possíveis atrasos no Render
      });
      console.log('Resposta da API:', JSON.stringify(response.data, null, 2));
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.log('Dados não são um array:', response.data);
        setUsers([]);
        setError('Os dados recebidos não estão no formato esperado (array).');
      }
    } catch (err) {
      console.log('Erro ao listar:', err.response ? err.response.data : err.message);
      const errorMessage = err.response?.data?.error || err.message || 'Erro de conexão com o servidor';
      setError(errorMessage);
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (userId) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/users/${userId}/toggle-active`, {
        timeout: 90000, // Aumentado para 90 segundos
      });
      setUsers(users.map(user => user.id === userId ? response.data : user));
      Alert.alert('Sucesso', `Usuário ${response.data.active ? 'reativado' : 'desativado'} com sucesso!`);
    } catch (err) {
      console.log('Erro ao desativar/reativar:', err.response ? err.response.data : err.message);
      Alert.alert('Erro', err.response?.data?.error || 'Falha ao desativar/reativar o usuário.');
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Ionicons name="arrow-back" size={30} color="#1E3A8A" />
          </TouchableOpacity>
          <Image
            source={require('../assets/ong-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Ionicons name={menuVisible ? 'close' : 'menu'} size={30} color="#1E3A8A" />
          </TouchableOpacity>
        </View>

        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                navigation.navigate('Register');
              }}
            >
              <Text style={styles.menuText}>Cadastrar Usuários</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                toggleMenu();
                navigation.navigate('List');
              }}
            >
              <Text style={styles.menuText}>Listar Usuários</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.listContainer}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando todos os usuários cadastrados...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : users.length === 0 ? (
            <Text style={styles.noDataText}>Nenhum usuário cadastrado.</Text>
          ) : (
            <FlatList
              data={users}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>
                    {item.name || 'Nome não disponível'} - {item.active ? 'Ativo' : 'Desativado'}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation.navigate('EditUser', { user: item })}
                    >
                      <Ionicons name="create" size={20} color="white" />
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.toggleButton}
                      onPress={() => handleToggleActive(item.id)}
                    >
                      <Ionicons name={item.active ? "eye-off" : "eye"} size={20} color="white" />
                      <Text style={styles.buttonText}>{item.active ? 'Desativar' : 'Reativar'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.noDataText}>Nenhum usuário cadastrado.</Text>}
            />
          )}
        </View>
      </View>
    </ImageBackground>
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
    backgroundColor: 'rgba(254, 241, 233, 1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  menuButton: {
    padding: 10,
  },
  logo: {
    width: 250,
    height: 150,
  },
  menu: {
    backgroundColor: '#0099DD',
    position: 'absolute',
    top: 180,
    right: 20,
    width: 200,
    borderRadius: 10,
    padding: 10,
    zIndex: 10,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E3A8A',
  },
  itemText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#1E3A8A',
    flex: 1,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#0099DD',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#BB33AA',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
  loadingText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#1E3A8A',
    textAlign: 'center',
    padding: 10,
  },
  errorText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    padding: 10,
  },
  noDataText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#1E3A8A',
    textAlign: 'center',
    padding: 10,
  },
});