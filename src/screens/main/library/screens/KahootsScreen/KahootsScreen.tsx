import {Text, View, Pressable} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

import {selectStatus} from '../../../../../redux/slices/authSlice/selector';
import styles from './KahootsScreen.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SECTIONS = [
  {
    id: 1,
    title: 'My kahoots',
    icon: 'account-outline',
    onPress: (navigation: any) => navigation.navigate('StudyGroupScreen'),
  },
  {
    id: 2,
    title: 'Favorites',
    icon: 'heart-outline',
    onPress: (navigation: any) => navigation.navigate('CoursesScreen'),
  },
  {
    id: 3,
    title: 'Shared',
    icon: 'share-variant-outline',
    onPress: (navigation: any) => navigation.navigate('GroupsScreen'),
  },
];

export default function KahootsListScreen({navigation}: any) {
  const {colors} = useTheme();
  const authStatus = useSelector(selectStatus);

  return (
    <View style={styles.container}>
      {authStatus === 'authenticated' && (
        <View>
          <View style={styles.authContainer}>
            {SECTIONS.map(item => (
              <Pressable
                key={item.id}
                onPress={() => item.onPress(navigation)}
                style={styles.authItemContainer}>
                <Icon name={item.icon} size={24} color={colors.text} />
                <Text style={[{color: colors.text}, styles.authItemTitle]}>
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {authStatus === 'not-authenticated' && (
        <View style={styles.notAuthContainer}>
          <Text
            style={{
              color: colors.text,
              ...styles.notAuthTitle,
            }}>
            Log in to Kahoot!
          </Text>

          <Text style={styles.notAuthDesc}>
            Log in or sign up to be able to play your kahoots and access them on
            other devices.
          </Text>

          <View style={styles.notAuthButtonGroup}>
            <Pressable
              onPress={() => navigation.push('LoginScreen')}
              style={{
                backgroundColor: '#2456bf',
                ...styles.notAuthButtonContainer,
              }}>
              <Text style={styles.notAuthButtonText}>Sign in</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.push('RegisterScreen')}
              style={{
                backgroundColor: '#10872a',
                ...styles.notAuthButtonContainer,
              }}>
              <Text style={styles.notAuthButtonText}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
