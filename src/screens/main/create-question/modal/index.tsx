import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {RootStackParams} from '../../../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import {sharedTransition} from '../../../../services/utils/CustomAnimation';

interface Props
  extends StackScreenProps<RootStackParams, 'ModalQuestionScreen'> {}
const ModalScreen = ({navigation}: Props) => {
  return (
    <BlurView
      blurType="dark"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
      style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Animated.View
          style={{width: 100, height: 100, backgroundColor: 'green'}}
          sharedTransitionTag="sharedTag123"
          sharedTransitionStyle={sharedTransition}
        />
        {/* <Text>Modal</Text> */}
      </Pressable>
    </BlurView>
    // <Animated.View
    //   style={{width: 100, height: 100, backgroundColor: 'green'}}
    //   sharedTransitionTag="sharedTag123"
    //   sharedTransitionStyle={sharedTransition}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModalScreen;
