import {View} from 'react-native';
import React from 'react';
import CardReportAnswer from '../card-report-answer/CardReportAnswer';

interface Props {
  answers: {
    type: string;
    inOrder: number;
    media: string;
    question: string;
    userAnswer: {
      id: number;
      text?: string;
      image?: string;
    };
    correctAnswer: {
      id: number;
      text?: string;
      image?: string;
    };
    isCorrect: boolean;
    point: number;
  }[];
}

export default function KahootReportList({answers}: Props) {
  return (
    <View
      style={{
        gap: 16,
        marginTop: 16,
      }}>
      {answers
        .sort((a, b) => a.inOrder - b.inOrder)
        .map(answer => (
          <CardReportAnswer key={JSON.stringify(answer)} answer={answer} />
        ))}
    </View>
  );
}
