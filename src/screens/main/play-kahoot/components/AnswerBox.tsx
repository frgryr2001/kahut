import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Answer as IAnswer} from '../../../../types/kahoot.type';
import Answer from './Answer';
import {color} from '../../../../constants/answer';

interface Props {
  type: 'trueorfalse' | 'quiz';
  answers?: IAnswer[];
  answer?: boolean;
  choiced: number | boolean;
  handleChoice?: (item: number | boolean) => void;
}

export default function AnswerBox({
  type,
  answers,
  handleChoice,
  choiced,
}: Props) {
  return (
    <View style={styles.container}>
      {type === 'quiz' &&
        answers?.map((item, index) => (
          <Answer
            item={item}
            color={color[index]}
            handleChoice={handleChoice!}
            key={item.id}
            isChoice={choiced === item.id}
            imageAnswer={item.image}
          />
        ))}
      {type === 'trueorfalse' && (
        <>
          <Answer
            item={false}
            color={color[0]}
            handleChoice={handleChoice!}
            isChoice={choiced === false}
          />
          <Answer
            item={true}
            color={color[1]}
            handleChoice={handleChoice!}
            isChoice={choiced === true}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
