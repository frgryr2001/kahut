import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LibraryScreen} from '../screens';
import * as libraryStackScreens from '../screens/main/library/screens';

const Stack = createNativeStackNavigator();

function LibraryStack() {
  return (
    <Stack.Navigator
      initialRouteName="LibraryScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen
        name="KahootsListScreen"
        component={libraryStackScreens.KahootsListScreen}
      />
      <Stack.Screen
        name="ReportScreen"
        component={libraryStackScreens.ReportScreen}
      />
      <Stack.Screen
        name="StudyGroupScreen"
        component={libraryStackScreens.StudyGroupScreen}
      />
      <Stack.Screen
        name="CoursesScreen"
        component={libraryStackScreens.CoursesScreen}
      />
      <Stack.Screen
        name="GroupsScreen"
        component={libraryStackScreens.GroupsScreen}
      />
      <Stack.Screen
        name="StudyScreen"
        component={libraryStackScreens.StudyScreen}
      />
    </Stack.Navigator>
  );
}

export default LibraryStack;
