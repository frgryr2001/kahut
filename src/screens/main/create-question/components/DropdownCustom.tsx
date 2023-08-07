import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useAppDispatch} from '../../../../redux/store';
import {updateFieldQuestion} from '../../../../redux/slices/questionSlice/reducer';

type DataDropdown = {
  label: string;
  type: string;
};
const data: DataDropdown[] = [
  {label: 'Quiz', type: 'quiz'},
  {label: 'True or False', type: 'trueorfalse'},
];
interface Props {
  typeQuestion: string;
  kahootId: string;
  questionId: string;
}
export const DropdownCustom = ({typeQuestion, kahootId, questionId}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="type"
        value={typeQuestion === 'quiz' ? 'quiz' : 'trueorfalse'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: DataDropdown) => {
          if (item.type === 'trueorfalse') {
            dispatch(
              updateFieldQuestion({
                kahootId: kahootId,
                questionId: questionId,
                fieldsToUpdate: {
                  type: item.type as 'quiz' | 'trueorfalse',
                  answer: false,
                },
              }),
            );
            return;
          }
          dispatch(
            updateFieldQuestion({
              kahootId: kahootId,
              questionId: questionId,
              fieldsToUpdate: {
                type: item.type as 'quiz' | 'trueorfalse',
              },
            }),
          );
          setIsFocus(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 0.5,
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 4,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
