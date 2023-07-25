import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalSelectTime from './ModalSelectTime';

export const TimeLimit = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [time, setTime] = React.useState('20' as string);
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleSetTime = (time: string) => {
    setTime(time);
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
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
});
