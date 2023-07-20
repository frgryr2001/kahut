import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';

const height = Dimensions.get('window').height;
const heightNotHeader = height + 60;

interface Props {
  themeQuestion: string;
  getBackground: () => any;
}
const ThemeBackground = ({themeQuestion, getBackground}: Props) => {
  return (
    <>
      {themeQuestion !== 'Standard' && (
        <ImageBackground
          source={getBackground()}
          resizeMode="cover"
          style={styles.container}>
          <View style={styles.overlay} />
        </ImageBackground>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: heightNotHeader,
    position: 'absolute',
    backgroundColor: 'red',
  },
  overlay: {
    width: '100%',
    height: heightNotHeader,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default ThemeBackground;
