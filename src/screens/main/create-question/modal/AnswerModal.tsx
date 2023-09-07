import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomSwitch} from './CustomSwitch';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch} from '../../../../redux/store';
import {
  addImageAnswerQuestion,
  updateFieldQuestion,
  updateImagesKahoot,
} from '../../../../redux/slices/questionSlice/reducer';

const color = ['#870817', '#123D87', '#6B1782', '#3F400C'];

const AnswerModal = ({
  navigation,
  valueTextAnswer,
  handleOnChangeTextAnswer,
  indexQuestion,
  kahootID,
  id,
  answers,
  isSwitchOn,
  handleOnPressSwitch,
}: any) => {
  const dispatch = useAppDispatch();
  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return;
      }
      dispatch(
        addImageAnswerQuestion({
          kahootId: kahootID,
          questionId: id,
          index: indexQuestion,
          image: response.assets![0].fileName as string,
          file: {
            uri: response.assets![0].uri! as string,
            type: response.assets![0].type as string,
            name: response.assets![0].fileName as string,
          },
        }),
      );

      navigation.goBack();
    });
  };

  const handleDeleteImage = () => {
    dispatch(
      updateFieldQuestion({
        kahootId: kahootID,
        questionId: id,
        fieldsToUpdate: {
          answers: {
            [indexQuestion]: {
              image: '',
            },
          } as [
            {
              image: string;
              isCorrect: boolean;
              text: string;
            },
          ],
        },
      }),
    );

    dispatch(
      updateImagesKahoot({
        kahootId: kahootID,
        image: answers[indexQuestion]?.image,
      }),
    );
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
        {answers[indexQuestion]?.image ? (
          <View
            style={{
              backgroundColor: color[indexQuestion],
              width: '60%',
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 5,
            }}>
            <ImageBackground
              source={{
                uri: (answers[indexQuestion]?.image as string).startsWith(
                  'http',
                )
                  ? answers[indexQuestion]?.image
                  : `file:///data/user/0/com.kahut/cache/${answers[indexQuestion]?.image}`,
              }}
              resizeMode="contain"
              style={[
                {
                  width: '100%',
                  height: '100%',
                },
              ]}
            />
            <Pressable style={styles.btnDelete} onPress={handleDeleteImage}>
              <Icon name="close-circle" size={30} color={'white'} />
            </Pressable>
          </View>
        ) : (
          <TextInput
            value={valueTextAnswer}
            onChangeText={handleOnChangeTextAnswer}
            textAlignVertical="center"
            autoFocus
            autoCorrect={false}
            multiline={true}
            style={[
              styles.textInputQuestion,
              {
                width: '60%',
                backgroundColor: color[indexQuestion],
                color: 'white',
              },
            ]}
          />
        )}

        <Pressable
          onPress={() => openGallery()}
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="image-outline" size={30} color={'black'} />
        </Pressable>
      </View>
      <View style={styles.containerAnswer}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
          }}>
          Answer
        </Text>
        <CustomSwitch
          isOn={isSwitchOn}
          handleOnPressSwitch={handleOnPressSwitch}
          color={color[indexQuestion]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInputQuestion: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    backgroundColor: '#FFFFFF',
    padding: 10,
    height: 80,
    borderRadius: 8,
    textAlign: 'center',
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  containerAnswer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 10,
  },
  btnDelete: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default AnswerModal;
