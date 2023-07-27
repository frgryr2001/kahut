import React from 'react';
import {View} from 'react-native';
import ButtonCustom from './ButtonCustom';
import {RootStackParams} from '../../../../navigation/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch} from '../../../../redux/store';
import {addQuestion} from '../../../../redux/slices/questionSlice/reducer';
import {QuestionKahoot} from '../../../../types/question';
import {v4 as uuidv4} from 'uuid';

interface Props {
  navigation: StackNavigationProp<RootStackParams, 'QuestionScreen', undefined>;
  handleCloseModalPress: () => void;
  idQuestion: string;
}

const ListTypeQuestion = ({
  navigation,
  handleCloseModalPress,
  idQuestion,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleAddQuestionInit = async (type: 'quiz' | 'trueorfalse') => {
    const questionInit: QuestionKahoot = {
      id: uuidv4(),
      question: '',
      type,
      media: '',
      timeLimit: 20,
      points: 0,
      answers: [],
    };

    dispatch(addQuestion({idQuestion: idQuestion, question: questionInit}));
    return questionInit;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',

        gap: 10,
        width: '100%',
      }}>
      <ButtonCustom
        as="card"
        label="Quiz"
        onPress={() => {
          handleAddQuestionInit('quiz').then(question => {
            navigation.navigate('CreateQuestionScreen', {
              type: 'quiz',
              kahootID: idQuestion,
              id: question.id ?? '',
            });
          });

          handleCloseModalPress();
        }}
      />
      <ButtonCustom
        as="card"
        label="True or False"
        onPress={() => {
          handleAddQuestionInit('trueorfalse').then(question => {
            navigation.navigate('CreateQuestionScreen', {
              type: 'quiz',
              kahootID: idQuestion,
              id: question.id ?? '',
            });
          });
          handleCloseModalPress();
        }}
      />
    </View>
  );
};

export default ListTypeQuestion;
