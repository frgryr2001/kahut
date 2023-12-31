import React, {useCallback} from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import {theme as Theme} from '../../../../types/question';
import {useTheme} from '@react-navigation/native';

const height = Dimensions.get('window').height;
const heightNotHeader = height + 60;

interface Props {
  theme: Theme | undefined;
}

const ThemeBackground = ({theme}: Props) => {
  const {colors} = useTheme();
  const getBackground = useCallback(() => {
    switch (theme) {
      case 'Spring':
        return require('../../../../assets/images/themes/springTheme.png');
      case 'Summer':
        return require('../../../../assets/images/themes/summerTheme.png');
      case 'Autumn':
        return require('../../../../assets/images/themes/autumnTheme.png');
      case 'Winter':
        return require('../../../../assets/images/themes/winterTheme.png');
      case 'Pride':
        return require('../../../../assets/images/themes/prideTheme.png');
      default:
        return null;
    }
  }, [theme]);

  return (
    <>
      {theme !== 'Standard' && (
        <ImageBackground
          source={getBackground()}
          resizeMode="cover"
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
            },
          ]}>
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
  },
  overlay: {
    width: '100%',
    height: heightNotHeader,
  },
});

export default ThemeBackground;
