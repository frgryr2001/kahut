import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title?: string;
  subTitle?: string;
  goBack?: () => void;
  isBtnBack?: boolean;
}

export const LinearGradientBG = ({
  title,
  subTitle,
  goBack,
  isBtnBack,
}: Props) => {
  return (
    <LinearGradient
      colors={['#7C4DFF', '#673AB7']}
      style={styles.linearGradientBg}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.container}>
        {isBtnBack && (
          <TouchableOpacity onPress={goBack}>
            <Icon
              name="chevron-back-circle-outline"
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        )}
        <View
          style={{
            marginTop: 40,
          }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
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
  container: {
    marginHorizontal: 10,
  },
  title: {color: 'white', fontSize: 30, fontFamily: 'Poppins-Bold'},
  subTitle: {
    color: '#D1C4E9',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
});
