import React, {useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useDebounce} from '../../../../hooks/useDebounce';
import {useAppDispatch} from '../../../../redux/store';
import {addTitleKahoot} from '../../../../redux/slices/questionSlice/reducer';

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  flex?: boolean;
  idQuestion?: string;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
}

const InputTitle = ({placeholder, flex, value, idQuestion}: Props) => {
  const dispatch = useAppDispatch();
  const [valueInput, setValueInput] = React.useState<string>(value ?? '');
  const valueDebounce = useDebounce(valueInput, 500);
  const firstUpdate = React.useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (valueDebounce || valueDebounce === '') {
      dispatch(
        addTitleKahoot({
          kahootId: idQuestion!,
          titleKahoot: valueDebounce,
        }),
      );
    }
  }, [valueDebounce, dispatch, idQuestion]);

  return (
    <TextInput
      style={[styles.input, flex && {flex: 0.85}]}
      placeholder={placeholder}
      value={valueInput}
      onChangeText={setValueInput}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 10,
    height: 50,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
});
export default InputTitle;
