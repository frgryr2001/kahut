import React, {useMemo} from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

const visibleTo = [
  {
    id: 'public', // acts as primary key, should be unique and non-empty string
    label: 'Public',
    value: 'public',
  },
  {
    id: 'private',
    label: 'Private',
    value: 'private',
  },
];

interface Props {
  value: string;
  handleChangeRadio: (value: 'public' | 'private') => void;
}

export function RadioGr({value, handleChangeRadio}: Props) {
  const radioButtons: RadioButtonProps[] = useMemo(() => visibleTo, []);

  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={selected => handleChangeRadio(selected as 'public' | 'private')}
      selectedId={value}
      layout="row"
    />
  );
}
