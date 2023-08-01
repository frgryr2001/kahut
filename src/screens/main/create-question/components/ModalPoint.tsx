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

interface Props {
  visible: boolean;
  onCloseModal: () => void;
}

const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;

export const ModalPoint = ({visible, onCloseModal}: Props) => {
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
          <Text style={{}}>Change Point</Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
            }}>
            Choose the point you want to change to
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Button
              title="0"
              size="small"
              color="blue"
              width={widthWindow / 4}
              onPress={() => console.log('test')}
            />
            <Button
              title="1000"
              size="small"
              color="red"
              width={widthWindow / 4}
              onPress={() => console.log('test')}
            />
            <Button
              title="2000"
              size="small"
              color="red"
              width={widthWindow / 4}
              onPress={() => console.log('test')}
            />
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
    width: widthWindow / 1.25,
    height: heightWindow / 5,
    backgroundColor: 'white',
    borderRadius: 3,
  },
});
