import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HomeScreen} from '../screens';
import CustomBottomTab from './CustomBottomTab';
import {getIcon} from '../helpers/getIcon';
import {StyleSheet} from 'react-native';

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
        headerTitleStyle: styles.headerTitleStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
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
const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 20,
    color: 'black',
  },
  tabBarStyle: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    height: 60,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 0,
    elevation: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
