import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export default function QuestionTitle({title}: {title: string}) {
  const {colors} = useTheme();

  return (
    <Text
      style={[
        styles.question,
        {
          color: colors.text,
        },
      ]}>
      {title}
    </Text>
  );
}
const styles = StyleSheet.create({
  question: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});
