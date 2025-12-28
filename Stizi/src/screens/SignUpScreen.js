import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcome}>Create Account</Text>
        <Text style={styles.brand}>Stizi</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="+92 Phone number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          value={phone}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('OTP', { code: '123456' })}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>Login</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D005D' },
  content: { flex: 1, padding: 25, justifyContent: 'center' },
  welcome: { color: '#FFF', fontSize: 18 },
  brand: { color: '#FFF', fontSize: 42, fontWeight: 'bold', marginBottom: 40 },
  input: { backgroundColor: '#1A0035', color: '#FFF', padding: 18, borderRadius: 12, marginBottom: 20 },
  button: { backgroundColor: '#00D094', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  footerText: { color: '#A0A0A0', textAlign: 'center', marginTop: 20 },
  link: { color: '#00D094', fontWeight: 'bold' }
});

export default SignUpScreen;