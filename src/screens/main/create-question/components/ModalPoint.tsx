import React from 'react';
import {
  View,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Button} from '../../../../components/ui';
import {useTheme} from '@react-navigation/native';

interface Props {
  visible: boolean;
  onCloseModal: () => void;
  pointChoice: number | undefined;
  handleChangePoint: (point: 0 | 1000 | 2000) => void;
}
const point = [0, 1000, 2000];

const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;

export const ModalPoint = ({
  visible,
  onCloseModal,
  pointChoice,
  handleChangePoint,
}: Props) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      style={{
        flex: 1,
      }}
      onRequestClose={onCloseModal}>
      <Pressable style={styles.backdrop} onPress={onCloseModal} />
      <View style={styles.container}>
        <View style={styles.box}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: colors.text,
              marginTop: 10,
              fontFamily: 'Poppins-Bold',
            }}>
            Change Point
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: colors.text,
              marginTop: 10,
              fontFamily: 'Poppins-Regular',
            }}>
            Choose the point you want to change to
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {point.map(item => (
              <Button
                key={item}
                title={item.toString()}
                size="small"
                color={colors.background}
                width={widthWindow / 4}
                isActive={pointChoice === item}
                onPress={() => {
                  handleChangePoint(item as 0 | 1000 | 2000);
                  onCloseModal();
                }}
              />
            ))}
          </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: widthWindow / 1.2,
    height: heightWindow / 5,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});
