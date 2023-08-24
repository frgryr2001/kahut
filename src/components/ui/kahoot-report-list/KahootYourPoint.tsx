import {Text} from 'react-native';
import React from 'react';

export default function KahootYourPoint({point}: {point: number}) {
  return (
    <Text
      style={{
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
      }}>
      Your Point: {point}
    </Text>
  );
}
