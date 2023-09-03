import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import React, {Dispatch, SetStateAction} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './UserInfo.style';
const DefaultImage = require('../../../../../assets/images/default.png');
interface Props {
  user: {
    username?: string;
    image?: string;
    file?: {
      uri: string;
      type: string;
      name: string;
    };
  };
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

const UserInfo = ({user, setIsShowModal}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.userInfoContainer}>
      <Image
        source={{
          uri: user.image,
        }}
        width={50}
        height={50}
        style={styles.userInfoImage}
        loadingIndicatorSource={DefaultImage}
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
