import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalSelectTime from './ModalSelectTime';
import {QuestionKahoot} from '../../../../types/question';
import {useAppDispatch} from '../../../../redux/store';
import {updateFieldQuestion} from '../../../../redux/slices/questionSlice/reducer';

interface Props {
  kahootID: string | number;
  id: string | number;
  question: QuestionKahoot | undefined;
}

export const TimeLimit = ({kahootID, id, question}: Props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [time, setTime] = React.useState(question?.timeLimit ?? '20');
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleSetTime = (timeSelect: string) => {
    setTime(timeSelect);
    dispatch(
      updateFieldQuestion({
        kahootId: kahootID,
        questionId: id,
        fieldsToUpdate: {
          timeLimit: +timeSelect,
        },
      }),
    );

    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={handleOpenModal}>
        <View style={styles.timeIcon}>
          <Icon name="time-outline" size={25} color={'white'} />
          <Text style={styles.textTime}>{time} sec</Text>
        </View>
      </TouchableOpacity>
      <ModalSelectTime
        modalVisible={modalVisible}
        onDismiss={handleCloseModal}
        handleSetTime={handleSetTime}
      />
    </>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#7C4DFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 100,
    height: 30,
    justifyContent: 'center',
    position: 'relative',
    top: -20,
  },
  timeIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTime: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
    fontFamily: 'Poppins-Bold',
  },
});
