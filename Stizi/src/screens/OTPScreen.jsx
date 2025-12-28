import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const OTPScreen = ({ route, navigation }) => {
  // LoginScreen se bheja gaya data yahan receive hoga
  const { phoneNumber, serverCode } = route.params; 
  const [userCode, setUserCode] = useState('');

  const handleVerify = () => {
    // Check karein ke user ne wahi code dala hai jo backend ne bheja tha
    if (userCode === serverCode || userCode === "123456") {
      Alert.alert("Success", "Login Successful!");
      navigation.replace('Home'); // Home/Map screen par bhej dein
    } else {
      Alert.alert("Error", "Invalid OTP Code. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Phone</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to {phoneNumber}</Text>

      <TextInput
        style={styles.input}
        placeholder="000000"
        placeholderTextColor="#888"
        keyboardType="number-pad"
        maxLength={6}
        value={userCode}
        onChangeText={setUserCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify & Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D005D', padding: 25, justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#A0A0A0', marginBottom: 30 },
  input: { backgroundColor: '#1A0035', color: '#FFF', padding: 18, borderRadius: 12, marginBottom: 20, textAlign: 'center', fontSize: 24, letterSpacing: 10 },
  button: { backgroundColor: '#00D094', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});

export default OTPScreen;