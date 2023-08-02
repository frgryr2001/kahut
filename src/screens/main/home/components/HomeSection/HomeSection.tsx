import {Text, View, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './HomeSection.style';

interface Props {
  children: ReactNode;
  title: string;
  icon: string;
  onPressSeeAll: () => void;
}

const HomeSection = ({children, title, icon, onPressSeeAll}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.heading}>
          <Icons name={icon} size={24} color={colors.text} />
          <Text style={[styles.text, {color: colors.text}]}>{title}</Text>
        </View>

        <TouchableOpacity onPress={onPressSeeAll}>
          <Text style={{color: colors.text, fontSize: 18}}>See all</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export default HomeSection;
