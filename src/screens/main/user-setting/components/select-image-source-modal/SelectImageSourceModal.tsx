import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, Pressable, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setUserState: React.Dispatch<
    React.SetStateAction<{
      username?: string | undefined;
      image?: string | undefined;
      file?:
        | {
            uri: string;
            type: string;
            name: string;
          }
        | undefined;
    }>
  >;
}

const SelectImageSourceModal = ({
  isVisible,
  setIsVisible,
  setUserState,
}: Props) => {
  const {colors} = useTheme();

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

  const openCamera = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, response => {
      if (
        response.didCancel ||
        !response ||
        !response.assets ||
        response.assets.length === 0
      ) {
        return;
      }

      const file = response.assets![0];
      setUserState(prev => ({
        ...prev,
        file: {
          uri: file.uri as string,
          type: file.type as string,
          name: file.fileName as string,
        },
        image: file.uri as string,
      }));
      setIsVisible(false);
    });
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        response.didCancel ||
        !response ||
        !response.assets ||
        response.assets.length === 0
      ) {
        return;
      }
      const file = response.assets![0];
      setUserState(prev => ({
        ...prev,
        file: {
          uri: file.uri as string,
          type: file.type as string,
          name: file.fileName as string,
        },
        image: file.uri as string,
      }));
      setIsVisible(false);
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropTransitionOutTiming={100}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      onBackdropPress={() => setIsVisible(false)}>
      <View
        style={{
          backgroundColor: '#ddd',
          borderRadius: 4,
          gap: 1,
          overflow: 'hidden',
        }}>
        <Pressable
          onPress={requestCameraPermission}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            padding: 16,
            backgroundColor: '#fff',
          }}>
          <Icon name="camera-outline" size={24} color={colors.text} />
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              lineHeight: 20,
            }}>
            Camera
          </Text>
        </Pressable>
        <Pressable
          onPress={openGallery}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            padding: 16,
            backgroundColor: '#fff',
          }}>
          <Icon name="image-outline" size={24} color={colors.text} />
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              lineHeight: 20,
            }}>
            Gallery
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default SelectImageSourceModal;
