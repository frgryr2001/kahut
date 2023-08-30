import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';

interface Props {
  onPress?: () => void;
  as: 'card' | 'button';
  label: string;
  color?: 'primary' | 'secondary';
}

const ButtonCustom = ({
  onPress,
  as = 'button',
  label,
  color = 'primary',
}: Props) => {
  const animaValue = React.useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(animaValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animaValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (onPress) {
      onPress();
    }
  };
  let buttonStyle = {};
  if (as === 'card') {
    buttonStyle = {
      ...styles.addQuestion,
      ...styles.card,

      transform: [{scale: animaValue}],
    };
  } else {
    buttonStyle = {
      ...styles.addQuestion,
      ...styles.absolute,
      backgroundColor: color === 'primary' ? '#2886de' : 'red',
      transform: [{scale: animaValue}],
    };
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={buttonStyle}
      onPress={handlePress}>
      <Text
        style={[
          styles.textBtn,
          {
            fontSize: as === 'card' ? 14 : 14,
            color: as === 'card' ? 'black' : 'white',
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  addQuestion: {
    borderRadius: 3,

    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  absolute: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  textBtn: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    width: '50%',
    height: 80,
    backgroundColor: '#F5F5F5',
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    justifyContent: 'center',
  },
});
export default ButtonCustom;
