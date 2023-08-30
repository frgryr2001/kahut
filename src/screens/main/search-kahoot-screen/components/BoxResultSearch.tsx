import {View} from 'react-native';
import React from 'react';

export default function BoxResultSearch({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View style={{flex: 1, marginTop: 10}}>{children}</View>;
}
