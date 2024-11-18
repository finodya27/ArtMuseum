import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  viewAllText: {
    fontSize: 14,
    color: '#0066cc',
  },
  horizontalList: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  horizontalArtworkCard: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: 150, 
    height: 200,
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastSection: {
    marginBottom: 30,
  },
});

export default styles;