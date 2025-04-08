import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  Image, // Adicionado para usar a logo
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function EditUserScreen({ navigation, route }) {
  const { user } = route.params;
  const [name, setName] = useState(user.name || '');
  const [birthdate, setBirthdate] = useState(''); // Para exibição (DD/MM/YYYY)
  const [originalBirthdate, setOriginalBirthdate] = useState(user.birthdate ? user.birthdate.split('T')[0] : ''); // Para envio (YYYY-MM-DD)
  const [address, setAddress] = useState(user.address || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [bolsaFamilia, setBolsaFamilia] = useState(user.bolsa_familia || false);
  const [attendsChurch, setAttendsChurch] = useState(user.attends_church || false);
  const [churchName, setChurchName] = useState(user.church_name || '');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setName(user.name || '');
    if (user.birthdate) {
      const [year, month, day] = user.birthdate.split('T')[0].split('-');
      setBirthdate(`${day}/${month}/${year}`); // Formato DD/MM/YYYY para exibição
      setOriginalBirthdate(user.birthdate.split('T')[0]); // Formato YYYY-MM-DD para envio
    } else {
      setBirthdate('');
      setOriginalBirthdate('');
    }
    setAddress(user.address || '');
    setPhone(user.phone || '');
    setBolsaFamilia(user.bolsa_familia || false);
    setAttendsChurch(user.attends_church || false);
    setChurchName(user.church_name || '');
  }, [user]);

  const handleUpdate = async () => {
    console.log('Estado antes de enviar:', { name, birthdate, address, phone, bolsaFamilia, attendsChurch, churchName });

    const updatedUserData = {
      name: name || '', // Enviar vazio se não preenchido
      birthdate: originalBirthdate, // Manter o valor original
      address: address || '',
      phone: phone || '',
      bolsa_familia: bolsaFamilia,
      attends_church: attendsChurch,
      church_name: churchName || '',
    };

    console.log('Dados a serem enviados:', updatedUserData);
    try {
      const response = await axios.put(`http://10.0.2.2:5000/api/users/${user.id}`, updatedUserData, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        },
      });
      console.log('Resposta da API:', response.data);
      navigation.navigate('List', { refresh: true });
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
    } catch (err) {
      console.log('Erro ao atualizar:', err.response ? err.response.data : err.message);
      Alert.alert('Erro', 'Falha ao atualizar o usuário.');
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
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={30} color="#1E3A8A" />
          </TouchableOpacity>
          <Image
            source={require('../assets/ong-logo.png')} // Adicionando a logo
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

        <View style={styles.formContainer}>
          <Text style={styles.title}>Editar Usuário</Text>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite o nome"
          />

          <Text style={styles.label}>Data de Nascimento:</Text>
          <Text style={styles.inputDisabled}>{birthdate}</Text>

          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Digite o endereço"
          />

          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Digite o telefone"
            keyboardType="phone-pad"
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Bolsa Família?</Text>
            <Switch
              value={bolsaFamilia}
              onValueChange={setBolsaFamilia}
              trackColor={{ false: '#d32f2f', true: '#166534' }}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Frequenta Igreja?</Text>
            <Switch
              value={attendsChurch}
              onValueChange={setAttendsChurch}
              trackColor={{ false: '#d32f2f', true: '#166534' }}
            />
          </View>

          {attendsChurch && (
            <>
              <Text style={styles.label}>Nome da Igreja:</Text>
              <TextInput
                style={styles.input}
                value={churchName}
                onChangeText={setChurchName}
                placeholder="Digite o nome da igreja"
              />
            </>
          )}

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Atualizar</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(254, 241, 233, 1)', // Mantendo o fundo com opacidade
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Espaça os elementos igualmente
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
    width: 250, // Mesmas dimensões usadas em UserListScreen
    height: 150,
  },
  title: {
    fontFamily: 'PoppinsBold',
    fontSize: 24,
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 20, // Ajustado para o título dentro do formContainer
  },
  menu: {
    backgroundColor: '#0099DD',
    position: 'absolute',
    top: 180, // Ajustado para ficar abaixo do cabeçalho com a logo
    right: 20,
    width: 200,
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color: '#1E3A8A',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#1E3A8A',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'PoppinsRegular',
  },
  inputDisabled: {
    height: 40,
    borderColor: '#1E3A8A',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'PoppinsRegular',
    backgroundColor: '#E5E7EB',
    color: '#6B7280',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: '#0099DD',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontFamily: 'PoppinsBold',
    fontSize: 16,
  },
});