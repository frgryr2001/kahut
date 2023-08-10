import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {DropdownCustom} from './DropdownCustom';
import {PopupMenu} from './PopupMenu';
import {useAppDispatch} from '../../../../redux/store';
import {
  deleteQuestion,
  updateFieldQuestion,
} from '../../../../redux/slices/questionSlice/reducer';
import {ModalPoint} from './ModalPoint';
import {QuestionKahoot} from '../../../../types/question';

interface Props {
  navigation: any;
  typeQuestion: string;
  kahootID?: string | number;
  question?: QuestionKahoot;
}

export const Header = ({
  navigation,
  typeQuestion,
  kahootID,
  question,
}: Props) => {
  const dispatch = useAppDispatch();
  const [visibleModalPoint, setVisibleModalPoint] = React.useState(false);

  const pointChoice = question?.point;

  const handleGoBackScreen = () => {
    navigation.goBack();
  };

  const handleDeleteQuestion = () => {
    dispatch(
      deleteQuestion({
        kahootId: kahootID!,
        questionId: question?.id!,
      }),
    );
  };
  const handleChangePoint = (point: 0 | 1000 | 2000) => {
    dispatch(
      updateFieldQuestion({
        kahootId: kahootID!,
        questionId: question?.id!,
        fieldsToUpdate: {
          point: point,
        },
      }),
    );
  };
  const handleOnCloseModal = () => {
    setVisibleModalPoint(false);
  };
  const handleOpenPointModal = () => {
    setVisibleModalPoint(true);
  };

  return (
    <View style={styles.container}>
      {/* icon back */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleGoBackScreen()}>
        <Icon name="chevron-down-outline" size={25} color={'black'} />
      </TouchableOpacity>
      {/* Type question */}
      <DropdownCustom
        typeQuestion={typeQuestion}
        kahootId={kahootID!}
        questionId={question?.id!}
      />
      {/* icon option */}
      <PopupMenu
        handleGoBackScreen={handleGoBackScreen}
        handleDeleteQuestion={handleDeleteQuestion}
        onOpenModal={handleOpenPointModal}
      />
      <ModalPoint
        visible={visibleModalPoint}
        onCloseModal={handleOnCloseModal}
        pointChoice={pointChoice}
        handleChangePoint={handleChangePoint}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
