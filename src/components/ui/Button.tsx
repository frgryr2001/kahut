import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  as?: 'text' | 'button';
  isActive?: boolean;
  color?: string;
  width?: number | string;
  style?: any;
  icon?: {
    name: string;
    size: number;
    color: string;
  };
}
export const Button = ({
  title,
  onPress,
  loading,
  disabled,
  as,
  size,
  color,
  width,
  isActive,
  style,
  icon,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        as === 'text'
          ? {}
          : {
              ...styles.button,
            },
        size === 'small' && {paddingVertical: 5, paddingHorizontal: 20},
        size === 'medium' && {paddingVertical: 10, paddingHorizontal: 30},
        size === 'large' && {paddingVertical: 20, paddingHorizontal: 40},
        {backgroundColor: isActive ? '#2886de' : color, width: width},
        {
          ...style,
        },
      ]}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color="#fff" size={'small'} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}>
          {icon && (
            <Icon name={icon.name} size={icon.size} color={icon.color} />
          )}
          <Text
            style={[
              as === 'text'
                ? {
                    color: 'black',
                    fontFamily: 'Poppins-Bold',
                  }
                : {...styles.buttonText, color: isActive ? '#fff' : 'black'},
            ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7C4DFF',
    paddingVertical: 15,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});
