import React, {useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {ModalImage} from '.';

const windowHeight = Dimensions.get('window').height;

const ImageCover = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectImage, setSelectImage] = useState('' as string);
  const onPress = () => {
    setModalVisible(true);
  };
  const onDismiss = () => {
    setModalVisible(false);
  };
  const openCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      console.log('response', response);
      setSelectImage(response.assets![0].uri as string);
    });
    onDismiss();
  };
  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('response', response);
      setSelectImage(response.assets![0].uri as string);
    });
    onDismiss();
  };
  return (
    <View>
      <Pressable
        style={styles.btn}
        onPress={onPress}
        disabled={selectImage ? true : false}>
        {/* image-outline */}
        {selectImage ? (
          <>
            <Image
              source={{uri: selectImage}}
              resizeMode="cover"
              style={styles.image}
            />
            {/* delete image */}
            <Pressable
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'white',
                borderRadius: 50,
                padding: 5,
              }}
              onPress={() => setSelectImage('')}>
              <Icon name="close-outline" size={20} color="black" />
            </Pressable>
          </>
        ) : (
          <>
            <Icon name="image-outline" size={30} color="black" />
            <Text style={styles.buttonText}>Tap me to add cover image</Text>
          </>
        )}
      </Pressable>
      {/* Modal */}
      <ModalImage
        modalVisible={modalVisible}
        onDismiss={onDismiss}
        openCamera={openCamera}
        openGallery={openGallery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: 'white',
    // paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    height: windowHeight * 0.35,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageCover;
