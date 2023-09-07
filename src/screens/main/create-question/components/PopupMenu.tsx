import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const width = Dimensions.get('window').width;

interface Props {
  handleGoBackScreen: () => void;
  handleDeleteQuestion: () => void;
  onOpenModal: () => void;
}

export const PopupMenu = ({
  handleGoBackScreen,
  handleDeleteQuestion,
  onOpenModal,
}: Props) => {
  const {colors} = useTheme();
  const [visible, setVisible] = React.useState(false);
  const scale = React.useRef(new Animated.Value(0)).current;
  const options = React.useMemo(
    () => [
      {
        title: 'Change Point',
        icon: 'medal-outline',
        onPress: () => onOpenModal(),
      },
      {
        title: 'Delete',
        icon: 'trash-outline',
        onPress: () => {
          handleDeleteQuestion();
          handleGoBackScreen();
        },
      },
    ],
    [handleGoBackScreen, handleDeleteQuestion, onOpenModal],
  );

  function resizePopupTransition(to: number) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }
  return (
    <>
      <TouchableOpacity
        style={styles.iconOption}
        activeOpacity={0.7}
        onPress={() => resizePopupTransition(1)}>
        <Icon name="ellipsis-vertical" size={25} color={'black'} />
      </TouchableOpacity>
      <Modal visible={visible} transparent>
        <SafeAreaView
          style={{
            flex: 1,
          }}
          onTouchEnd={() => resizePopupTransition(0)}>
          <Animated.View
            style={[
              styles.popup,
              {
                opacity: scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
              {
                transform: [
                  {
                    scale,
                  },
                ],
              },
            ]}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.popupItem]}
                onPress={() => {
                  option.onPress();
                  setVisible(false);
                }}>
                <Icon name={option.icon} size={20} color={'black'} />
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  iconOption: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: width / 2,
    borderRadius: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: 'absolute',
    right: 10,
    top: 60,
    shadowColor: '#00000040',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 15,
  },
});
