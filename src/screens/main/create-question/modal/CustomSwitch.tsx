import React, {FC, useState} from 'react';
import {Switch} from 'react-native';

interface Props {
  isOn: boolean;
  color: string;
}

export const CustomSwitch: FC<Props> = ({isOn, color}) => {
  const [isEnabled, setIsEnabled] = useState(isOn);

  const toggleSwitch = () => {
    setIsEnabled((previousState: boolean) => !previousState);
  };

  return (
    <Switch
      trackColor={{false: '#D9D9DB', true: color}}
      thumbColor={isEnabled ? color : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};
