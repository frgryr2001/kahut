import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React, {useCallback} from 'react';
import {theme as ThemeQuestion} from '../../../../types/question';

interface Props {
  id: number;
  onPress: (id: number) => void;
  isFocus: boolean;
  nameTheme: ThemeQuestion;
}

export const Theme = ({id, onPress, isFocus, nameTheme}: Props) => {
  const getBackground = useCallback(() => {
    switch (nameTheme) {
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
  }, [nameTheme]);

  return (
    <Pressable
      onPress={() => onPress(id)}
      style={[
        styles.theme,
        {
          borderColor: isFocus ? 'blue' : 'transparent',
        },
        {
          backgroundColor: nameTheme === 'Standard' ? '#F5f5f5' : 'transparent',
        },
      ]}>
      {nameTheme !== 'Standard' && (
        <Image
          source={getBackground()}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <Text style={styles.textTheme}>{nameTheme}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  theme: {
    flexBasis: '30%',
    height: 100,
    borderWidth: 1,
    justifyContent: 'flex-end',
  },
  textTheme: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    zIndex: 1,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});
