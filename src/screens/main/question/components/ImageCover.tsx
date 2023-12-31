import React, {useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ModalImage} from '.';
import {useAppDispatch} from '../../../../redux/store';
import {
  addImageCoverKahoot,
  addImageQuestion,
  deleteImageQuestion,
  updateImagesKahoot,
  updateKahoot,
} from '../../../../redux/slices/questionSlice/reducer';

const windowHeight = Dimensions.get('window').height;

interface Props {
  as: 'image' | 'media';
  content: string;
  imageDefault?: string | null;
  kahootID?: string | number;
  id?: string | number;
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
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        console.log('response', JSON.stringify(response, null, 2));
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
        if (kahootID && !id && response.assets?.length !== 0) {
          dispatch(
            addImageCoverKahoot({
              kahootId: kahootID!,
              imageCover: response.assets?.at(0)!.fileName as string,
              file: {
                uri: response.assets?.at(0)!.uri as string,
                type: response.assets?.at(0)!.type as string,
                name: response.assets?.at(0)!.fileName as string,
              },
            }),
          );
        }
      },
    );
    onDismiss();
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
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
            {imageDefault !== '' ? (
              <Image
                source={{
                  uri: imageDefault.startsWith('http')
                    ? imageDefault
                    : `file:///data/user/0/com.kahut/cache/${imageDefault}`,
                }}
                resizeMode="cover"
                style={styles.image}
              />
            ) : null}

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
                  dispatch(
                    updateImagesKahoot({
                      kahootId: kahootID!,
                      image: imageDefault,
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
        openCamera={requestCameraPermission}
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
    shadowColor: '#00000040',
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
