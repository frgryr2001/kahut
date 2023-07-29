import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ButtonCustom} from '../question/components';
import {RadioGr} from './components/radio-group';
import {RootStackParams} from '../../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {useDebounce} from '../../../hooks/useDebounce';
import {useAppDispatch} from '../../../redux/store';
import {updateKahoot} from '../../../redux/slices/questionSlice/reducer';

interface Props
  extends StackScreenProps<RootStackParams, 'SettingQuestionScreen'> {}

export const SettingQuestionScreen = ({route}: Props) => {
  const kahoot = route.params.kahoot;
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [valueInputDescription, setValueInputDescription] =
    React.useState<string>(kahoot.description);
  const [valueRadio, setValueRadio] = React.useState<'public' | 'private'>(
    kahoot.visibleScope,
  );
  const valueDebounce = useDebounce(valueInputDescription, 250);
  React.useEffect(() => {
    dispatch(
      updateKahoot({
        kahootId: kahoot.idQuestion ?? '',
        fieldsToUpdate: {description: valueDebounce},
      }),
    );
  }, [valueDebounce, dispatch, kahoot.idQuestion]);
  const handleChangeRadio = (value: 'public' | 'private') => {
    dispatch(
      updateKahoot({
        kahootId: kahoot.idQuestion ?? '',
        fieldsToUpdate: {visibleScope: value},
      }),
    );
    setValueRadio(value);
  };
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          padding: 20,
        }}>
        <Text style={styles.labelInput}>Description</Text>
        <TextInput
          style={[styles.input]}
          placeholder={'Enter description'}
          value={valueInputDescription}
          onChangeText={setValueInputDescription}
        />
        <Text style={styles.labelVisible}>Visible to</Text>
        <RadioGr value={valueRadio} handleChangeRadio={handleChangeRadio} />
        <ButtonCustom label="Detele" color="secondary" as="button" />
        <View />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
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
  labelVisible: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
