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
import {useAppDispatch} from '../../../../redux/store';
import {
  addImageCoverKahoot,
  addImageQuestion,
  deleteImageQuestion,
  updateKahoot,
} from '../../../../redux/slices/questionSlice/reducer';

const windowHeight = Dimensions.get('window').height;

interface Props {
  as: 'image' | 'media';
  content: string;
  imageDefault?: string;
  kahootID?: string;
  id?: string;
}

const ImageCover = ({as, content, imageDefault, kahootID, id}: Props) => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const onPress = () => {
    setModalVisible(true);
  };
  const onDismiss = () => {
    setModalVisible(false);
  };
  const openCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      // console.log('response', JSON.stringify(response, null, 2));
      if (response.didCancel) {
        return;
      }
      if (kahootID && id) {
        dispatch(
          addImageQuestion({
            kahootId: kahootID!,
            questionId: id!,
            imageQuestion: response.assets![0].fileName as string,
            file: {
              uri: response.assets![0].uri as string,
              type: response.assets![0].type as string,
              name: response.assets![0].fileName as string,
            },
          }),
        );
      }
      if (kahootID && !id) {
        dispatch(
          addImageCoverKahoot({
            kahootId: kahootID!,
            imageCover: response.assets![0].fileName as string,
            file: {
              uri: response.assets![0].uri as string,
              type: response.assets![0].type as string,
              name: response.assets![0].fileName as string,
            },
          }),
        );
      }
    });
    onDismiss();
  };
  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }
      if (kahootID && id) {
        dispatch(
          addImageQuestion({
            kahootId: kahootID!,
            questionId: id!,
            imageQuestion: response.assets![0].fileName as string,
            file: {
              uri: response.assets![0].uri as string,
              type: response.assets![0].type as string,
              name: response.assets![0].fileName as string,
            },
          }),
        );
      }
      if (kahootID && !id) {
        dispatch(
          addImageCoverKahoot({
            kahootId: kahootID!,
            imageCover: response.assets![0].fileName as string,
            file: {
              uri: response.assets![0].uri as string,
              type: response.assets![0].type as string,
              name: response.assets![0].fileName as string,
            },
          }),
        );
      }
    });
    onDismiss();
  };
  return (
    <View>
      <Pressable
        style={[styles.btn, as === 'image' && {flex: 1}]}
        onPress={onPress}
        disabled={imageDefault ? true : false}>
        {/* image-outline */}
        {imageDefault ? (
          <>
            <Image
              source={{
                uri: `file:///data/user/0/com.kahut/cache/${imageDefault}`,
              }}
              resizeMode="contain"
              style={styles.image}
            />

            {/* delete image */}
            <Pressable
              style={styles.btnDelete}
              onPress={() => {
                if (kahootID && id) {
                  dispatch(
                    deleteImageQuestion({kahootId: kahootID!, questionId: id!}),
                  );
                } else {
                  dispatch(
                    updateKahoot({
                      kahootId: kahootID!,
                      fieldsToUpdate: {
                        coverImage: '',
                      },
                    }),
                  );
                }
              }}>
              <Icon name="close-outline" size={20} color="black" />
            </Pressable>
          </>
        ) : (
          <>
            <Icon name="image-outline" size={30} color="black" />
            <Text style={styles.buttonText}>{content}</Text>
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
    backgroundColor: 'white',
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
  btnDelete: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
  },
});

export default ImageCover;
