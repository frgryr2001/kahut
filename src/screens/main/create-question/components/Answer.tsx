import React from 'react';
import {StyleSheet, TextInput, Pressable, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppDispatch} from '../../../../redux/store';
import {deleteAnswerQuestion} from '../../../../redux/slices/questionSlice/reducer';

interface Props {
  color: string;
  value: string;
  isAnswer?: boolean;
  isOptional?: boolean;
  isEdit?: boolean;
  idAnswer?: string | number;
  image?: string;
  isFocus?: boolean;
  index?: number;
  kahootID?: string | number;
  id?: string | number;
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
  idAnswer,
  image,
  index,
  typeTf,
  kahootID,
  handleOnChangeTextAnswer,
  handleChoiceAnswer,
  id,
  navigation,
}: Props) => {
  const dispatch = useAppDispatch();
  const [showDeleteIcon, setShowDeleteIcon] = React.useState(false);

  return (
    <Pressable
      style={[
        styles.textInput,
        {backgroundColor: color},
        {height: typeTf ? 200 : 100},
      ]}
      onLongPress={() => {
        setShowDeleteIcon(true);
      }}
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
      {image ? (
        <ImageBackground
          source={{
            uri: image.startsWith('http')
              ? image
              : `file:///data/user/0/com.kahut/cache/${image}`,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="contain"
        />
      ) : (
        <TextInput
          editable={isEdit}
          style={[
            styles.input,
            {
              color: '#fff',
            },
          ]}
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
      )}

      {showDeleteIcon && (
        <Pressable
          onPress={() => {
            dispatch(
              deleteAnswerQuestion({
                kahootId: kahootID!,
                questionId: id!,
                idAnswer: idAnswer! as number,
                index: index!,
              }),
            );
            setShowDeleteIcon(false);
          }}
          style={{
            position: 'absolute',
            left: 0,
          }}>
          <Icon
            name="close-circle"
            size={25}
            color={'#fff'}
            style={{
              opacity: showDeleteIcon ? 1 : 0,
            }}
          />
        </Pressable>
      )}

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

    textAlign: 'center',
    flex: 1,
  },
});
