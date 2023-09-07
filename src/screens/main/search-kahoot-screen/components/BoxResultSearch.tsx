import {ScrollView} from 'react-native';
import React from 'react';

export default function BoxResultSearch({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, marginTop: 16}}>
      {children}
    </ScrollView>
  );
}
