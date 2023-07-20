import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress: () => void;
  getBackground: () => any;
}

const ThemeSetting = ({onPress, getBackground}: Props) => {
  return (
    <Pressable style={styles.themeSetting} onPress={onPress}>
      {getBackground() !== null && (
        <Image source={getBackground()} style={styles.imageTheme} />
      )}
      {getBackground() === null && <View style={styles.imageTheme} />}

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
    shadowColor: '#000',
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
