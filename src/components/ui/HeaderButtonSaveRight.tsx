import React from 'react';
import {Button} from '.';
export const HeaderButtonSaveRight = () => {
  const onPress = () => {
    console.log('save');
  };
  return <Button title="Save" onPress={onPress} as={'text'} />;
};
