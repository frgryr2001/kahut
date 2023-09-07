import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userState: {
    username?: string;
    image?: string;
  };
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
  setIsShowSelectImagePickerSrc: React.Dispatch<React.SetStateAction<boolean>>;
  resetUserState: () => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

const EditUserModal = ({
  isVisible,
  setIsVisible,
  userState,
  setUserState,
  setIsShowSelectImagePickerSrc,
  resetUserState,
  onSave,
  isSaving = false,
}: Props) => {
  const {colors} = useTheme();

  const handleCancel = () => {
    setIsVisible(false);
    resetUserState();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropTransitionOutTiming={100}
      style={
        {
          // justifyContent: 'flex-end',
          // margin: 0,
        }
      }
      onBackdropPress={handleCancel}>
      <View
        style={{
          padding: 16,
          height: 'auto',
          backgroundColor: '#fff',
          borderRadius: 4,
          gap: 16,
        }}>
        <View
          style={{
            alignItems: 'center',
            gap: 16,
          }}>
          <Text style={{color: colors.text, fontSize: 16, fontWeight: '700'}}>
            Complete your profile
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}>
            <Image
              source={{uri: userState?.image}}
              width={50}
              height={50}
              style={{
                objectFit: 'cover',
                borderRadius: 999,
              }}
            />

            <Pressable
              onPress={() => setIsShowSelectImagePickerSrc(true)}
              style={{
                padding: 16,
                borderWidth: 1,
                borderColor: '#ddd',
                backgroundColor: '#eee',
                alignItems: 'center',
                gap: 8,
                borderRadius: 4,
              }}>
              <Icon name="image-outline" size={24} color="#777" />
              <Text style={{color: '#777', fontWeight: '700'}}>
                Tap to add image
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            gap: 8,
          }}>
          <Text style={{color: colors.text, fontWeight: '700'}}>
            Update your username
          </Text>
          <TextInput
            value={userState.username}
            onChangeText={e =>
              setUserState(prev => ({
                ...prev,
                username: e,
              }))
            }
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              backgroundColor: '#eee',
              borderRadius: 4,
              fontSize: 16,
              color: colors.text,
              width: '100%',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCancel}
            style={{
              padding: 16,
              backgroundColor: '#ddd',
              borderRadius: 4,
              flex: 1,
              elevation: 4,
              shadowColor: '#00000040',
            }}>
            <Text
              style={{
                color: colors.text,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isSaving}
            onPress={onSave}
            style={{
              padding: 16,
              backgroundColor: '#10872a',
              borderRadius: 4,
              flex: 1,
              justifyContent: 'center',
              elevation: 4,
              shadowColor: '#00000040',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {isSaving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EditUserModal;
