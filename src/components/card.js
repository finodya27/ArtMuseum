import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { getThumbnailUrl } from '../services/api';
import ArtworkDetail from './detail';
import cardStyle from '../styles/cardStyle'; 

const ArtworkCard = ({ artwork, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const imageUrl = artwork.image_id
    ? getThumbnailUrl(artwork.image_id)
    : 'https://via.placeholder.com/200x200.png?text=No+Image';

  return (
    <>
      <TouchableOpacity
        style={cardStyle.card}
        onPress={() => setModalVisible(true)}
      >
        <View style={cardStyle.imageContainer}>
          {imageLoading && (
            <ActivityIndicator
              style={cardStyle.loader} 
              size="small"
              color="#0000ff"
            />
          )}
          <Image
            source={{ uri: imageUrl }}
            style={cardStyle.image}  
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </View>
        <View style={cardStyle.infoContainer}>
          <Text style={cardStyle.title} numberOfLines={2}>
            {artwork.title || 'Untitled'}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ArtworkDetail
          artwork={artwork}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </>
  );
};

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    image_id: PropTypes.string,
    title: PropTypes.string,
    artist_display: PropTypes.string,
    artist_title: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func,
};

export default ArtworkCard;
