import React from 'react';
import {View} from 'react-native';
import AddQuestion from './AddQuestion';

const ListTypeQuestion = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',

        gap: 10,
        width: '100%',
      }}>
      <AddQuestion as="card" label="Quiz" />
      <AddQuestion as="card" label="True or False" />
    </View>
  );
};

export default ListTypeQuestion;
