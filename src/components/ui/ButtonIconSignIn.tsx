import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Image,
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
  const getIcon = useCallback(() => {
    switch (nameIcon) {
      case 'logo-google':
        return (
          <Image
            source={require('../../assets/images/googleIcon.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        );
      case 'logo-facebook':
        return <Icon name={nameIcon!} size={sizeIcon} color={colorIcon} />;
      default:
        return <Icon name={nameIcon!} size={sizeIcon} color={colorIcon} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity style={styles.btn} {...props}>
      {getIcon()}
      <Text style={styles.textBtn}>{textIcon}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
  },
  textBtn: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
