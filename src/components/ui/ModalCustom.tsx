import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';

export const ModalCustom = ({
  children,
  modalVisible,
  onCloseModal,
  title,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  onCloseModal?: () => void;
  title: string;
}) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      style={{
        flex: 1,
      }}
      onRequestClose={onCloseModal}>
      <Pressable style={styles.backdrop} onPress={onCloseModal} />
      <View>
        <View style={styles.box}>
          <Text
            style={[
              styles.titleModal,
              {
                color: colors.text,
              },
            ]}>
            {title}
          </Text>
          <View style={styles.boxContent}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 3,
    width: '90%',
    alignSelf: 'center',
    marginTop: 170,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  boxContent: {},
  checkContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  textCheck: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  titleModal: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Bold',
  },
});
