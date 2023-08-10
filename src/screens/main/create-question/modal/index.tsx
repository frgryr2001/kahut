import React, {useEffect} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {RootStackParams} from '../../../../navigation/AppNavigationContainer';
import {StackScreenProps} from '@react-navigation/stack';

import {useDebounce} from '../../../../hooks/useDebounce';
import {useAppDispatch} from '../../../../redux/store';
import {
  addTextAnswerQuestion,
  addTitleQuestion,
  changeIsCorrectAnswerQuestion,
} from '../../../../redux/slices/questionSlice/reducer';
import {useSelector} from 'react-redux';
import {selectQuestions} from '../../../../redux/slices/questionSlice/selector';
import AnswerModal from './AnswerModal';

interface Props
  extends StackScreenProps<RootStackParams, 'ModalQuestionScreen'> {}
const ModalScreen = ({navigation, route}: Props) => {
  const {
    indexQuestion = 0,
    isQuestionTitle,
    id,
    kahootID,
    questionTitle,
  } = route.params;
  const kahootArr = useSelector(selectQuestions);
  const kahoot = kahootArr.find(item => item.idQuestion === kahootID);
  const questions = kahoot?.questions.find(item => item.id === id);
  const {answers} = questions ?? {answers: []};
  const [value, setValue] = React.useState(questionTitle);
  const [valueTextAnswer, setValueTextAnswer] = React.useState(
    answers[indexQuestion]?.text ?? '',
  );
  const [isSwitchOn, setIsSwitchOn] = React.useState(function () {
    if (answers[indexQuestion]?.isCorrect) {
      return answers[indexQuestion]?.isCorrect;
    }
    return false;
  });

  const ref = React.useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const valueQuestionDebounce = useDebounce(value, 150);
  const valueAnswerDebounce = useDebounce(valueTextAnswer, 150);
  const firstUpdate = React.useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (valueQuestionDebounce || valueQuestionDebounce === '') {
      dispatch(
        addTitleQuestion({
          kahootId: kahootID,
          questionId: id,
          titleQuestion: valueQuestionDebounce,
        }),
      );
    }
  }, [valueQuestionDebounce, dispatch, kahootID, id]);

  const handleOnChangeTextAnswer = (text: string) => {
    setValueTextAnswer(text);
  };
  const handleOnPressSwitch = () => {
    setIsSwitchOn(prevState => {
      return !prevState;
    });
    dispatch(
      changeIsCorrectAnswerQuestion({
        kahootId: kahootID,
        questionId: id,
        index: indexQuestion,
        isCorrect: !isSwitchOn,
      }),
    );
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (valueAnswerDebounce || valueAnswerDebounce === '') {
      dispatch(
        addTextAnswerQuestion({
          kahootId: kahootID,
          questionId: id,
          answer: valueAnswerDebounce,
          index: indexQuestion,
        }),
      );
    }
  }, [valueAnswerDebounce, dispatch, kahootID, id, indexQuestion]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.wrapper,
            !isQuestionTitle ? {alignItems: 'center'} : {},
          ]}>
          {isQuestionTitle ? (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={setValue}
              textAlignVertical="center"
              autoFocus
              autoCorrect={false}
              multiline={true}
              style={styles.textInputQuestion}
              placeholder="Enter your question"
            />
          ) : (
            <>
              <AnswerModal
                navigation={navigation}
                valueTextAnswer={valueTextAnswer}
                handleOnChangeTextAnswer={handleOnChangeTextAnswer}
                indexQuestion={indexQuestion}
                isSwitchOn={isSwitchOn}
                kahootID={kahootID}
                id={id}
                handleOnPressSwitch={handleOnPressSwitch}
                answers={answers}
              />
            </>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  wrapper: {
    width: '100%',
    paddingHorizontal: 10,
    position: 'relative',
    top: 200,
  },
  textInputQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: 10,
    height: 80,
    borderRadius: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  inputModal: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: 10,
    height: 80,
    borderRadius: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default ModalScreen;
