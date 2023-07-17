import React from 'react';
import {View} from 'react-native';
import Question from './Question';

const ListQuestion = () => {
  return (
    <View
      style={{
        marginTop: 10,
        rowGap: 10,
      }}>
      {/* <Question /> */}
      {Array.from(Array(8).keys()).map((item, index) => (
        <Question key={index} />
      ))}
    </View>
  );
};

export default ListQuestion;
