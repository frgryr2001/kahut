import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {Button} from '../../../../components/ui';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useTheme} from '@react-navigation/native';
import {IPlayData} from '../../../../types/play';
import {postResultPlayOfUser} from '../../../../services/play/play.service';

interface Props {
  timeLimit: number;
  continueQuestion: () => void;
  isPause: boolean;
  endQuestion: boolean;
  handleNextQuestion: () => void;
  handleAnswer: (index: number | boolean | null) => void;
  choiced: number | boolean | null;
  startIndex: number;
  dataCompleted: IPlayData;
}

export default function Footer({
  timeLimit,
  continueQuestion,
  isPause,
  endQuestion,
  handleNextQuestion,
  startIndex,
  handleAnswer,
  choiced,
  dataCompleted,
}: Props) {
  const {colors} = useTheme();
  const flag = React.useRef(false);

  const handleSubmitAnswer = async (choice: any) => {
    if (choiced !== undefined && !endQuestion) {
      continueQuestion();
      handleAnswer(choiced);
    }
    if (endQuestion) {
      if (dataCompleted.answers?.length === startIndex + 1) {
        return;
      }
      dataCompleted.answers?.push(choice);
      console.log(dataCompleted);

      //   submit answer to API
      const data = await postResultPlayOfUser(dataCompleted);
      if (data.code === 200) {
        Alert.alert(data.message, `Your score is ${dataCompleted.point}`);
      }
    }
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
            handleAnswer(null);
          }
          if (remainingTime === 0 && endQuestion) {
            if (!flag.current) {
              flag.current = true;
              if (choiced === undefined || choiced) {
                handleSubmitAnswer(null);
              }
            }
          }
        }}
        colorsTime={[7, 5, 2, 0]}>
        {({remainingTime}) => {
          return <Text>{remainingTime}</Text>;
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
        onPress={() => handleSubmitAnswer(choiced)}
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
