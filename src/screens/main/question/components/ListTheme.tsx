import {View} from 'react-native';
import React from 'react';
import {Theme} from './Theme';
import {Button} from 'react-native';

const nameTheme = ['Standard', 'Spring', 'Summer', 'Autumn', 'Winter', 'Dark'];

export const ListTheme = () => {
  const [idFocus, setIdFocus] = React.useState<number>();
  const onPress = (id: number) => {
    setIdFocus(id);
  };

  const selectTheme = () => {
    console.log(idFocus);
    // dispatch to do something
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        flex: 1,
        padding: 10,
        justifyContent: 'center',
      }}>
      {Array.from(Array(6).keys()).map((item, index) => {
        return (
          <Theme
            key={index}
            id={index}
            onPress={onPress}
            isFocus={idFocus === index}
            nameTheme={nameTheme[index]}
          />
        );
      })}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Button title="Choice" onPress={selectTheme} />
      </View>
    </View>
  );
};
