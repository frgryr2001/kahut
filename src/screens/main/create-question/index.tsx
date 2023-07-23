import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, TextInput, Pressable} from 'react-native';
import {RootStackParams} from '../../../navigation/Navigation';
import {PaddingContainer} from '../../../components/layouts/PaddingContainer';
import {AnswerBox, Header, TimeLimit} from './components';
import {ImageCover} from '../question/components';
import Animated from 'react-native-reanimated';
import {sharedTransition} from '../../../services/utils/CustomAnimation';

interface Props
  extends StackScreenProps<RootStackParams, 'CreateQuestionScreen'> {}

export const CreateQuestionScreen = ({navigation, route}: Props) => {
  const {type} = route.params;
  return (
    <View style={styles.container}>
      <Header navigation={navigation} typeQuestion={type} />
      <PaddingContainer>
        {/* Header */}
        <View style={styles.flex}>
          <ImageCover as="media" content="Add media" />
          {/* Time limit */}
          <TimeLimit />
        </View>
        <View style={styles.questionContainer}>
          {/* Question */}
          <Pressable onPress={() => navigation.navigate('ModalQuestionScreen')}>
            <TextInput
              editable={false}
              textAlignVertical="center"
              multiline={true}
              style={styles.inputQuestion}
              placeholder="Tap to add question"
            />
            {/* <Animated.View
              style={{width: 150, height: 150, backgroundColor: 'green'}}
              sharedTransitionTag="sharedTag123"
              sharedTransitionStyle={sharedTransition}
            /> */}
          </Pressable>

          {/* Answer */}
          <AnswerBox />
        </View>
      </PaddingContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  flex: {
    flex: 1,
  },
  questionContainer: {
    flex: 1,
    marginTop: -150,
  },
  inputQuestion: {
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
