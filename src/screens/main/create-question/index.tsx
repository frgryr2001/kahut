import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParams} from '../../../navigation/Navigation';
interface Props
  extends StackScreenProps<RootStackParams, 'CreateQuestionScreen'> {}

export const CreateQuestionScreen = ({navigation, route}: Props) => {
  const {type} = route.params;
  return (
    <View>
      <Text>{type}</Text>
    </View>
  );
};
