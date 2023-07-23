import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Answer} from './Answer';

const width = Dimensions.get('window').width;
const color = ['#3273e3', '#e84357', '#59c242', '#d9db44'];
export const AnswerBox = () => {
  return (
    <View style={styles.container}>
      {color.map(item => {
        return <Answer color={item} key={item} />;
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    width: width - 20,
    flexWrap: 'wrap',
    rowGap: 5,
    justifyContent: 'space-between',
  },
});
