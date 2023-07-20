import React from 'react';
import {View} from 'react-native';
import ButtonCustom from './ButtonCustom';
import {RootStackParams} from '../../../../navigation/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<RootStackParams, 'QuestionScreen', undefined>;
  handleCloseModalPress: () => void;
}

const ListTypeQuestion = ({navigation, handleCloseModalPress}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',

        gap: 10,
        width: '100%',
      }}>
      <ButtonCustom
        as="card"
        label="Quiz"
        onPress={() => {
          navigation.navigate('CreateQuestionScreen', {type: 'quiz'});
          handleCloseModalPress();
        }}
      />
      <ButtonCustom
        as="card"
        label="True or False"
        onPress={() => {
          navigation.navigate('CreateQuestionScreen', {type: 'tf'});
          handleCloseModalPress();
        }}
      />
    </View>
  );
};

export default ListTypeQuestion;
