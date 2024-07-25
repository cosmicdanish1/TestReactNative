/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{ useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import JobsScreen from './src/screens/JobsScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import { initDatabase } from './src/database/database';
import { RootStackParamList,RootTabParamList} from './src/types';
import JobDetailScreen from './src/screens/JobDetailScreen';
import type {PropsWithChildren} from 'react';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="JobsList" component={JobsScreen} options={{ title: 'Jobs' }} />
    <Stack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Details' }} />
  </Stack.Navigator>
);

const App: React.FC = () => {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;
            if (route.name === 'Jobs') {
              iconName = focused ? 'work' : 'work-outline';
            } else if (route.name === 'Bookmarks') {
              iconName = focused ? 'bookmark' : 'bookmark-border';
            } else {
              iconName = 'error';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Jobs" component={JobsStack} />
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;