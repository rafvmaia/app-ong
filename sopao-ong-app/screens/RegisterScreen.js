import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Alert, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    birthdate: '',
    address: '',
    phone: '',
    active: true,
    bolsa_familia: false,
    attends_church: false,
    church_name: '',
  });
  const [menuVisible, setMenuVisible] = useState(false);

  const handleInputChange = (field, text) => {
    console.log(`Entrada bruta em ${field}: "${text}"`); // Log da entrada bruta

    let formattedText = text.replace(/[^0-9]/g, ''); // Remove tudo que não for número

    if (field === 'birthdate') {
      // Limita o comprimento máximo a 8 dígitos (DDMMYYYY)
      if (formattedText.length > 8) {
        formattedText = formattedText.slice(0, 8);
      }

      // Formata a data somente quando atingir 8 dígitos
      if (formattedText.length === 8) {
        const day = formattedText.slice(0, 2);
        const month = formattedText.slice(2, 4);
        const year = formattedText.slice(4, 8);
        formattedText = `${day}/${month}/${year}`; // Formata para DD/MM/YYYY
        console.log(`Formatação final: Dia=${day}, Mês=${month}, Ano=${year}, Resultado="${formattedText}"`);
      }

      console.log(`Data formatada em ${field}: "${formattedText}"`); // Log da data formatada
      setForm((prev) => ({ ...prev, [field]: formattedText }));
    } else {
      setForm((prev) => ({ ...prev, [field]: text || '' }));
    }
  };

  const handleSubmit = async () => {
    console.log('Estado antes de enviar:', JSON.stringify(form, null, 2));

    if (!form.name.trim() || !form.birthdate.trim() || !form.address.trim() || !form.phone.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    let formattedBirthdate;
    try {
      // Garante que o birthdate esteja no formato DD/MM/YYYY antes de formatar
      const birthdatePattern = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!birthdatePattern.test(form.birthdate)) {
        throw new Error('Data deve estar no formato DD/MM/YYYY');
      }

      const [day, month, year] = form.birthdate.split('/');
      if (!day || !month || !year || year.length !== 4 || isNaN(new Date(`${year}-${month}-${day}`).getTime())) {
        throw new Error('Data inválida');
      }
      formattedBirthdate = `${year}-${month}-${day}`; // Converte para YYYY-MM-DD
    } catch (error) {
      Alert.alert('Erro', 'Use uma data válida no formato DD/MM/YYYY (ex.: 01/01/1990).');
      return;
    }

    const dataToSend = {
      ...form,
      birthdate: formattedBirthdate,
      name: form.name || 'Desconhecido', // Evitar null
    };

    // Enviar como form-urlencoded e codificar os dados
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(dataToSend)) {
      formData.append(key, typeof value === 'string' ? encodeURIComponent(value) : value);
    }
    console.log('Enviando (form-urlencoded):', formData.toString());

    try {
      const response = await axios.post('http://10.0.2.2:5000/api/users', formData, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        },
      });
      console.log('Resposta:', response.data);
      navigation.navigate('List', { refresh: true });
      Alert.alert('Sucesso', 'Cadastrado com sucesso!');
    } catch (err) {
      console.log('Erro:', err.response?.data || err.message);
      Alert.alert('Erro', err.response?.data?.error || err.message);
    }
  };

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back" size={30} color="#1E3A8A" />
          </TouchableOpacity>
          <Image source={require('../assets/ong-logo.png')} style={styles.logo} resizeMode="contain" />
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Ionicons name={menuVisible ? 'close' : 'menu'} size={30} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Register'); }}>
              <Text style={styles.menuText}>Cadastrar Usuários</Text>
            </TouchableOpacity>
           , <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('List'); }}>
              <Text style={styles.menuText}>Listar Usuários</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="José"
            value={form.name}
            onChangeText={(text) => handleInputChange('name', text)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
          />
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="DDMMYYYY"
            value={form.birthdate}
            onChangeText={(text) => handleInputChange('birthdate', text)}
            keyboardType="numeric"
            autoCorrect={false}
            maxLength={10} // Permite até 10 caracteres para DD/MM/YYYY após formatação
          />
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua Açúcar"
            value={form.address}
            onChangeText={(text) => handleInputChange('address', text)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
          />
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="123456789"
            value={form.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            keyboardType="phone-pad"
            autoCorrect={false}
          />
          <View style={styles.switch}>
            <Text style={styles.label}>Ativo?</Text>
            <Switch value={form.active} onValueChange={(value) => setForm((prev) => ({ ...prev, active: value }))} trackColor={{ false: '#d32f2f', true: '#166534' }} />
          </View>
          <View style={styles.switch}>
            <Text style={styles.label}>Bolsa Família?</Text>
            <Switch value={form.bolsa_familia} onValueChange={(value) => setForm((prev) => ({ ...prev, bolsa_familia: value }))} trackColor={{ false: '#d32f2f', true: '#166534' }} />
          </View>
          <View style={styles.switch}>
            <Text style={styles.label}>Frequenta Igreja?</Text>
            <Switch value={form.attends_church} onValueChange={(value) => setForm((prev) => ({ ...prev, attends_church: value }))} trackColor={{ false: '#d32f2f', true: '#166534' }} />
          </View>
          {form.attends_church && (
            <>
              <Text style={styles.label}>Nome da Igreja</Text>
              <TextInput
                style={styles.input}
                placeholder="Igreja Açores"
                value={form.church_name}
                onChangeText={(text) => handleInputChange('church_name', text)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
              />
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, backgroundColor: 'rgba(254, 241, 233, 1)' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20 },
  backButton: { padding: 10 },
  menuButton: { padding: 10 },
  logo: { width: 250, height: 150 },
  menu: { backgroundColor: '#0099DD', position: 'absolute', top: 100, right: 20, width: 200, borderRadius: 10, padding: 10, zIndex: 1, elevation: 10 },
  menuItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.2)' },
  menuText: { color: 'white', fontSize: 16 },
  formContainer: { flex: 1, paddingHorizontal: 30, paddingBottom: 20 },
  label: { fontSize: 16, color: '#1E3A8A', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#1E3A8A', borderRadius: 10, marginBottom: 10, padding: 10, backgroundColor: 'white' },
  switch: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  button: { backgroundColor: '#166534', padding: 15, borderRadius: 25, marginVertical: 10, width: '80%', alignSelf: 'center', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18 },
});