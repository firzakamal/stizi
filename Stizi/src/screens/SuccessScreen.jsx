import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';

const SuccessScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      // Backend Reset API call
      const response = await fetch('http://192.168.100.134:5000/api/stamps/reset', {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success) {
        Alert.alert("🔄 Reset Complete", "All treasures are now back in place!");
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert("Error", "Is Backend Server Running at 192.168.100.134?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>
        
        <Text style={styles.congratsText}>Congratulations!</Text>
        <Text style={styles.subText}>
          Treasure collected and saved to database.
        </Text>

        {/* PRIMARY BUTTON */}
        <TouchableOpacity 
          style={styles.homeBtn} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeBtnText}>Back to Map</Text>
        </TouchableOpacity>

        {/* RESET BUTTON - Ise check karein niche */}
        <TouchableOpacity 
          style={styles.resetBtn} 
          onPress={handleReset}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#00D094" />
          ) : (
            <Text style={styles.resetBtnText}>DEBUG: Reset All Stamps (Set to 0)</Text>
          )}
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D005D', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#1A0035', borderRadius: 25, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: '#3D007A' },
  iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#00D094', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  checkIcon: { fontSize: 35, color: '#000' },
  congratsText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subText: { color: '#A0A0A0', textAlign: 'center', fontSize: 16, marginBottom: 30 },
  homeBtn: { backgroundColor: '#00D094', width: '100%', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  homeBtnText: { color: '#000', fontWeight: 'bold' },
  resetBtn: { marginTop: 10, padding: 10, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#00D094', borderRadius: 12 },
  resetBtnText: { color: '#00D094', fontWeight: 'bold', fontSize: 12 }
});

export default SuccessScreen;