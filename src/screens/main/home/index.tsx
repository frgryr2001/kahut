import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useAppDispatch} from '../../../redux/store';
import {logOut} from '../../../redux/slices/authSlice/actions';
import {useSelector} from 'react-redux';
import {
  selectLoading,
  selectUser,
} from '../../../redux/slices/authSlice/selector';
import {RootStackParams} from '../../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
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
      <Spinner
        visible={loading ? true : false}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Text>Welcome to Home Screen</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
};
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});
