import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {ReactNode} from 'react';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './SectionContainer.style';

interface Props {
  children: ReactNode;
  title: string;
  icon?: string;
  image?: string;
  onPressSeeAll: (() => void) | null;
}

const SectionContainer = ({
  children,
  title,
  icon,
  image,
  onPressSeeAll,
}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.heading}>
          {icon && <Icons name={icon} size={24} color={colors.text} />}
          {image && (
            <Image
              source={{uri: image}}
              style={{
                width: 32,
                height: 32,
                borderRadius: 999,
                objectFit: 'cover',
                borderColor: '#00000020',
                borderWidth: 1,
              }}
            />
          )}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, {color: colors.text}]}>
            {title}
          </Text>
        </View>

        {onPressSeeAll && (
          <TouchableOpacity onPress={onPressSeeAll}>
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};

export default SectionContainer;
