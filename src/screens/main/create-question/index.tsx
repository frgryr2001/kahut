import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {RootStackParams} from '../../../navigation/Navigation';
import {PaddingContainer} from '../../../components/layouts/PaddingContainer';
import {AnswerBox, Header, TimeLimit} from './components';
import {ImageCover} from '../question/components';
import Animated from 'react-native-reanimated';
import {sharedTransition} from '../../../services/utils/CustomAnimation';

const HEIGHT_HEADER = 50;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height + HEIGHT_HEADER;
interface Props
  extends StackScreenProps<RootStackParams, 'CreateQuestionScreen'> {}

export const CreateQuestionScreen = ({navigation, route}: Props) => {
  const {type, question = ''} = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-100}>
        <ScrollView automaticallyAdjustKeyboardInsets>
          <View style={styles.container}>
            <Header navigation={navigation} typeQuestion={type} />
            <PaddingContainer>
              {/* Header */}
              <View>
                <ImageCover as="media" content="Add media" />
                {/* Time limit */}
                <TimeLimit />
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
                      question: question,
                    })
                  }>
                  <Animated.View
                    style={{width: width, paddingHorizontal: 10}}
                    sharedTransitionTag="sharedTag123"
                    sharedTransitionStyle={sharedTransition}>
                    <TextInput
                      editable={false}
                      textAlignVertical="center"
                      value={question}
                      multiline={true}
                      style={styles.inputQuestion}
                      placeholder="Tap to add question"
                    />
                  </Animated.View>
                </Pressable>

                {/* Answer */}
                <AnswerBox />
              </View>
            </PaddingContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
