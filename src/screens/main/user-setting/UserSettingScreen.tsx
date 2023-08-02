import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {selectStatus} from '../../../redux/slices/authSlice/selector';
import {store} from '../../../redux/store';
import {signOut} from '../../../redux/slices/authSlice/actions';

interface Props
  extends StackScreenProps<RootStackParams, 'UserSettingScreen'> {}

const UserSettingScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const authStatus = useSelector(selectStatus);
  const {getState, dispatch} = store;

  const handleSignOut = async () => {
    const refreshToken = getState().auth.user?.refresh_token;
    if (refreshToken) {
      try {
        dispatch(
          signOut({
            refreshToken,
          }),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background, padding: 16}}>
      {authStatus === 'not-authenticated' && (
        <View style={{gap: 12}}>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: '700',
            }}>
            Log in for more
          </Text>

          <Text
            style={{
              color: '#777',
              fontSize: 16,
            }}>
            Create and save kahoots, and access more features with a Kahoot!
            account.
          </Text>

          <View style={{flexDirection: 'row', gap: 8}}>
            <TouchableHighlight
              underlayColor="#d8dce3"
              onPress={() => navigation.push('LoginScreen')}
              style={{
                backgroundColor: '#e4e8ed',
                paddingHorizontal: 24,
                paddingVertical: 10,
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Sign in
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => navigation.push('RegisterScreen')}
              underlayColor="#0e418a"
              style={{
                backgroundColor: '#034aad',
                paddingHorizontal: 24,
                paddingVertical: 10,
                borderRadius: 4,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Sign up
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      )}

      {authStatus === 'authenticated' && (
        <View>
          <TouchableHighlight
            onPress={handleSignOut}
            underlayColor="#eee"
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 24,
              paddingVertical: 10,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#ddd',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Sign out
              </Text>

              <Icon name="log-out-outline" size={24} color={colors.text} />
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};

export default UserSettingScreen;
