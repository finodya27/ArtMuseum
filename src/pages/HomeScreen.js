import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFeaturedArtworks, getDepartments, getArtworks } from '../services/artworkService';
import ArtworkCard from '../components/card';
import styles from '../styles/HomeScreenStyles';

const formatText = (text) => text.replace(/\s+/g, ' ').trim();

const SectionHeader = ({ title, onViewAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {onViewAll && (
      <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>Lihat Semua</Text>
      </TouchableOpacity>
    )}
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [artworksRes, departmentsRes] = await Promise.all([
        getFeaturedArtworks(10),
        getDepartments()
      ]);

      setFeaturedArtworks(artworksRes.data);
      setDepartments(departmentsRes.data.slice(0, 4));

      const { data } = await getArtworks(1, 20);
      const uniqueArtists = data
        .map(item => ({
          name: formatText(item.artist_display || 'Seniman Tidak Dikenal'),
          artwork: item
        }))
        .filter((artist, index, self) => 
          index === self.findIndex(a => a.name === artist.name)
        )
        .slice(0, 4);

      setArtists(uniqueArtists);
    } catch (error) {
      console.error('Error mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchInitialData();
    setRefreshing(false);
  };

  const renderFeaturedArtwork = ({ item }) => (
    <View style={styles.horizontalArtworkCard}>
      <ArtworkCard artwork={item} />
    </View>
  );

  const renderDepartmentItem = ({ item }) => (
    <View style={styles.listCard}>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  );

  const renderArtistItem = ({ item }) => (
    <View style={styles.listCard}>
      <Text style={styles.itemTitle}>{item.name}</Text>
    </View>
  );

  const navigateToGallery = () => {
    navigation.navigate('Departemen');
  };

  const navigateToArtists = () => {
    navigation.navigate('Seniman');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pameran Saat Ini</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={featuredArtworks}
              renderItem={renderFeaturedArtwork}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          <View style={styles.section}>
            <SectionHeader 
              title="Departemen" 
              onViewAll={navigateToGallery}
            />
            {departments.map(item => (
              <View key={item.id}>
                {renderDepartmentItem({ item })}
              </View>
            ))}
          </View>

          <View style={[styles.section, styles.lastSection]}>
            <SectionHeader 
              title="Seniman Unggulan" 
              onViewAll={navigateToArtists}
            />
            {artists.map(item => (
              <View key={item.name}>
                {renderArtistItem({ item })}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
