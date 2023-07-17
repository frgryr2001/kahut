import {StatusBar, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>HomeScreen7</Text>
    </View>
  );
};
