import {View, StyleSheet} from 'react-native';
import React from 'react';

export default function Box({children}: {children: React.ReactNode}) {
  return <View style={styles.containerContent}>{children}</View>;
}
const styles = StyleSheet.create({
  containerContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
