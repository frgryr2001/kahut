import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title?: string;
  subTitle?: string;
}

export const LinearGradientBG = ({title, subTitle}: Props) => {
  return (
    <LinearGradient
      colors={['#7C4DFF', '#673AB7']}
      style={styles.linearGradientBg}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <Text
          style={{color: 'white', fontSize: 25, fontFamily: 'Poppins-Bold'}}>
          {title}
        </Text>
        <Text
          style={{
            color: '#D1C4E9',
            fontSize: 15,
            fontFamily: 'Poppins-Regular',
          }}>
          {subTitle}
        </Text>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradientBg: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
