import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Question} from '../../../../types/question';
import {useAppDispatch} from '../../../../redux/store';
import {deleteKahoot} from '../../../../redux/slices/questionSlice/reducer';
import {createKahoot} from '../../../../redux/slices/questionSlice/action';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, ModalCustom} from '../../../../components/ui';
import {useSelector} from 'react-redux';
import {selectLoading} from '../../../../redux/slices/questionSlice/selector';
import {selectStatus} from '../../../../redux/slices/authSlice/selector';
import httpClient from '../../../../services/utils/httpClient';

interface HeaderProps {
  completed: boolean;
  kahoot: Question | undefined;

  navigation: any;
  validateDiffBetweenObjEdit: () => boolean;
  isEdit?: boolean;
  isEditAPI?: boolean;
  handleDiscardChanges: () => void;
}
function MessageCheckListQuestion({
  kahoot,
  colors,
  checkCorrect,
}: {
  kahoot: Question | undefined;
  colors: any;
  checkCorrect: () => boolean;
}) {
  return (
    <>
      <View style={styles.checkContent}>
        {kahoot?.title !== '' ? (
          <Icon name="checkmark-circle" size={20} color={'green'} />
        ) : (
          <Icon name="alert-circle" size={20} color={'red'} />
        )}
        <Text style={[styles.textCheck, {color: colors.text}]}>
          Please enter a title
        </Text>
      </View>
      <View style={styles.checkContent}>
        {kahoot?.questions.length! > 0 ? (
          <Icon name="checkmark-circle" size={20} color={'green'} />
        ) : (
          <Icon name="alert-circle" size={20} color={'red'} />
        )}
        <Text style={[styles.textCheck, {color: colors.text}]}>
          Please enter at least one question
        </Text>
      </View>
      <View style={styles.checkContent}>
        {checkCorrect() ? (
          <Icon name="checkmark-circle" size={20} color={'green'} />
        ) : (
          <Icon name="alert-circle" size={20} color={'red'} />
        )}
        <Text style={[styles.textCheck, {color: colors.text}]}>
          Complete the question and answers
        </Text>
      </View>
    </>
  );
}

