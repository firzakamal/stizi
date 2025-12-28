import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const MapScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header matching Figma Branding */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Stizi Treasure Hunt</Text>
        </View>

        {/* Map Placeholder Content */}
        <View style={styles.mapContainer}>
          <View style={styles.mapVisual}>
            <View style={styles.pulseContainer}>
              <View style={styles.pulseCircle} />
              <Text style={styles.markerEmoji}>📍</Text>
            </View>
            
            <View style={styles.locationCard}>
              <Text style={styles.targetLabel}>TARGET LOCATION</Text>
              <Text style={styles.addressText}>3 Birrel Avenue</Text>
              <Text style={styles.distanceText}>You are 500m away</Text>
            </View>
          </View>
          
          <Text style={styles.instruction}>
            Follow the marker on your map to reach the treasure zone.
          </Text>
        </View>

        {/* Action Button - Green Theme */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('AR')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Open AR & Collect Stamp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#2D005D' },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingVertical: 20,
    backgroundColor: '#2D005D',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  mapContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  mapVisual: {
    width: width * 0.85,
    height: width * 0.9,
    backgroundColor: '#F0F0F5',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pulseContainer: { justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  pulseCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(45, 0, 93, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(45, 0, 93, 0.3)',
  },
  markerEmoji: { fontSize: 50 },
  locationCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  targetLabel: { fontSize: 10, color: '#888', fontWeight: 'bold', marginBottom: 5 },
  addressText: { fontSize: 18, fontWeight: 'bold', color: '#2D005D' },
  distanceText: { fontSize: 14, color: '#00D094', marginTop: 5, fontWeight: '600' },
  instruction: { marginTop: 30, color: '#A0A0A0', textAlign: 'center', fontSize: 14, paddingHorizontal: 40 },
  footer: { padding: 25 },
  button: {
    backgroundColor: '#00D094',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#00D094',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
});

export default MapScreen;