import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';

const AddQuestion = () => {
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
  };
  const buttonStyle = {
    ...styles.addQuestion,
    transform: [{scale: animaValue}],
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={buttonStyle}
      onPress={handlePress}>
      <Text style={styles.textBtn}>Add {'\n'} question</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  addQuestion: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    borderRadius: 3,
    zIndex: 1,
    backgroundColor: '#2886de',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  textBtn: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
});
export default AddQuestion;
