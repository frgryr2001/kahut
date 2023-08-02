import 'react-native-get-random-values';
import React from 'react';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomBottomTab from './CustomBottomTab';
import {useAppDispatch, RootState} from '../redux/store';
import {Question} from '../types/question';
import {initQuestion} from '../redux/slices/questionSlice/reducer';
import {DiscoverScreen, HomeScreen, LibraryScreen} from '../screens';
import {AppBarIconButton} from '../components/ui';

const Tab = createBottomTabNavigator();

const CreateQuestionComponent = () => {
  return null;
};

export function AppTabNavigator() {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const tabBar = (props: any) => <CustomBottomTab {...props} />;

  const handleInitQuestion = async () => {
    const question: Question = {
      idQuestion: uuidv4(),
      userId: userId!,
      title: '',
      description: '',
      theme: 'Standard',
      coverImage: '',
      media: '',
      visibleScope: 'public',
      images: [],
      questions: [],
      isDraft: true,
    };
    dispatch(initQuestion(question));
    return question;
  };

  const getAppBarLogo = () => {
    return (
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 32, height: 32}}
        resizeMode="cover"
      />
    );
  };

  return (
    <Tab.Navigator
      tabBar={tabBar}
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="Home"
        options={({navigation}) => ({
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#7C4DFF',
          headerTitle: () => getAppBarLogo(),
          headerLeftContainerStyle: {
            paddingHorizontal: 8,
          },
          headerLeft: () =>
            AppBarIconButton({
              type: 'normal',
              onPress: () => navigation.push('UserSettingScreen'),
              icon: 'person-circle-outline',
            }),
          headerRight: () =>
            AppBarIconButton({
              type: 'normal',
              onPress: () => navigation.push('UserSettingScreen'),
              icon: 'notifications-outline',
            }),
          headerRightContainerStyle: {
            paddingHorizontal: 8,
          },
          headerShadowVisible: true,
        })}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Discover"
        options={{
          tabBarLabel: 'Discover',
          tabBarActiveTintColor: '#7C4DFF',
        }}
        component={DiscoverScreen}
      />

      <Tab.Screen
        name="Create"
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            handleInitQuestion().then(question => {
              navigation.navigate('QuestionScreen', {question});
            });
          },
        })}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Create',
          tabBarActiveTintColor: '#7C4DFF',
        }}
        component={CreateQuestionComponent}
      />

      <Tab.Screen
        name="Library"
        options={{
          tabBarLabel: 'Library',
          tabBarActiveTintColor: '#7C4DFF',
        }}
        component={LibraryScreen}
      />
    </Tab.Navigator>
  );
}
