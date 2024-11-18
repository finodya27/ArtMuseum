import React, { useState, useCallback } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  ActivityIndicator, 
  Text 
} from 'react-native';
import { searchArtworks } from '../services/artworkService';
import ArtworkCard from '../components/card';
import { debounce } from 'lodash';
import styles from '../styles/SearchScreenStyles';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await searchArtworks(query);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching artworks:', error);
      setError('Failed to load search results');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => performSearch(query), 500),
    []
  );

  const handleQueryChange = (text) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <ArtworkCard artwork={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search artworks..."
        value={searchQuery}
        onChangeText={handleQueryChange}
      />
      
      {loading && (
        <ActivityIndicator 
          size="large" 
          color="#0000ff" 
          style={styles.loadingIndicator} 
        />
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={searchQuery.length > 0 && !loading && (
          <Text style={styles.emptyText}>No artworks found</Text>
        )}
      />
    </View>
  );
};

export default SearchScreen;
