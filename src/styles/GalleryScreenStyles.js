import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: '#ff0000',
      marginBottom: 16,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: '#0066cc',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '500',
    },
    listContainer: {
      padding: 16,
    },
    departmentContainer: {
      marginBottom: 16,
    },
    departmentButton: {
      backgroundColor: '#f8f8f8',
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    selectedDepartment: {
      backgroundColor: '#e8f0fe',
      borderColor: '#4a90e2',
    },
    departmentTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    descriptionCard: {
      backgroundColor: '#ffffff',
      padding: 16,
      marginTop: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    descriptionText: {
      fontSize: 16,
      color: '#666',
      lineHeight: 24,
    },
  });

  export default styles;