import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    margin: 16,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    margin: 16,
  },
  emptyText: {
    textAlign: 'center',
    margin: 16,
    color: '#666',
  },
  cardWrapper: {
    width: cardWidth,
    marginHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  flatListContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
    alignItems: 'center', 
  },
});
