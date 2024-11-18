import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from 'react-native';
import PropTypes from 'prop-types';
import { getHighResUrl } from '../services/api';
import styles from '../styles/detailStyles';

const formatText = (text) => {
  if (!text) return 'Informasi tidak tersedia';
  return text.replace(/\s+/g, ' ').trim();
};

const ArtworkDetail = ({ artwork, onClose }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUrl = artwork.image_id 
    ? getHighResUrl(artwork.image_id)
    : 'https://via.placeholder.com/400x400.png?text=No+Image';

  const handleLearnMore = () => {
    if (artwork.url) {
      Linking.openURL(artwork.url);
    }
  };

  const renderSection = (title, content) => {
    return content ? (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{formatText(title)}</Text>
        <Text style={styles.sectionContent}>{formatText(content)}</Text>
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.imageContainer}>
          {imageLoading && (
            <ActivityIndicator 
              style={styles.loader}
              size="large" 
              color="#0000ff" 
            />
          )}
          <Image
            source={{ uri: imageError ? 'https://via.placeholder.com/400x400.png?text=Error' : imageUrl }}
            style={styles.image}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{formatText(artwork.title || 'Tanpa Judul')}</Text>
          
          {renderSection('Artis', artwork.artist_display || artwork.artist_title)}
          {renderSection('Tahun', artwork.date_display)}
          {renderSection('Departemen', artwork.department_title)}
          {renderSection('Media', artwork.medium_display)}
          {renderSection('Dimensi', artwork.dimensions)}
          {renderSection('Kredit', artwork.credit_line)}
          {artwork.description && renderSection('Deskripsi', artwork.description)}
          {artwork.publication_history && renderSection('Sejarah Publikasi', artwork.publication_history)}
          {artwork.exhibition_history && renderSection('Sejarah Pameran', artwork.exhibition_history)}
          {artwork.provenance_text && renderSection('Provenans', artwork.provenance_text)}

          {artwork.url && (
            <TouchableOpacity style={styles.learnMoreButton} onPress={handleLearnMore}>
              <Text style={styles.learnMoreText}>Pelajari Lebih Lanjut</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

ArtworkDetail.propTypes = {
  artwork: PropTypes.shape({
    image_id: PropTypes.string,
    title: PropTypes.string,
    artist_display: PropTypes.string,
    artist_title: PropTypes.string,
    date_display: PropTypes.string,
    department_title: PropTypes.string,
    medium_display: PropTypes.string,
    dimensions: PropTypes.string,
    credit_line: PropTypes.string,
    description: PropTypes.string,
    publication_history: PropTypes.string,
    exhibition_history: PropTypes.string,
    provenance_text: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ArtworkDetail;
