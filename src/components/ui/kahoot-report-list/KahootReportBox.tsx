import {View} from 'react-native';
import React from 'react';

export default function KahootReportBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#20065c',
        padding: 16,
      }}>
      {children}
    </View>
  );
}
