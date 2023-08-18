import {View, Text} from 'react-native';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import QuestionImage from './QuestionImage';
import {KahootDetailData, Question} from '../../../../types/kahoot.type';
import QuestionTitle from './QuestionTitle';
import Box from './Box';
import {Button, ModalCustom} from '../../../../components/ui';
import {useTheme} from '@react-navigation/native';
import AnswerBox from './AnswerBox';
import {siteConfig} from '../../../../configs/siteConfig';
import {IPlayData} from '../../../../types/play';

interface Props {
  questions: Question[];
  numberQuestion: number;
  navigation: any;
  kahootId: number;
  kahootObj?: KahootDetailData;
}

export default function QuestionBox({
  questions,
  numberQuestion,
  navigation,
  kahootId,
  kahootObj,
}: Props) {
  const {colors} = useTheme();
  const [startIndex, setStartIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(true);
  const [answered, setAnswered] = React.useState<
    Array<number | boolean | null>
  >([]);
  const [choiced, setChoiced] = React.useState<number | boolean>();

  const score = React.useMemo(() => {
    const sumScore = questions.reduce((acc, cur, index) => {
      if (typeof answered[index] === 'number') {
        const answerObj = cur.answers.find(
          (answer, _) => answer.id === answered[index],
        );

        if (answerObj?.isCorrect) {
          acc += cur.point;
        }
      }
      if (typeof answered[index] === 'boolean') {
        if (answered[index] === Boolean(cur.answer)) {
          acc += cur.point;
        }
      }
      return acc;
    }, 0);
    return sumScore;
  }, [answered, questions]);

  const dataCompleted: IPlayData = React.useMemo(() => {
    return {
      kahootId,
      point: score,
      answers: answered,
    };
  }, [kahootId, score, answered]);

  const handleBack = () => {
    navigation.goBack();
  };

  const continueQuestion = () => {
    if (startIndex === numberQuestion - 1) {
      //   TODO: handle end game
      return console.log('end');
    }

    setStartIndex(startIndex + 1);
  };
  const handleAnswer = (index: number | boolean | null) => {
    setAnswered(prev => [...prev, index]);
    setChoiced(undefined);
  };

  const handleNextQuestion = () => {
    setStartIndex(prev => prev + 1);
  };

  const handleChoice = (index: number | boolean) => {
    setChoiced(index);
  };

  const visibleResultScreen = (
    playId: number,
    kahootID: number,
    assignmentId: number,
  ) => {
    navigation.navigate('ResultPlayKahootScreen', {
      id: playId,
      kahootId: kahootID,
      assignmentId,
      kahootObj,
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ModalCustom
        modalVisible={modalVisible}
        title={siteConfig.titleModalBeforePlay}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 20,
            color: colors.text,
            opacity: 0.8,
          }}>
          <Text style={{fontWeight: 'bold'}}>Note:</Text> You are about to start
          a quiz with <Text style={{fontWeight: 'bold'}}>{numberQuestion}</Text>{' '}
          questions.{siteConfig.noteModalBeforePlay}
        </Text>
        <Button
          title="Start"
          onPress={() => {
            setModalVisible(false);
          }}
          color={colors.primary}
          size="medium"
          isActive
        />
      </ModalCustom>
      <Header
        startIndex={startIndex + 1}
        numberQuestion={numberQuestion}
        typeQuestion={questions[startIndex].type}
        onPressQuit={() => handleBack()}
      />

      <Box>
        <QuestionImage media={questions[startIndex].media} />
        <QuestionTitle title={questions[startIndex].question} />
        <AnswerBox
          type={questions[startIndex].type as 'trueorfalse' | 'quiz'}
          answers={questions[startIndex].answers}
          handleChoice={handleChoice}
          choiced={choiced!}
        />
      </Box>

      <Footer
        timeLimit={questions[startIndex].timeLimit}
        continueQuestion={continueQuestion}
        isPause={modalVisible}
        startIndex={startIndex}
        endQuestion={startIndex === numberQuestion - 1}
        handleNextQuestion={handleNextQuestion}
        handleAnswer={handleAnswer}
        dataCompleted={dataCompleted}
        visibleResultScreen={visibleResultScreen}
        choiced={choiced!}
      />
    </View>
  );
}
