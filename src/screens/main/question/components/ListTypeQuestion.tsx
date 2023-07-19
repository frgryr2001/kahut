import React from 'react';
import {View} from 'react-native';
import ButtonCustom from './ButtonCustom';

const ListTypeQuestion = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',

        gap: 10,
        width: '100%',
      }}>
      <ButtonCustom as="card" label="Quiz" />
      <ButtonCustom as="card" label="True or False" />
    </View>
  );
};

export default ListTypeQuestion;
