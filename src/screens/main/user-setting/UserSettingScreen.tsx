import React, {useCallback, useState} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {
  selectStatus,
  selectUser,
} from '../../../redux/slices/authSlice/selector';
import {store} from '../../../redux/store';
import {signOut, updateUser} from '../../../redux/slices/authSlice/actions';
import {NotAuthForm} from '../../../components/ui';
import {
  UserInfo,
  Sections,
  EditUserModal,
  SelectImageSourceModal,
} from './components';
import styles from './UserSettingScreen.style';
import Snackbar from 'react-native-snackbar';

interface Props
  extends StackScreenProps<RootStackParams, 'UserSettingScreen'> {}

const UserSettingScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const authStatus = useSelector(selectStatus);
  const authUser = useSelector(selectUser);
  const {getState, dispatch} = store;
  const refreshToken = getState().auth.user?.refresh_token;
  const [userState, setUserState] = useState<{
    username?: string;
    image?: string;
    file?: {
      uri: string;
      type: string;
      name: string;
    };
  }>({
    username: authUser?.username,
    image: authUser?.image,
    file: undefined,
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowSelectImagePickerSrc, setIsShowSelectImagePickerSrc] =
    useState(false);

  const handleSignOut = useCallback(async () => {
    if (refreshToken) {
      try {
        dispatch(
          signOut({
            refreshToken,
          }),
        );
      } catch (error) {
        console.error(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  const resetUserState = () => {
    setUserState({
      username: authUser?.username,
      image: authUser?.image,
      file: undefined,
    });
  };

  const handleSave = async () => {
    if (!userState.username?.trim()) {
      Snackbar.show({
        text: 'Please enter the username',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#ff0000',
      });
      return;
    }
    const formData = new FormData();
    formData.append('username', userState.username?.trim());
    formData.append('userImage', userState.image);
    userState.file && formData.append('images', userState.file);

    try {
      // Handle dispatch here
      await dispatch(updateUser(formData));

      Snackbar.show({
        text: 'Update successfully',
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#7C4DFF',
      });
    } catch (error: any) {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
        textColor: '#fff',
        backgroundColor: '#ff0000',
      });
    }
  };

  // useEffect(() => {
  //   console.log(userState);
  // }, [userState]);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}>
      {authStatus === 'not-authenticated' || !authUser ? (
        <NotAuthForm navigation={navigation} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User info */}
          <UserInfo user={userState} setIsShowModal={setIsShowModal} />

          {/* Sections */}
          <Sections handleSignOut={handleSignOut} />

          {/* Edit user modal */}
          <EditUserModal
            isVisible={isShowModal}
            setIsVisible={setIsShowModal}
            userState={userState}
            setUserState={setUserState}
            setIsShowSelectImagePickerSrc={setIsShowSelectImagePickerSrc}
            resetUserState={resetUserState}
            onSave={handleSave}
          />

          {/* Select image source modal */}
          <SelectImageSourceModal
            isVisible={isShowSelectImagePickerSrc}
            setIsVisible={setIsShowSelectImagePickerSrc}
            setUserState={setUserState}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UserSettingScreen;
