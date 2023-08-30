import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';
import {User} from '../../../../types/search.type';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../../../navigation/AppNavigationContainer';

export default function UserListSearch({users}: {users: User[]}) {
  return (
    <View
      style={{
        gap: 10,
      }}>
      {users?.map(user => (
        <UserListItem key={user.id} user={user} />
      ))}
    </View>
  );
}

function UserListItem({user}: {user: User}) {
  const {colors} = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const handleNavigateToUserDetail = () => {
    navigation.navigate('UserDetailScreen', {
      id: user.id,
      name: user.username,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleNavigateToUserDetail}
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
        {user.username}
      </Text>
    </TouchableOpacity>
  );
}
