import React, {useState} from 'react';
import {Text, View, Pressable, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ModalImage} from '.';

const windowHeight = Dimensions.get('window').height;

const ImageCover = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const onPress = () => {
    setModalVisible(true);
  };
  const onDismiss = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <Pressable style={styles.btn} onPress={onPress}>
        {/* image-outline */}
        <Icon name="image-outline" size={30} color="black" />
        <Text style={styles.buttonText}>Tap me to add cover image</Text>
      </Pressable>
      {/* Modal */}
      <ModalImage modalVisible={modalVisible} onDismiss={onDismiss} />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'white',
    paddingVertical: 15,
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
});

export default ImageCover;
