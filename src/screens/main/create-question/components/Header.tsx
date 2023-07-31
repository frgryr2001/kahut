import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {DropdownCustom} from './DropdownCustom';
import {PopupMenu} from './PopupMenu';
import {useAppDispatch} from '../../../../redux/store';
import {deleteQuestion} from '../../../../redux/slices/questionSlice/reducer';
import {ModalPoint} from './ModalPoint';

interface Props {
  navigation: any;
  typeQuestion: string;
  kahootID?: string;
  id?: string;
}

export const Header = ({navigation, typeQuestion, kahootID, id}: Props) => {
  const dispatch = useAppDispatch();
  const [visibleModalPoint, setVisibleModalPoint] = React.useState(true);

  const handleGoBackScreen = () => {
    navigation.goBack();
  };

  const handleDeleteQuestion = () => {
    dispatch(
      deleteQuestion({
        kahootId: kahootID!,
        questionId: id!,
      }),
    );
  };
  const handleOnCloseModal = () => {
    setVisibleModalPoint(false);
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
      <DropdownCustom typeQuestion={typeQuestion} />
      {/* icon option */}
      <PopupMenu
        handleGoBackScreen={handleGoBackScreen}
        handleDeleteQuestion={handleDeleteQuestion}
      />
      <ModalPoint
        visible={visibleModalPoint}
        onCloseModal={handleOnCloseModal}
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
