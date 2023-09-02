import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './AppBarIconButton.style';

interface Props {
  type: 'normal' | 'outline';
  onPress: () => void;
  icon: string;
}

const AppBarIconButton = ({type, onPress, icon}: Props) => {
  const {colors} = useTheme();

  switch (type) {
    case 'normal':
      return (
        <TouchableOpacity onPress={onPress} style={styles.normalButton}>
          <Icon name={icon} size={24} color={colors.text} />
        </TouchableOpacity>
      );

    case 'outline':
      return (
        <TouchableOpacity style={styles.outlineButton}>
          <Icon name={icon} size={24} color={colors.text} />
        </TouchableOpacity>
      );
  }
};

export default AppBarIconButton;
