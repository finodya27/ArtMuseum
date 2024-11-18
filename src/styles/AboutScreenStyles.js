import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    content: {
      alignItems: 'center',
      padding: 16,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60, 
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    nim: {
      fontSize: 18,
      color: '#666',
    },
    aboutText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 20,
      paddingHorizontal: 10,
    },
  });

  export default styles;