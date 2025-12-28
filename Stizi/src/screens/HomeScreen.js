import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [stamps, setStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStamp, setSelectedStamp] = useState(null);

  // Point A: User ki default location (Origin)
  const [userLocation] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
  });

  useEffect(() => {
    const fetchStamps = async () => {
      try {
        const response = await fetch('http://192.168.100.134:5000/api/stamps');
        const data = await response.json();
        setStamps(data);
        if (data.length > 0) setSelectedStamp(data[0]);
      } catch (error) {
        console.error("Map Data Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStamps();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Treasures</Text>
      </View>

      <View style={styles.mapWrapper}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2D005D" />
            <Text>Loading Treasures...</Text>
          </View>
        ) : (
          <MapView 
            style={styles.map} 
            initialRegion={{
              ...userLocation,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {/* Point A: User Marker */}
            <Marker 
              coordinate={userLocation} 
              title="Your Location" 
              pinColor="blue" 
            />

            {/* Point B: Database Markers */}
            {stamps.map((stamp) => (
              <Marker 
                key={stamp.id}
                coordinate={{ latitude: stamp.latitude, longitude: stamp.longitude }}
                title={stamp.name}
                pinColor={stamp.isCollected ? "green" : "red"}
                onPress={() => setSelectedStamp(stamp)}
              />
            ))}

            {/* Drawing Path from A to B */}
            {selectedStamp && (
              <Polyline
                coordinates={[
                  userLocation,
                  { latitude: selectedStamp.latitude, longitude: selectedStamp.longitude }
                ]}
                strokeColor="#00D094" // Stizi Theme Green
                strokeWidth={4}
                lineDashPattern={[5, 5]} // Dotted line for treasure hunt feel
              />
            )}
          </MapView>
        )}
        
        {selectedStamp && (
          <View style={styles.targetCard}>
            <View style={styles.cardContent}>
              <Text style={styles.targetTitle}>{selectedStamp.name}</Text>
              <Text style={styles.targetSub}>
                {selectedStamp.isCollected ? "Found!" : "Distance: ~500m"}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.goBtn, selectedStamp.isCollected && {backgroundColor: '#ccc'}]} 
              onPress={() => !selectedStamp.isCollected && navigation.navigate('AR', { stampId: selectedStamp.id })}
              disabled={selectedStamp.isCollected}
            >
              <Text style={styles.goText}>{selectedStamp.isCollected ? "DONE" : "GO"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}><Text style={styles.navIcon}>🗺️</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Success')}><Text style={styles.navIcon}>🏆</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Login')}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { backgroundColor: '#2D005D', paddingTop: 50, paddingBottom: 20, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  mapWrapper: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { ...StyleSheet.absoluteFillObject },
  targetCard: { position: 'absolute', bottom: 20, alignSelf: 'center', width: width * 0.9, backgroundColor: '#FFF', padding: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center', elevation: 10 },
  cardContent: { flex: 1 },
  targetTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D005D' },
  targetSub: { color: '#888' },
  goBtn: { backgroundColor: '#00D094', width: 60, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  goText: { fontWeight: 'bold' },
  navBar: { flexDirection: 'row', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF', justifyContent: 'space-around' },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 24 }
});

export default HomeScreen;