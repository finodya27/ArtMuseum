import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  screenOptions: {
    headerStyle: {
      backgroundColor: '#2196F3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center', 
  },
  container: {
    flex: 1,
  },
  tabBar: {
    height: 60,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusBar: {
    backgroundColor: '#2196F3',
    barStyle: 'light-content',
  },
  tabBarActiveTintColor: '#2196F3',
  tabBarInactiveTintColor: 'gray',
});

export default AppStyles;
