import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ButtonCustom} from '../question/components';
import {RadioGr} from './components/radio-group';
import {RootStackParams} from '../../../navigation/Navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {useDebounce} from '../../../hooks/useDebounce';
import {useAppDispatch} from '../../../redux/store';
import {
  deleteKahoot,
  updateKahoot,
} from '../../../redux/slices/questionSlice/reducer';

interface Props
  extends StackScreenProps<RootStackParams, 'SettingQuestionScreen'> {}

export const SettingQuestionScreen = ({navigation, route}: Props) => {
  const kahoot = route.params.kahoot;
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
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

  //   delete kahoot by id
  const handleShowModalKahoot = () => {
    setModalVisible(true);
  };

  const handleDeleteKahoot = () => {
    dispatch(
      deleteKahoot({
        kahootId: kahoot.idQuestion ?? '',
      }),
    );
    navigation.navigate('HomeScreen');
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
        <ButtonCustom
          label="Detele"
          color="secondary"
          as="button"
          onPress={handleShowModalKahoot}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this kahut?
              </Text>
              <View style={styles.containerModal}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.button, styles.buttonOk]}
                  onPress={handleDeleteKahoot}>
                  <Text style={styles.textStyle}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 3,
    padding: 10,
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: '#F5f5f5',
  },
  buttonOk: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  containerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
