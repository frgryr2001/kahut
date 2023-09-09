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
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {StackScreenProps} from '@react-navigation/stack';
import {useDebounce} from '../../../hooks/useDebounce';
import {useAppDispatch} from '../../../redux/store';
import {
  deleteKahoot,
  updateKahoot,
} from '../../../redux/slices/questionSlice/reducer';
import {useTheme} from '@react-navigation/native';
import {deleteKahootById} from '../../../services/kahoot/kahoot.service';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';

interface Props
  extends StackScreenProps<RootStackParams, 'SettingQuestionScreen'> {}

export const SettingQuestionScreen = ({navigation, route}: Props) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const {kahoot, isEditAPI} = route.params;
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDeleteKahoot = async () => {
    if (isEditAPI) {
      setIsDeleting(true);
      const response = await deleteKahootById(kahoot.idQuestion as number);
      if (response.code === 200) {
        setIsDeleting(false);
        Snackbar.show({
          text: 'Delete kahoot successfully',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      }
    }

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
      {isDeleting && <Spinner visible={isDeleting} />}
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
          label="Delete"
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
              <Text
                style={[
                  styles.modalText,
                  {
                    color: colors.text,
                  },
                ]}>
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
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: 'white',
                      },
                    ]}>
                    Ok
                  </Text>
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
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Regular',
    shadowColor: '#00000040',
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
    fontFamily: 'Poppins-Medium',
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
    shadowColor: '#00000040',
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
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  containerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
