import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetCode = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    setLoading(true);
    try {
      // Aapka Computer ka IP Address aur Backend Port
      const response = await fetch('http://192.168.100.134:5000/api/auth/get-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      const data = await response.json();

      if (data.success) {
        // Backend se code milne ke baad navigation
        Alert.alert("Success", `Your OTP is: ${data.code}`);
        navigation.navigate('OTP', { phoneNumber: phone, serverCode: data.code });
      } else {
        Alert.alert("Failed", "Could not get code from server");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Connection Error", "Check if your backend server is running and phone is on same Wi-Fi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back to</Text>
      <Text style={styles.brand}>Stizi</Text>
      
      <TextInput
        style={styles.input}
        placeholder="+92 Phone number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleGetCode}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Get code</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.footerText}>New here? <Text style={styles.link}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D005D', padding: 25, justifyContent: 'center' },
  welcome: { color: '#FFF', fontSize: 18 },
  brand: { color: '#FFF', fontSize: 42, fontWeight: 'bold', marginBottom: 40 },
  input: { backgroundColor: '#1A0035', color: '#FFF', padding: 18, borderRadius: 12, marginBottom: 20 },
  button: { backgroundColor: '#00D094', padding: 18, borderRadius: 12, alignItems: 'center', height: 60, justifyContent: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  footerText: { color: '#A0A0A0', textAlign: 'center', marginTop: 20 },
  link: { color: '#00D094', fontWeight: 'bold' }
});

export default LoginScreen;