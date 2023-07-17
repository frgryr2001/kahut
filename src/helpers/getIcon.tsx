import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';

export const getIcon = (icon: string, size: number, color: string) => {
  return <Icons name={icon} size={size} color={color} />;
};
