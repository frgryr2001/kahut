import React, {useMemo, useState} from 'react';
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

const point = [
  {
    id: '0', // acts as primary key, should be unique and non-empty string
    label: '0',
    value: '0',
  },
  {
    id: '1000',
    label: '1000',
    value: '1000',
  },
  {
    id: '2000',
    label: '2000',
    value: '2000',
  },
];

interface RadioGroupProps {
  type: 'visibleTo' | 'point';
}

export function RadioGr({type}: RadioGroupProps) {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => (type === 'visibleTo' ? visibleTo : point),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>(function () {
    if (type === 'visibleTo') {
      return 'public';
    }
    return '0';
  });
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