const Header = ({
  navigation,
  completed,
  kahoot,
  isEdit,
  isEditAPI,
  validateDiffBetweenObjEdit,
  handleDiscardChanges,
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const loading = useSelector(selectLoading);
  const status = useSelector(selectStatus);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isCancel, setIsCancel] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onCloseModal = () => {
    setModalVisible(false);
  };
  const checkCorrect = (): boolean => {
    const check = kahoot?.questions.some(question => {
      if (
        question.type === 'trueorfalse' &&
        question.question !== '' &&
        kahoot?.title !== '' &&
        status === 'authenticated'
      ) {
        return true;
      }
      if (
        question.type === 'quiz' &&
        question.question !== '' &&
        kahoot?.title !== '' &&
        status === 'authenticated'
      ) {
        return question.answers.some(answer => {
          return answer.isCorrect;
        });
      }
      return false;
    });

    return check!;
  };
  const onSave = async () => {
    setIsCancel(false);
    if (!checkCorrect()) {
      setModalVisible(true);
      return;
    }
    if (isEditAPI) {
      async function update() {
        setIsLoading(true);
        const formData = new FormData();
        const convertDataValid = kahoot?.questions?.map(question => {
          if (question.answer) {
            return {
              ...question,
              answer: Boolean(question.answer),
            };
          }
          if (question.answers) {
            return {
              ...question,
              answers: question.answers.map(answer => {
                return {
                  ...answer,
                  isCorrect: Boolean(answer.isCorrect),
                };
              }),
            };
          }
          return question;
        });
        console.log(
          'test',
          JSON.stringify({
            ...kahoot,
            id: kahoot?.idQuestion,
            theme: kahoot?.theme.toLocaleLowerCase(),
            questions: convertDataValid,
          }),
        );

        formData.append(
          'kahoot',
          JSON.stringify({
            ...kahoot,
            id: kahoot?.idQuestion,
            theme: kahoot?.theme.toLocaleLowerCase(),
            questions: convertDataValid,
          }),
        );
        kahoot?.images!.forEach(image => {
          formData.append('images', image);
        });
        formData.append(
          'deletedQuestionIds',
          JSON.stringify(kahoot?.deletedQuestionIds),
        );
        formData.append(
          'deletedAnswerIds',
          JSON.stringify(kahoot?.deletedAnswerIds),
        );

        try {
          const res = await httpClient.put<any>('/kahoots', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (res.code === 200) {
            dispatch(
              deleteKahoot({
                kahootId: kahoot?.idQuestion!,
              }),
            );
            setIsLoading(false);
            navigation.goBack();
          }
        } catch (error) {
          setIsLoading(false);
          Alert.alert('Error', 'Something went wrong');
          console.log('error', JSON.stringify(error, null, 2));
        }
      }
      update().catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
      });
    } else {
      dispatch(createKahoot(kahoot!))
        .unwrap()
        .then(() => {
          navigation.goBack();
        })
        .then(() => {
          dispatch(
            deleteKahoot({
              kahootId: kahoot?.idQuestion!,
            }),
          );
        });
    }
  };

  const cancelEmptyQuestion = () => {
    setIsCancel(true);
    const checkKahootChange =
      kahoot?.theme !== 'Standard' ||
      kahoot?.coverImage !== null ||
      kahoot?.title !== '' ||
      kahoot?.questions.length !== 0 ||
      kahoot?.description !== '';

    if (isEditAPI && !validateDiffBetweenObjEdit()) {
      dispatch(
        deleteKahoot({
          kahootId: kahoot?.idQuestion!,
        }),
      );
      navigation.goBack();

      return;
    }

    if (!checkKahootChange && !isEdit) {
      dispatch(
        deleteKahoot({
          kahootId: kahoot?.idQuestion!,
        }),
      );
      navigation.goBack();
    } else {
      setModalVisible(true);
    }
  };

  const cancelEditQuestion = () => {
    const checkChanged = validateDiffBetweenObjEdit();
    if (isEdit && checkChanged) {
      // Changed
      setIsCancel(true);
      setModalVisible(true);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
      ]}>
      <Spinner
        visible={loading || isLoading}
        textContent={'Loading...'}
        textStyle={{
          color: '#F5F5F5',
        }}
      />

      <View style={styles.headerContainer}>
        {/* Cancel */}
        <TouchableWithoutFeedback
          onPress={isEdit ? cancelEditQuestion : cancelEmptyQuestion}>
          <Text
            style={[
              styles.headerAction,
              {
                color: colors.text,
              },
            ]}>
            Cancel
          </Text>
        </TouchableWithoutFeedback>
        {/* Title */}
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
            },
          ]}>
          Create Question
        </Text>
        {/* Save */}
        <TouchableWithoutFeedback onPress={onSave} disabled={!completed}>
          <Text
            style={[
              styles.headerAction,
              {
                color: completed ? colors.text : '#C7C7CC',
              },
            ]}>
            Save
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <ModalCustom
        modalVisible={modalVisible}
        onCloseModal={onCloseModal}
        title={
          !isCancel
            ? 'Please complete the question'
            : 'Are you sure you want to cancel?'
        }>
        <View>
          {!isCancel && (
            <>
              <MessageCheckListQuestion
                kahoot={kahoot}
                colors={colors}
                checkCorrect={checkCorrect}
              />
              <View
                style={[
                  {
                    flexDirection: 'row',
                  },
                  status === 'authenticated'
                    ? {justifyContent: 'space-between'}
                    : {
                        justifyContent: 'center',
                        columnGap: 10,
                        rowGap: 15,
                        flexWrap: 'wrap',
                      },
                ]}>
                {status === 'authenticated' ? (
                  <>
                    <Button
                      title="Cancel"
                      size="medium"
                      color={colors.background}
                      onPress={onCloseModal}
                    />
                    <Button
                      title="Save as draft"
                      isActive
                      size="medium"
                      onPress={() => navigation.navigate('Library')}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      title="Sign up"
                      size="medium"
                      color={colors.background}
                      onPress={() => navigation.navigate('RegisterScreen')}
                    />
                    <Button
                      title="Login"
                      isActive
                      size="medium"
                      onPress={() => {
                        navigation.navigate('LoginScreen');
                        onCloseModal();
                      }}
                    />
                    <Button
                      as="text"
                      title="Save as draft"
                      onPress={() => navigation.navigate('Library')}
                    />
                  </>
                )}
              </View>
            </>
          )}
          {isCancel && (
            <View>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                    columnGap: 15,
                    rowGap: 15,
                    flexWrap: 'wrap',
                  },
                ]}>
                <Button
                  title="Cancel"
                  size="medium"
                  color={colors.background}
                  onPress={onCloseModal}
                />
                <Button
                  title="OK"
                  isActive
                  size="medium"
                  onPress={() => {
                    if (isEdit) {
                      handleDiscardChanges();
                      navigation.goBack();
                      onCloseModal();
                    }
                    if (!isEdit) {
                      dispatch(
                        deleteKahoot({
                          kahootId: kahoot?.idQuestion!,
                        }),
                      );
                      navigation.goBack();
                    }
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </ModalCustom>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,

    paddingHorizontal: 10,
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerAction: {
    fontFamily: 'Poppins-Bold',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 3,
    width: '95%',
    alignSelf: 'center',
    marginTop: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  boxContent: {},
  checkContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  textCheck: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  titleModal: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Header;
