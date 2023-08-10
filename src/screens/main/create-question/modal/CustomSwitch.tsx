import React, {FC} from 'react';
import {Switch} from 'react-native';

interface Props {
  isOn: boolean;
  color: string;
  handleOnPressSwitch: () => void;
}

export const CustomSwitch: FC<Props> = ({isOn, color, handleOnPressSwitch}) => {
  const toggleSwitch = () => {
    handleOnPressSwitch();
  };
  console.log('isOn', isOn);

  return (
    <Switch
      trackColor={{false: '#D9D9DB', true: color}}
      thumbColor={isOn ? color : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isOn}
    />
  );
};
