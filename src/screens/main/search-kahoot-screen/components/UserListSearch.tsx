import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

export default function UserListSearch() {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        gap: 10,
      }}>
      <UserListItem />
      <UserListItem />
    </TouchableOpacity>
  );
}

function UserListItem() {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
      <Icon name="person-circle-outline" size={25} color={colors.text} />
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
        }}>
        UserListItem
      </Text>
    </View>
  );
}
