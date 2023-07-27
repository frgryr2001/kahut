import React, {useMemo} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Pressable,
  Dimensions,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
const heightWindow = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;

interface ModalSelectTimeProps {
  modalVisible: boolean;
  onDismiss: () => void;
  handleSetTime: (timeSelect: string) => void;
}

const ModalSelectTime = ({
  modalVisible,
  onDismiss,
  handleSetTime,
}: ModalSelectTimeProps) => {
  const time = useMemo(() => ['20', '30', '40', '60', '90', '180'], []);

  return (
    <SafeAreaView style={styles.fill}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          onDismiss();
        }}>
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={onDismiss}
        />
        <View style={styles.containerView}>
          {time.map(item => (
            <Pressable key={item} onPress={() => handleSetTime(item)}>
              <View style={styles.pickIcon}>
                <Icon name="time-outline" size={25} color={'black'} />
                <Text style={styles.titlePickIcon}>{item} sec</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  containerView: {
    flexDirection: 'column',
    height: heightWindow * 0.2,
    width: widthWindow * 0.8,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -(widthWindow * 0.8) / 2},
      {translateY: -(heightWindow * 0.5) / 2},
    ],
    borderRadius: 10,
    backgroundColor: 'white',
  },
  pickIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthWindow * 0.8,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titlePickIcon: {fontFamily: 'Poppins-Regular', fontSize: 16},
});

export default ModalSelectTime;
