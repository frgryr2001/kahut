import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomeScreen} from '../screens';
import CustomBottomTab from './CustomBottomTab';
import {getIcon} from '../helpers/getIcon';

const Tab = createBottomTabNavigator();

const CreateQuestionComponent = () => {
  return null;
};
export function TabsApp() {
  const tabBar = (props: any) => <CustomBottomTab {...props} />;
  return (
    <Tab.Navigator
      tabBar={tabBar}
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => getIcon('notifications-outline', 25, 'black'),
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#7C4DFF',
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Create"
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('QuestionScreen');
          },
        })}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Create',
          tabBarActiveTintColor: '#7C4DFF',
        }}
        component={CreateQuestionComponent}
      />
    </Tab.Navigator>
  );
}
