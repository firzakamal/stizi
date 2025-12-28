import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // .replace is used to prevent the user from looping back to Splash
      navigation.replace('SignUp'); 
    }, 3000);
    return () => clearTimeout(timer);
  }, []); // Empty array ensures this only runs once

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Stizi</Text>
      <Text style={styles.tagline}>A Marsh Tech Product</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D005D', justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF' },
  tagline: { position: 'absolute', bottom: 50, color: '#A0A0A0', fontSize: 14 },
});

export default SplashScreen;