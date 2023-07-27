import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Answer} from './Answer';

const width = Dimensions.get('window').width;
const color = ['#3273e3', '#e84357', '#59c242', '#d9db44'];

interface Props {
  navigation: any;
  kahootID: string;
  id: string;
}

export const AnswerBox = ({navigation, kahootID, id}: Props) => {
  return (
    <View style={styles.container}>
      {color.map((item, index) => {
        return (
          <Answer
            color={item}
            key={item}
            index={index}
            isOptional={index > 1}
            navigation={navigation}
            kahootID={kahootID}
            id={id}
          />
        );
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
