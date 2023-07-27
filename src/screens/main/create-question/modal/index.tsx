import {BlurView} from '@react-native-community/blur';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {RootStackParams} from '../../../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {Answer} from '../components';
import {CustomSwitch} from './CustomSwitch';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebounce} from '../../../../hooks/useDebounce';
import {useAppDispatch} from '../../../../redux/store';
import {addTitleQuestion} from '../../../../redux/slices/questionSlice/reducer';

const color = ['#3273e3', '#e84357', '#59c242', '#d9db44'];

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
  const [value, setValue] = React.useState(questionTitle);
  const ref = React.useRef<TextInput>(null);
  const dispatch = useAppDispatch();

  const valueQuestionDebounce = useDebounce(value, 150);

  useEffect(() => {
    if (valueQuestionDebounce) {
      dispatch(
        addTitleQuestion({
          kahootId: kahootID,
          questionId: id,
          titleQuestion: valueQuestionDebounce,
        }),
      );
    }
  }, [valueQuestionDebounce, dispatch, kahootID, id]);

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
                <Answer
                  color={color[indexQuestion]}
                  isEdit={true}
                  isFocus
                  hidePlaceHoder
                />
                <Pressable
                  onPress={() => console.log('add')}
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
                <CustomSwitch isOn={false} color={color[indexQuestion]} />
              </View>
            </>
          )}
          {/* <Answer color={color[0]} isEdit={true} isFocus /> */}
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
});

export default ModalScreen;
