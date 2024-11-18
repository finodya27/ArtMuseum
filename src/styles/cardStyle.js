import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width / 2) - 36; 

const cardStyle = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH, 
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
    height: 60, 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center', 
    lineHeight: 16,
  },
});

export default cardStyle;
