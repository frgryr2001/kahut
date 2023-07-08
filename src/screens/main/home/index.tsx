import {Button, Text, View} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../../redux/store';
import {logOut} from '../../../redux/slices/authSlice/actions';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/authSlice/selector';
export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const {refresh_token: refreshToken, access_token} = user!;
  const onLogout = () => {
    dispatch(logOut({refreshToken, access_token}));
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
