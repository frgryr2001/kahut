import {View} from 'react-native';
import React from 'react';

export default function Container({children}: {children: React.ReactNode}) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
      }}>
      {children}
    </View>
  );
}
