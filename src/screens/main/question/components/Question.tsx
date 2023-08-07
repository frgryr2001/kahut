import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {QuestionKahoot} from '../../../../types/question';

interface Props {
  question: QuestionKahoot;
  index: number;
  navigation: any;
  idQuestion: string;
  validateQuestionInList: (index: number) => boolean;
}

const Question = ({
  question,
  index,
  navigation,
  idQuestion,
  validateQuestionInList,
}: Props) => {
  const handleClickQuestion = () => {
    navigation.navigate('CreateQuestionScreen', {
      type: question.type,
      kahootID: idQuestion,
      id: question.id,
    });
  };
  const check = validateQuestionInList!(index);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleClickQuestion}>
      <View style={styles.questionContainer}>
        <View style={styles.imageQuestion}>
          {/* <Icon name="image-outline" size={30} color="#BDBDBD" /> */}
          {question.media === '' ? (
            <Icon name="image-outline" size={30} color="#BDBDBD" />
          ) : (
            <Image
              source={{
                uri: `file:///data/user/0/com.kahut/cache/${question.media}`,
              }}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          )}
        </View>
        <Text style={styles.typeQuestion}>
          {index + 1} -{' '}
          {question.type.toLocaleUpperCase() === 'TRUEORFALSE'
            ? 'TRUE OR FALSE'
            : question.type.toLocaleUpperCase()}
        </Text>
        {/* icon warning ! */}
        {check ? null : (
          <Icon name="alert-circle-outline" size={25} color="#f55742" />
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    height: 80,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imageQuestion: {
    flex: 0.4,
    backgroundColor: '#969da3',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeQuestion: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    paddingLeft: 10,
    paddingTop: 5,
  },
});
export default Question;
