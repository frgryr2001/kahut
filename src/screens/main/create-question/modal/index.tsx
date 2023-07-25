import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {Pressable, StyleSheet, TextInput} from 'react-native';
import {RootStackParams} from '../../../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import {sharedTransition} from '../../../../services/utils/CustomAnimation';

interface Props
  extends StackScreenProps<RootStackParams, 'ModalQuestionScreen'> {}
const ModalScreen = ({navigation, route}: Props) => {
  const {question} = route.params;
  const [value, setValue] = React.useState(question);
  const ref = React.useRef<TextInput>(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ref.current?.focus();
    });

    return unsubscribe;
  }, [navigation]);
  const handleTextInputFocus = () => {
    // Programmatically focus the TextInput
    ref.current?.focus();
  };

  const handleTextInputBlur = () => {
    // Programmatically blur the TextInput
    ref.current?.blur();
  };
  return (
    <BlurView
      blurType="dark"
      blurAmount={5}
      reducedTransparencyFallbackColor="white"
      style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate('CreateQuestionScreen', {
            type: 'tf',
            question: value,
          })
        }
        style={{
          alignItems: 'center',
          flex: 1,
        }}>
        <Animated.View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            position: 'relative',
            top: 300,
          }}
          sharedTransitionTag="sharedTag123"
          sharedTransitionStyle={sharedTransition}>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={setValue}
            textAlignVertical="center"
            onFocus={handleTextInputFocus}
            onBlur={handleTextInputBlur}
            onEndEditing={handleTextInputFocus}
            multiline={true}
            style={styles.textInputQuestion}
            placeholder="Enter your question"
          />
        </Animated.View>
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
    // backgroundColor: 'red',
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

export default ModalScreen;
