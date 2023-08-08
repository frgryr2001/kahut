import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from './UserDetailScreen.style';

const UserDetailScreen = ({route}: any) => {
  const {colors} = useTheme();
  const {id, name} = route.params;

  return (
    <View>
      <Text
        style={{
          color: colors.text,
        }}>
        UserDetailScreen
      </Text>
    </View>
  );
};

export default UserDetailScreen;
