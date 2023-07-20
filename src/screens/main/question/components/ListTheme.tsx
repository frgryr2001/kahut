import {View, Button} from 'react-native';
import React from 'react';
import {Theme} from './Theme';
import {useAppDispatch} from '../../../../redux/store';
import {choiceTheme} from '../../../../redux/slices/questionSlice/reducer';
import {theme} from '../../../../types/question';

const nameTheme = [
  'Standard',
  'Spring',
  'Summer',
  'Autumn',
  'Winter',
  'Dark',
] as string[];

interface Props {
  onCloseBottomModal: () => void;
}

export const ListTheme = ({onCloseBottomModal}: Props) => {
  const [idFocus, setIdFocus] = React.useState<number>(0);

  const dispatch = useAppDispatch();
  const onPress = (id: number) => {
    setIdFocus(id);
  };

  const selectTheme = () => {
    const nameSelected = nameTheme[idFocus] as theme;
    dispatch(choiceTheme(nameSelected));
    onCloseBottomModal();
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
