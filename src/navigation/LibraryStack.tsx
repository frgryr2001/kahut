import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LibraryScreen} from '../screens';
import * as libraryStackScreens from '../screens/main/library/screens';
import * as libraryKahootsScreens from '../screens/main/library/screens/kahoots-screen/screens';
import {useTheme} from '@react-navigation/native';

export type RootStackParams = {
  LibraryScreen: undefined;
  LibraryKahootsScreen: undefined;
  LibraryAssignmentsScreen: undefined;
  LibraryAssignmentDetailScreen: {
    id: number;
    title: string;
  };
  LibraryDraftScreen: undefined;
  LibraryReportsScreen: undefined;
  StudyGroupScreen: undefined;
  CoursesScreen: undefined;
  GroupsScreen: undefined;
  StudyScreen: undefined;
  LibraryMyKahootsScreen: undefined;
  LibraryFavoritesScreen: undefined;
  LibrarySharedScreen: undefined;
};
const Stack = createNativeStackNavigator<RootStackParams>();

function LibraryStack() {
  const {colors} = useTheme();

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
        name="LibraryKahootsScreen"
        component={libraryStackScreens.KahootsScreen}
        options={{
          headerTitle: 'Kahoots',
        }}
      />
      <Stack.Screen
        name="LibraryAssignmentsScreen"
        component={libraryStackScreens.AssignmentsScreen}
        options={{
          headerTitle: 'Assignments',
        }}
      />
      <Stack.Screen
        name="LibraryAssignmentDetailScreen"
        component={libraryStackScreens.AssignmentDetailScreen}
        options={({route}) => {
          return {
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: route.params?.title!,
            contentStyle: {
              backgroundColor: colors.background,
            },
          };
        }}
      />
      <Stack.Screen
        name="LibraryDraftScreen"
        component={libraryStackScreens.DraftScreen}
        options={{
          headerTitle: 'Draft',
        }}
      />
      <Stack.Screen
        name="LibraryReportsScreen"
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
      <Stack.Screen
        name="LibraryMyKahootsScreen"
        component={libraryKahootsScreens.MyKahootsScreen}
        options={{
          headerTitle: 'My kahoots',
        }}
      />
      <Stack.Screen
        name="LibraryFavoritesScreen"
        component={libraryKahootsScreens.FavoritesScreen}
        options={{
          headerTitle: 'Favorites',
        }}
      />
      <Stack.Screen
        name="LibrarySharedScreen"
        component={libraryKahootsScreens.SharedScreen}
        options={{
          headerTitle: 'Shared',
        }}
      />
    </Stack.Navigator>
  );
}

export default LibraryStack;
