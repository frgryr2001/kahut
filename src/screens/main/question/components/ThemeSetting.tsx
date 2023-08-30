import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View, Image, LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme as Theme} from '../../../../types/question';

LogBox.ignoreAllLogs(); // Ignore log notification by message
interface Props {
  onPress: () => void;
  theme: Theme | undefined;
}

const ThemeSetting = ({onPress, theme}: Props) => {
  const checkTheme = Boolean(theme !== 'Standard' && theme !== null && theme);
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
    <Pressable style={styles.themeSetting} onPress={onPress}>
      {checkTheme ? (
        <Image source={getBackground()} style={styles.imageTheme} />
      ) : (
        <View style={styles.imageTheme} />
      )}

      <Text style={styles.titleTheme}>Theme Setting</Text>
      <Icon name="chevron-down-outline" size={25} color="black" />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  themeSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 10,
    borderRadius: 3,
    gap: 10,
    marginTop: 10,
    height: 50,
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imageTheme: {
    width: '100%',
    height: 50,
    flex: 0.2,
    backgroundColor: '#969da3',
  },
  titleTheme: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});

export default ThemeSetting;
