import React from 'react';
import {View} from 'react-native';
import Question from './Question';

const ListQuestion = ({questions}: any) => {
  return (
    <View
      style={{
        marginTop: 10,
        rowGap: 10,
      }}>
      {/* <Question /> */}
      {questions.map((item, index) => (
        <Question key={index} />
      ))}
    </View>
  );
};

export default ListQuestion;
