import {BlurView} from '@react-native-community/blur';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {RootStackParams} from '../../../../navigation/AppNavigationContainer';
import {StackScreenProps} from '@react-navigation/stack';
import {CustomSwitch} from './CustomSwitch';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebounce} from '../../../../hooks/useDebounce';
import {useAppDispatch} from '../../../../redux/store';
import {
  addImageAnswerQuestion,
  addTextAnswerQuestion,
  addTitleQuestion,
  changeIsCorrectAnswerQuestion,
} from '../../../../redux/slices/questionSlice/reducer';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {selectQuestions} from '../../../../redux/slices/questionSlice/selector';

const color = ['#3273e3', '#e84357', '#b93ddb', '#d9db44'];

interface Props
  extends StackScreenProps<RootStackParams, 'ModalQuestionScreen'> {}
const ModalScreen = ({navigation, route}: Props) => {
  const {
    indexQuestion = 0,
    isQuestionTitle,
    id,
    kahootID,
    questionTitle,
  } = route.params;
  const kahootArr = useSelector(selectQuestions);
  const kahoot = kahootArr.find(item => item.idQuestion === kahootID);
  const questions = kahoot?.questions.find(item => item.id === id);
  const {answers} = questions ?? {answers: []};
  const [value, setValue] = React.useState(questionTitle);
  const [valueTextAnswer, setValueTextAnswer] = React.useState(
    answers[indexQuestion]?.text ?? '',
  );
  const [isSwitchOn, setIsSwitchOn] = React.useState(
    answers[indexQuestion]?.isCorrect ?? false,
  );

  const ref = React.useRef<TextInput>(null);
  const dispatch = useAppDispatch();
  const valueQuestionDebounce = useDebounce(value, 150);
  const valueAnswerDebounce = useDebounce(valueTextAnswer, 150);
  const firstUpdate = React.useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (valueQuestionDebounce || valueQuestionDebounce === '') {
      dispatch(
        addTitleQuestion({
          kahootId: kahootID,
          questionId: id,
          titleQuestion: valueQuestionDebounce,
        }),
      );
    }
  }, [valueQuestionDebounce, dispatch, kahootID, id]);

  const handleOnChangeTextAnswer = (text: string) => {
    setValueTextAnswer(text);
  };
  const handleOnPressSwitch = () => {
    setIsSwitchOn(prevState => {
      return !prevState;
    });
    dispatch(
      changeIsCorrectAnswerQuestion({
        kahootId: kahootID,
        questionId: id,
        index: indexQuestion,
        isCorrect: !isSwitchOn,
      }),
    );
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (valueAnswerDebounce || valueAnswerDebounce === '') {
      dispatch(
        addTextAnswerQuestion({
          kahootId: kahootID,
          questionId: id,
          answer: valueAnswerDebounce,
          index: indexQuestion,
        }),
      );
    }
  }, [valueAnswerDebounce, dispatch, kahootID, id, indexQuestion]);
  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }
      dispatch(
        addImageAnswerQuestion({
          kahootId: kahootID,
          questionId: id,
          index: indexQuestion,
          image: response.assets![0].fileName as string,
        }),
      );
    });
  };
  return (
    <BlurView
      blurType="dark"
      blurAmount={5}
      reducedTransparencyFallbackColor="white"
      style={styles.container}>
      <Pressable
        onPress={() =>
          // dispatch action to update answer
          navigation.goBack()
        }
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.wrapper,
            !isQuestionTitle ? {alignItems: 'center'} : {},
          ]}>
          {isQuestionTitle ? (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={setValue}
              textAlignVertical="center"
              autoFocus
              autoCorrect={false}
              multiline={true}
              style={styles.textInputQuestion}
              placeholder="Enter your question"
            />
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <TextInput
                  value={valueTextAnswer}
                  onChangeText={handleOnChangeTextAnswer}
                  textAlignVertical="center"
                  autoFocus
                  autoCorrect={false}
                  multiline={true}
                  style={[
                    styles.textInputQuestion,
                    {
                      width: '60%',
                      backgroundColor: color[indexQuestion],
                    },
                  ]}
                />
                <Pressable

                  onPress={() => openGallery()}

                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="image-outline" size={30} color={'black'} />
                </Pressable>
              </View>
              <View style={styles.containerAnswer}>
                <Text>Answer</Text>
                <CustomSwitch
                  isOn={isSwitchOn}
                  handleOnPressSwitch={handleOnPressSwitch}
                  color={color[indexQuestion]}
                />
              </View>
            </>
          )}
        </View>
      </Pressable>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputQuestion: {
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
  containerAnswer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 10,
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: 10,
    position: 'relative',
    top: 200,
  },
  inputModal: {
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
    elevation: 3,
  },
});

export default ModalScreen;
