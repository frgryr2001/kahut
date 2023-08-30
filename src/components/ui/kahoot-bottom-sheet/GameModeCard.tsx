import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

interface Props {
  title: string;
  subTitle: string;
  onPress: () => void;
}

export default function GameModeCard({title, subTitle, onPress}: Props) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}>
      <View>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontFamily: 'Poppins-Medium',
              textAlign: 'center',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.subTitle,
            {
              color: colors.text,
              fontFamily: 'Poppins-Regular',
              textAlign: 'center',
            },
          ]}>
          {subTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 100,
    width: '100%',
    borderRadius: 3,
    justifyContent: 'center',
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  title: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 13,
    opacity: 0.7,
  },
});
