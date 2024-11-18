import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { getArtworks } from '../services/artworkService';
import styles from '../styles/ArtistScreenStyles';

const formatText = (text) => {
  return text.replace(/\s+/g, ' ').trim();
};

const generateArtistDescription = (artistName) => {
  const formattedName = formatText(artistName);
  const parenthesesMatch = formattedName.match(/\((.*?)\)/);
  const era = parenthesesMatch ? parenthesesMatch[1] : 'berbagai periode';
  const nameWithoutParentheses = formattedName.replace(/\s*\(.*?\)\s*/, '').trim();

  if (formattedName.toLowerCase().includes('unknown')) {
    return 'Seorang seniman anonim yang karyanya telah bertahan sepanjang waktu, memberikan kontribusi pada pemahaman praktik seni sejarah. Meskipun identitasnya tetap menjadi misteri, warisan seni mereka terus mempengaruhi dan menginspirasi.';
  }

  const nameComponents = nameWithoutParentheses.split(' ');
  const descriptions = [
    `${nameWithoutParentheses} adalah seorang seniman ternama dari ${era}, dikenal karena visi artistik unik dan penguasaan teknis yang luar biasa.`,
    `Karya-karya mereka menunjukkan pemahaman mendalam tentang tradisi seni, sembari mendorong batasan dalam media yang mereka pilih.`,
    `Melalui karir mereka, ${nameWithoutParentheses} telah menciptakan banyak karya penting yang memberikan kontribusi pada perkembangan sejarah seni.`,
    `Gaya artistik ${nameComponents[0]} dicirikan oleh pendekatan inovatif terhadap komposisi, warna, dan bentuk, menjadikannya pionir dalam aliran seni mereka.`
  ];

  return descriptions.join(' ');
};

const ArtistScreen = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const fetchArtists = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getArtworks(1, 100);
      const filteredArtists = data
        .map((item) => ({
          name: formatText(item.artist_display || 'Unknown Artist'),
          id: item.id
        }))
        .filter((artist, index, self) =>
          self.findIndex(a => a.name === artist.name) === index
        );

      const sortedArtists = filteredArtists
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(artist => ({
          ...artist,
          description: generateArtistDescription(artist.name)
        }));

      setArtists(sortedArtists);
    } catch (err) {
      setError('Gagal memuat seniman.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const handleArtistPress = (artist) => {
    setSelectedArtist(selectedArtist?.id === artist.id ? null : artist);
  };

  const renderArtistItem = ({ item }) => (
    <View style={styles.artistContainer}>
      <TouchableOpacity
        style={[
          styles.artistCard,
          selectedArtist?.id === item.id && styles.selectedArtistCard
        ]}
        onPress={() => handleArtistPress(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.artistName}>{item.name}</Text>
      </TouchableOpacity>

      {selectedArtist?.id === item.id && (
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      )}
    </View>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchArtists}
        >
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        renderItem={renderArtistItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() =>
          !loading && <Text style={styles.emptyText}>Tidak ada seniman ditemukan</Text>
        }
        ListFooterComponent={
          loading && (
            <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
          )
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ArtistScreen;
