import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const PaddingContainer = ({children}: Props) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
});
