import {Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function KahootYourPoint({point}: {point: number}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        justifyContent: 'center',
      }}>
      <Icon name="seal-variant" size={36} color="#fff" />
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontFamily: 'Poppins-Bold',
          textAlign: 'center',
        }}>
        {point}
      </Text>
    </View>
  );
}
