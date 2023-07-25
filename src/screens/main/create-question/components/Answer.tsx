import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  color: string;
  isAnswer?: boolean;
  isOptional?: boolean;
}

export const Answer = ({color, isAnswer = false, isOptional}: Props) => {
  return (
    <View style={[styles.textInput, {backgroundColor: color}]}>
      <TextInput
        editable={true}
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlignVertical: 'center',
          textAlign: 'center',
        }}
        multiline={true}
        maxFontSizeMultiplier={1}
        placeholder={isOptional ? 'Optional' : 'Add Answer'}
        placeholderTextColor={
          isOptional ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)'
        }
      />
      <Icon
        name="checkmark-circle-outline"
        size={25}
        color={'white'}
        style={{
          position: 'absolute',
          right: 0,
          opacity: isAnswer ? 1 : 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    width: '49%',
    height: 100,
    borderRadius: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
