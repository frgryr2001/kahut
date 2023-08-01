import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
// import {HomeScreen} from '../screens';
import CustomBottomTab from './CustomBottomTab';
import {getIcon} from '../helpers/getIcon';
import {useAppDispatch, RootState} from '../redux/store';
import {Question} from '../types/question';
import {useSelector} from 'react-redux';
import {initQuestion} from '../redux/slices/questionSlice/reducer';
import {HomeScreen, LibraryScreen} from '../screens';

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
        name="Discover"
        options={{
          tabBarLabel: 'Discover',
          tabBarActiveTintColor: '#7C4DFF',
        }}
        component={HomeScreen}
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
