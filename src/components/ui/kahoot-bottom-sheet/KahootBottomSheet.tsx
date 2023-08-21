import React, {useMemo, useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheet from './BottomSheet';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {initQuestion} from '../../../redux/slices/questionSlice/reducer';
import {useAppDispatch} from '../../../redux/store';
import {Question, theme} from '../../../types/question';
import {KahootDetailData} from '../../../types/kahoot.type';
import {
  postUserFavoriteKahoot,
  deleteUserFavoriteKahoot,
  deleteKahootById,
  getKahootDetail,
} from '../../../services/kahoot/kahoot.service';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/authSlice/selector';
import ModalGameMode from './ModalGameMode';
import {v4 as uuidv4} from 'uuid';

interface Props {
  updateStateWhenDeleteKahoot?: (kahootId: number) => void;
  kahootDetailConfig?: {
    kahootID: number;
    isMyKahoot: boolean;
  };
}

const KahootBottomSheet = React.forwardRef(
  (props: Props, ref: React.Ref<BottomSheetModal>) => {
    const {updateStateWhenDeleteKahoot, kahootDetailConfig} = props;
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const snapPoints = useMemo(() => ['75%'], []);
    const [kahoot, setKahoot] = useState<KahootDetailData>();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const isMounted = React.useRef(false);

    React.useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
      const getKahootDetailById = async () => {
        if (!kahootDetailConfig?.kahootID) {
          return;
        }
        const response = await getKahootDetail(
          kahootDetailConfig?.kahootID as number,
        );
        response.isMyKahoot = kahootDetailConfig?.isMyKahoot as boolean;

        const checkFavorite = response.usersFavorite.some(
          userFavorite => userFavorite.userId === user?.id,
        );

        setKahoot(response);
        setIsFavorite(checkFavorite);
      };
      getKahootDetailById().catch(error =>
        console.log(JSON.stringify(error, null, 2)),
      );
    }, [
      kahootDetailConfig?.kahootID,
      kahootDetailConfig?.isMyKahoot,
      isFavorite,
      isFocused,
      user,
    ]);

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

    const openModalChooseGameMode = () => {
      if (user) {
        setModalVisible(true);
      } else {
        navigation.navigate('UserSettingScreen');
      }
    };
    const closeModalChooseGameMode = () => {
      setModalVisible(false);
    };

    //
    const handleNavigateToUserDetail = () => {
      navigation.navigate('UserDetailScreen', {
        id: kahoot?.userId as number,
        name: kahoot?.username as string,
      });
      if (ref) {
        (ref as any).current?.close();
      }
    };

    //   detele kahoot
    const deleteKahoot = async (kahootId: number) => {
      const response = await deleteKahootById(kahootId);
      if (response.code === 200) {
        //   Update state on Homesceen
        updateStateWhenDeleteKahoot && updateStateWhenDeleteKahoot(kahootId);
        //   Do something
      }
    };
    const handleFavorite = async () => {
      if (!user) {
        // navigation login
        navigation.navigate('UserSettingScreen');
        return;
      }
      setIsFavorite(!isFavorite);
      if (!isFavorite && user) {
        const res = await postUserFavoriteKahoot(
          kahoot?.id as number,
          user.id as number,
        );
        if (res.code === 200) {
          console.log('success');
        }
      }
      if (isFavorite && user) {
        const res = await deleteUserFavoriteKahoot(kahoot?.id || 0);
        if (res.code === 200) {
          console.log('delete');
        }
      }
    };
    const handleEditKahoot = () => {
      const initQuestionData: Question = {
        idQuestion: kahoot?.id,
        userId: kahoot?.userId,
        coverImage: kahoot?.coverImage ?? '',
        title: kahoot?.title ?? '',
        theme: kahoot
          ? ((kahoot?.theme.charAt(0).toUpperCase() +
              kahoot?.theme.slice(1)) as theme)
          : 'Standard',
        description: kahoot?.description ?? '',
        media: kahoot?.media ?? '',
        visibleScope: kahoot?.visibleScope as 'public' | 'private',
        questions: kahoot?.questions as any,
        images: [],
        deletedQuestionIds: [],
        deletedAnswerIds: [],
      };
      dispatch(initQuestion(initQuestionData));
      navigation.navigate('QuestionScreen', {
        idQuestion: initQuestionData?.idQuestion!,
        isEditAPI: true,
      });
    };
    const handleStartGame = () => {
      setModalVisible(false);

      navigation.navigate('PlayScreen', {
        kahoot,
      });
    };

    return (
      <>
        <View style={styles.container}>
          <BottomSheetModal
            style={{
              backgroundColor: 'white',
            }}
            ref={ref}
            // key={kahoot?.id}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            <ScrollView>
              <View style={styles.contentContainer}>
                {/* Here */}
                <ModalGameMode
                  modalVisible={modalVisible}
                  closeModalChooseGameMode={closeModalChooseGameMode}
                  handleStartGame={handleStartGame}
                  kahootId={kahoot?.id as number}
                  key={uuidv4()}
                />
                <BottomSheet>
                  <BottomSheet.ImageCoverKahoot
                    image={kahoot?.coverImage ?? ''}
                  />
                  <BottomSheet.Container>
                    <BottomSheet.Title title={kahoot?.title} />
                    <BottomSheet.BoxVisibleQuantity
                      element={
                        <>
                          <BottomSheet.BoxVisibleQuantityItem
                            nameIcon="play"
                            color="black"
                            count={kahoot?.numberOfPlayer}
                          />
                          <BottomSheet.BoxVisibleQuantityItem
                            nameIcon="help-circle"
                            color="blue"
                            count={kahoot?.questions?.length || 0}
                          />
                          <BottomSheet.BoxVisibleQuantityItem
                            nameIcon="star"
                            color="#FFC107"
                            count={kahoot?.usersFavorite?.length}
                          />
                        </>
                      }
                    />
                    <BottomSheet.BoxUserAction
                      username={kahoot?.username as string}
                      isFavorite={isFavorite}
                      isMyKahoot={kahootDetailConfig?.isMyKahoot}
                      visibleEdit={kahoot?.isMyKahoot}
                      onPressEdit={handleEditKahoot}
                      onPressDelete={deleteKahoot.bind(
                        this,
                        kahoot?.id as number,
                      )}
                      handleFavorite={handleFavorite}
                      handleNavigateToUserDetail={handleNavigateToUserDetail}
                    />
                    <BottomSheet.ButtonPlay
                      onPress={() => openModalChooseGameMode()}
                    />
                  </BottomSheet.Container>
                </BottomSheet>
              </View>
            </ScrollView>
          </BottomSheetModal>
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default KahootBottomSheet;
