import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import React, {Dispatch, SetStateAction} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {User} from '../../../../../types/user';
import styles from './UserInfo.style';

interface Props {
  user: User;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

const UserInfo = ({user, setIsShowModal}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.userInfoContainer}>
      <Image
        source={{uri: user?.image}}
        width={50}
        height={50}
        style={styles.userInfoImage}
      />

      <Text
        style={{
          color: colors.text,
          ...styles.userInfoUsername,
        }}>
        {user?.username}
      </Text>

      <TouchableOpacity onPress={() => setIsShowModal(true)}>
        <Icon name="account-edit-outline" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default UserInfo;
