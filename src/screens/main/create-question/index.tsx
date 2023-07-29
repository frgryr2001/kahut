import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  SafeAreaView,
  Text,
} from 'react-native';
import {RootStackParams} from '../../../navigation/Navigation';
import {PaddingContainer} from '../../../components/layouts/PaddingContainer';
import {AnswerBox, Header, TimeLimit} from './components';
import {ImageCover} from '../question/components';
import {useSelector} from 'react-redux';
import {selectQuestions} from '../../../redux/slices/questionSlice/selector';

const HEIGHT_HEADER = 50;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height + HEIGHT_HEADER;
interface Props
  extends StackScreenProps<RootStackParams, 'CreateQuestionScreen'> {}

export const CreateQuestionScreen = ({navigation, route}: Props) => {
  const {kahootID, id} = route.params;

  const kahootArr = useSelector(selectQuestions);
  const kahoot = kahootArr.find(item => item.idQuestion === kahootID);
  const question = kahoot?.questions.find(item => item.id === id);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <Header navigation={navigation} typeQuestion={question?.type ?? ''} />
        <PaddingContainer>
          {/* Header */}
          <View>
            <ImageCover
              as="media"
              content="Add media"
              imageDefault={question?.media ?? ''}
              kahootID={kahootID}
              id={id}
            />
            {/* Time limit */}
            <TimeLimit kahootID={kahootID} id={id} question={question} />
          </View>
          <View style={styles.questionContainer}>
            {/* Question */}
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('ModalQuestionScreen', {
                  isQuestionTitle: true,
                  questionTitle: question?.question,
                  kahootID: kahootID,
                  id: id,
                })
              }>
              <View style={{width: width, paddingHorizontal: 10}}>
                <TextInput
                  editable={false}
                  textAlignVertical="center"
                  value={question?.question}
                  multiline={true}
                  style={styles.inputQuestion}
                  placeholder="Tap to add question"
                />
              </View>
            </Pressable>

            {/* Answer */}
            {question?.type === 'quiz' && (
              <AnswerBox
                navigation={navigation}
                kahootID={kahootID}
                id={id}
                answers={question.answers}
              />
            )}
            {question?.type === 'trueorfalse' && <Text>True or false</Text>}
          </View>
        </PaddingContainer>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
  questionContainer: {
    flex: 1,
  },
  inputQuestion: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: 10,
    height: 80,
    borderRadius: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1,
  },
});
