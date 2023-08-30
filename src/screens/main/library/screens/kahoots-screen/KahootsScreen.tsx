import {Text, View, Pressable} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {selectStatus} from '../../../../../redux/slices/authSlice/selector';
import {NotAuthForm} from '../../../../../components/ui';
import styles from './KahootsScreen.style';

const SECTIONS = [
  {
    id: 1,
    title: 'My kahoots',
    icon: 'account-outline',
    onPress: (navigation: any) => navigation.navigate('LibraryMyKahootsScreen'),
  },
  {
    id: 2,
    title: 'Favorites',
    icon: 'heart-outline',
    onPress: (navigation: any) => navigation.navigate('LibraryFavoritesScreen'),
  },
  {
    id: 3,
    title: 'Shared',
    icon: 'share-variant-outline',
    onPress: (navigation: any) => navigation.navigate('LibrarySharedScreen'),
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
        <NotAuthForm navigation={navigation} />
      )}
    </View>
  );
}
