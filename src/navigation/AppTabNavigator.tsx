import 'react-native-get-random-values';
import React from 'react';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomBottomTab from './CustomBottomTab';
import {useAppDispatch, RootState} from '../redux/store';
import {Question} from '../types/question';
import {initQuestion} from '../redux/slices/questionSlice/reducer';
import {DiscoverScreen, HomeScreen} from '../screens';
import {AppBarIconButton} from '../components/ui';
import LibraryStack from './LibraryStack';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const Tab = createBottomTabNavigator();

const EmptyComponent = () => {
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
      coverImage: null,
      media: '',
      visibleScope: 'public',
      images: [],
      questions: [],
      isDraft: true,
      createdAt: new Date().toISOString(),
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
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <BottomSheetModalProvider>
        <Tab.Navigator
          tabBar={tabBar}
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Poppins-Medium',
            },
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
                  icon: 'account-circle-outline',
                }),
              headerRight: () =>
                AppBarIconButton({
                  type: 'normal',
                  onPress: () => navigation.push('UserSettingScreen'),
                  icon: 'bell-outline',
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
            options={({navigation}) => ({
              tabBarLabel: 'Discover',
              tabBarActiveTintColor: '#7C4DFF',
              lazy: true,
              headerRight: () =>
                AppBarIconButton({
                  type: 'normal',
                  onPress: () => navigation.push('SearchKahootScreen'),
                  icon: 'magnify',
                }),

              headerRightContainerStyle: {
                paddingHorizontal: 8,
              },
              headerShadowVisible: true,
            })}
            component={DiscoverScreen}
          />
          <Tab.Screen
            name="Join"
            listeners={({navigation}) => ({
              tabPress: e => {
                e.preventDefault();
                navigation.navigate('JoinScreen');
              },
            })}
            options={{
              unmountOnBlur: true,
              tabBarLabel: 'Join',
              tabBarActiveTintColor: '#7C4DFF',
            }}
            component={EmptyComponent}
          />

          <Tab.Screen
            name="Create"
            listeners={({navigation}) => ({
              tabPress: e => {
                e.preventDefault();
                handleInitQuestion().then(question => {
                  navigation.navigate('QuestionScreen', {
                    idQuestion: question.idQuestion,
                  });
                });
              },
            })}
            options={{
              unmountOnBlur: true,
              tabBarLabel: 'Create',
              tabBarActiveTintColor: '#7C4DFF',
            }}
            component={EmptyComponent}
          />

          <Tab.Screen
            name="Library"
            options={{
              tabBarLabel: 'Library',
              tabBarActiveTintColor: '#7C4DFF',
              headerShown: false,
            }}
            component={LibraryStack}
          />
        </Tab.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
