import React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {UserDetail} from '../../../../../types/user.type';
import styles from './UserInfo.style';

interface StatisticItemProps {
  value: number;
  section: string;
}

const StatisticItem = ({value, section}: StatisticItemProps) => {
  const {colors} = useTheme();
  return (
    <View style={styles.statisticItemContainer}>
      <Text
        style={{
          color: colors.text,
          ...styles.statisticValue,
        }}>
        {value}
      </Text>
      <Text style={styles.statisticSection}>{section}</Text>
    </View>
  );
};

interface UserInfoProps {
  data?: UserDetail;
}

const UserInfo = ({data}: UserInfoProps) => {
  const {colors} = useTheme();

  return data ? (
    <View style={styles.container}>
      {/* Avatar & Username */}
      <View style={styles.avatarAndUsernameContainer}>
        <Image
          source={{
            uri: data.image,
          }}
          style={styles.avatar}
        />

        <Text
          style={{
            ...styles.username,
            color: colors.text,
          }}>
          {data.name}
        </Text>
      </View>

      {/* Statistic */}
      <View style={styles.statisticContainer}>
        <StatisticItem value={data.numberOfKahoots} section="Kahoots" />
        <StatisticItem value={data.numberOfPlays} section="Plays" />
        <StatisticItem value={data.numberOfPlayers} section="Players" />
      </View>
    </View>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size={40} color={colors.text} />
    </View>
  );
};

export default UserInfo;
