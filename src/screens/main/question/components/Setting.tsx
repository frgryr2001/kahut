import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../../../../navigation/AppNavigationContainer';
import {StackNavigationProp} from '@react-navigation/stack';
import {Question} from '../../../../types/question';

interface SettingProps {
  navigation: StackNavigationProp<RootStackParams, 'QuestionScreen', undefined>;
  kahoot: Question | undefined;
}
const Setting = ({navigation, kahoot}: SettingProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('SettingQuestionScreen', {
          kahoot: kahoot!,
        })
      }>
      <View style={styles.btn}>
        <Icon name="settings-outline" size={25} color="black" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    flex: 0.15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
});

export default Setting;
