import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {User} from '../../../../types/search.type';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../../../navigation/AppNavigationContainer';

export default function UserListSearch({users}: {users: User[]}) {
  const {colors} = useTheme();

  return users.length > 0 ? (
    <View
      style={{
        gap: 8,
        paddingHorizontal: 8,
      }}>
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          fontFamily: 'Poppins-Bold',
        }}>
        Users
      </Text>

      <View
        style={{
          gap: 16,
        }}>
        {users?.map(user => (
          <UserListItem key={user.id} user={user} />
        ))}
      </View>
    </View>
  ) : null;
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
      <Image
        source={{uri: user.image}}
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          objectFit: 'cover',
        }}
      />
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          fontFamily: 'Poppins-Regular',
        }}>
        {user.username}
      </Text>
    </TouchableOpacity>
  );
}
