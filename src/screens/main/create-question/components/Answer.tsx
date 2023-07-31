import React from 'react';
import {StyleSheet, TextInput, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  color: string;
  value: string;
  isAnswer?: boolean;
  isOptional?: boolean;
  isEdit?: boolean;
  isFocus?: boolean;
  index?: number;
  kahootID?: string;
  id?: string;

  typeTf?: boolean;
  hidePlaceHoder?: boolean;
  handleOnChangeTextAnswer?: (text: string) => void;
  handleChoiceAnswer?: (index: number) => void;
  navigation?: any;
}

export const Answer = ({
  color,
  value,
  isAnswer = false,
  isEdit = false,
  isFocus = false,
  hidePlaceHoder = false,
  isOptional,
  index,
  typeTf,
  kahootID,
  handleOnChangeTextAnswer,
  handleChoiceAnswer,
  id,
  navigation,
}: Props) => {
  return (
    <Pressable
      style={[
        styles.textInput,
        {backgroundColor: color},
        {height: typeTf ? 200 : 100},
      ]}
      onPress={() => {
        if (!typeTf) {
          navigation.navigate('ModalQuestionScreen', {
            indexQuestion: index,
            kahootID: kahootID,
            id: id,
          });
        } else {
          handleChoiceAnswer!(index!);
        }
      }}>
      <TextInput
        editable={isEdit}
        style={styles.input}
        autoFocus={isFocus}
        onChangeText={text => handleOnChangeTextAnswer!(text)}
        multiline={true}
        value={value}
        selectionColor={'black'}
        maxFontSizeMultiplier={1}
        underlineColorAndroid="transparent"
        placeholder={
          hidePlaceHoder ? '' : isOptional ? 'Optional' : 'Add answer'
        }
        placeholderTextColor={
          isOptional ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)'
        }
      />
      <Icon
        name="checkmark-circle"
        size={25}
        color={'#30d916'}
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
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
