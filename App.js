import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/pages/HomeScreen';
import GalleryScreen from './src/pages/GalleryScreen';
import AboutScreen from './src/pages/AboutScreen';
import ArtistScreen from './src/pages/ArtistScreen';
import SearchScreen from './src/pages/SearchScreen';

import AppStyles from './src/styles/AppStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={AppStyles.screenOptions}>
    <Stack.Screen 
      name="HomeStack"  
      component={HomeScreen}  
      options={{ title: 'ArtMuseum' }}
    />
  </Stack.Navigator>
);

const GalleryStack = () => (
  <Stack.Navigator screenOptions={AppStyles.screenOptions}>
    <Stack.Screen 
      name="Departemen"
      component={GalleryScreen}
      options={{ title: 'ArtMuseum' }}
    />
  </Stack.Navigator>
);

const ArtistStack = () => (
  <Stack.Navigator screenOptions={AppStyles.screenOptions}>
    <Stack.Screen 
      name="Seniman"
      component={ArtistScreen}
      options={{ title: 'ArtMuseum' }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={AppStyles.screenOptions}>
    <Stack.Screen 
      name="Search"
      component={SearchScreen}
      options={{ title: 'ArtMuseum' }}
    />
  </Stack.Navigator>
);

const AboutStack = () => (
  <Stack.Navigator screenOptions={AppStyles.screenOptions}>
    <Stack.Screen 
      name="About"
      component={AboutScreen}
      options={{ title: 'ArtMuseum' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Beranda':
                iconName = 'home';
                break;
              case 'Departemen':
                iconName = 'grid';
                break;
              case 'About':
                iconName = 'info';
                break;
              case 'Seniman':
                iconName = 'users';
                break;
              case 'Search':
                iconName = 'search';
                break;
              default:
                iconName = 'circle';
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: AppStyles.tabBarActiveTintColor,
          tabBarInactiveTintColor: AppStyles.tabBarInactiveTintColor,
          tabBarLabelStyle: AppStyles.tabBarLabel,
          tabBarStyle: AppStyles.tabBar,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Beranda" component={HomeStack} />
        <Tab.Screen name="Departemen" component={GalleryStack} />
        <Tab.Screen name="Seniman" component={ArtistStack} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="About" component={AboutStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
