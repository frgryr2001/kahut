import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from '../../../../components/ui';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useTheme} from '@react-navigation/native';

interface Props {
  timeLimit: number;
  continueQuestion: () => void;
  isPause: boolean;
  endQuestion: boolean;
  handleNextQuestion: () => void;
  handleAnswer: (index: number | boolean | null) => void;
  choiced: number | boolean | null;
  startIndex: number;

  visibleResultScreen: (
    playId: number,
    kahootID: number,
    assignmentId: number,
  ) => void;
}

export default function Footer({
  timeLimit,
  continueQuestion,
  isPause,
  endQuestion,
  handleNextQuestion,
  startIndex,
  choiced,
  handleAnswer,
}: Props) {
  const {colors} = useTheme();

  const handleSubmitAnswer = async (choice: any) => {
    handleAnswer(choice);
  };

  return (
    <View style={styles.footer}>
      {/* Time */}
      <CountdownCircleTimer
        isPlaying={!isPause}
        key={startIndex}
        duration={timeLimit}
        size={70}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        onUpdate={remainingTime => {
          if (remainingTime === 0 && !endQuestion) {
            handleNextQuestion();
            continueQuestion();
            handleSubmitAnswer(choiced ?? null);
          }
          if (remainingTime === 0 && endQuestion) {
            handleSubmitAnswer(choiced ?? null);
            continueQuestion();
          }
        }}
        colorsTime={[7, 5, 2, 0]}>
        {({remainingTime}) => {
          return (
            <Text
              style={{
                color: colors.text,
                fontFamily: 'Poppins-Regular',
              }}>
              {remainingTime}
            </Text>
          );
        }}
      </CountdownCircleTimer>
      {/* btn continue */}
      <Button
        title={endQuestion ? 'Submit' : 'Continue'}
        color={colors.primary}
        size="medium"
        isActive
        style={{
          marginTop: 0,
        }}
        onPress={() => {
          continueQuestion();
          handleSubmitAnswer(choiced ?? null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
});
