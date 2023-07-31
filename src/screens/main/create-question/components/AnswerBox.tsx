import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Answer} from './Answer';
import {useAppDispatch} from '../../../../redux/store';
import {updateFieldQuestion} from '../../../../redux/slices/questionSlice/reducer';

const width = Dimensions.get('window').width;
const color = ['#3273e3', '#e84357', '#b93ddb', '#d9db44'];
const typeAnswer = ['TRUE', 'FALSE'];

interface Props {
  navigation: any;
  kahootID: string;
  id: string;
  answer?: boolean;
  answers?:
    | []
    | [
        {
          text?: string;
          isCorrect: boolean;
          image?: string;
        },
      ];
}

export const AnswerBox = ({
  navigation,
  kahootID,
  id,
  answers,
  answer,
}: Props) => {
  const dispatch = useAppDispatch();
  const [indexChoice, setIndexChoice] = React.useState<number>(answer ? 0 : 1);
  const handleChoiceAnswer = (index: number) => {
    setIndexChoice(index);
    dispatch(
      updateFieldQuestion({
        kahootId: kahootID,
        questionId: id,
        fieldsToUpdate: {
          answer: index === 0 ? true : false,
        },
      }),
    );
  };
  if (answers) {
    return (
      <View style={styles.container}>
        {color.map((item, index) => {
          return (
            <Answer
              value={answers[index]?.text ?? ''}
              isAnswer={answers[index]?.isCorrect ?? false}
              color={item}
              key={item}
              index={index}
              isOptional={index > 1}
              navigation={navigation}
              kahootID={kahootID}
              id={id}
            />
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {typeAnswer.map((item, index) => {
        return (
          <Answer
            value={item}
            isAnswer={index === indexChoice}
            color={color[index]}
            key={item}
            typeTf
            index={index}
            navigation={navigation}
            kahootID={kahootID}
            handleChoiceAnswer={handleChoiceAnswer}
            id={id}
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    width: width - 20,
    flexWrap: 'wrap',
    rowGap: 5,
    justifyContent: 'space-between',
  },
});
