import {SafeAreaView} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {QuestionBox} from './components';
import {v4 as uuidv4} from 'uuid';

interface Props extends StackScreenProps<RootStackParams, 'PlayScreen'> {}
export default function PlayScreen({navigation, route}: Props) {
  const {kahoot, assignmentId} = route.params;
  const {questions} = kahoot!;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <QuestionBox
        key={uuidv4()}
        questions={questions}
        numberQuestion={questions.length}
        navigation={navigation}
        kahootId={assignmentId ? kahoot?.kahootId! : kahoot?.id!}
        kahootObj={kahoot}
        assignmentId={assignmentId}
      />
    </SafeAreaView>
  );
}
