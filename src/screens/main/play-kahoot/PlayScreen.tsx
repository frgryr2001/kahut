import {SafeAreaView} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {QuestionBox} from './components';

interface Props extends StackScreenProps<RootStackParams, 'PlayScreen'> {}
export default function PlayScreen({navigation, route}: Props) {
  const {kahoot} = route.params;
  const {questions} = kahoot;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <QuestionBox
        questions={questions}
        numberQuestion={questions.length}
        navigation={navigation}
        kahootId={kahoot.id}
      />
    </SafeAreaView>
  );
}
