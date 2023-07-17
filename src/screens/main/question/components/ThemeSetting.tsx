import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ThemeSetting = () => {
  return (
    <Pressable style={styles.themeSetting}>
      <View style={styles.imageTheme} />
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
    backgroundColor: 'red',
  },
  titleTheme: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
});

export default ThemeSetting;
