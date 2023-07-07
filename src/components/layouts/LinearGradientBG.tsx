import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title?: string;
  bgImage?: string;
  subTitle?: string;
  goBack?: () => void;
  isBtnBack?: boolean;
  mgBottom?: boolean;
}

export const LinearGradientBG = ({
  title,
  subTitle,
  goBack,
  isBtnBack,
  bgImage,
  mgBottom,
}: Props) => {
  const getImage = useCallback(() => {
    switch (bgImage) {
      case 'login':
        return require('../../assets/images/login.png');
      case 'register':
        return require('../../assets/images/signup.png');
      case 'forgot':
        return require('../../assets/images/forgot.png');
      case 'otp':
        return require('../../assets/images/otp.png');
      default:
        return require('../../assets/images/login.png');
    }
  }, [bgImage]);

  return (
    <LinearGradient
      colors={['#673AB7', '#ffffff']}
      style={[styles.linearGradientBg, mgBottom && {marginBottom: 20}]}
      start={{x: 0.5, y: 0.2}}
      end={{x: 0.5, y: 0.7}}>
      {isBtnBack && (
        <TouchableOpacity
          onPress={goBack}
          style={{
            position: 'absolute',
            top: 20,
            left: 10,
            zIndex: 999,
          }}>
          <Icon name="chevron-back-circle-outline" size={30} color={'white'} />
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        <Image
          style={{
            width: 250,
            height: 250,
          }}
          source={getImage()}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <Text style={styles.title}>{title}</Text>
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradientBg: {
    height: 300,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {color: 'black', fontSize: 28, fontFamily: 'Poppins-Bold'},
  subTitle: {
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
});
