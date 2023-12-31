import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import {styles as globalStyles} from '../../../themes/appTheme';
import {
  ButtonCustom,
  Header,
  ImageCover,
  InputTitle,
  ListQuestion,
  ListTypeQuestion,
  Setting,
  ThemeSetting,
  ThemeBackground,
} from './components';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {ListTheme} from './components/ListTheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Question} from '../../../types/question';
import {selectQuestions} from '../../../redux/slices/questionSlice/selector';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch} from '../../../redux/store';
import {
  deleteKahoot,
  addKahoot,
} from '../../../redux/slices/questionSlice/reducer';

interface Props extends StackScreenProps<RootStackParams, 'QuestionScreen'> {}

export const QuestionScreen = ({navigation, route}: Props) => {
  const {idQuestion, isEditAPI, isEdit} = route.params;
  const [isClickShowTheme, setIsClickShowTheme] = useState<boolean>(false);
  const isFocus = useIsFocused();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dispatch = useAppDispatch();
  const kahootArray = useSelector(selectQuestions);
  const kahoot = kahootArray.find(item => item.idQuestion === idQuestion);
  //   console.log('[DEBUG] , ', JSON.stringify(kahoot, null, 2));

  const indexOfKahoot = kahootArray.findIndex(
    item => item.idQuestion === idQuestion,
  );
  const copyKahootWhenEdit = useMemo(() => {
    if (isEdit || isEditAPI) {
      return {...kahoot};
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snapPoints = useMemo(() => ['30%', '100%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsClickShowTheme(false);
    }
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );
  const hasUnsavedChanges = Boolean(
    kahoot?.title !== '' ||
      (kahoot?.questions ?? []).length > 0 ||
      kahoot?.theme !== 'Standard' ||
      kahoot?.description !== '' ||
      kahoot?.coverImage !== '' ||
      kahoot?.visibleScope !== 'public',
  );

  const handleDiscardChanges = useCallback(() => {
    dispatch(
      deleteKahoot({
        kahootId: idQuestion!,
      }),
    );
    if (isEdit) {
      dispatch(
        addKahoot({
          kahoot: copyKahootWhenEdit as Question,
          indexOfKahootInEdit: indexOfKahoot!,
        }),
      );
    }
  }, [dispatch, copyKahootWhenEdit, indexOfKahoot, idQuestion, isEdit]);
  const validateDiffBetweenObjEdit = useCallback(() => {
    if (copyKahootWhenEdit) {
      if (
        copyKahootWhenEdit.title !== kahoot?.title ||
        copyKahootWhenEdit.theme !== kahoot?.theme ||
        copyKahootWhenEdit.description !== kahoot?.description ||
        copyKahootWhenEdit.coverImage !== kahoot?.coverImage ||
        copyKahootWhenEdit.visibleScope !== kahoot?.visibleScope ||
        copyKahootWhenEdit.questions?.length !== kahoot?.questions.length
      ) {
        return true;
      }
      return false;
    }
    return false;
  }, [copyKahootWhenEdit, kahoot]);

  const checkNoChangeValue =
    kahoot?.title === '' &&
    (kahoot?.questions ?? []).length === 0 &&
    kahoot?.theme === 'Standard' &&
    kahoot?.description === '' &&
    !isEdit;

  React.useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (validateDiffBetweenObjEdit()) {
        return;
      }
      if (checkNoChangeValue) {
        dispatch(
          deleteKahoot({
            kahootId: kahoot?.idQuestion!,
          }),
        );

        return;
      }

      if (
        (!hasUnsavedChanges && validateDiffBetweenObjEdit()) ||
        !isFocus ||
        !validateDiffBetweenObjEdit()
      ) {
        // If we don't have unsaved changes, then we don't need to do anything
        if (isEditAPI) {
          dispatch(
            deleteKahoot({
              kahootId: kahoot?.idQuestion!,
            }),
          );
        }
        return;
      }

      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          {text: "Don't leave", style: 'cancel', onPress: () => {}},
          {
            text: 'Discard',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              if (isEdit || isEditAPI) {
                handleDiscardChanges();
              }
              navigation.dispatch(e.data.action);
            },
          },
        ],
      );
    });
    return () => {
      navigation.removeListener('beforeRemove', () => {});
    };
  }, [
    navigation,
    hasUnsavedChanges,
    isFocus,
    kahoot,
    dispatch,
    handleDiscardChanges,
    isEdit,
    validateDiffBetweenObjEdit,
    checkNoChangeValue,
    isEditAPI,
  ]);
  const validateValueBeforeSave = useCallback(() => {
    if (hasUnsavedChanges) {
      return true;
    }
    return false;
  }, [hasUnsavedChanges]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <BottomSheetModalProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: '#F5F5F5',
            }}>
            {/* <ThemeBackground /> */}
            <ThemeBackground theme={kahoot?.theme!} />
            {/* Header  */}
            <Header
              completed={validateValueBeforeSave()}
              kahoot={kahoot}
              handleDiscardChanges={handleDiscardChanges}
              navigation={navigation}
              isEdit={isEdit}
              isEditAPI={isEditAPI}
              validateDiffBetweenObjEdit={validateDiffBetweenObjEdit}
            />
            <ScrollView automaticallyAdjustKeyboardInsets>
              <View style={[globalStyles.globalPadding10, styles.container]}>
                <ImageCover
                  as="image"
                  content="Tap me to add cover image"
                  imageDefault={kahoot?.coverImage}
                  kahootID={idQuestion}
                />
                <View style={styles.containerTitle}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: 'black',
                      },
                    ]}>
                    Title
                  </Text>
                  <View style={styles.flexRow}>
                    <InputTitle
                      placeholder="Enter a title"
                      flex
                      value={kahoot?.title}
                      idQuestion={idQuestion ?? ''}
                    />
                    <Setting
                      navigation={navigation}
                      kahoot={kahoot}
                      isEditAPI={isEditAPI}
                    />
                  </View>
                  {/* Theme Setting */}
                  <Text
                    style={[
                      styles.title,
                      {
                        color: 'black',
                      },
                    ]}>
                    Theme
                  </Text>
                  <ThemeSetting
                    theme={kahoot?.theme!}
                    onPress={() => {
                      setIsClickShowTheme(true);
                      handlePresentModalPress();
                    }}
                  />
                  <Text
                    style={[
                      styles.title,
                      {
                        color: 'black',
                      },
                    ]}>
                    Question ({kahoot?.questions.length ?? 0})
                  </Text>
                  {/* List Question */}
                  <ListQuestion
                    questions={kahoot?.questions ?? []}
                    navigation={navigation}
                    idQuestion={idQuestion ?? ''}
                  />
                  <View
                    style={{
                      height: 90,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
            <ButtonCustom
              onPress={handlePresentModalPress}
              as="button"
              label={`Add ${'\n'} question`}
            />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={isClickShowTheme ? 1 : 0}
              enablePanDownToClose={true}
              snapPoints={snapPoints}
              style={{
                backgroundColor: 'white',
              }}
              onChange={handleSheetChanges}
              backdropComponent={renderBackdrop}>
              {!isClickShowTheme && (
                <View style={styles.contentContainer}>
                  <Text style={styles.titleQuestion}>Add Question</Text>
                  <Text style={styles.textKnowledge}>Test Knowledge</Text>
                  <ListTypeQuestion
                    navigation={navigation}
                    handleCloseModalPress={handleCloseModalPress}
                    idQuestion={idQuestion ?? ''}
                  />
                </View>
              )}
              {isClickShowTheme && (
                <ListTheme
                  onCloseBottomModal={handleCloseModalPress}
                  idQuestion={idQuestion!}
                />
              )}
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 10,
  },
  containerTitle: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 16,
  },
  themeSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 10,
    borderRadius: 3,
    gap: 10,
    marginTop: 10,
    height: 50,
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imageTheme: {
    width: '100%',
    height: 50,
    flex: 0.2,
    backgroundColor: 'red',
  },
  titleTheme: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  titleQuestion: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  textKnowledge: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#7C7C7C',
    marginVertical: 10,
  },
});
