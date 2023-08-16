import React, {useMemo, useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheet from './BottomSheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {initQuestion} from '../../../redux/slices/questionSlice/reducer';
import {useAppDispatch} from '../../../redux/store';
import {Question, theme} from '../../../types/question';
import {KahootDetailData} from '../../../types/kahoot.type';
import {ModalCustom} from '../ModalCustom';
import GameModeCard from './GameModeCard';

interface Props {
  children: JSX.Element | JSX.Element[];
  deleteKahoot: (kahootId: number) => void;
}

const KahootBottomSheet = React.forwardRef(
  (props: Props, ref: React.Ref<BottomSheetModal>) => {
    const {children, deleteKahoot} = props;
    const dispatch = useAppDispatch();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const snapPoints = useMemo(() => ['75%'], []);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

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
      setModalVisible(true);
    };
    const closeModalChooseGameMode = () => {
      setModalVisible(false);
    };

    return (
      <>
        {children}

        <View style={styles.container}>
          <BottomSheetModal
            style={{
              backgroundColor: 'white',
            }}
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}>
            {props => {
              //   const kahoot = props.data as KahootDetailData;

              const kahoot = props.data as KahootDetailData;

              const handleEditKahoot = () => {
                const initQuestionData: Question = {
                  idQuestion: kahoot.id,
                  userId: kahoot.userId,
                  coverImage: kahoot.coverImage,
                  title: kahoot.title,
                  theme: (kahoot.theme.charAt(0).toUpperCase() +
                    kahoot.theme.slice(1)) as theme,
                  description: kahoot.description,
                  media: kahoot.media,
                  visibleScope: kahoot.visibleScope as 'public' | 'private',
                  questions: kahoot.questions as any,
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
                <ScrollView>
                  <View style={styles.contentContainer}>
                    <ModalCustom
                      modalVisible={modalVisible}
                      title="Choose Game Mode"
                      onCloseModal={() => closeModalChooseGameMode()}>
                      <View style={styles.boxGameMode}>
                        <GameModeCard
                          title="Assignment"
                          subTitle="Send this kahoot as homework"
                          onPress={() => console.log('123')}
                        />
                        <GameModeCard
                          title="Single player"
                          subTitle="Play on your own"
                          onPress={() => handleStartGame()}
                        />
                      </View>
                    </ModalCustom>
                    <BottomSheet>
                      <BottomSheet.ImageCoverKahoot image={kahoot.coverImage} />
                      <BottomSheet.Container>
                        <BottomSheet.Title title={kahoot.title} />
                        <BottomSheet.BoxVisibleQuantity
                          element={
                            <>
                              <BottomSheet.BoxVisibleQuantityItem
                                nameIcon="play"
                                color="black"
                              />
                              <BottomSheet.BoxVisibleQuantityItem
                                nameIcon="help-circle"
                                color="blue"
                                count={kahoot.questions?.length || 0}
                              />
                              <BottomSheet.BoxVisibleQuantityItem
                                nameIcon="star"
                                color="#FFC107"
                              />
                            </>
                          }
                        />
                        <BottomSheet.BoxUserAction
                          username={kahoot.username}
                          isFavorite={isFavorite}
                          visibleEdit={kahoot.isMyKahoot}
                          onPressEdit={handleEditKahoot}
                          onPressDelete={deleteKahoot.bind(this, kahoot.id)}
                        />
                        <BottomSheet.ButtonPlay
                          onPress={() => openModalChooseGameMode()}
                        />
                      </BottomSheet.Container>
                    </BottomSheet>
                  </View>
                </ScrollView>
              );
            }}
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
  boxGameMode: {
    gap: 5,
    paddingBottom: 20,
  },
});

export default KahootBottomSheet;
