import {Button, Text, View} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../../redux/store';
import {logOut} from '../../../redux/slices/authSlice/actions';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/authSlice/selector';
import {RootStackParams} from '../../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const refreshToken = user?.refresh_token;
  const onLogout = () => {
    if (refreshToken) {
      dispatch(logOut({refreshToken}))
        .unwrap()
        .then(() => navigation.navigate('LoginScreen'));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Welcome to Home Screen</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};
