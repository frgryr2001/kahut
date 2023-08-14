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
  arrInitPopupMenu: Array<{
    title: string;
    icon: string;
    onPress: () => void;
  }>;
}

export default function PopupMenu({arrInitPopupMenu}: Props) {
  const {colors} = useTheme();
  const [visible, setVisible] = React.useState(false);
  const scale = React.useRef(new Animated.Value(0)).current;
  const options = React.useMemo(() => arrInitPopupMenu, [arrInitPopupMenu]);

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
}
const styles = StyleSheet.create({
  iconOption: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: width / 3,
    borderRadius: 3,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: 'relative',
    left: width / 1.5 - width / 10,
    top: 620,
    zIndex: 9999,
    shadowColor: '#000',
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
