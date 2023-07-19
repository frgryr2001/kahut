import {Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ButtonCustom, InputTitle} from '../question/components';
import {RadioGr} from './components/radio-group';
export const SettingQuestionScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,

          padding: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Description
        </Text>
        <InputTitle placeholder="Description" />
        <Text
          style={{
            marginVertical: 10,
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Visible to
        </Text>
        <RadioGr />
        <ButtonCustom label="Detele" color="secondary" as="button" />
        <View />
      </View>
    </View>
  );
};
