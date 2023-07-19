import React, {useMemo, useState} from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

export function RadioGr() {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Public',
        value: '1',
      },
      {
        id: '2',
        label: 'Private',
        value: '0',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();
  console.log('selectedId', selectedId);

  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={setSelectedId}
      selectedId={selectedId}
      layout="row"
    />
  );
}
