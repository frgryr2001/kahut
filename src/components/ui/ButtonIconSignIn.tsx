import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Text} from 'react-native';

// extends props of TouchableOpacity
interface ButtonIconSignInProps extends TouchableOpacityProps {
  nameIcon?: string;
  sizeIcon?: number;
  colorIcon?: string;
  textIcon?: string;
}

export const ButtonIconSignIn = ({
  nameIcon,
  sizeIcon,
  colorIcon,
  textIcon,
  ...props
}: ButtonIconSignInProps) => {
  return (
    <TouchableOpacity style={styles.btn} {...props}>
      <Icon name={nameIcon!} size={sizeIcon} color={colorIcon} />
      <Text style={styles.textBtn}>{textIcon}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '50%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 5,
  },
  textBtn: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
