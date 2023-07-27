import React from 'react';
import {StyleSheet, TextInput, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  color: string;
  isAnswer?: boolean;
  isOptional?: boolean;
  isEdit?: boolean;
  isFocus?: boolean;
  index?: number;
  hidePlaceHoder?: boolean;
  navigation?: any;
}

export const Answer = ({
  color,
  isAnswer = false,
  isEdit = false,
  isFocus = false,
  hidePlaceHoder = false,
  isOptional,
  index,
  navigation,
}: Props) => {
  return (
    <Pressable
      style={[styles.textInput, {backgroundColor: color}]}
      onPress={() =>
        navigation.navigate('ModalQuestionScreen', {
          isAnswer: false,
          answer: '123',
          indexQuestion: index,
        })
      }>
      <TextInput
        editable={isEdit}
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlignVertical: 'center',
          textAlign: 'center',
        }}
        autoFocus={isFocus}
        multiline={true}
        selectionColor={'black'}
        maxFontSizeMultiplier={1}
        placeholder={
          hidePlaceHoder ? '' : isOptional ? 'Optional' : 'Add answer'
        }
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
    </Pressable>
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
