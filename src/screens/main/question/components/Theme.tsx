import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

interface Props {
  id: number;
  onPress: (id: number) => void;
  isFocus: boolean;
  nameTheme: string;
}

export const Theme = ({id, onPress, isFocus, nameTheme}: Props) => {
  return (
    <Pressable
      onPress={() => onPress(id)}
      style={[
        styles.theme,
        {
          borderColor: isFocus ? 'blue' : 'transparent',
        },
      ]}>
      <Text style={styles.textTheme}>{nameTheme}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  theme: {
    flexBasis: '30%',
    height: 100,
    backgroundColor: '#7F7F7F',
    borderWidth: 2,
    padding: 10,

    justifyContent: 'flex-end',
  },
  textTheme: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
