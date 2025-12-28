import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // Naya camera component

const ARScreen = ({ route, navigation }) => {
  const { stampId } = route.params || { stampId: null };
  const [loading, setLoading] = useState(false);
  
  // Camera Permission Hook
  const [permission, requestPermission] = useCameraPermissions();

  const handleCollect = async () => {
    if (!stampId) {
      Alert.alert("Error", "Stamp ID not found!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://192.168.100.134:5000/api/stamps/collect/${stampId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("🎉 Treasure Collected!", "MySQL database has been updated.");
        navigation.navigate('Success');
      } else {
        Alert.alert("Failed", "Could not update database.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Connection Error", "Check if backend server is running!");
    } finally {
      setLoading(false);
    }
  };

  // Permission Check Logic
  if (!permission) return <View style={styles.container} />; // Loading state
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#FFF', textAlign: 'center', marginBottom: 20 }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity style={styles.collectBtn} onPress={requestPermission}>
          <Text style={styles.collectBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Live Camera Feed */}
      <CameraView style={styles.camera} facing="back">
        
        {/* AR Overlay (Figma Purple Cylinder) */}
        <View style={styles.cylinderContainer}>
          <View style={styles.cylinder} />
          <Text style={styles.arText}>Object Detected</Text>
        </View>

        {/* Bottom UI Sheet */}
        <View style={styles.sheet}>
          <Text style={styles.sheetText}>Treasure Found!</Text>
          <Text style={styles.subText}>Walk into the stamp to collect it (ID: {stampId})</Text>
          
          <TouchableOpacity 
            style={styles.collectBtn} 
            onPress={handleCollect}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.collectBtnText}>Collect</Text>
            )}
          </TouchableOpacity>
        </View>

      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  camera: { flex: 1 },
  cylinderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cylinder: { 
    width: 110, 
    height: 280, 
    backgroundColor: 'rgba(155, 38, 182, 0.7)', // Figma Purple with transparency
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: "#9B26B6",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  arText: {
    color: '#FFF',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    marginTop: 10,
    borderRadius: 5
  },
  sheet: { 
    backgroundColor: '#FFF', 
    padding: 25, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  sheetText: { fontSize: 22, fontWeight: 'bold', color: '#2D005D', textAlign: 'center' },
  subText: { textAlign: 'center', color: '#666', marginBottom: 20, marginTop: 5 },
  collectBtn: { backgroundColor: '#9B26B6', padding: 18, borderRadius: 15, alignItems: 'center' },
  collectBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default ARScreen;