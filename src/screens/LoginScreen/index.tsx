import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View} from 'react-native';
import {LinearGradientBG} from '../../components/layouts/LinearGradientBG';
import {RootStackParams} from '../../navigator/Navigator';
import {FormAuth} from '../../components/ui';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const gotoScreen = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <LinearGradientBG
        title="Sign in to your Account"
        subTitle="Sign in to your Account"
      />
      <FormAuth formType="login" gotoForm={gotoScreen} />
    </View>
  );
};
