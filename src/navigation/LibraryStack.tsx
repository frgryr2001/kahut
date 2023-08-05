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
      <Stack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          headerTitle: 'Library',
        }}
      />
      <Stack.Screen
        name="KahootsScreen"
        component={libraryStackScreens.KahootsScreen}
        options={{
          headerTitle: 'Kahoots',
        }}
      />
      <Stack.Screen
        name="ReportScreen"
        component={libraryStackScreens.ReportScreen}
        options={{
          headerTitle: 'Reports',
        }}
      />
      <Stack.Screen
        name="StudyGroupScreen"
        component={libraryStackScreens.StudyGroupScreen}
        options={{
          headerTitle: 'Study groups',
        }}
      />
      <Stack.Screen
        name="CoursesScreen"
        component={libraryStackScreens.CoursesScreen}
        options={{
          headerTitle: 'Courses',
        }}
      />
      <Stack.Screen
        name="GroupsScreen"
        component={libraryStackScreens.GroupsScreen}
        options={{
          headerTitle: 'Groups',
        }}
      />
      <Stack.Screen
        name="StudyScreen"
        component={libraryStackScreens.StudyScreen}
        options={{
          headerTitle: 'Study',
        }}
      />
    </Stack.Navigator>
  );
}

export default LibraryStack;
