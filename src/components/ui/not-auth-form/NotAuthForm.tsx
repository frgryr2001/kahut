import {SafeAreaView, Text, View, Pressable} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

import styles from './NotAuthForm.style';

const NotAuthForm = ({navigation}: any) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.notAuthContainer}>
      <Text
        style={{
          color: colors.text,
          ...styles.notAuthTitle,
        }}>
        Log in to Kahoot!
      </Text>

      <Text style={styles.notAuthDesc}>
        Log in or sign up to be able to play your kahoots and access them on
        other devices.
      </Text>

      <View style={styles.notAuthButtonGroup}>
        <Pressable
          onPress={() => navigation.push('LoginScreen')}
          style={{
            backgroundColor: '#2456bf',
            ...styles.notAuthButtonContainer,
          }}>
          <Text style={styles.notAuthButtonText}>Sign in</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.push('RegisterScreen')}
          style={{
            backgroundColor: '#10872a',
            ...styles.notAuthButtonContainer,
          }}>
          <Text style={styles.notAuthButtonText}>Sign up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default NotAuthForm;
