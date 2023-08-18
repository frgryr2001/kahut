import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface QuizAnswer {
  id: number;
  text?: string;
  image?: string;
}

interface CardProps {
  answer: {
    type: string;
    inOrder: number;
    media: string;
    question: string;
    userAnswer: boolean | QuizAnswer;
    correctAnswer: boolean | QuizAnswer;
    isCorrect: boolean;
    point: number;
  };
}

export default function CardReportAnswer({answer}: CardProps) {
  const {colors} = useTheme();

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        height: 'auto',
        gap: 16,
      }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#777', fontWeight: '700'}}>
          {answer.inOrder} - {answer.type}
        </Text>
        <Text style={{color: colors.text, fontWeight: '700'}}>
          point : {answer.point}
        </Text>
      </View>

      <View style={{flexDirection: 'row', gap: 16, alignItems: 'flex-start'}}>
        {answer.media && (
          <Image
            source={{uri: answer.media}}
            style={{
              width: 70,
              height: 45,
              objectFit: 'cover',
            }}
          />
        )}
        <Text
          style={{
            color: colors.text,
            flex: 1,
            lineHeight: 18,
            fontWeight: '700',
          }}>
          {answer.question}
        </Text>
      </View>

      <View style={{gap: 8}}>
        <Text style={{color: colors.text, fontWeight: '700'}}>
          Your answered
        </Text>

        {answer.isCorrect ? (
          // Correct
          <CorrectAnswer
            typeAnswer={answer.type}
            userAnswer={answer.userAnswer}
          />
        ) : (
          // Incorrect
          <View
            style={{
              gap: 16,
            }}>
            {/* Your answer  */}
            <YourAnswer
              typeAnswer={answer.type}
              userAnswer={answer.userAnswer}
            />
            {/* Correct answer */}
            <CorrectAnswer
              typeAnswer={answer.type}
              userAnswer={answer.correctAnswer}
            />
          </View>
        )}
      </View>
    </View>
  );
}
function YourAnswer({
  typeAnswer,
  userAnswer,
}: {
  typeAnswer: string;
  userAnswer: QuizAnswer | boolean;
}) {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#e00d18',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {typeAnswer === 'quiz' && (userAnswer as QuizAnswer).text && (
        <Text style={{color: '#fff', fontWeight: '700'}}>
          {(userAnswer as QuizAnswer).text}
        </Text>
      )}

      {typeAnswer === 'quiz' && (userAnswer as QuizAnswer).image && (
        <Image
          source={{uri: (userAnswer as QuizAnswer).image}}
          style={{
            width: 70,
            height: 40,
            objectFit: 'cover',
          }}
        />
      )}

      {typeAnswer === 'trueorfalse' && (
        <Text style={{color: '#fff', fontWeight: '700'}}>
          {(userAnswer as boolean) ? 'True' : 'False'}
        </Text>
      )}

      <Icon name="close" size={24} color="#fff" />
    </View>
  );
}

function CorrectAnswer({
  typeAnswer,
  userAnswer,
}: {
  typeAnswer: string;
  userAnswer: QuizAnswer | boolean;
}) {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#10872a',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {typeAnswer === 'quiz' && (userAnswer as QuizAnswer).text && (
        <Text style={{color: '#fff', fontWeight: '700'}}>
          {(userAnswer as QuizAnswer).text}
        </Text>
      )}

      {typeAnswer === 'quiz' && (userAnswer as QuizAnswer).image && (
        <Image
          source={{uri: (userAnswer as QuizAnswer).image}}
          style={{
            width: 70,
            height: 40,
            objectFit: 'cover',
          }}
        />
      )}

      {typeAnswer === 'trueorfalse' && (
        <Text style={{color: '#fff', fontWeight: '700'}}>
          {(userAnswer as boolean) ? 'True' : 'False'}
        </Text>
      )}

      <Icon name="check" size={24} color="#fff" />
    </View>
  );
}
