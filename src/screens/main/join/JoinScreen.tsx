import {View, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import Icon from 'react-native-vector-icons/Ionicons';

import Tabbed from './components/Tabbed';

interface Props extends StackScreenProps<RootStackParams, 'JoinScreen'> {}

export default function JoinScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <Icon
        name="arrow-back-outline"
        size={30}
        color={'#fff'}
        style={{
          marginTop: 20,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Tabbed />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#673AB7',
    paddingHorizontal: 20,
  },
});
