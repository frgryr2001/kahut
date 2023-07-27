import React from 'react';
import {View} from 'react-native';
import Question from './Question';
import {QuestionKahoot} from '../../../../types/question';

interface Props {
  questions: QuestionKahoot[];
  navigation: any;
  idQuestion: string;
}

const ListQuestion = ({questions, navigation, idQuestion}: Props) => {
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
          question={item}
          index={index}
          navigation={navigation}
          idQuestion={idQuestion}
        />
      ))}
    </View>
  );
};

export default ListQuestion;
