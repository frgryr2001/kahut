import React from 'react';
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

interface ModalImageProps {
  modalVisible: boolean;
  onDismiss: () => void;
  openCamera: () => void;
  openGallery: () => void;
}

const ModalImage = ({
  modalVisible,
  onDismiss,
  openCamera,
  openGallery,
}: ModalImageProps) => {
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
          {/* camera */}
          <Pressable onPress={openCamera}>
            <View style={styles.pickIcon}>
              <Icon name="camera-outline" size={50} color="black" />
              <View>
                <Text style={styles.titlePickIcon}>Camera</Text>
              </View>
            </View>
          </Pressable>
          {/* gallery */}
          <Pressable onPress={openGallery}>
            <View style={styles.pickIcon}>
              <Icon name="image-outline" size={50} color="black" />
              <View>
                <Text style={styles.titlePickIcon}>Gallery</Text>
              </View>
            </View>
          </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: heightWindow * 0.2,
    width: widthWindow * 0.6,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -(widthWindow * 0.6) / 2},
      {translateY: -(heightWindow * 0.2) / 2},
    ],
    borderRadius: 10,
    backgroundColor: 'white',
  },
  pickIcon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlePickIcon: {fontFamily: 'Poppins-Regular', fontSize: 16},
});

export default ModalImage;
