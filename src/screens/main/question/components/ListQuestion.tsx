import React from 'react';
import {View} from 'react-native';
import Question from './Question';
import {QuestionKahoot} from '../../../../types/question';
import {Question as QuestionKahootApi} from '../../../../types/kahoot.type';

interface Props {
  questions: QuestionKahoot[] | QuestionKahootApi[];
  navigation: any;
  idQuestion: string | number;
}

const ListQuestion = ({questions, navigation, idQuestion}: Props) => {
  const validateQuestionInList = (index: number) => {
    if (questions[index]?.answers?.length === 0) {
      return false;
    }
    if (questions[index]?.question === '') {
      return false;
    }
    const check = questions[index]?.answers?.some(
      item => item.isCorrect && item.text,
    );
    if (!check) {
      return false;
    }
    return true;
  };

  return (
    <View
      style={{
        marginTop: 10,
        rowGap: 10,
      }}>
      {/* <Question /> */}
      {questions.map((item, index) => (
        <Question
          key={item.id}
          question={item as any}
          index={index}
          navigation={navigation}
          idQuestion={idQuestion}
          validateQuestionInList={validateQuestionInList}
        />
      ))}
    </View>
  );
};

export default ListQuestion;
